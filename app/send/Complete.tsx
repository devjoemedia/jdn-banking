import { BsFillCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import Print from "@/components/Print";
import CountUp from "react-countup";
import useCustonFetch from "app/hooks/useCustonFetch";
import Link from "next/link";

const Complete = ({ data }: any) => {
  const { transaction } = data;

  return (
    <div className='text-primary-text bg-primary-bg lg:w-[400px] mx-auto my-5  flex flex-col items-center justify-center p-4 pb-10 '>
      <div
        id='t-receipt-container'
        className='text-primary-text bg-primary-bg lg:w-[400px] mx-auto my-5  flex flex-col items-center justify-center p-4 pb-10 '
      >
        <h4 className='text-center mb-2'>Transaction Details</h4>
        <div className='w-[320px] lg:w-full'>
          <div className='h-[50px] mb-3 w-[50px] mx-auto flex items-center justify-center rounded-full bg-secondary-bg'>
            {true ? (
              <BsFillCheckCircleFill className='text-primary text-2xl' />
            ) : (
              <RxCrossCircled className='text-red-500 text-2xl' />
            )}
          </div>

          <p className='text-center text-secondary-text'>Transfer Complete</p>
          <p className='text-xl text-center'>
            <CountUp
              duration={3}
              prefix='GH₵ '
              separator=','
              decimals={2}
              end={transaction?.amount?.toFixed(2)}
            />
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

            <div className=' my-2 flex w-full gap-5'>
              <Print
                className='mt-4 py-2 px-5 w-full bg-primary rounded text-white'
                rootElementId='t-receipt-container'
                downloadFileName='receipt'
              />
              <button className='mt-4 ml-3 py-2 px-5 w-full bg-secondary-bg rounded text-primary-text'>
                <Link href='/send'>Close</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
