import React from "react";
import useGetAccountDetails from "app/hooks/useGetAccountDetails";

const ProfileIcon = ({ className }:any) => {
  const { user } = useGetAccountDetails();

  return (
    <span className={`w-[60px] h-[60px] mr-2 rounded-full bg-secondary-bg flex items-center justify-center font-semibold ${className && className}`}>
      {user?.name.split(" ")?.[0].charAt(0)}
      {user?.name.split(" ")?.[1].charAt(0)}
    </span>
  );
};

export default ProfileIcon;
