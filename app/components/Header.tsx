"use client";

import React from "react";
import Image from "next/image";
import { TbLogout, TbMessage2 } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";


const Header = () => {
  return (
    <div className="hidden md:block w-[100%] bg-primary-bg text-primary-text z-10">
      <div className='px-5 md:px-10 flex space-x-5 justify-between items-center shadow h-[80px]'>
        <div className='flex-[0.6] bg-dark-bg py-2 rounded-full h-[50px]'>
          <h3 className=' text-2xl text-bold '>Overview</h3>
        </div>

        <div className='flex-[0.6] bg-dark-bg py-2 px-4 rounded-full flex justify-between h-[50px]'>
          <input
            type='text'
            className=' bg-secondary-bg p-4 h-[40px] w-full outline-none'
            placeholder='Search here...'
          />
          <div className='flex'>
            <span className='w-[35px] h-[35px] text-xl mr-2 rounded-full bg-light-bg flex items-center justify-center'>
              <BiBell />
            </span>
            <span className='w-[35px] h-[35px] text-xl mr-2 rounded-full bg-light-bg flex items-center justify-center'>
              <TbMessage2 />
            </span>
          </div>

          <div className='flex items-center space-x-3 w-[22rem]'>
            <div className='w-[60px] h-[60px] rounded-full '>
              <Image
                src='/profile.png'
                width={60}
                height={60}
                className='rounded-full'
                alt='profile'
              />
            </div>
            <p className='text-sm'>Joseph N.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
