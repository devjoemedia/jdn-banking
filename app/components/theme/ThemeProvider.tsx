"use client";
import { ThemeProvider as Provider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        themes={["light", "dark"]}
        defaultTheme='dark'
        enableSystem={false}
      >
        {children}
      </Provider>
    </QueryClientProvider>
  );
};

export default ThemeProvider;
