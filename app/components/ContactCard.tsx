"use client";

const ContactCard = ({ contact, setContact }: any) => {
  return (
    <div
      onClick={() => setContact(contact)}
      className='group text-primary-text space-y-2 hover:cursor-pointer bg-primary-bg my-2 border-b border-secondary-bg hover:bg-secondary-bg px-4 p-2 rounded-md '
    >
      <div className='flex justify-between'>
        <div className='flex'>
          <span className='w-[45px] h-[45px] mr-2 rounded-full bg-secondary-bg group-hover:bg-primary-bg flex items-center justify-center font-semibold'>
            {contact.name.split(' ')?.[0].charAt(0)}{contact.name.split(' ')?.[1].charAt(0)}
          </span>
          <div>
            <p className='text-sm font-bold'>{contact.name}</p>
            <p className='text-xs text-secondary-text'>{contact.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
