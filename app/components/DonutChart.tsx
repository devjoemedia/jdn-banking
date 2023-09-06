"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DonutChart = () => {
  const donutOptions = {
    chart: {
    },
    colors: ['#115a4c', '#e55c31'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '20px',
          },
          value: {
            fontSize: '16px',
          },
          // total: {
          //   show: true,
          //   label: 'Total',
          //   formatter: function (w: any) {
          //     // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
          //     return 249
          //   }
          // }
        }
      }
    },
    labels: ['Income', 'Expenses'],
  }

  const donutSeries = [68, 35]
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='text-primary-text shadow-md bg-primary-bg mb-2'>
      {isClient && <Chart
        options={donutOptions}
        series={donutSeries}
        type="radialBar"
        width="100%"
      // height="400px"
      />}
    </div>
  );
};

export default DonutChart;
