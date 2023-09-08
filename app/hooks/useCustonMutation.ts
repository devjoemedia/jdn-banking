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
      const res = await fetch(url, {
        method: method || "POST",
        body: JSON.stringify(payload),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { data, isSuccess, isLoading, mutateAsync };
};

export default useCustomMutation;
