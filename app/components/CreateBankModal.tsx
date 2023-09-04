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

const CreateBankModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div >
      <button
        onClick={onOpen}
        className='py-2 px-3 w-[180px] bg-primary rounded shadow-md text-white'
      >
        Add Bank
      </button>

      <div>
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <div className='text-primary-text bg-primary-bg w-full rounded border-[2px] border-t-[20px] border-primary p-4 pb-10 '>
              <ModalHeader>Create Bank</ModalHeader>
              <ModalBody>
                <div className='mb-3 bg-primary-bg'>
                  <div className='relative space-y-5'>
                    <input
                      type='text'
                      placeholder='Bank Name'
                      aria-label='Bank Name'
                      className='block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20'
                    />

                    <input
                      type='text'
                      placeholder='Account Number'
                      aria-label='Account Number'
                      className='block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20'
                    />

                    {/* <input type="text" placeholder="Phone" aria-label="Phone" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20" /> */}
                  </div>
                  <div className=' my-2 flex w-[80%]'>
                    <button
                      className='mt-4 py-2 px-5 w-[140px] bg-primary rounded text-white'
                      onClick={onClose}
                    >
                      Save
                    </button>
                    <button
                      className='mt-4 ml-3 py-2 px-5 w-[140px] bg-secondary-bg rounded text-primary-text'
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </ModalBody>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default CreateBankModal;
