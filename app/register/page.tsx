import Link from 'next/link'
import AuthLayout from "@/components/AuthLayout";

export default function Register({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <main className='flex h-screen items-center justify-center text-primary-text'>
        <div className='space-y-5'>
          <div>
            <h1 className='text-4xl font-bold'>Register ✌️</h1>
            <p className='text-secondary-text'>
              Do it smarter, not harder! Register to track you spending with a well crafted analytics!
            </p>
          </div>

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full Name *'
              aria-label='Full Name'
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
              />

            <input
              type='email'
              placeholder='Email *'
              aria-label='Email'
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
              />
            <input
              type='password'
              placeholder='Password *'
              aria-label='Password'
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
              />
            <input
              type='password'
              placeholder='Confirm Password *'
              aria-label='Password'
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
              />
          </div>

          <div>
            <button className='mt-10 py-4 px-5 w-full bg-primary rounded text-white'>
              Register
            </button>

            <p className='text-secondary-text mt-5 font-semibold'>Already have an account?</p>
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
