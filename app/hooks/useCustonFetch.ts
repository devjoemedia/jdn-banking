import { useQuery } from "@tanstack/react-query";
// import { useSession } from 'next-auth/react';

interface queryProps {
  url: string;
  method: string;
  payload: any;
  queryKey: string;
}

const useCustomQuery = ({ url, payload, queryKey }: queryProps) => {
  // const { data: session } = useSession();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await fetch(url);
      return res.json();
    },
  });

  return { data, isSuccess, isLoading };
};

export default useCustomQuery;
