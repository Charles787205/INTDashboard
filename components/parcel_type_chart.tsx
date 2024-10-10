"use client";
import { ApexOptions } from "apexcharts";
import ApexChart from "./apex_chart";
const ParcelTypeChart = () => {
  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
      foreColor: "#373d3f",
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
    },
    fill: {
      colors: ["#CB9E0B"],
      opacity: 0.9,
      type: "solid",
    },
    xaxis: {
      categories: ["Pouches", "Bulky"],
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
  const series = [
    {
      name: "Number of Parcels",
      data: [
        { y: 4136, x: "Pouches", color: "#FF0000" },
        { x: "Bulky", y: 1338 },
      ],
    },
  ];
  return (
    <ApexChart
      colors={["#0000", "#00FF00"]}
      options={options}
      series={series}
      type="bar"
    />
  );
};

export default ParcelTypeChart;
