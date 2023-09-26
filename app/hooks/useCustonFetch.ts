"use client";
import { useQuery } from "@tanstack/react-query";

interface queryProps {
  url: string;
  method?: string;
  payload?: any;
  queryKey: any;
}

const useCustonFetch = ({ url, payload, queryKey }: queryProps) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api" + url);
      return res.json();
    },
  });

  return { data, isSuccess, isLoading };
};

export default useCustonFetch;
