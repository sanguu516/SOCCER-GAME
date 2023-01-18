import Layout from "../components/layout";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useContext, Reducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function teaminfo() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const teamplayerinfo = useSelector((state) => state?.team);

  console.log(teamplayerinfo.teamList.logo);
  //   const team = teamplayerinfo.teamplayer.map(function (i) {
  //     console.log(i);
  //   });
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font pt-70 text-gray-900">
              내 팀 선수 정보{" "}
              <img
                src={teamplayerinfo.teamList.logo}
                style={{ width: "200px" }}
              />
            </h1>
          </div>
          <div className="flex flex-wrap -m-2">
            {teamplayerinfo.teamplayerinfo.teamplayer.map(function (i) {
              return (
                // eslint-disable-next-line react/jsx-key
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img
                      alt="team"
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src={i.photo}
                    />
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium text-2xl">
                        {i.name}
                      </h2>
                      <p className="text-gray-900 text-xl">
                        포지션 {i.position}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
