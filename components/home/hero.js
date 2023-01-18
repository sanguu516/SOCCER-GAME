
import Animation from "../animation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import Swal from "sweetalert2";


export default function Hero() {
  const { data: session, status } = useSession();

  function go() {
    if (session) {
      Router.push("/teamclub");
    } else
      Swal.fire(
        '',
        '로그인을 시도하세요.',
        'question'
      )
  }
  return (
    <>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          내가 감독이 되어보자!!!
          <br className="hidden lg:inline-block" />
        </h1>
        <p className="mb-8 leading-relaxed">
          원하는 선수들을 영입하여 내가 감독이 되어보자
        </p>
        <div className="flex justify-center">
          {/* <Link legacyBehavior href="/teamclub"> */}
          <button onClick={go} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            구단 만들러 가기
          </button>
          {/* </Link> */}

        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Animation />
      </div>
    </>
  );
}