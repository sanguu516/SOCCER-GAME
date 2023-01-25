import Link from 'next/link'
import DarkMode from './darkmode';
import React, { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as teamActions from "../store/modules/team";
import { persistor } from "../pages/_app";

export default function Header() {

  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  if (status === "authenticated")

    if (status === "authenticated") {
      <p>signde in as{session.user.email}</p>;
    }
    else {
      <Link legacyBehavior href="/api/auth/signin">
        sign in;
      </Link>;
    }
  function guest() {
    Swal.fire(
      '',
      '로그인을 시도하세요.',
      'question'
    )
  }
  function logout() {
  }

  const purge = async () => {
    await persistor.purge(); // persistStore의 데이터 전부 날림
    await signOut({ callbackUrl: 'http://localhost:3000' })
    // location.reload();

  }
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link legacyBehavior href="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img src={"./cat.png"} style={{ width: "60px" }}></img>
              <span className="ml-3 text-xl  font-black">상현이 포트폴리오</span>
            </a>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

            {status === "authenticated" ?
              <>
                <Link legacyBehavior href="/Calendar">
                  <a className="mr-5 hover:text-gray-300 font-semibolda" >경기 일정</a>
                </Link>
                <Link legacyBehavior href="/teaminfo">
                  <a className="mr-5 hover:text-gray-300 font-semibolda" >내 팀 보기</a>
                </Link>
                <Link legacyBehavior href="/rank">
                  <a className="mr-5 hover:text-gray-300 font-semibolda">순위표</a>
                </Link>
                <Link legacyBehavior href="/">
                  <a className="mr-5 hover:text-gray-300 font-semibolda">선수 영입</a>
                </Link>
              </>
              :
              <>
                <a className="mr-5 text-gray-300 font-semibolda" onClick={guest}>경기 일정</a>
                <a className="mr-5 text-gray-300 font-semibolda" onClick={guest} >내 팀 보기</a>
                <a className="mr-5 text-gray-300 font-semibolda" onClick={guest}>순위표</a>
                <a className="mr-5 text-gray-300 font-semibolda" onClick={guest}>선수 영입</a>
              </>
            }
          </nav>

          {status === "authenticated" ? (
            <Link legacyBehavior href="/login" >
              <button onClick={async () => purge()
              }
                className="inline-flex items-center bg-gray-100 border-0 py-1 mr-3 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                로그아웃
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          ) : (
            <Link legacyBehavior href="/login">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 mr-3 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                로그인
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          )
          }
          {status === "authenticated" ? (
            <></>
          ) : (
            <Link legacyBehavior href="/join">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                회원가입
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          )
          }
        </div>
      </header>{" "}
    </>
  );
}
