import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex h-[100vh] w-screen overflow-hidden max-w-[1440px] mx-auto '>
      <div className='w-[25rem] p-5 bg-primary-bg h-screen'>{children}</div>

      <div className='flex-1 p-5 bg-primary flex items-center justify-center overflow-y-auto'>
        <div className='space-y-6'>
          <div className='w-[650px] h-[450px] relative'>
            <Image
              src='/bg.png'
              fill
              alt='profile'
            />
          </div>

          <div className='space-y-4 mt-5'>
            <h1 className='text-4xl font-bold text-center text-white'>Fast and Safe Payments ✌️</h1>
            <p className='text-white text-center'>
              Do it smarter, not harder! Register to track you spending with a well crafted analytics!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
