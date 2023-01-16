import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Loading prisma client
  let prisma = new PrismaClient();
  const { emailfk, teamid, teamName, logo, group, nickname } =
    req.body.teamdata;
  //   console.log("req>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
  const result = await prisma.team.create({
    data: {
      emailfk: emailfk,
      teamid: teamid,
      teamName: teamName,
      logo: logo,
      group: group,
      nickname: nickname,
    },
  });
  res.json(result);
  //   console.log(data);
  //   debugger;

  //   const result = await prisma.team.create({
  //     data,
  //   });

  //   if (result) {
  //     res.status(201).json({ message: "성공!", error: false });
  //   } else {
  //     res.status(422).json({ message: "실패", error: true });
  //   }
  // }
}
export default handler;
