import axios from "axios";
import { milliseconds } from "date-fns";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

/**
 * Models a Consul service
 */
export interface Service {
  name: string;
  tags: string[];
  // The Font Awesome icon, e.g. "fa-tv"
  icon?: string;

  // The url of the service, containing both the address and the port
  url: string;

  // The address, usually an IP
  address: string;
  // The port the service is running on
  port: number;

  // True if all checks are passing
  healthy: boolean;

  checks: HealthCheck[];
}

export interface HealthCheck {
  name: string;
  status: string;
  type: string;
}

const ServicesObject = z.record(z.string(), z.string().array());

const ServiceObject = z.array(
  z.object({
    ServiceName: z.string(),
    ServiceTags: z.string().array(),
    ServiceMeta: z.object({
      icon: z.string().optional(),
    }),
    Node: z.string(),
    Address: z.string(),
    ServicePort: z.number(),
  })
);

const HealthObject = z.array(
  z.object({
    Name: z.string(),
    Status: z.string(),
    Type: z.string(),
  })
);

/**
 * Interacts with the consul server
 */
export class Consul {
  private APP_TAG = "app";
  private UI_TAG = "ui";
  private CONSUL_URL = `http://${process.env.HOMELAB_IP}:8500`;

  async getServices() {
    const { data } = await axios.get(`${this.CONSUL_URL}/v1/catalog/services`);
    return ServicesObject.parse(data);
  }

  async getService(service: string) {
    const { data } = await axios.get(
      `${this.CONSUL_URL}/v1/catalog/service/${service}`
    );
    return ServiceObject.parse(data);
  }

  async getHealth(service: string) {
    const { data } = await axios.get(
      `${this.CONSUL_URL}/v1/health/checks/${service}`
    );
    return HealthObject.parse(data);
  }

  /**
   * Gets all
   *
   * @returns all registered UI services
   */
  async getUiServices(): Promise<Service[]> {
    const services = await this.getServices();
    const uiServices: Service[] = [];

    for (const [serviceName, tags] of Object.entries(services)) {
      // Only include services with the ui tag
      if (tags.includes(this.UI_TAG)) {
        const service = await this.getService(serviceName);
        const healthChecks = await this.getHealth(serviceName);

        let healthy = true;
        for (const check of healthChecks) {
          if (check.Status !== "passing") {
            healthy = false;
          }
        }

        if (service.length > 0) {
          uiServices.push({
            name: service[0].ServiceName,
            tags: service[0].ServiceTags,
            icon: service[0].ServiceMeta.icon,
            url: `http://${service[0].Address}:${service[0].ServicePort}/`,
            address: service[0].Address,
            port: service[0].ServicePort,
            healthy: healthy,
            checks: healthChecks.map((check) => ({
              name: check.Name,
              status: check.Status,
              type: check.Type,
            })),
          });
        }
      }
    }

    return uiServices;
  }
}

/**
 * A hook for fetching Consul UI services
 * @returns A list of services
 */
export function useUiServices() {
  return useQuery<void, Error, Service[]>({
    queryKey: ["consul", "ui-services"],
    queryFn: () => axios.get("/api/consul").then((resp) => resp.data),
    refetchInterval: milliseconds({ seconds: 20 }),
  });
}
