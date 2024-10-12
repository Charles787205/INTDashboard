"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { on } from "events";

export default function Login() {
  async function onLogin() {
    await signIn("google", {
      callbackUrl: "/admin/dashboard",
      redirect: true,
    });
  }
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <div className="flex justify-center lg:items-center h-screen bg-neutral-100 m-0 bg-gradient-to-t from-amber-300 to-yellow-100 ">
      <div
        id="login_div"
        className="w-screen h-screen absolute top-0 left-0 z-10 opacity-15"
      ></div>
      <div className="flex shadow-xl flex-col md:flex-row shadow-yellow-500 z-20  opacity-100  h-[25~em]  bg-neutral-50 overflow-hidden rounded-lg ">
        <div className="" id="hero-image">
          <div className="w-full "></div>
        </div>
        <div className="flex items-center flex-col p-8">
          <Image src="/int_icon.png" height={150} width={150} alt="INT LOGO" />
          <h1 className="text-2xl font-bold">Welcome to INT Dashboard</h1>

          {/*
            
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
            */}

          <button
            className="bg-amber-300 mt-auto hover:bg-amber-200 flex justify-center  items-center mb-10 rounded-lg  py-2 w-full font-semibold ease-in-out duration-300"
            onClick={async () => {
              await onLogin();
            }}
          >
            <span>
              <Image
                src="/google.webp"
                width={25}
                height={25}
                alt="google_icon"
                className="rounded-full mr-4"
              />
            </span>
            Login With Google
          </button>
          <a className="text-neutral-400 mt-2 hover:text-blue-900" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
