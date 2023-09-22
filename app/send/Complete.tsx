import { BsFillCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

const Complete = ({ data }: any) => {
  const {transaction}  = data;

  return (
    <div className='text-primary-text bg-primary-bg w-[400px] mx-auto my-5  flex flex-col items-center justify-center p-4 pb-10 '>
      <h4 className='text-center'>Transaction Details</h4>
      <div className='w-full'>
        <div className='h-[50px] mb-3 w-[50px] mx-auto flex items-center justify-center rounded-full bg-secondary-bg'>
          {true ? (
            <BsFillCheckCircleFill className='text-primary text-2xl' />
          ) : (
            <RxCrossCircled className='text-red-500 text-2xl' />
          )}
        </div>

        <p className='text-center text-secondary-text'>Transfer Complete</p>
        <p className='text-xl text-center'>
          GH₵ {transaction?.amount?.toFixed(2)}
        </p>

        <div className='mb-3 space-y-3 mt-5 bg-primary-bg'>
          <div className='flex justify-between items-center py-1'>
            <p className='text-secondary-text'>Receiver Name</p>
            <p>{transaction?.receiver?.name}</p>
          </div>
          <div className='flex justify-between items-center py-1'>
            <p className='text-secondary-text'>Account Number</p>
            <p>{transaction?.receiver?.email}</p>
          </div>
          <div className='flex justify-between items-center py-1'>
            <p className='text-secondary-text'>Receiving Bank</p>
            <p>{transaction?.receivingBank}</p>
          </div>
          <div className='flex justify-between items-center py-1'>
            <p className='text-secondary-text'>Payment Method</p>
            <p>{transaction?.paymentMethod}</p>
          </div>

          <hr />
          <div className='flex justify-between items-center py-1'>
            <p className='text-secondary-text'>Payment Date</p>
            <p>{new Date(transaction?.paymentDate)?.toUTCString()}</p>
          </div>
          <div className='flex justify-between items-center py-1'>
            <p className='text-secondary-text'>Ref Number</p>
            <p>{transaction?.transactionRef}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
