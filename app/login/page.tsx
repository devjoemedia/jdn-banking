import Link from 'next/link'
import AuthLayout from "@/components/AuthLayout";

export default function Login({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <main className='flex h-screen items-center justify-center text-primary-text'>
        <div className='space-y-5'>
          <div>
            <h1 className='text-4xl font-bold'>Login ✌️</h1>
            <p className='text-secondary-text'>
              Do it smarter, not harder! Login in to track you spending with a well crafted analytics!
            </p>
          </div>

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full Name'
              aria-label='Full Name'
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
              />

            <input
              type='email'
              placeholder='Email'
              aria-label='Email'
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
              />

            <div className='flex justify-between items-center'>
              <p className='font-bold space-x-1'>
                <input id='remember' type='checkbox' className='accent-primary' />
                <label  htmlFor='remember'>
                  Remember me
                </label>
              </p>
              <p className='text-secondary-text font-semibold underline'>
                <Link href='/forgot-password'>Forgot Password?</Link>
              </p>
            </div>
          </div>

          <div>
            <button className='mt-10 py-4 px-5 w-full bg-primary rounded text-white'>
              Login
            </button>

            <p className='text-secondary-text mt-5 font-semibold'>Dont have an account?</p>
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
