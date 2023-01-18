import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Loading prisma client
  let prisma = new PrismaClient();
  const emailfk = req.body;
  //   console.log("req.body?>>>>>>>>>>>>>>>>>", req.body);
  const result = await prisma.team.findMany({
    where: {
      emailfk: emailfk,
    },
    select: {
      nickname: true,
      teamid: true,
      teamName: true,
      logo: true,
      group: true,
    },
  });

  res.status(200).json(JSON.stringify({ ...result[0] }));
}
export default handler;
