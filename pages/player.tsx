import Layout from "../components/layout";
import React, { useState, useEffect, useContext, Reducer } from "react";
import axios from "axios";

export default function player() {
  type myinfo = {
    player: {
      age: number;
      height: string;
      weight: string;
      photo: string;
      name: string;
      id: number;
    };
  };
  type team = {
    team: [];
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [myinfo, setMyInfo] = useState<myinfo[]>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [team, setTeam] = useState<team>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [check, setCheck] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [oncheck, setOncheck] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [teamclub, setTeamclub] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [playerinfo, setplayerinfo] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [check2, setCheck2] = useState(false);

  const on1 = (a) => {
    setCheck(false);
    setCheck2(false);
    if (a === 39) setOncheck(39);
    else if (a === 140) setOncheck(140);
    else if (a === 78) setOncheck(78);
    else if (a === 135) setOncheck(135);
  };
  const group = () => {
    if (oncheck != 0) {
      setCheck(true);
    }
  };
  const on2 = (i) => {
    setTeamclub(i.logo);
    const options2 = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/players",
      params: { team: i.id, season: "2022" },
      headers: {
        "X-RapidAPI-Key": "246543b4c7mshe52ba7a01b5c204p1e5fd7jsn2a10340659f0",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    if (i.id != 0) {
      axios
        .request(options2)
        .then(function (response) {
          const res = response.data.response;
          // console.log(res[0].statistics[0].games.position);
          let teamplayer = res.map(function (item) {
            // console.log(item);
            let position = item.statistics[0].games.position;
            return {
              age: item.player.age,
              height: item.player.height,
              weight: item.player.weight,
              photo: item.player.photo,
              name: item.player.name,
              id: item.player.id,
              country: item.player.nationality,
              position: position,
            };
          });
          setplayerinfo(teamplayer);
          setCheck2(true);
          setCheck(false);
          console.log("response.data", teamplayer);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: { season: "2022", league: oncheck },
    headers: {
      "X-RapidAPI-Key": "246543b4c7mshe52ba7a01b5c204p1e5fd7jsn2a10340659f0",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (oncheck != 0) {
      axios
        .request(options)
        .then(function (response) {
          setTeam(response?.data.response[0].league.standings[0]);
          console.log(response?.data.response[0].league.standings[0]);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [check]);
  useEffect(() => {
    console.log(team);
  }, [team]);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="flex justify-center m-30 min-h-screen">
          <ul className="mx-auto grid max-w-full  w-full grid-cols-3 gap-x-5 px-8">
            <li className="">
              <input
                className="peer sr-only"
                type="radio"
                value="yes"
                name="answer"
                id="yes"
                checked
              />
              <label
                className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out"
                for="yes"
              >
                리그 선택하기
              </label>
              <div className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg w-[97vw] mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                <div className="flex justify-center mt-10 mb-10">
                  <button
                    onClick={group}
                    className=" group rounded-2xl h-20 w-48 bg-blue-500 font-bold text-lg text-white relative overflow-hidden"
                  >
                    선택완료!
                    <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
                  </button>
                </div>
                <div className="flex m-50 items-center">
                  <div
                    className={
                      oncheck === 39
                        ? "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
                        : "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r  hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
                    }
                  >
                    <div
                      onClick={(e) => on1(39)}
                      className="relative rounded-[15px] bg-white p-6"
                    >
                      <div className="space-y-4">
                        <img
                          src="./Premier League.png"
                          alt=""
                          className="w-full object-cover object-center"
                        />
                        <p className="text-lg font-semibold text-slate-800">
                          PremierLeague
                        </p>
                        <p className="font-md text-slate-500">
                          프리미어리그 또는 잉글랜드 외의 지역에서 구분을 위해
                          잉글리쉬 프리미어리그는 1992년에 시작한 잉글랜드의
                          최상위 축구 리그이다.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      oncheck === 140
                        ? "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
                        : "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r  hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
                    }
                  >
                    <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
                    <div
                      onClick={(e) => on1(140)}
                      className="relative rounded-[15px] bg-white p-6"
                    >
                      <div className="space-y-4">
                        <img
                          src="./Primera División.png"
                          alt=""
                          className="h-full object-cover object-center"
                        />
                        <p className="text-lg font-semibold text-slate-800">
                          LaLiga{" "}
                        </p>
                        <p className="font-md text-slate-500">
                          프리메라 디비시온은 흔히 라리가 혹은 협찬사의 명칭을
                          따 라리가 산탄데르로 알려진 스페인 축구 리그
                          시스템에서 최상위에 위치한 프로 축구 리그이다.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      oncheck === 78
                        ? "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
                        : "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r  hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
                    }
                  >
                    <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
                    <div
                      onClick={(e) => on1(78)}
                      className="relative rounded-[15px] bg-white p-6"
                    >
                      <div className="space-y-4">
                        <img
                          src="./Bundesliga.png"
                          alt=""
                          className="h-48 w-full object-fill"
                        />
                        <p className="text-lg font-semibold text-slate-800">
                          Bundesliga{" "}
                        </p>
                        <p className="font-md text-slate-500">
                          분데스리가는 독일 프로축구 체제의 최상위 리그로,
                          푸스발-분데스리가 또는 18개의 팀이 경쟁한다.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      oncheck === 135
                        ? "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500"
                        : "group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r  hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
                    }
                  >
                    <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
                    <div
                      onClick={(e) => on1(135)}
                      className="relative rounded-[15px] bg-white p-6"
                    >
                      <div className="space-y-4">
                        <img src="./Serie A.png" alt="" className="w-full" />
                        <p className="text-lg font-semibold text-slate-800">
                          Serie A
                        </p>
                        <p className="font-md text-slate-500">
                          세리에 A는 협찬사 TIM의 명칭을 세리에 A TIM으로도
                          알려진 이탈리아 축구 리그 체계 축구 최상위 리그로 우승
                          구단은 작은 방패와 이탈리아 패왕컵을 받게 된다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="">
              {!check ? (
                <>
                  <input
                    className="peer sr-only"
                    type="radio"
                    value="no"
                    name="answer"
                    id="no"
                  />
                  <label
                    className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out"
                    for="no"
                  >
                    클럽 팀 선택하기
                  </label>
                </>
              ) : (
                <>
                  <input
                    className="peer sr-only"
                    type="radio"
                    value="yes"
                    name="answer"
                    id="yes"
                    checked
                  />
                  <label
                    className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out"
                    for="yes"
                  >
                    클럽 팀 선택하기
                  </label>
                </>
              )}
              <div className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg w-[97vw] mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                {team ? (
                  <section className="text-gray-600 body-font  flex justify-center items-center">
                    <div className="container px-5 py-24 mx-auto">
                      <div className="flex flex-wrap -m-4 text-center">
                        {team.map(function (i) {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                                <div>
                                  <h2 className="text-gray-900 text-lg font-bold">
                                    {i.team.name}
                                  </h2>
                                  <button
                                    onClick={(e) => on2(i.team)}
                                    className="text-sm mt-6 px-4 py-2 bg-gray-400 text-white rounded-lg  tracking-wider hover:bg-white-300 outline-none"
                                  >
                                    팀 보러가기
                                  </button>
                                </div>
                                <div className="bg-gradient-to-tr from-white-500 to-white-400 w-32 h-32  rounded-full shadow-2xl shadow-white-400 border-white  border-dashed border-2  flex justify-center items-center ">
                                  <div>
                                    <h1 className="text-white text-2xl">
                                      <img alt="team" src={i.team.logo} />
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                ) : (
                  <h1>loding..</h1>
                )}
              </div>
            </li>

            <li className="">
              {!check2 ? (
                <>
                  <input
                    className="peer sr-only"
                    type="radio"
                    value="yesno"
                    name="answer"
                    id="yesno"
                  />
                  <label
                    className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out"
                    for="yesno"
                  >
                    선수보기
                  </label>
                </>
              ) : (
                <>
                  <input
                    className="peer sr-only"
                    type="radio"
                    value="yes"
                    name="answer"
                    id="yes"
                    checked
                  />
                  <label
                    className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out"
                    for="yes"
                  >
                    선수보기
                  </label>
                </>
              )}{" "}
              <div className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg w-[97vw] mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                {playerinfo ? (
                  <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                      <h1 className="sm:text-3xl text-2xl font-medium title-font pt-70 text-gray-900">
                        팀
                        <img src={teamclub} style={{ width: "200px" }} />
                      </h1>
                    </div>
                    <div className="flex flex-wrap -m-2">
                      {playerinfo?.map(function (i) {
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
                ) : (
                  <h3>loding.,.</h3>
                )}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
