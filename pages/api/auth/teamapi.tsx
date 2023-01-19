import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Loading prisma client
  let prisma = new PrismaClient();
  const { emailfk, teamid, teamName, logo, group, nickname, league } =
    req.body.teamdata;
  const result = await prisma.team.create({
    data: {
      emailfk: emailfk,
      teamid: teamid,
      teamName: teamName,
      logo: logo,
      group: group,
      nickname: nickname,
      league: league,
    },
  });
  res.json(result);
}
export default handler;
