"use client";

import { ApexOptions } from "apexcharts";

import ApexChart from "./apex_chart";
import { NoSSR } from "@/components";
const ParcelChart = ({
  data,
}: {
  data: {
    name: string;
    data: {
      total: number;
      success: number;
      failed: number;
      pending: number;
    };
  }[];
}) => {
  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
      stacked: true,
    },

    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    title: {
      text: "Number of Parcels",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#373d3f",
      },
    },
  };
  const series: ApexAxisChartSeries = [
    {
      name: "Number of Parcels",
      data: [
        ...data.map((area) => {
          return { x: area.name, y: area.data.total };
        }),
      ],
      color: "#00c9ff",
    },
    {
      name: "Success",
      group: "something",
      data: [
        ...data.map((area) => {
          return {
            x: area.name,
            y: Math.ceil(area.data.success),
          };
        }),
      ],
      color: "#04dc00",
    },
    {
      name: "Failed",
      group: "something",
      data: [
        ...data.map((area) => {
          return {
            x: area.name,
            y: Math.floor(area.data.failed),
          };
        }),
      ],
      color: "#FF422C",
    },
    {
      name: "Pending",
      group: "something",
      data: [
        ...data.map((area) => {
          return {
            x: area.name,
            y: Math.floor(area.data.pending),
          };
        }),
      ],
      color: "#808080",
    },
  ];
  return (
    <NoSSR>
      {typeof window !== "undefined" && (
        <ApexChart options={options} series={series} type="bar" />
      )}
    </NoSSR>
  );
};

export default ParcelChart;
