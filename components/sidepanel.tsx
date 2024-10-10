"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SidePanel = () => {
  const currentUrl = usePathname();
  const listItemActiveClass = "bg-neutral-800 text-yellow-400";
  console.log(currentUrl);
  return (
    <div className="flex flex-col h-[calc(100vh-20px)] max-w-[18.43rem] sticky top-[10px] left-0 rounded-lg bg-neutral-900 shadow-xl shadow-neutral-600">
      <Image
        src="/int_icon.png"
        width={150}
        height={150}
        alt="INT Icon"
        className="mx-auto py-10"
      />
      <ul className="flex flex-col font-bold text-lg [&>*]:flex [&>*]:gap-4 h-full ">
        <Link
          href="/dashboard"
          className={`${
            currentUrl == "/dashboard" && listItemActiveClass
          } py-4 px-20 text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>

        <li className="py-4 px-20 text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400">
          <span className="material-symbols-outlined">group</span>Users
        </li>
        <li className="py-4 px-20 text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400">
          <span className="material-symbols-outlined">settings</span> Settings
        </li>
        <Link
          href="/"
          className="py-4 mt-auto mb-10 px-20 text-neutral-200 hover:bg-neutral-800 ease-in-out duration-300 cursor-pointer hover:text-yellow-400"
        >
          <span className="material-symbols-outlined">logout</span> Logout
        </Link>
      </ul>
    </div>
  );
};

export default SidePanel;
