import React, { useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Swal from "sweetalert2";

async function createUser(
  name: string,
  email: string,
  password: string
): Promise<any> {
  const response = await fetch("/api/auth/joinapi", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const Join: React.FC = (props) => {
  const [formStatus, setFormStatus] = useState<string>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { status } = useSession();
  const router = useRouter();
  const [joinCheck, setJoinCheck] = useState(false);
  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    // optional: Add validation

    try {
      const result = await createUser(
        enteredName,
        enteredEmail,
        enteredPassword
      );

      setFormStatus(`${result.message}`);
      setJoinCheck(true);
      okcheck(event);
      //   window.location.href = "/";
    } catch (error) {
      setFormStatus(`회원가입 실패: ${error.message}`);
    }
  } // end of submitHandler function

  function okcheck(event) {
    setTimeout(function () {
      router.replace("/login");
    }, 2000);
  }
  if (joinCheck) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: `회원가입에 성공하였습니다! 
      잠시후 로그인 페이지로 이동합니다.`,
    });
  } else if (formStatus === "회원가입 실패: 지원하지 않는 형식입니다.") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: "회원가입에 실패하였습니다!",
    });
  }
  return (
    <Layout>
      {/* {joinCheck ? (
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
          <div
            className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              new
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              회원가입에 성공하신걸 축하드립니다.
            </span>
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
            <button
              onClick={(e) => okcheck(e)}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <></>
      )} */}

      <div className="container px-5 py-10 mx-auto w-2/3">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
            회원가입
          </h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="이름"
              required
              ref={nameInputRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="이메일"
              required
              ref={emailInputRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              required
              ref={passwordInputRef}
            />
            <p className="text-red-500 text-xs italic">
              {/* Please choose a password. */}
              {formStatus}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Join;
