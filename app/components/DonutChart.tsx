"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart = () => {
  const donutOptions = {
    chart: {},
    colors: ["#115a4c", "#e55c31"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "20px",
          },
          value: {
            fontSize: "16px",
          },
        },
      },
    },
    labels: ["Income", "Expenses"],
  };

  const donutSeries = [68, 35];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='text-primary-text'>
      {isClient && (
        <Chart
          options={donutOptions}
          series={donutSeries}
          type='radialBar'
          width='100%'
          // height="400px"
        />
      )}
    </div>
  );
};

export default DonutChart;
