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
      <div className="flex justify-end py-2 ">
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
        className="mx-auto mb-4 max-w-[100px] 2xl:max-w-[150px]"
      />
      <ul className="flex flex-col font-bold    [&>*]:flex [&>*]:items-center  [&>*]:gap-4 h-full ">
        <Link
          href="/"
          className={`${currentUrl == "/" && listItemActiveClass} py-2 ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto  "
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            dashboard
          </span>

          {isExpanded ? <p className="text-xs 2xl:text-base">Dashboard</p> : ""}
        </Link>

        <Link
          href="/users/"
          className={`py-2 ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400 `}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            group
          </span>
          {isExpanded ? <p className="text-xs 2xl:text-base">Users</p> : ""}
        </Link>
        <Link
          href="/parcel_management"
          className={`${
            currentUrl == "/parcel_management" && listItemActiveClass
          }  py-2   text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400 ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto"
          }`}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            package_2
          </span>
          {isExpanded ? (
            <p className="text-xs 2xl:text-base">Parcel Management</p>
          ) : (
            ""
          )}
        </Link>

        <Link
          href="/fleet"
          className={`py-2 ${currentUrl == "/fleet" && listItemActiveClass} ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            two_wheeler
          </span>{" "}
          {isExpanded ? <p className="text-xs 2xl:text-base">Fleet</p> : ""}
        </Link>
        <Link
          href="/areas "
          className={`py-2 ${currentUrl == "/areas" && listItemActiveClass} ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            location_on
          </span>{" "}
          {isExpanded ? <p className="text-xs 2xl:text-base">Areas</p> : ""}
        </Link>
        <Link
          href="/payroll"
          className={`py-2 ${currentUrl == "/payroll" && listItemActiveClass} ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            payments
          </span>{" "}
          {isExpanded ? <p className="text-xs 2xl:text-base">Payroll</p> : ""}
        </Link>
        <Link
          href="/payroll"
          className={`py-2 ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            hub
          </span>{" "}
          {isExpanded ? <p className="text-xs 2xl:text-base">Hubs</p> : ""}
        </Link>

        <li
          onClick={() => signOut()}
          className={`py-2 mt-auto mb-10 ${
            isExpanded ? "px-5 2xl:px-10" : "px-2 2xl:px-5 [&>span]:mx-auto"
          }  text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined text-[20px] 2xl:text-[30px]">
            logout
          </span>{" "}
          {isExpanded ? <p className="text-xs 2xl:text-base">Logout</p> : ""}
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
