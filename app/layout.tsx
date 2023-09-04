'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import "./globals.css";
import { TbLogout, TbMessage2 } from "react-icons/tb";
import { BiHelpCircle, BiMoon, BiSun, BiSolidMoon } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { BiBell,BiSolidContact } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { BsSendFill,BsBank2} from "react-icons/bs";
import Link from "next/link";
import Header from "@/components/Header";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { usePathname } from "next/navigation";
import Image from "next/image";

const routes = [
  { label: "My Account", icon: <MdOutlineAnalytics /> },
  { label: "Bank Accounts", icon: <BsBank2 /> },
  { label: "Contacts", icon: <BiSolidContact /> },
  { label: "Transactions", icon: <RiTeamFill /> },
  // { label: 'Cards', icon: <MdOutlineAnalytics /> },
  // { label: 'Schedules', icon: <AiOutlineSchedule /> },
  // { label: 'Analytics', icon: <MdOutlineAnalytics /> },
  // { label: 'Savings', icon: <RiTeamFill /> },
  { label: "Notifications", icon: <BiBell /> },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
        <main className='flex h-[100vh] w-screen overflow-hidden max-w-[1440px] mx-auto '>
          {/* <div className="w-[15rem]  p-5 bg-theme-bg"> */}
          <div className='shadow-lg w-[20rem] md:flex flex-col justify-between space-y-5 hidden bg-primary-bg'>
            <div className='space-y-5'>
              <div>
                <div className='flex text-primary-text items-center py-3 px-4'>
                  <div className='w-[60px] h-[60px] rounded-full '>
                    <Image
                      src='/profile.png'
                      width={60}
                      height={60}
                      className='rounded-full'
                      alt='profile'
                    />
                  </div>
                  <div className=' ml-2'>
                    <p className='m-0 p-0 text-sm'>Joseph Nartey</p>
                    <p className='text-xs m-0 p-0'>Demo Account</p>
                  </div>
                </div>
                <div className=' ml-2 px-4 text-primary-text'>
                  <p className='m-0 p-0 text-sm'>Account Balance</p>
                  <p className=' text-xs m-0 p-0'>$ 17,123.00</p>
                </div>
              </div>

              <ul className=' text-primary-text'>
                <Link href='/send'>
                  <li
                    className={`group flex space-x-3 items-center bg-primary text-white rounded-l-full ml-2 px-5 py-3 hover:cursor-pointer mb-5`}
                  >
                    <BsSendFill /> <p>Send Money</p>
                  </li>
                </Link>

                <Link href='/'>
                  <li
                    className={`group flex space-x-3 items-center hover:bg-primary hover:text-white rounded-l-full ml-2 px-5 py-3 hover:cursor-pointer ${
                      pathname == "/" ? "bg-primary text-white" : null
                    } `}
                  >
                    <MdDashboard /> <p className='ml-3 '>Dashboard</p>
                  </li>
                </Link>

                {routes.map((route, index) => (
                  <Link
                    href={`/${route.label.toLowerCase().split(" ").join("-")}`}
                    key={index}
                  >
                    <li
                      className={`py-3 space-x-3 flex items-center px-5 hover:bg-primary hover:text-white ml-2 hover:rounded-l-full my-2 ${
                        pathname.substring(1) ==
                        route.label.toLowerCase().split(" ").join("-")
                          ? "bg-primary text-white rounded-l-full"
                          : null
                      }`}
                    >
                      {route.icon} <p className='ml-3 '>{route.label}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            <ul className='space-y-5 text-primary-text'>
              <ThemeSwitcher />
              
              <li className='flex space-x-3 items-center hover:bg-secondary-bg px-5 py-3 hover:cursor-pointer '>
                <BiHelpCircle className='mr-3' />
                Help
              </li>
              <li className='flex space-x-3 items-center hover:bg-secondary-bg px-5 py-3 hover:cursor-pointer '>
                <TbLogout className='mr-3' />
                Logout
              </li>
            </ul>
          </div>
          {/* </div> */}

          <div className='w-full relative bg-secondary-bg overflow-y-auto'>
            <Header />
            <CacheProvider>
              <ChakraProvider>
                {children}
              </ChakraProvider>
            </CacheProvider>
          </div>
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
