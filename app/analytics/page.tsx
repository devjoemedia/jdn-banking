'use client';

import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

const Analytics = () => {
  const options = {
    chart: {
      height: 550,
    },
    colors: ['#115a4c', '#e55c31'],
    stroke: {
      width: [2, 2],
      // curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Monday', "Tuesday", "Wednesday", 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    fill: {
      opacity: [0.85, 1,],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
  }
  const series = [
    {
      type: 'line',
      name: "Incomes",
      data: [25, 35, 25, 55, 25, 45, 5],
    },
    {
      type: 'line',
      name: "Expenses",
      data: [7, 12, 30, 50, 20, 40, 15],
    },
  ]

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



  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

  }, [])

  return (
    <div className='space-y-5 px-5'>
      <div className='flex w-full space-x-5 '>

        <div className='flex-1'>
          <div>
            <div className="flex justify-between items-center">
              <h1 className='mb-2  text-lg text-white flex-[0.5]'>Analytics</h1>

              <div className="flex items-center justify-between flex-[0.5] text-sm">
                <p className='flex items-center'><span className="w-[12px] h-[12px] mr-2 rounded-full bg-secondary "></span>Incomes</p>
                <p className='flex items-center'><span className="w-[12px] h-[12px] mr-2 rounded-full  bg-green"></span>Expenses</p>
                <select name="day" id="day" className='bg-light-bg outline-none border-none text-xs rounded p-1'>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            {/* Anlytics */}
            {isClient && <Chart
              options={options}
              series={series}
              type="bar"
              width="100%"
              height="400px"
            />}
          </div>
        </div>

        <div className='flex-[0.4] space-y-3'>
          <div>
            {isClient && <Chart
              options={donutOptions}
              series={donutSeries}
              type="radialBar"
              width="100%"
            // height="400px"
            />}
          </div>
          <div>
            {isClient && <Chart
              options={donutOptions}
              series={donutSeries}
              type="radialBar"
              width="100%"
            // height="400px"
            />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics