import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ ok: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    const result = await prisma.$runCommandRaw({ listCollections: 1, nameOnly: true } as any);
    // Mongo returns { cursor: { firstBatch: [{ name: string, ...}, ...] } }
    const collections: string[] = (result as any)?.cursor?.firstBatch?.map((c: any) => c.name) || [];
    return res.status(200).json({ ok: true, collections });
  } catch (error: any) {
    return res.status(500).json({ ok: false, error: error?.message || "Unknown error" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
