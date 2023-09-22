"use client";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import useCustomMutation from "../hooks/useCustonMutation";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const { mutateAsync, isLoading } = useCustomMutation("allBanks");
  const router = useRouter();

  const handleError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
  };

  const handleRegisterUser = async () => {
    try {
      if (!name || !email || !password) return handleError();

      const payload = { name, email, phone, password };
      await mutateAsync({ url: "/api/register", method: "POST", payload });

      console.log("user registered");
      router.push("/login");
    } catch (error) {
      console.log(error);
      handleError();
    }
  };
  return (
    <AuthLayout>
      <main className='flex h-screen items-center justify-center text-primary-text'>
        <div className='space-y-5'>
          <div>
            <h1 className='text-4xl font-bold'>Register ✌️</h1>
            <p className='text-secondary-text'>
              Do it smarter, not harder! Register to track you spending with a
              well crafted analytics!
            </p>
          </div>

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full Name *'
              aria-label='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
            />

            <input
              type='email'
              placeholder='Email *'
              aria-label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
            />
            <input
              type='number'
              placeholder='Phone '
              aria-label='Phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
            />
            <input
              type='password'
              placeholder='Password *'
              aria-label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
            />
          </div>

          <div>
            {isError && (
              <p className='text-red-500 mt-5'>Enter all required fields</p>
            )}

            <button
              className='mt-10 py-4 px-5 w-full bg-primary rounded text-white'
              onClick={handleRegisterUser}
            >
              Register
            </button>

            <p className='text-secondary-text mt-5 font-semibold'>
              Already have an account?
            </p>
            <Link href='/login'>
              <button className='mt-4 py-4 px-5 w-full bg-secondary-bg rounded text-primary-text'>
                Login
              </button>
            </Link>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
