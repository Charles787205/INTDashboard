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
    <div className="flex  flex-col h-[calc(100vh-20px)] max-w-[18.43rem] sticky top-[10px] left-0 rounded-lg bg-neutral-900 shadow-xl shadow-neutral-600">
      <div className="flex justify-end py-2 px-5">
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
        src="/images/int_icon.png"
        width={isExpanded ? 150 : 50}
        height={isExpanded ? 150 : 50}
        alt="INT Icon"
        className="mx-auto mb-4 w-20 h-20"
      />
      <ul className="flex flex-col font-bold   [&>*]:flex [&>*]:gap-4 h-full ">
        <Link
          href="/"
          className={`${currentUrl == "/" && listItemActiveClass} py-2 ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          {isExpanded ? "Dashboard" : ""}
        </Link>

        <Link
          href="/users/"
          className={`py-2 ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400"`}
        >
          <span className="material-symbols-outlined">group</span>
          {isExpanded ? "Users" : ""}
        </Link>
        <Link
          href="/parcel_management"
          className={`${
            currentUrl == "/parcel_management" && listItemActiveClass
          }  py-2   text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400 ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }`}
        >
          <span className="material-symbols-outlined">package_2</span>
          {isExpanded && "Parcel Management"}
        </Link>
        <Link
          href="/areas "
          className={`py-2 ${
            isExpanded ? "px-10 justify- mx-autostart" : "px-5 justify-center"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400 `}
        >
          <span className="material-symbols-outlined">location_on</span>{" "}
          {isExpanded ? "Areas" : ""}
        </Link>
        <Link
          href="/fleet"
          className={`py-2 ${currentUrl == "/fleet" && listItemActiveClass} ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">two_wheeler</span>{" "}
          {isExpanded ? "Fleet" : ""}
        </Link>
        <Link
          href="/areas "
          className={`py-2 ${currentUrl == "/areas" && listItemActiveClass} ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">location_on</span>{" "}
          {isExpanded ? "Areas" : ""}
        </Link>
        <Link
          href="/payroll"
          className={`py-2 ${currentUrl == "/payroll" && listItemActiveClass} ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">payments</span>{" "}
          {isExpanded ? "Payroll" : ""}
        </Link>
        <Link
          href="/payroll"
          className={`py-2 ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">hub</span>{" "}
          {isExpanded ? "Hubs" : ""}
        </Link>

        <li
          onClick={() => signOut()}
          className={`py-2 mt-auto mb-10 ${
            isExpanded ? "px-10" : "px-5 mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">logout</span>{" "}
          {isExpanded ? "Logout" : ""}
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
