const Amount = ({amount, setAmount, comment, setComment, contact}:any) => {
  return (
    <div className='space-y-5'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <span className='w-[50px] h-[50px] rounded-full bg-secondary-bg group-hover:bg-primary-bg flex items-center justify-center font-semibold my-3'>
            {contact.name.split(' ')?.[0].charAt(0)}{contact.name.split(' ')?.[1].charAt(0)}
          </span>
          <div>
            <p className='text-sm font-bold'>{contact.name}</p>
            <p className='text-xs text-secondary-text'>{contact.email}</p>
          </div>
        </div>
      </div>
      <input
        type='number'
        placeholder='Amount'
        aria-label='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
      />
      <textarea
        cols={30}
        placeholder='Comment'
        aria-label='Comment'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
      />
    </div>
  );
};

export default Amount;
