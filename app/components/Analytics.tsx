"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Analytics = () => {
  const options = {
    chart: {
      height: 350,
    },
    foreColor: '#373d3f',
    colors: ["#115a4c", "#e55c31"],
    markers:{
      colors: ['#333', '#999'],
      strokeColors: '#333'
    },
    stroke: {
      width: [2, 2],
      // curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    fill: {
      opacity: [0.85, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
  };
  const series = [
    {
      type: "line",
      name: "Incomes",
      data: [25, 35, 25, 55, 25, 45, 5],
    },
    {
      type: "line",
      name: "Expenses",
      data: [7, 12, 30, 50, 20, 40, 15],
    },
  ];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='text-primary-text'>
      {isClient && (
        <Chart
          options={options}
          series={series}
          type='bar'
          width='100%'
          height='320px'
        />
      )}
    </div>
  );
};

export default Analytics;
