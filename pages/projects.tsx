import Layout from "../components/layout";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import axios from "axios";
import Swal from "sweetalert2";
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import * as teamActions from "../store/modules/team";

export const Projects = ({ ClubKind }) => {
  const dispatch = useDispatch();

  const { data: session } = useSession();
  type team = {
    team: {
      teamid: number;
      logo: string;
      name: "name";
      id: string;
      league: string;
    };
    group: string;
    length: number;
  };
  const [teaminfo, setTeamInfo] = useState<team[]>([]);
  const router = useRouter();

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: { season: "2022", league: ClubKind },
    headers: {
      "X-RapidAPI-Key": "246543b4c7mshe52ba7a01b5c204p1e5fd7jsn2a10340659f0",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setTeamInfo(response?.data.response[0].league.standings[0]);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  console.log("visible>>>>>>>>", teaminfo);

  const Wrapper = styled(motion.div)`
    display: flex;

    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;

  const SlideWrap = styled.div`
    width: 350px;
    height: 350px;
  `;

  const Box = styled(motion.img)`
    position: absolute;
    width: 350px;
    height: 350px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 70px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  `;

  // animation
  const boxVariants = {
    entry: (back: boolean) => ({
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (back: boolean) => ({
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    }),
  };

  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);
  //박스마다 이미지 적용
  const jsondata = wrap(0, teaminfo?.length, visible);

  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === jsondata - 1 ? jsondata - 1 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };
  async function teamcreate() {
    const { value: nickname2 } = await Swal.fire({
      title: "닉네임을 설정 해주세요!",
      input: "text",
      inputPlaceholder: "닉네임을 설정 해주세요",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
    });

    if (nickname2) {
      Swal.fire(`환영합니다!  ${nickname2}님`);
      const teamdata = {
        emailfk: session.user.email,
        teamid: teaminfo[visible].team.id,
        teamName: teaminfo[visible].team.name,
        logo: teaminfo[visible].team.logo,
        group: teaminfo[visible].group,
        nickname: nickname2,
        league: ClubKind,
      };
      console.log("teamdata", teamdata);
      await fetch("/api/auth/teamapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamdata }),
      })
        .then((res) => {
          dispatch(teamActions.getteam(teamdata));
          // console.log("db 저장 완료>>>", res);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  return (
    <Wrapper>
      <SlideWrap>
        <AnimatePresence custom={back}>
          <Box
            custom={back}
            variants={boxVariants}
            src={teaminfo[jsondata]?.team.logo}
            // src={"/barcelona.png"}
            initial="entry"
            animate="center"
            exit="exit"
            key={visible}
          />
        </AnimatePresence>
      </SlideWrap>
      <p className="text-2xl text-black text-clip overflow-hidden	">
        {teaminfo[jsondata]?.team.name}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-2 py-2  px-4 rounded"
        onClick={teamcreate}
      >
        선택하기
      </button>
      <div className="inline-flex">
        <button
          onClick={prevPlease}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold mr-1 py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <button
          onClick={nextPlease}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </Wrapper>
  );
};
