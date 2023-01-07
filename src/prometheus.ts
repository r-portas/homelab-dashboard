import axios from "axios";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { milliseconds } from "date-fns";

const PrometheusQueryResponse = z.object({
  status: z.string(),
  data: z.object({
    resultType: z.string(),
    result: z.array(
      z.object({
        metric: z.any(),
        value: z.array(z.any()),
      })
    ),
  }),
});

interface Overview {
  // The memory usage, as a percentage
  memory: number;

  // The CPU usage, as a percentage
  cpu: number;

  // The disk usage of the root filesystem, as a percentage
  rootFilesystem: number;

  // The disk usage of the media filesystem, as a percentage
  media: number;

  // The disk usage of the apps filesystem, as a percentage
  apps: number;

  // The uptime
  uptime: number;
}

export class Prometheus {
  private PROMETHEUS_PORT = 9090;

  async query(query: string) {
    const resp = await axios.get(
      `http://${process.env.HOMELAB_IP}:${this.PROMETHEUS_PORT}/api/v1/query`,
      {
        params: {
          query: query,
        },
      }
    );

    const data = PrometheusQueryResponse.parse(resp.data);
    if (data.data.result.length !== 1) {
      throw new Error(
        `more results then expected, expected 1 but got ${data.data.result.length}`
      );
    }

    return data.data.result[0].value[1];
  }

  async getMemoryUsage() {
    return await this.query(
      `100 - ((node_memory_MemAvailable_bytes * 100) / node_memory_MemTotal_bytes)`
    );
  }

  async getCpuUsage() {
    return await this.query(
      `(((count(count(node_cpu_seconds_total) by (cpu))) - avg(sum by (mode)(rate(node_cpu_seconds_total{mode='idle'}[1m])))) * 100) / count(count(node_cpu_seconds_total) by (cpu))`
    );
  }

  async getRootUsage() {
    return await this.query(
      `100 - ((node_filesystem_avail_bytes{mountpoint="/",fstype!="rootfs"} * 100) / node_filesystem_size_bytes{mountpoint="/",fstype!="rootfs"})`
    );
  }

  async getMediaUsage() {
    return await this.query(
      `100 - ((node_filesystem_avail_bytes{mountpoint="/srv/media"} * 100) / node_filesystem_size_bytes{mountpoint="/srv/media"})`
    );
  }

  async getAppsUsage() {
    return await this.query(
      `100 - ((node_filesystem_avail_bytes{mountpoint="/srv/apps"} * 100) / node_filesystem_size_bytes{mountpoint="/srv/apps"})`
    );
  }

  async getUptime() {
    return await this.query(`node_time_seconds - node_boot_time_seconds`);
  }

  async getOverview(): Promise<Overview> {
    return {
      cpu: await this.getCpuUsage(),
      memory: await this.getMemoryUsage(),
      rootFilesystem: await this.getRootUsage(),
      media: await this.getMediaUsage(),
      apps: await this.getAppsUsage(),
      uptime: await this.getUptime(),
    };
  }
}

/**
 * A hook for fetching the system overview
 * @returns The system overview
 */
export function useSystemOverview() {
  return useQuery<void, Error, Overview>({
    queryKey: ["system", "overview"],
    queryFn: () => axios.get("/api/prometheus").then((resp) => resp.data),
    refetchInterval: milliseconds({ seconds: 10 }),
  });
}
