"use client";
import { ApexChart } from "@/components";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
const ParcelVolume = () => {
  const [isHorizontal, setIsHorizontal] = useState(false);
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
        horizontal: isHorizontal,
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
  return (
    <div className="w-full max-h-screen">
      <button
        className="px-10 py-2 bg-amber-500 hover:bg-amber-600 rounded shadow"
        onClick={() => setIsHorizontal(!isHorizontal)}
      >
        Horizontal
      </button>
      <ApexChart
        options={options}
        series={series}
        type="bar"
        className="max-w-[1000px]"
      />
    </div>
  );
};

export default ParcelVolume;
