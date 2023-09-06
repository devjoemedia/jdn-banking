"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import "./globals.css";
import Header from "@/components/Header";
import LeftSideBar from "@/components/LeftSideBar";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          {['/register', '/login', '/forgot-password'].includes(pathname) ? (
            <CacheProvider>
              <ChakraProvider>{children}</ChakraProvider>
            </CacheProvider>
          ): (
            <main className='flex h-[100vh] w-screen overflow-hidden max-w-[1440px] mx-auto '>
              <LeftSideBar />

              <div className='w-full relative bg-secondary-bg overflow-y-auto'>
                <Header />
                <CacheProvider>
                  <ChakraProvider>{children}</ChakraProvider>
                </CacheProvider>
              </div>
            </main>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
