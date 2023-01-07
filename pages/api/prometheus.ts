import type { NextApiRequest, NextApiResponse } from "next";
import { Prometheus } from "../../src/prometheus";

const prometheus = new Prometheus();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const metrics = await prometheus.getOverview();
  res.status(200).json(metrics);
}
