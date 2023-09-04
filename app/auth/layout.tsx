
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='en'>
      <body>
        <main className='flex h-[100vh] w-screen overflow-hidden max-w-[1440px] mx-auto '>
          <p>login</p>
          <p>logout</p>

          <div className='w-full relative bg-secondary-bg overflow-y-auto'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
