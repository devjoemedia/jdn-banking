const Amount = () => {
  return (
    <div className='space-y-5'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <span className='w-[50px] h-[50px] rounded-full bg-secondary-bg group-hover:bg-primary-bg flex items-center justify-center font-semibold my-3'>
            JN
          </span>
          <div>
            <p className='text-sm font-bold'>Joseph Nartey</p>
            <p className='text-xs text-secondary-text'>joenart2@gmail.com</p>
          </div>
        </div>
      </div>
      <input
        type='number'
        placeholder='Amount'
        aria-label='Amount'
        className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
      />
      <textarea
        cols={30}
        placeholder='Comment'
        aria-label='Comment'
        className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
      />
    </div>
  );
};

export default Amount;
