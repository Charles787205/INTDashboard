"use client";

import { ApexOptions } from "apexcharts";

import ApexChart from "./apex_chart";
const ParcelChart = () => {
  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
    },

    xaxis: {
      categories: [
        "Bago Aplaya",
        "Bago Gallera",
        "Baliok",
        "Bangkas",
        "Cat. Grande",
        "Cat. Pqueno",
        "Crossing Bayabas",
        "Daliao",
        "Deca Talomo",
        "Dumoy",
        "Lizada Pob.",
        "Lubogan",
        "Mintal",
        "Mis Sort",
        "Pequeno",
        "Tacunan",
        "Toril",
      ],
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    title: {
      text: "Number of Parcels Delivered",
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
        647, 961, 426, 167, 10, 1, 207, 296, 59, 429, 325, 155, 234, 3, 50, 471,
        1033,
      ],
    },
  ];
  return <ApexChart options={options} series={series} type="bar" />;
};

export default ParcelChart;
