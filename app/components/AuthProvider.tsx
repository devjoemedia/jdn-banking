"use client";
import Header from "@/components/Header";
import LeftSideBar from "@/components/LeftSideBar";
import MobileMenu from "@/components/MobileMenu";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div>
      <SessionProvider>
        <ThemeProvider>
          <>
            {["/register", "/login", "/forgot-password"].includes(pathname) ? (
              <>{children}</>
            ) : (
              <main className='flex-col lg:flex-row flex h-[100vh] w-screen overflow-hidden max-w-[1440px] mx-auto '>
                <LeftSideBar />
                <MobileMenu />

                <div className='w-full relative bg-secondary-bg overflow-y-auto'>
                  <Header />
                  {children}
                </div>
              </main>
            )}
          </>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default AuthProvider;
