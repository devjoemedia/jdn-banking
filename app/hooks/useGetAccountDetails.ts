import useCustonFetch from "./useCustonFetch";

const useGetAccountDetails = () => {
  // do the magic
  const { data, isSuccess, isLoading } = useCustonFetch({
    url: `/users/me`,
    queryKey: ["account"],
  });

  return { user: data?.user || null, isSuccess, isLoading };
};

export default useGetAccountDetails;
