"use client";
import { TbLogout } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
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
import ProfileIcon from "./ProfileIcon";

const routes = [
  { label: "My Account", icon: <MdOutlineAnalytics /> },
  { label: "Bank Accounts", icon: <BsBank2 /> },
  { label: "Contacts", icon: <BiSolidContact /> },
  { label: "Transactions", icon: <RiTeamFill /> },
  { label: "Notifications", icon: <BiBell /> },
];

const LeftSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;
  const { user: info } = useGetAccountDetails();

  return (
    <div className='shadow-lg w-[20rem] lg:flex flex-col justify-between space-y-5 hidden bg-primary-bg'>
      <div className='space-y-5'>
        <div>
          <div className='flex text-primary-text items-center py-3 px-4'>
            <div className='w-[60px] h-[60px] rounded-full '>
              {/* <Image
                src='/profile.png'
                width={60}
                height={60}
                className='rounded-full'
                alt='profile'
              /> */}
              <ProfileIcon />
            </div>
            <div className=' ml-2'>
              <p className='m-0 p-0 text-sm'>{user?.name}</p>
              <p className='text-xs m-0 p-0'>Demo Account</p>
            </div>
          </div>
          <div className=' ml-2 px-4 text-primary-text'>
            <p className='m-0 p-0 text-sm'>Account Balance</p>
            <p className=' text-xs m-0 p-0'>
              GH₵ {info?.account?.demo?.balance?.toFixed(2)}
            </p>
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
  );
};

export default LeftSideBar;
