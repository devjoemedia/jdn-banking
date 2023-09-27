"use client";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("pparker@test.com");
  const [password, setPassword] = useState("1234abcd");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) return handleError();
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res) {
        handleError();
        return;
      }
      setIsLoading(false);
      router.push("/");
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
            <h1 className='text-4xl font-bold'>Login ✌️</h1>
            <p className='text-secondary-text'>
              Do it smarter, not harder! Login in to track you spending with a
              well crafted analytics!
            </p>
          </div>

          <div className='space-y-4'>
            <input
              type='email'
              placeholder='Email *'
              name='email'
              aria-label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
            />

            <input
              type='password'
              placeholder='Password *'
              name='password'
              aria-label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
            />

            <div className='flex justify-between items-center'>
              <p className='font-bold space-x-1'>
                <input
                  id='remember'
                  type='checkbox'
                  className='accent-primary'
                />
                <label htmlFor='remember'>Remember me</label>
              </p>
              <p className='text-secondary-text font-semibold underline'>
                <Link href='/forgot-password'>Forgot Password?</Link>
              </p>
            </div>
          </div>

          <div>
            {isError && (
              <p className='text-red-500 mt-5 font-semibold'>
                Wrong Credentials
              </p>
            )}
            <button
              className={
                !isLoading
                  ? "mt-10 py-4 px-5 w-full bg-primary rounded text-white"
                  : "mt-4 py-4 px-5 w-full bg-secondary-bg rounded text-primary-text cursor-not-allowed"
              }
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login
            </button>

            <p className='text-secondary-text mt-5 font-semibold'>
              Dont have an account?
            </p>
            <Link href='/register'>
              <button className='mt-4 py-4 px-5 w-full bg-secondary-bg rounded text-primary-text'>
                Register
              </button>
            </Link>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
