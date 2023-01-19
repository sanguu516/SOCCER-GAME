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
    teamid: number;
    logo: string;
    name: "name";
    id: string;
    league: string;
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
          console.log(teamgroup);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [teamList]);
  return (
    <Layout>
      <section className="container mx-auto p-6 font-mono">
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
                <tr className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold text-black">Sufyan</p>
                        <p className="text-xs text-gray-600">Developer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">22</td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {" "}
                      Acceptable{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">1</td>
                  <td className="px-4 py-3 text-sm border">3</td>
                  <td className="px-4 py-3 text-sm border">3</td>
                  <td className="px-4 py-3 text-sm border">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
