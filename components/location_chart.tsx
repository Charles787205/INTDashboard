"use client";
import { NoSSR } from "@/components";
import ApexChart from "./apex_chart";

const LocationChart = ({
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
  const chartData = {
    series: [...data.map((val) => val.data.success)], // Data for the donut chart
    options: {
      labels: [...data.map((val) => val.name)],
      chart: {
        type: "donut",
      },
      title: {
        text: "Number of Parcels Delivered",
        align: "center",
        style: {
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
  const series: ApexAxisChartSeries = [
    {
      name: "Number of Parcels Delivered",
      data: [
        ...data.map((area) => {
          return {
            x: area.name,
            y: area.data.success,
          };
        }),
      ],
    },
  ];

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
