"use client";
import { NoSSR } from "@/components";
import ApexChart from "./apex_chart";

const LocationChart = () => {
  const chartData = {
    series: [
      647, 961, 426, 167, 10, 1, 207, 296, 59, 429, 325, 155, 234, 3, 50, 471,
      1033,
    ], // Data for the donut chart
    options: {
      labels: [
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
      chart: {
        type: "donut",
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
      dataLabels: {
        enabled: true,
        formatter: (val: any) => {
          return val.toFixed(2) + "%";
        },
      },

      legend: {
        position: "right",
        offsetY: 0,
        height: 230,
      },
    },
  };

  return (
    <NoSSR>
      {typeof window !== "undefined" && (
        <ApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
        />
      )}
    </NoSSR>
  );
};

export default LocationChart;
