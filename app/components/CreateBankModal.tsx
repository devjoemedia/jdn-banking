"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useCustomMutation from "../hooks/useCustonMutation";

interface IBankAccount {
  name: string;
  accountNumber: number;
  user: string;
}

const CreateBankModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bankName, setBankName] = useState<string>();
  const [accountNumber, setAccountNumber] = useState<number>(0);

  const { mutateAsync, isLoading } = useCustomMutation("allBanks");
  const toast = useToast();

  const createBank = async () => {
    try {
      const payload: IBankAccount = {
        name: bankName as string,
        accountNumber: accountNumber as unknown as number,
        user: "000011111000001",
      };

      await mutateAsync({ url: "/api/banks", method: "POST", payload });

      toast({
        title: "bank account addedd.",
        description: "bank account addedd successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        containerStyle: { maxWidth: "800px" },
      });

      setBankName("");
      setAccountNumber(0);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "error adding bank",
        description: "error adding bank",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        containerStyle: { maxWidth: "800px" },
      });
    }
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className='py-2 px-3 w-[180px] bg-primary rounded shadow-md text-white'
      >
        Add Bank
      </button>

      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
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
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className='block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20'
                    />

                    <input
                      type='number'
                      placeholder='Account Number'
                      aria-label='Account Number'
                      value={accountNumber}
                      onChange={(e) =>
                        setAccountNumber(e.target.value as unknown as number)
                      }
                      className='block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20'
                    />

                    {/* <input type="text" placeholder="Phone" aria-label="Phone" className="block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20" /> */}
                  </div>
                  <div className=' my-2 flex w-[80%]'>
                    <button
                      className={`mt-4 py-2 px-5 w-[140px] rounded ${
                        isLoading
                          ? " bg-secondary-bg text-primary-text "
                          : " bg-primary text-white"
                      }`}
                      onClick={createBank}
                      disabled={isLoading}
                    >
                      Save
                    </button>
                    <button
                      className='mt-4 ml-3 py-2 px-5 w-[140px] bg-secondary-bg rounded text-primary-text'
                      onClick={onClose}
                      disabled={isLoading}
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
