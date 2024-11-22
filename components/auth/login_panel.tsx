"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
const LoginPanel = ({ setIsRegister }: { setIsRegister: Function }) => {
  async function onLogin() {
    try {
      const signInResponse = await signIn("credentials", {
        username: credentials.username,
        password: credentials.password,

        redirect: false,
      });
      if (signInResponse?.error) {
        console.log(signInResponse.error);
        alert(signInResponse.error);
      }
      if (signInResponse?.ok) {
        window.location.href = signInResponse?.url!;
      }
    } catch (e) {
      console.log(e);
    }
  }
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onLogin();
    }
  };
  return (
    <div className="flex shadow-xl flex-col md:flex-row bg-transparent bg-opacity-25 backdrop-blur-sm border-2 border-white shadow-neutral-500 z-20   min-h-[25em]  max-h-[600px] overflow-hidden rounded-lg relative ">
      <div className="flex items-center flex-col p-8 z-20">
        <Image src="/int_icon.png" height={150} width={150} alt="INT LOGO" />
        <h1 className="text-3xl font-extrabold">Welcome to INT Dashboard</h1>

        <p className="self-start mt-5">Username:</p>
        <input
          type="text"
          name="username"
          id=""
          className="rounded-lg shadow-inner shadow-neutral-400 border-2 bg-transparent bg-black  bg-opacity-50 border-white w-full  mt-2 focus:outline-none  p-2"
          placeholder="Username"
          onChange={(e) => {
            setCredentials({
              username: e.target.value,
              password: credentials.password,
            });
          }}
        />
        <p className="self-start mt-5">Password:</p>
        <input
          onKeyDown={handleKeyDown}
          type="password"
          name="password"
          id=""
          className="rounded-lg border-2 shadow-inner shadow-neutral-400 bg-transparent bg-black  bg-opacity-50 border-white w-full mt-2 focus:outline-none p-2"
          placeholder="Password"
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <button
          className="py-2 bg-yellow-600 hover:scale-105 duration-100 ease-in-out text-white px-10 mt-5 font-bold rounded shadow"
          onClick={async (e) => {
            e.preventDefault();
            await onLogin();
          }}
        >
          Signin
        </button>
        <div className="flex flex-col items-center">
          <a className="text-neutral-400 mt-2 hover:text-blue-900" href="#">
            Forgot Password?
          </a>
          <p className="text-neutral-400 mt-2 ">
            Dont have an account?{" "}
            <button
              className="text-blue-800 hover:scale-105"
              onClick={() => setIsRegister(true)}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
