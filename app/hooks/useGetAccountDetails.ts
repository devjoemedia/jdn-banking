import { useEffect, useState } from "react";
import useCustonFetch from "./useCustonFetch";

interface IUser {
  name: string;
  email: string;
  photo?: string;
  phone?: string;
  bio?: string;
  password: number;
  banks: [];
  accountType: string;
  account: {
    demo: {
      balance: number;
    };
    real: {
      balance: number;
    };
  };
  createdAt: number;
  _v: number;
  _id: string;
}

const useGetAccountDetails = () => {
  const [user, setUser] = useState<IUser>();
  // do the magic
  const { data, isSuccess, isLoading } = useCustonFetch({
    url: `/users`,
    queryKey: ["account"],
  });

  useEffect(() => {
    if (data?.user) setUser(data.user);
  }, [data]);

  return { user, isSuccess, isLoading };
};

export default useGetAccountDetails;
