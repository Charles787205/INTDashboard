"use client";
import { SidePanel } from "@/components";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AreaType } from "@/types";

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
type timelineType = {
  option: "today" | "this_week" | "date";
  date: string;
};
const Dashboard = () => {
  const { data: sessionData } = useSession(); // Destructure session data correctly
  const [user, setUser] = useState<any>({});
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [productivity, setProductivity] = useState(0);
  const [kpi, setKpi] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    delivered: 0,
    in_delivery: 0,
    failed: 0,
    pending: 0,
    total: 0,
  });
  const [parcelType, setParcelType] = useState({
    pouches: 0,
    bulkies: 0,
  });
  const [mapConfig, setMapConfig] = useState<{
    zoom: number;
    center: any;
  }>({
    zoom: 13,
    center: [0, 0],
  });

  const [timeline, setTimeline] = useState<timelineType>({
    option: "this_week",
    date: new Date().toISOString().split("T")[0],
  });
  const [parcelChartData, setParcelChartData] = useState<
    {
      name: string;
      data: {
        total: number;
        success: number;
        failed: number;
        pending: number;
      };
    }[]
  >([]);

  useEffect(() => {
    if (sessionData) {
      setUser(sessionData.user); // Access user directly from sessionData
    }
  }, [sessionData]); // Add sessionData as a dependency

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    const fetchProductivity = async () => {
      const res = await fetch(
        `/api/dashboard/productivity?timeline=${timeline.option}${
          timeline.option === "date" ? `&date=${timeline.date}` : ""
        }`
      );

      const { productivity } = await res.json();
      console.log(productivity);
      setProductivity(productivity);
    };
    const fetchKPI = async () => {
      const res = await fetch(
        `/api/dashboard/kpi?timeline=${timeline.option}${
          timeline.option === "date" ? `&date=${timeline.date}` : ""
        }`
      );
      const { kpi } = await res.json();
      setKpi(kpi);
    };
    const fetchParcelCount = async () => {
      const res = await fetch(
        `/api/dashboard/parcel_count?timeline=${timeline.option}${
          timeline.option === "date" ? `&date=${timeline.date}` : ""
        }`
      );
      const dashboardData = await res.json();
      setDashboardData(dashboardData);
      console.log(dashboardData);
    };
    const fetchParcelCountPerArea = async () => {
      const res = await fetch(
        `/api/dashboard/count_per_area?timeline=${timeline.option}${
          timeline.option === "date" ? `&date=${timeline.date}` : ""
        }`
      );
      if (res.ok) {
        const dashboardData = await res.json();

        setAreas(
          dashboardData.areas.map((area: any) => {
            return {
              id: area.id,
              name: area.name,
              portCodes: area.port_codes,
              hub: area.hub_id,
              coordinates: area.coordinates,
              parcel_count: area.parcel_count,
            };
          })
        );
        setParcelChartData(
          dashboardData.areas.map((area: any) => {
            return {
              name: area.name,
              data: area.parcel_count,
            };
          })
        );
        setMapConfig({
          zoom: dashboardData.hub.zoom,
          center: [dashboardData.hub.latitude, dashboardData.hub.longitude],
        });
      }
    };
    const fetchParcelTypeCount = async () => {
      const res = await fetch(
        `/api/dashboard/parcel_type_count?timeline=${timeline.option}${
          timeline.option === "date" ? `&date=${timeline.date}` : ""
        }`
      );
      const parcelTypeCount = await res.json();
      console.log(parcelTypeCount);
      setParcelType({ ...parcelTypeCount });
    };
    fetchParcelTypeCount();
    fetchParcelCountPerArea();
    fetchParcelCount();
    fetchKPI();
    fetchProductivity();
    setIsClient(true);
  }, [timeline]);

  return (
    <div className="flex flex-col w-full shadow-xl bg-white shadow-neutral-600 rounded-2xl p-5 relative">
      {user && (
        <div className="flex flex-col ">
          <h1 className="text-xl 2xl:text-3xl font-bold">
            {`${
              user.firstName?.charAt(0).toUpperCase() +
                user.firstName?.slice(1) || ""
            } ${
              user.lastName?.charAt(0).toUpperCase() +
                user.lastName?.slice(1) || ""
            }`}
          </h1>
          <h2 className="2xl:text-lg font-semibold text-neutral-600">
            {user.position || ""}
          </h2>
        </div>
      )}
      <div className="flex absolute right-5 top-5 gap-3">
        <select
          name=""
          id=""
          className=" px-2 2xl:px-4 py-1 bg-white text-sm 2xl:text-base 2xl:py-2 rounded border border-neutral-400 shadow cursor-pointer"
          onChange={(e) => {
            setTimeline({
              ...timeline,
              option: e.target.value as "date" | "today" | "this_week",
            });
          }}
        >
          <option value="this_week">This Week</option>
          <option value="today">Today</option>
          <option value="date">Select Day</option>
        </select>
        {timeline.option == "date" && (
          <input
            type="date"
            className="px-4 py-2 rounded border border-neutral-400 shadow cursor-pointer"
            onChange={(e) =>
              setTimeline((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            value={timeline.date ? timeline.date : ""}
          />
        )}
      </div>
      <div className="flex [&>*]:w-full gap-4 justify-evenly">
        <Link
          href="/parcel_volume"
          className="flex flex-col  p-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg shadow-lg mb-10 cursor-pointer hover:bg-gradient-to-l transition-all duration-1000 ease-in-out"
        >
          <p className="2xl:text-lg font-bold">Total Parcels</p>
          <p className="2xl:text-4xl font-bold">{dashboardData.total}</p>
        </Link>
        <div className="flex flex-col  p-4 bg-gradient-to-r from-green-600 to-green-500 cursor-pointer hover:bg-gradient-to-l  text-white rounded-lg shadow-lg mb-10">
          <p className="2xl:text-lg font-bold">Delivered</p>
          <p className="2xl:text-4xl font-bold">{dashboardData.delivered}</p>
        </div>
        <div className="flex flex-col  p-4 bg-gradient-to-r from-red-500 to-red-400 text-white cursor-pointer hover:bg-gradient-to-l rounded-lg shadow-lg mb-10">
          <p className="2xl:text-lg font-bold">Canceled Deliveries</p>
          <p className="2xl:text-4xl font-bold">{dashboardData.failed}</p>
        </div>
        <div className="flex flex-col  p-4 bg-gradient-to-r from-neutral-500 to-neutral-400 text-white cursor-pointer hover:bg-gradient-to-l rounded-lg shadow-lg mb-10">
          <p className="2xl:text-lg font-bold">In Delivery</p>
          <p className="2xl:text-4xl font-bold">{dashboardData.in_delivery}</p>
        </div>
        <div className="flex flex-col  p-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white cursor-pointer hover:bg-gradient-to-l rounded-lg shadow-lg mb-10">
          <p className="2xl:text-lg font-bold">Pending</p>
          <p className="2xl:text-4xl font-bold">{dashboardData.pending}</p>
        </div>
      </div>
      <div className="flex mb-5 gap-3 w-full col-span-2">
        <div className="rounded-xl shadow-lg border bg-neutral-100  p-5 col-span-2 w-full">
          <p className="2xl:text-lg font-bold">KPI</p>
          <p className="2xl:text-4xl font-bold">{kpi}%</p>
        </div>
        <div className="rounded-xl shadow-lg border bg-neutral-100  p-5 col-span-2 w-full">
          <p className="2xl:text-lg font-bold">Productivity</p>
          <p className="2xl:text-4xl font-bold">{productivity}%</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 ">
        <div className="rounded row-span-1 min-h-[400px] col-span-2 ">
          <Map areas={areas} center={mapConfig.center} zoom={mapConfig.zoom} />
        </div>
        <div className="rounded-xl shadow-lg border bg-neutral-100  p-5 col-span-3 ">
          <ParcelChart data={parcelChartData} />
        </div>

        <div className="rounded-xl shadow-lg border bg-neutral-100 col-span-2 justify-center items-center flex w-full">
          <ParcelTypeChart data={parcelType} />
        </div>
        <div className="rounded-xl shadow-lg border bg-neutral-100  p-5 col-span-3 row-span-2">
          <LocationChart data={parcelChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
