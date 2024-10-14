"use client";
import { useState } from "react";
import { CourierPane } from "@/components";
const Fleet = () => {
  const [selectedTab, setSelectedTab] = useState("couriers");
  return (
    <div className="flex w-full max-w-full overflow-hidden rounded-2xl p-5 flex-col bg-white shadow shadow-neutral-600 ease-in-out duration-150">
      <div className="flex w-full justify-between mb-10">
        <h1 className="font-bold text-2xl">Fleet Management</h1>
        <div className="flex gap-5">
          <button className="px-4 py-2 bg-amber-400 hover:bg-amber-500 hover:scale-105 duration-300 ease-in-out shadow shadow-neutral-400 rounded-lg">
            Add Courier
          </button>
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 hover:scale-105 duration-300 ease-in-out text-white shadow shadow-neutral-400 rounded-lg">
            Add Vehicle
          </button>
        </div>
      </div>
      <div className="courier-pane rounded-lg  flex w-full flex-col bg-neutral-100 shadow-lg shadow-neutral-600 h-full">
        <div className="flex bg-neutral-200 rounded-t-lg">
          <button
            className={`px-4 py-2 min-w-40 rounded-t-lg h-full duration-300 ease-in-out  ${
              selectedTab == "couriers"
                ? "bg-neutral-100  "
                : "hover:bg-neutral-300"
            }`}
            onClick={() => {
              setSelectedTab("couriers");
            }}
          >
            Couriers
          </button>
          <button
            className={`px-4 py-2 min-w-40 rounded-t-lg h-full duration-300 ease-in-out  ${
              selectedTab == "tab 2"
                ? "bg-neutral-100 "
                : "hover:bg-neutral-300"
            }`}
            onClick={() => {
              setSelectedTab("tab 2");
            }}
          >
            Tab 2
          </button>
          <button
            className={`px-4 py-2 min-w-40 rounded-t-lg h-full duration-300 ease-in-out  ${
              selectedTab == "tab 3" ? "bg-neutral-100" : "hover:bg-neutral-300"
            }`}
            onClick={() => {
              setSelectedTab("tab 3");
            }}
          >
            Tab 3
          </button>
        </div>
        {selectedTab == "couriers" && <CourierPane />}
      </div>
    </div>
  );
};

export default Fleet;
