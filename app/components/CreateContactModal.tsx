"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useCustomMutation from "../hooks/useCustonMutation";
import { useSession } from "next-auth/react";

interface IContact {
  name: string;
  email: string;
  phone: string;
  user: string;
}

const CreateContactModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const { data: session } = useSession();

  const { mutateAsync, isLoading } = useCustomMutation(["allContacts"]);
  const toast = useToast();

  const createContact = async () => {
    try {
      if(!name || !email){
        toast({
          title: "fill all required fields.",
          description: "fill all required fields",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          containerStyle: { maxWidth: "800px" },
        });
        return
      }
      const payload: IContact = {
        name: name as string,
        email: email as string,
        phone: phone as string,
        user: session?.user?.email as string,
      };

      await mutateAsync({ url: "/contacts", method: "POST", payload });

      toast({
        title: "contact created.",
        description: "contact created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        containerStyle: { maxWidth: "800px" },
      });

      setName("");
      setEmail("");
      setPhone("");
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "error creating contact",
        description: "error creating contact",
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
        Add Contact{" "}
      </button>

      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <div className='text-primary-text bg-primary-bg w-full rounded border-[2px] border-t-[20px] border-primary p-4 pb-10 '>
              <ModalHeader>Create Contact</ModalHeader>
              <ModalBody>
                <div className='mb-3'>
                  <div className='relative space-y-5'>
                    <input
                      type='text'
                      placeholder='Full Name'
                      aria-label='Full Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20'
                    />

                    <input
                      type='email'
                      placeholder='Email'
                      aria-label='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20'
                    />

                    <input
                      type='text'
                      placeholder='Phone'
                      aria-label='Phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className='block focus:outline-none w-full bg-secondary-bg rounded-md py-3 pl-6 pr-20'
                    />
                  </div>
                  <div className=' my-2 flex w-[80%]'>
                    <button
                      className={`mt-4 py-2 px-5 w-[140px] rounded ${
                        !isLoading
                          ? " bg-primary text-white "
                          : " bg-secondary-bg text-primary-text cursor-not-allowed"
                      }`}
                      onClick={createContact}
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

export default CreateContactModal;
