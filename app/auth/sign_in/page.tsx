"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPanel, RegisterPanel } from "@/components";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="flex justify-center lg:items-center h-screen bg-neutral-100 m-0 bg-gradient-to-b from-amber-200  to-yellow-50 ">
      <div
        id="login_div"
        className="w-screen h-screen absolute top-0 left-0 z-10 opacity-15"
      ></div>
      {isRegister ? (
        <RegisterPanel setIsRegister={setIsRegister} />
      ) : (
        <LoginPanel setIsRegister={setIsRegister} />
      )}
    </div>
  );
}
