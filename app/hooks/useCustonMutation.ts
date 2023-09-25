import { useMutation, useQueryClient } from "@tanstack/react-query";

interface queryProps {
  url: string;
  method: string;
  payload: any;
}

const useCustomMutation = (queryKey: any) => {
  // do the magic
  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading, mutateAsync } = useMutation({
    mutationFn: async ({ url, payload, method }: queryProps) => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/api" + url,
          {
            method: method || "POST",
            body: JSON.stringify(payload),
          }
        );
        const result = await res.json();
        return result;
      } catch (err) {
        console.log({ err });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKey] });
    },
  });

  return { data, isSuccess, isLoading, mutateAsync };
};

export default useCustomMutation;
