"use client";
import { TbLogout } from "react-icons/tb";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { BiBell, BiSolidContact } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineAnalytics } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { BsSendFill, BsBank2 } from "react-icons/bs";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useGetAccountDetails from "app/hooks/useGetAccountDetails";
import { useState, useEffect } from "react";
import ProfileIcon from "./ProfileIcon";
import CountUp from "react-countup";

const routes = [
  { label: "My Account", icon: <MdOutlineAnalytics /> },
  { label: "Bank Accounts", icon: <BsBank2 /> },
  { label: "Contacts", icon: <BiSolidContact /> },
  { label: "Transactions", icon: <RiTeamFill /> },
  { label: "Notifications", icon: <BiBell /> },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;
  const { user: info } = useGetAccountDetails();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <div className='z-10 shadow-lg lg:hidden bg-primary-bg '>
      <div className='flex justify-between px-5 items-center py-3'>
        <div className='flex text-primary-text items-center mb-2'>
          <div className='w-[50px] h-[50px] rounded-full mr-2'>
            <ProfileIcon />
          </div>
          <div className=' ml-2'>
            <p className='m-0 p-0 text-sm'>{user?.name}</p>
            <p className='text-xs m-0 p-0'>
              <CountUp
                duration={3}
                prefix='GH₵ '
                separator=','
                decimals={2}
                end={parseInt(info?.account?.demo?.balance?.toFixed(2) as string)}
              />
            </p>
          </div>
        </div>

        {isOpen ? (
          <AiOutlineClose
            onClick={() => setIsOpen(false)}
            className='text-3xl '
          />
        ) : (
          <BiMenu onClick={() => setIsOpen(true)} className='text-3xl ' />
        )}
      </div>

      <div
        className={`${
          isOpen ? "h-screen block" : "h-0 p-0 m-0 hidden"
        } transition-all duration-200 lg:flex flex-col justify-between space-y-5 mt-3`}
      >
        <div className='space-y-5'>
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
          <li
            onClick={async () => {
              await signOut({ redirect: false, callbackUrl: "/login" });
              router.push("/login");
            }}
            className='flex space-x-3 items-center hover:bg-secondary-bg px-5 py-3 hover:cursor-pointer '
          >
            <TbLogout className='mr-3' />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
