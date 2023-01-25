import Layout from "../components/layout";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useContext, Reducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function rank() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const teamList = useSelector((state) => state?.team);
  // console.log("teamList", teamList);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  type team = {
    win: string;
    lose: string;
    name: string;

    draw: string;
    teamid: number;
    logo: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [teamgroup, setTeamgroup] = useState<team[]>();

  // console.log("group>>>>", teamList.teamList.league);

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: { season: "2022", league: teamList.teamList.league },
    headers: {
      "X-RapidAPI-Key": "246543b4c7mshe52ba7a01b5c204p1e5fd7jsn2a10340659f0",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (teamList.teamList.league) {
      axios
        .request(options)
        .then(function (response) {
          setTeamgroup(response?.data.response[0].league.standings[0]);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [teamList]);

  return (
    <Layout>
      <section className="container mx-auto p-6 font-mono">
        <img
          src={`./${teamList.teamList.group}.png`}
          className="max-w-xs max-h-xs"
        />

        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">팀</th>
                  <th className="px-4 py-3">경기수</th>
                  <th className="px-4 py-3">승</th>
                  <th className="px-4 py-3">무</th>
                  <th className="px-4 py-3">패</th>
                  <th className="px-4 py-3">득실차</th>
                  <th className="px-4 py-3">승점</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {teamgroup &&
                  teamgroup.map(function (item) {
                    return (
                      <tr className="text-gray-700" key={item.name}>
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={item?.team.logo}
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold text-black">
                                {item?.team.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {item?.all.played}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {item?.all.win}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {item?.all.draw}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {item?.all.lose}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {item?.goalsDiff}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {item?.points}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
