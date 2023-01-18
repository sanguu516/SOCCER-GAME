import Layout from "../components/layout";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useContext, Reducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function AboutMe() {
  const teamList = useSelector((state) => state?.team);
  console.log("value>>>>>>>", teamList);

  type myinfo = {
    player: object;
    age: number;
    height: string;
    weight: string;
    photo: string;
    name: string;
    id: number;
  };
  const [myinfo, setMyInfo] = useState<myinfo[]>();
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players",
    params: { team: teamList.teamid, season: "2022" },
    headers: {
      "X-RapidAPI-Key": "246543b4c7mshe52ba7a01b5c204p1e5fd7jsn2a10340659f0",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
  useEffect(() => {
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     setMyInfo(response.data.response[0]);
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-2/3 mx-auto">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <div className="flex rounded-3xl flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
              <img
                alt="gallery"
                className="flex w-full  h-full object-center block opacity-30 absolute inset-0"
                src={`./${teamList?.teamList?.group}.png`}
              />
              <div className="text-center relative z-10 w-full">
                <h2 className="text-3xl text-gray-900 font-medium title-font mb-2 ml-90">
                  리그 경기
                </h2>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-1/2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                <div className="flex bg-gray-200 rounded-3xl w-full	 sm:py-14 justify-between align-center  sm:px-10 px-6 relative">
                  <img
                    alt="gallery"
                    className=""
                    src={teamList?.teamList?.logo}
                  />
                  <div className=" relative z-10 w-full flex align-center justify-center flex-col">
                    <h2 className="text-3xl text-black font-medium title-font mb-2">
                      팀 보러가기
                    </h2>
                    <p className="leading-relaxed text-3xl ml-1">
                      {teamList?.teamList?.teamName}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="px-2 w-1/2 ">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                <div
                  className="flex w-full bg-gray-100 rounded-3xl bg-gray-100 sm:py-14  sm:px-10 px-6 relative "
                  style={{
                    backgroundImage: "url(./ranking.png)",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "260px",
                  }}
                >
                  <div className="text-center relative w-full ">
                    <h2 className="text-3xl text-gray-900 font-medium title-font mb-2">
                      순위표
                    </h2>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
