import AuthLayout from "@/components/AuthLayout";

export default async function ForgotPasswordForm() {

  return (
    <AuthLayout>
      <main className='flex h-screen items-center justify-center text-primary-text'>
        <div className='space-y-5'>
          <div>
            <h1 className='text-4xl font-bold'>Recover password ✌️</h1>
            <p className='text-secondary-text'>
              Do it smarter, not harder! Login in to track you spending with a well crafted analytics!
            </p>
          </div>

          <div className='space-y-4'>
            <input
              type='email'
              placeholder='Email'
              aria-label='Email'
              className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
              />

            <button className='mt-10 py-4 px-5 w-full bg-primary rounded text-white'>
              Recover Password
            </button>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
