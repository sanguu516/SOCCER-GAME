import Layout from "../components/layout";
import { Projects } from "./projects";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";

export default function TeamClub() {
  const [ClubKind, setClubKind] = useState<string>(null);

  function movelink(a) {
    setClubKind(a);
    setModal(true);
  }

  const [modal, setModal] = useState(false); // 모달창

  const modalOff = () => {
    setModal(false);
  };
  useEffect(() => {
    setClubKind(null);
  }, []);
  const Button = styled.button`
    font-size: 14px;
    padding: 10px 20px;
    border: none;
    background-color: #fa9f98;
    border-radius: 10px;
    color: white;
    font-style: italic;
    font-weight: 200;
    cursor: pointer;
    &:hover {
      background-color: #fac2be;
    }
  `;

  const AppWrap = styled.div`
    text-align: center;
    margin: 50px auto;
  `;

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                리그를 선택해주세요.
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          <div className="container px-2 py-2 mx-auto"></div>
          <div className="flex flex-wrap -m-4">
            <div
              className="xl:w-1/4 md:w-1/2 p-4"
              onClick={() => movelink("39")}
            >
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src="./Premier League.png"
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  PremierLeague
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  프리미어리그
                </h2>
                <p className="leading-relaxed text-base">
                  프리미어리그 또는 잉글랜드 외의 지역에서 구분을 위해 잉글리쉬
                  프리미어리그는 1992년에 시작한 잉글랜드의 최상위 축구
                  리그이다.
                </p>
              </div>
            </div>

            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div
                className="bg-gray-100 p-6 rounded-lg"
                onClick={() => movelink("140")}
              >
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src="./Primera División.png"
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  LaLiga
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  라리가
                </h2>
                <p className="leading-relaxed text-base">
                  프리메라 디비시온은 흔히 라리가 혹은 협찬사의 명칭을 따 라리가
                  산탄데르로 알려진 스페인 축구 리그 시스템에서 최상위에 위치한
                  프로 축구 리그이다.
                </p>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div
                className="bg-gray-100 p-6 rounded-lg"
                onClick={() => movelink("78")}
              >
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src="./Bundesliga.png"
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  Bundesliga
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  분데스리가
                </h2>
                <p className="leading-relaxed text-base">
                  분데스리가는 독일 프로축구 체제의 최상위 리그로,
                  푸스발-분데스리가 또는 18개의 팀이 경쟁한다.
                </p>
                <br></br>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div
                className="bg-gray-100 p-6 rounded-lg"
                onClick={() => movelink("135")}
              >
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src="./Serie A.png"
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  Serie A
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  세리에 A
                </h2>
                <p className="leading-relaxed text-base">
                  세리에 A는 협찬사 TIM의 명칭을 세리에 A TIM으로도 알려진
                  이탈리아 축구 리그 체계 축구 최상위 리그로 우승 구단은 작은
                  방패와 이탈리아 패왕컵을 받게 된다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <>
          <Modal
            isOpen={modal}
            ariaHideApp={false}
            onRequestClose={modalOff}
            style={{
              content: {
                posistion: "absolute",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "650px",
                height: "540px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <Projects ClubKind={ClubKind} />
          </Modal>
        </>
      </section>
    </Layout>
  );
}
