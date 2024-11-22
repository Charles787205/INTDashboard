"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ParcelTypeChart = ({
  data,
}: {
  data: {
    pouches: number;
    bulkies: number;
  };
}) => {
  const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
      foreColor: "#373d3f",
    },
    plotOptions: {
      bar: {
        horizontal: true,
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
  console.log(data);
  const series = [
    {
      name: "Number of Parcels",
      data: [
        { y: data.pouches, x: "Pouches" },
        { x: "Bulky", y: data.bulkies },
      ],
    },
  ];
  return (
    <ApexChart
      className="w-full h-full"
      colors={["#0000", "#00FF00"]}
      options={options}
      series={series}
      type="bar"
    />
  );
};

export default ParcelTypeChart;
