"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";

const SidePanel = () => {
  const currentUrl = usePathname();
  const listItemActiveClass = "bg-neutral-800 text-yellow-400";
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col h-[calc(100vh-20px)] max-w-[18.43rem] sticky top-[10px] left-0 rounded-lg bg-neutral-900 shadow-xl shadow-neutral-600">
      <div className="flex justify-end py-5 px-5">
        <span
          className="material-symbols-outlined text-white cursor-pointer"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "arrow_back_ios" : "arrow_forward_ios"}
        </span>
      </div>
      <Image
        src="/int_icon.png"
        width={isExpanded ? 150 : 50}
        height={isExpanded ? 150 : 50}
        alt="INT Icon"
        className="mx-auto "
      />
      <ul className="flex flex-col font-bold text-lg [&>*]:flex [&>*]:gap-4 h-full ">
        <Link
          href="/"
          className={`${currentUrl == "/" && listItemActiveClass} py-4 ${
            isExpanded ? "px-10" : "px-5"
          } text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          {isExpanded ? "Dashboard" : ""}
        </Link>

        <li
          className={`py-4 ${
            isExpanded ? "px-10" : "px-5"
          } text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400"`}
        >
          <span className="material-symbols-outlined">group</span>
          {isExpanded ? "Users" : ""}
        </li>
        <Link
          href="/upload"
          className={`${
            currentUrl == "/upload" && listItemActiveClass
          } py-4 flex justify-center text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">upload_file</span>
          {isExpanded ? "Upload" : ""}
          {isExpanded ? "File" : ""}
        </Link>
        <li
          className={`py-4 ${
            isExpanded ? "px-10" : "px-5"
          } text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">settings</span>{" "}
          {isExpanded ? "Settings" : ""}
        </li>
        <li
          onClick={() => signOut()}
          className={`py-4 mt-auto mb-10 ${
            isExpanded ? "px-10" : "px-5"
          } text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">logout</span>{" "}
          {isExpanded ? "Logout" : ""}
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
