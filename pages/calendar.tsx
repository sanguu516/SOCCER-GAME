import * as teamActions from "../store/modules/team";
import { useSelector, useDispatch } from "react-redux";

import React, { useState, useEffect, useContext, Reducer } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { iteratorSymbol } from "immer/dist/internal";

export default function calendar() {
  const axios = require("axios");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [calendarData, setcalendarData] = useState();
  const date = new Date();

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = year + "-" + month + "-" + day;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const teamList = useSelector((state) => state?.team);

  console.log(teamList.teamList.league);
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: {
      league: teamList.teamList.league,
      season: "2022",
      from: "2023-01-01",
      to: "2024-04-30",
    },
    headers: {
      "X-RapidAPI-Key": "246543b4c7mshe52ba7a01b5c204p1e5fd7jsn2a10340659f0",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setcalendarData(
          response.data.response.sort(function (a, b) {
            if (a.fixture.timestamp > b.fixture.timestamp) {
              return 1;
            }
            if (a.fixture.timestamp < b.fixture.timestamp) {
              return -1;
            }
            // a must be equal to b
            return 0;
          })
        );
        console.log(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              경기일정
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Banh mi cornhole echo park skateboard authentic crucifix neutra
              tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon
              twee
            </p>
          </div>{" "}
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl"></th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {calendarData?.map(function (item) {
                  return (
                    <tr key={item.fixture.id}>
                      <td className="border-t-2 border-b-2 border-gray-200 ">
                        {item.fixture.date.substr(0, 10)}
                      </td>
                      <td className="border-t-2 border-b-2 border-gray-200 ">
                        <div className="relative  rounded-full mt-2  flex justify-center flex-col items-center">
                          <img
                            className="object-cover w-8 rounded-full"
                            src={item.teams.away.logo}
                            alt=""
                            loading="lazy"
                          />
                          {item.teams.away.name}
                        </div>
                      </td>
                      <td
                        className={
                          item.goals.away <= item.goals.home
                            ? "border-t-2 border-b-2 border-gray-200 text-xl text-gray-900"
                            : "border-t-2 border-b-2 border-gray-200 text-xl text-red-600"
                        }
                      >
                        {item.goals.away === null ? "미정" : item.goals.away}
                      </td>
                      <td
                        className={
                          item.goals.away >= item.goals.home
                            ? "border-t-2 border-b-2 border-gray-200 text-xl text-gray-900"
                            : "border-t-2 border-b-2 border-gray-200 text-xl text-red-600"
                        }
                      >
                        {item.goals.home === null ? "미정" : item.goals.home}
                      </td>
                      <td className="border-t-2 border-b-2 border-gray-200">
                        <div className="relative rounded-full mt-2  flex justify-center flex-col items-center">
                          <img
                            className="object-cover w-8 rounded-full"
                            src={item.teams.home.logo}
                            alt=""
                            loading="lazy"
                          />
                          {item.teams.home.name}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              Button
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
