"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <div className="flex justify-center lg:items-center h-screen bg-neutral-100 m-0 bg-gradient-to-t from-amber-300 to-yellow-100 ">
      <div
        id="login_div"
        className="w-screen h-screen absolute top-0 left-0 z-10 opacity-15"
      ></div>
      <div className="flex shadow-xl flex-col md:flex-row shadow-yellow-500 z-20  opacity-100 w-[70em] h-[40em]  bg-neutral-50 overflow-hidden rounded-lg ">
        <div
          className=" flex relative  h-full w-full lg:w-[700px] flex-1"
          id="hero-image"
        >
          <div className="w-full "></div>
        </div>
        <div className="flex items-center flex-col p-8">
          <Image src="/int_icon.png" height={150} width={150} alt="INT LOGO" />
          <h1 className="text-2xl font-bold">Welcome to INT Website</h1>

          <div className="mt-10 w-full">
            <p className="text-neutral-600">Username:</p>
            <input
              type="text"
              name=""
              id=""
              className="rounded-lg border shadow-neutral-800 shadow-inner p-1 w-full mt-2 focus:outline-none "
            />
          </div>
          <div className="mt-10 w-full">
            <p className="text-neutral-600">Password:</p>
            <div className="border rounded-lg shadow-neutral-800 shadow-inner py-1 px-2 w-full mt-2 bg-white flex">
              <input
                type={showPassword ? "text" : "password"}
                name=""
                id=""
                className="w-full focus:outline-none"
              />
              <button
                className="p-0 h-[25px]"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <span className="material-symbols-outlined cursor-pointer pl-1">
                  {!showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>
          <button
            className="bg-amber-300 hover:bg-amber-200 mt-10 rounded-lg  py-2 w-full font-semibold ease-in-out duration-300"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Login
          </button>
          <a className="text-neutral-400 mt-2 hover:text-blue-900" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
