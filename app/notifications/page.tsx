import NotificationCard from "@/components/NotificationCard";

const Notifications = () => {
  return (
    <div className=' p-5 md:p-8 space-y-5'>
      <div className='space-y-3 text-primary-text shadow-md bg-primary-bg p-3'>
        <h1 className='mb-2 text-lg'>Recent Notifications</h1>
        <hr />

        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
};

export default Notifications;
