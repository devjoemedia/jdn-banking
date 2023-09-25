"use client";
import NotificationCard from "@/components/NotificationCard";
import useCustonFetch from "app/hooks/useCustonFetch";

const Notifications = () => {
  const { data } = useCustonFetch({
    url: "/transactions",
    queryKey: ["allTransactions"],
  });

  return (
    <div className=' p-5 md:p-8 space-y-5'>
      <div className='space-y-3 text-primary-text shadow-md bg-primary-bg p-3'>
        <h1 className='mb-2 text-lg'>Recent Notifications</h1>
        <hr />

        {data?.transactions?.map((item: any) => (
          <NotificationCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
