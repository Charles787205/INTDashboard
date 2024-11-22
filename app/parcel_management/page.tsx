"use client";
import { useState, useEffect } from "react";
import { ParcelPane } from "@/components";

const ParcelManagement = () => {
  const [aveParcelCount, setAveParcelCount] = useState({
    delivered: 0,
    pending: 0,
    failed: 0,
  });
  const [parcelCount, setParcelCount] = useState({
    delivered: 0,
    pending: 0,
    failed: 0,
    total: 0,
    in_delivery: 0,
  });
  useEffect(() => {
    const fetchParcelCount = async () => {
      const res = await fetch("api/dashboard/parcel_count");
      const parcelCount = await res.json();
      console.log(parcelCount);
      setParcelCount({ ...parcelCount });
    };
    fetchParcelCount();
  }, []);
  const aveDelivered = (parcelCount.delivered / parcelCount.total) * 100;
  const aveFailed = (parcelCount.failed / parcelCount.total) * 100;
  const avePending = (parcelCount.pending / parcelCount.total) * 100;

  return (
    <div className="flex w-full rounded-2xl p-5 flex-col bg-neutral-200 shadow shadow-neutral-600 ease-in-out duration-150">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-2xl">Parcel Management</h1>
        <p>{`As of ${Date()
          .split(" ")
          .filter((val, index) => index < 4)
          .join(" ")}`}</p>
      </div>

      <div
        className="relative w-full h-6 bg-gray-400 rounded-md overflow-hidden group shadow mt-5"
        title="Total Parcels"
      >
        <div
          className="absolute h-full bg-green-500"
          style={{ width: `${aveParcelCount.delivered}%` }}
          title={`Delivered Parcels: ${aveDelivered.toFixed(2)}%`}
        ></div>
        <div
          className="absolute h-full bg-red-500"
          style={{
            width: `${aveDelivered}%`,
            left: `${aveDelivered}%`,
          }}
          title={`Failed Deliveries: ${aveFailed.toFixed(2)}%`}
        ></div>
        <div
          className="absolute h-full bg-neutral-600"
          style={{
            width: `${avePending}%`,
            left: `${aveDelivered + aveFailed}%`,
          }}
          title={`Pending: ${avePending.toFixed(2)}%`}
        ></div>
      </div>
      <div className="flex w-full justify-center gap-5 mt-5">
        <div className="group-[pending] shadow-lg bg-neutral-100 rounded-xl shadow-neutral-400 p-5 w-full min-w-52 min-h-52 text-wrap flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[50px]">
            package_2
          </span>
          <p className="text-pretty text-ellipsis break-all text-2xl">
            {parcelCount.total}
          </p>
          <p className="font-bold text-2xl">Total Parcels</p>
        </div>
        <div className="group-[pending] shadow-lg bg-neutral-100 rounded-xl shadow-neutral-400 p-5 w-full min-w-52 min-h-52 text-wrap flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[50px]">
            local_shipping
          </span>
          <p className="text-pretty text-ellipsis break-all text-2xl">
            {parcelCount.pending}
          </p>
          <p className="font-bold text-2xl">Pending</p>
        </div>
        <div className="shadow-lg bg-neutral-100 rounded-xl shadow-neutral-400 p-5 w-full min-w-52 min-h-52 text-wrap flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[50px]">
            local_shipping
          </span>
          <p className="text-pretty text-ellipsis break-all text-2xl">
            {parcelCount.in_delivery}
          </p>
          <p className="font-bold text-2xl">In Delivery</p>
        </div>
        <div className="shadow-lg bg-neutral-100 rounded-xl shadow-neutral-400 p-5 w-full min-w-52 min-h-52 text-wrap flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[50px]">
            local_shipping
          </span>
          <p className="text-pretty text-ellipsis break-all text-2xl">
            {parcelCount.delivered}
          </p>
          <p className="font-bold text-2xl">Delivered</p>
        </div>
        <div className="shadow-lg bg-neutral-100 rounded-xl shadow-neutral-400 p-5 w-full min-w-52 min-h-52 text-wrap flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[50px]">
            local_shipping
          </span>
          <p className="text-pretty text-ellipsis break-all text-2xl">
            {parcelCount.failed}
          </p>
          <p className="font-bold text-2xl">Failed</p>
        </div>
      </div>
      <ParcelPane />
    </div>
  );
};

export default ParcelManagement;
