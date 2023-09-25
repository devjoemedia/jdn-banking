import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import Print from "./Print";

const TransactionCard = ({ item }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div
      onClick={onOpen}
      className='group text-primary-text space-y-2 hover:cursor-pointer bg-primary-bg my-2 border-b border-secondary-bg hover:bg-secondary-bg px-4 p-2 rounded-md '
    >
      <div className='flex justify-between'>
        <div className='flex'>
          <span className='w-[45px] h-[45px] mr-2 rounded-full bg-secondary-bg group-hover:bg-primary-bg flex items-center justify-center font-semibold'>
            {item.sender.name.split(" ")?.[0].charAt(0)}
            {item.sender.name.split(" ")?.[1].charAt(0)}
          </span>
          <div>
            {user?.email == item.sender.email ? (
              <p className='text-sm font-bold'>
                Payment{" "}
                <span className='text-xs  text-secondary-text'>To </span>
                {item.receiver.name}
              </p>
            ) : (
              <p className='text-sm font-bold'>
                Payment{" "}
                <span className='text-xs  text-secondary-text'>From </span>
                {item.sender.name}
              </p>
            )}

            <p className='text-xs text-secondary-text'>
              {new Date(item?.paymentDate)?.toUTCString()}
            </p>
          </div>
        </div>

        {/* <p className='text-xs text-green '>Completed</p> */}

        <div className='text-right'>
          <p className='text-xs text-secondary-text'>{item?.comment}</p>
          <p
            className={
              user?.email == item.sender.email
                ? "text-sm text-red-500"
                : "text-sm text-primary"
            }
          >
            GH₵ {user?.email == item.sender.email ? "-" : "+"}
            {item?.amount.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <div className='text-primary-text bg-primary-bg w-full rounded border-[2px] border-t-[20px] border-primary pb-10 '>
              <ModalBody>
                <div
                  id='receipt-container'
                  className='lg:w-[400px] mx-auto text-primary-text bg-primary-bg w-full px-2 pb-5'
                >
                  <h1 className='text-2xl font-bold my-4 text-center'>
                    Transaction Details
                  </h1>
                  <div className='h-[50px] mb-3 w-[50px] mx-auto flex items-center justify-center rounded-full bg-secondary-bg'>
                    <BsFillCheckCircleFill className='text-primary text-2xl' />
                    {/* <RxCrossCircled className="text-red-500 text-2xl" /> */}
                  </div>

                  <p className='text-center text-secondary-text'>
                    Transfer Complete
                  </p>
                  <p className='text-xl text-center'>
                    GH₵ {item?.amount.toFixed(2)}
                  </p>

                  <div className='mb-3 space-y-3 mt-5 bg-primary-bg'>
                    <div className='flex justify-between items-center p-1'>
                      <p className='text-secondary-text'>Receiver Name</p>
                      <p>{item?.receiver?.name}</p>
                    </div>
                    <div className='flex justify-between items-center p-1'>
                      <p className='text-secondary-text'>Account Number</p>
                      <p>{item?.receiver?.email}</p>
                    </div>
                    <div className='flex justify-between items-center p-1'>
                      <p className='text-secondary-text'>Receiving Bank</p>
                      <p>{item?.receivingBank}</p>
                    </div>
                    <div className='flex justify-between items-center p-1'>
                      <p className='text-secondary-text'>Payment Method</p>
                      <p>{item?.paymentMethod}</p>
                    </div>

                    <hr />
                    <div className='flex justify-between items-center p-1'>
                      <p className='text-secondary-text'>Payment Date</p>
                      <p>{new Date(item?.paymentDate)?.toUTCString()}</p>
                    </div>
                    <div className='flex justify-between items-center p-1'>
                      <p className='text-secondary-text'>Ref Number</p>
                      <p>{item?.transactionRef}</p>
                    </div>
                  </div>
                </div>
                <div className='px-1 my-2 flex w-[80%]'>
                  <Print
                    rootElementId='receipt-container'
                    downloadFileName='receipt'
                    cb={onClose}
                  />
                  <button
                    className='mt-4 ml-3 py-2 px-5 w-[140px] bg-secondary-bg rounded text-primary-text'
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </ModalBody>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default TransactionCard;
