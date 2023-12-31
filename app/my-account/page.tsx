"use client";
import { BsSendFill } from "react-icons/bs";
import Image from "next/image";
import useGetAccountDetails from "app/hooks/useGetAccountDetails";
import { useEffect, useState } from "react";
import useCustomMutation from "app/hooks/useCustonMutation";
import ProfileIcon from "@/components/ProfileIcon";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");

  const { mutateAsync, isLoading } = useCustomMutation(["account"]);
  const { user } = useGetAccountDetails();

  const updateProfile = async () => {
    try {
      if (!name) return;

      const payload = { name, bio, phone };
      await mutateAsync({
        url: `/users/${user?.email}`,
        method: "PATCH",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      setName(user?.name as string);
      setPhone(user?.phone as string);
      setBio(user?.bio as string);
    }
  }, [user]);

  return (
    <div>
      <div className='p-5 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>
        <div className='shadow-md p-4 bg-primary-bg'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
            <div className='col-span-3 lg:col-span-1 lg:h-[400px] w-full felx items-center justify-center hover:cursor-pointer p-3 flex-1'>
              <div className='w-[150px] mx-auto h-[150px] rounded-full '>
                {/* <Image
                  src='/profile.png'
                  width={150}
                  height={150}
                  className='rounded-full'
                  alt='profile'
                /> */}
                <span className={`w-[150px] h-[150px] rounded-full bg-secondary-bg flex items-center justify-center font-semibold text-5xl`}>
                  {user?.name.split(" ")?.[0].charAt(0)}
                  {user?.name.split(" ")?.[1].charAt(0)}
                </span>
              </div>
              <button className='flex items-center mx-auto justify-center mt-4 py-3 px-5 w-[180px] bg-primary rounded shadow-md text-white'>
                Change Photo
              </button>
            </div>

            <div className='col-span-3 lg:col-span-2 gap-x-6'>
              <div className='min-h-[400px] bg-primary-bg hover:cursor-pointer p-5 flex-1'>
                <p className='text-xl font-semibold'>User Settings</p>

                <div className='relative mt-6 space-y-5'>
                  <input
                    type='text'
                    placeholder='Full Name'
                    aria-label='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
                  />

                  <input
                    type='email'
                    placeholder='Email'
                    aria-label='Email'
                    readOnly
                    disabled
                    value={user?.email}
                    className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
                  />

                  <input
                    type='text'
                    placeholder='Phone'
                    aria-label='Phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
                  />

                  <textarea
                    placeholder='Bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
                  />

                  <button
                    onClick={updateProfile}
                    className='flex items-center justify-center mt-4 py-3 px-5 w-[180px] bg-primary rounded shadow-md text-white'
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
