import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSession } from 'next-auth/react';

interface queryProps {
  url: string;
  method: string;
  payload: any;
}

const useCustomMutation = (queryKey: string) => {
  // do the magic
  const queryClient = useQueryClient();
  // const { data: session } = useSession();

  const { data, isSuccess, isLoading, mutateAsync } = useMutation({
    mutationFn: async ({ url, payload, method }: queryProps) => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api" + url, {
          method: method || "POST",
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        console.log({ res, result });
        return result;
      } catch (err) {
        console.log({ err });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { data, isSuccess, isLoading, mutateAsync };
};

export default useCustomMutation;
