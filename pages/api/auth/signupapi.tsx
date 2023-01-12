import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, email, password } = data;

  const result = { id: 1, name: name, email: email };

  if (result) {
    res.status(201).json({ message: "로그인 성공!", error: false });
  } else {
    res.status(422).json({ message: "맞지 않는 형식입니다.", error: true });
  }
}

export default handler;
