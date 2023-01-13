import Link from 'next/link'
import DarkMode from './darkmode';
import React, { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header() {

  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session, status } = useSession();
  console.log("session", session);
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
    alert("로그인을 해주세요");
  }
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

          <Link legacyBehavior href="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">상현이 포트폴리오</span>
            </a>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link legacyBehavior href="/">
              <a className="mr-5 hover:text-gray-900">홈</a>
            </Link>
            {status != "authenticated" ?
              <>
                <Link legacyBehavior href="/projects">
                  <a className="mr-5 hover:text-gray-900" >경기 일정</a>
                </Link>
                <Link legacyBehavior href="/404">
                  <a className="mr-5 hover:text-gray-900" >내 팀 보기</a>
                </Link>
                <Link legacyBehavior href="/404">
                  <a className="mr-5 hover:text-gray-900">순위표</a>
                </Link>
                <Link legacyBehavior href="/">
                  <a className="mr-5 hover:text-gray-900">선수 영입</a>
                </Link>
              </>
              :
              <>
                <a className="mr-5 hover:text-gray-900" onClick={guest}>경기 일정</a>
                <a className="mr-5 hover:text-gray-900" onClick={guest} >내 팀 보기</a>
                <a className="mr-5 hover:text-gray-900" onClick={guest}>순위표</a>
                <a className="mr-5 hover:text-gray-900" onClick={guest}>선수 영입</a>
              </>
            }
          </nav>

          {status === "authenticated" ? (
            <Link legacyBehavior href="/login" >
              <button onClick={() => signOut()} className="inline-flex items-center bg-gray-100 border-0 py-1 mr-3 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
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
