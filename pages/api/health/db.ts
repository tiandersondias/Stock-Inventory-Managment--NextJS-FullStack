import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ ok: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    // For MongoDB with Prisma, run a lightweight ping
    const pingResult = await prisma.$runCommandRaw({ ping: 1 } as any);
    return res.status(200).json({ ok: true, ping: pingResult });
  } catch (error: any) {
    return res.status(500).json({ ok: false, error: error?.message || "Unknown error" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
