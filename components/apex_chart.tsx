"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
export default function ApexChart(props: any) {
  const ApexChart = dynamic(() => import("./apex_chart"), { ssr: false });
  const [Chart, setChart] = useState<any>();
  const hasType = typeof props?.type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return hasType && Chart && <Chart {...props} />;
}
