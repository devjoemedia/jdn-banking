"use client";
import { ThemeProvider as Provider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
const queryClient = new QueryClient();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        themes={["light", "dark"]}
        defaultTheme='dark'
        enableSystem={false}
      >
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default ThemeProvider;
