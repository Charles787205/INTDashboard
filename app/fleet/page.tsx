"use client";
import { useState, useEffect, useCallback } from "react";
import { CourierPane, AddCourierModal } from "@/components";
import { CourierType, HubType } from "@/types";

const Fleet = () => {
  const [selectedTab, setSelectedTab] = useState("couriers");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hubs, setHubs] = useState<HubType[]>([]);
  const [courierType, setCourierType] = useState<
    { value: string; description: string }[]
  >([]);
  const [couriers, setCouriers] = useState<CourierType[]>([]);

  // Fetch hubs and courier type together in a single useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const hubsRes = await fetch("/api/fleet/hubs");
        const hubsData = hubsRes.ok ? await hubsRes.json() : [];
        console.log(hubsData);
        setHubs(hubsData);

        const courierTypeRes = await fetch("/api/fleet/courier_type");
        const courierTypeData = courierTypeRes.ok
          ? await courierTypeRes.json()
          : [];
        setCourierType(courierTypeData);
      } catch (error) {
        console.log("Error fetching hubs or courier type", error);
      }
    }

    fetchData();
  }, []);

  // Fetch couriers only when the modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      fetchCouriers();
    }
  }, [isModalOpen]);

  const fetchCouriers = useCallback(async () => {
    try {
      const res = await fetch("/api/fleet/courier");
      if (res.ok) {
        const couriers = await res.json();
        setCouriers(couriers.results);
      }
    } catch (error) {
      console.log("Error fetching couriers", error);
    }
  }, []);

  return (
    <>
      <div className="flex w-full max-w-full overflow-hidden rounded-2xl p-5 flex-col bg-white shadow shadow-neutral-600 ease-in-out duration-150">
        <div className="flex w-full justify-between mb-10">
          <h1 className="font-bold text-2xl">Fleet Management</h1>
          <div className="flex gap-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 hover:scale-105 duration-300 ease-in-out shadow shadow-neutral-400 rounded-lg"
            >
              Add Courier
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
              onClick={() => setSelectedTab("couriers")}
            >
              Couriers
            </button>
            <button
              className={`px-4 py-2 min-w-40 rounded-t-lg h-full duration-300 ease-in-out  ${
                selectedTab == "tab 2"
                  ? "bg-neutral-100 "
                  : "hover:bg-neutral-300"
              }`}
              onClick={() => setSelectedTab("tab 2")}
            >
              Tab 2
            </button>
            <button
              className={`px-4 py-2 min-w-40 rounded-t-lg h-full duration-300 ease-in-out  ${
                selectedTab == "tab 3"
                  ? "bg-neutral-100"
                  : "hover:bg-neutral-300"
              }`}
              onClick={() => setSelectedTab("tab 3")}
            >
              Tab 3
            </button>
          </div>
          {selectedTab == "couriers" && <CourierPane couriers={couriers} />}
        </div>
      </div>
      {isModalOpen && (
        <AddCourierModal
          setModalOpen={setIsModalOpen}
          hubs={hubs}
          courierType={courierType}
        />
      )}
    </>
  );
};

export default Fleet;
