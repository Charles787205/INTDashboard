"use client";
import { SidePanel } from "@/components";
import { useEffect, useState } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";

const ParcelChart = dynamic(() => import("@/components/parcel_chart"), {
  ssr: false,
});
const ParcelTypeChart = dynamic(
  () => import("@/components/parcel_type_chart"),
  {
    ssr: false,
  }
);
const LocationChart = dynamic(() => import("@/components/location_chart"), {
  ssr: false,
});
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col ">
        <h1 className="text-3xl font-bold">John Doe</h1>
        <h2 className="text-lg font-semibold text-neutral-600">Coordinator</h2>
      </div>
      <div className="flex [&>*]:min-w-[350px] justify-evenly">
        <Link
          href="/dashboard/parcel_volume"
          className="flex flex-col  p-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg shadow-lg mb-10 cursor-pointer hover:bg-gradient-to-l transition-all duration-1000 ease-in-out"
        >
          <p className="text-lg font-bold">Total Parcels</p>
          <p className="text-4xl font-bold">4136</p>
        </Link>
        <div className="flex flex-col  p-4 bg-gradient-to-r from-green-600 to-green-500 cursor-pointer hover:bg-gradient-to-l  text-white rounded-lg shadow-lg mb-10">
          <p className="text-lg font-bold">Delivered</p>
          <p className="text-4xl font-bold">4120</p>
        </div>
        <div className="flex flex-col  p-4 bg-gradient-to-r from-red-500 to-red-400 text-white cursor-pointer hover:bg-gradient-to-l rounded-lg shadow-lg mb-10">
          <p className="text-lg font-bold">Canceled Deliveries</p>
          <p className="text-4xl font-bold">16</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 ">
        <div className="flex flex-col">
          <div className="flex flex-col p-4 bg-gradient-to-r bg-neutral-100   rounded-lg shadow-lg mb-10">
            <p className="text-lg font-bold">Total Sales</p>
            <p className="text-4xl font-bold">20,000 Php</p>
          </div>
        </div>
        <div className="rounded">
          <Map />
        </div>
        <div className="rounded-xl shadow-lg border bg-neutral-100  p-5">
          <ParcelChart />
        </div>
        <div className="rounded-xl shadow-lg border bg-neutral-100  p-5">
          <ParcelTypeChart />
        </div>
        <div className="rounded-xl shadow-lg border bg-neutral-100  p-5">
          <LocationChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
