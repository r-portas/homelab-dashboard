import type { NextApiRequest, NextApiResponse } from "next";
import { Consul, Service } from "../../src/consul";

const consul = new Consul();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[]>
) {
  const uiServices = await consul.getUiServices();
  res.status(200).json(uiServices);
}
