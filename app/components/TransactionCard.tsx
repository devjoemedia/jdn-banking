"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import {BsFillCheckCircleFill } from 'react-icons/bs'
import {RxCrossCircled } from 'react-icons/rx'

const TransactionCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div onClick={onOpen} className='group text-primary-text space-y-2 hover:cursor-pointer bg-primary-bg my-2 border-b border-secondary-bg hover:bg-secondary-bg px-4 p-2 rounded-md '>
      <div className="flex justify-between">
        <div className="flex">
          <span className="w-[45px] h-[45px] mr-2 rounded-full bg-secondary-bg group-hover:bg-primary-bg flex items-center justify-center font-semibold">JN</span>
          <div>
            <p className='text-sm font-bold'>Payment <span className='text-xs  text-secondary-text'>from</span> Joseph Nartey</p>
            <p className='text-xs text-secondary-text'>March 16 2023</p>
          </div>
        </div>

        <p className='text-xs text-green '>Completed</p>

        <div className="text-right">
          <p className='text-xs text-secondary-text'>payment for art work </p>
          <p className='text-sm text-primary'>GH₵ 100</p>
        </div>
      </div>

      <div>
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <div className='text-primary-text bg-primary-bg w-full rounded border-[2px] border-t-[20px] border-primary p-4 pb-10 '>
              <ModalHeader className='text-center'>Transaction Details</ModalHeader>
              <ModalBody>
                <div className="h-[50px] mb-3 w-[50px] mx-auto flex items-center justify-center rounded-full bg-secondary-bg">
                  <BsFillCheckCircleFill className="text-primary text-2xl" />
                  {/* <RxCrossCircled className="text-red-500 text-2xl" /> */}
                </div>

                <p className='text-center text-secondary-text'>Transfer Complete</p>
                <p className='text-xl text-center'>GH₵ 10,500.00</p>

                <div className='mb-3 space-y-3 mt-5 bg-primary-bg'>
                  <div className='flex justify-between items-center py-1'>
                    <p className='text-secondary-text'>Receiver Name</p>
                  <p>Joseph Nartey</p>
                  </div>
                  <div className='flex justify-between items-center py-1'>
                    <p className='text-secondary-text'>Account Number</p>
                    <p>2100876454453</p>
                  </div>
                  <div className='flex justify-between items-center py-1'>
                    <p className='text-secondary-text'>Receiving Bank</p>
                    <p>Fidelity Bank</p>
                  </div>
                  <div className='flex justify-between items-center py-1'>
                    <p className='text-secondary-text'>Payment Method</p>
                    <p>Bank Transfer</p>
                  </div>
                  
                  <hr />
                  <div className='flex justify-between items-center py-1'>
                    <p className='text-secondary-text'>Payment Date</p>
                    <p>12/06/2023, 3:45</p>
                  </div>
                  <div className='flex justify-between items-center py-1'>
                    <p className='text-secondary-text'>Ref Number</p>
                    <p>000934949943406</p>
                  </div>
                  
                  <div className=' my-2 flex w-[80%]'>
                    <button
                      className='mt-4 py-2 px-5 w-[140px] bg-primary rounded text-white'
                      onClick={onClose}
                    >
                      Print
                    </button>
                    <button
                      className='mt-4 ml-3 py-2 px-5 w-[140px] bg-secondary-bg rounded text-primary-text'
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </ModalBody>
            </div>
          </ModalContent>
        </Modal>
      </div>

    </div>
  )
}

export default TransactionCard