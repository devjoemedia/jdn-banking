"use client";
import DonutChart from "@/components/DonutChart";
import SelectContact from "./SelectContact";
import Amount from "./Amount";
import Complete from "./Complete";
import { BsSendFill } from "react-icons/bs";
import {
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
  Text,
} from "@chakra-ui/react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import useCustomMutation from "../hooks/useCustonMutation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createTransactionReference } from "app/lib/utils";

interface ITransaction {
  amount: number;
  comment: string;
  transactionRef: string;
  receiver: {};
  sender: {};
  status: string;
  receivingBank?: string;
  paymentMethod?: string;
  createdAt: number
}

interface IContact {
  name: string;
  email: string;
  phone?: string;
}

export default function Send() {
  const [selectedContact, setSelectedContact] = useState<IContact>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [comment, setComment] = useState<string>();

  const { data: session } = useSession();

  const setContact = (item: any) => {
    setSelectedContact(item);
    setActiveStep(activeStep + 1);
  };

  const steps = [
    { title: "Select Contact", description: "Contact Info" },
    { title: "Amount", description: "Date & Time" },
    { title: "Complete", description: "Select Rooms" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length + 1,
  });

  const { mutateAsync, isLoading, data } = useCustomMutation("allTransactions");
  const toast = useToast();

  const recordTransaction = async () => {
    try {
      const payload: ITransaction = {
        amount: amount as number,
        comment: comment as string,
        sender: { name: session?.user?.name, email: session?.user?.email },
        receiver: { 
          email: selectedContact?.email,
          name: selectedContact?.name,
        },
        transactionRef: createTransactionReference(),
        status: 'Completed',
        createdAt: Date.now()
      };

      await mutateAsync({ url: "/transactions", method: "POST", payload });
  console.log({ data });

      toast({
        title: "transation complted.",
        description: "transation complted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        containerStyle: { maxWidth: "800px" },
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "error making payment",
        description: "error making payment",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        containerStyle: { maxWidth: "800px" },
      });
    }
  };

  const handlePayment = async() => {
    if (activeStep == 2) {
      if (!amount) {
        toast({
          title: "error invalid amount",
          description: "error invalid amount",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          containerStyle: { maxWidth: "800px" },
        });
        return;
      }
      await recordTransaction();
      setActiveStep(activeStep + 1);

    } else {
      if (name && email) {
        setSelectedContact({ name, email, phone });
      }

      if (!selectedContact) {
        toast({
          title: "error invalid contact information",
          description: "error invalid contact information",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          containerStyle: { maxWidth: "800px" },
        });
        return;
      }
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div>
      <div className='p-5 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
          <div className='col-span-2 gap-x-6'>
            <div className='min-h-[400px] bg-primary-bg hover:cursor-pointer p-5 flex-1'>
              <Stepper colorScheme='green' size='sm' index={activeStep} gap='0'>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus complete={<StepIcon />} />
                    </StepIndicator>
                    <Text>
                      <b>{step.title}</b>
                    </Text>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              <div className='flex flex-col  justify-center min-h-[350px]'>
                {activeStep == 1 && (
                  <SelectContact
                    setContact={setContact}
                    activeStep={activeStep}
                    setName={setName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    name={name}
                    email={email}
                    phone={phone}
                  />
                )}

                {activeStep == 2 && (
                  <Amount
                    amount={amount}
                    setAmount={setAmount}
                    comment={comment}
                    setComment={setComment}
                    contact={selectedContact}
                  />
                )}

                {activeStep == 3 && <Complete data={data} />}

                {activeStep < 3 && (
                  <div className='flex items-center justify-between gap-4'>
                    <button
                      className='flex items-center justify-center mt-4 py-3 px-5 w-full bg-primary rounded shadow-md text-white'
                      onClick={() => {
                        activeStep > 1 && setActiveStep(activeStep - 1);
                      }}
                    >
                      <FiArrowLeft className='mr-3' /> Back
                    </button>
                    <button
                      className='flex items-center justify-center mt-4 py-3 px-5 w-full bg-primary rounded shadow-md text-white'
                      onClick={handlePayment}
                    >
                      {activeStep == 2 ? "Process Payment" : "Next"}
                      {activeStep == 2 ? (
                        <BsSendFill className='ml-3' />
                      ) : (
                        <FiArrowRight className='ml-3' />
                      )}
                    </button>
                  </div>
                )}

                {activeStep == 3 && (
                  <div className=' my-2 flex w-full gap-5'>
                    <button
                      className='mt-4 py-2 px-5 w-full bg-primary rounded text-white'
                      onClick={() => console.log("Print Receipt")}
                    >
                      Print
                    </button>
                    <button
                      className='mt-4 ml-3 py-2 px-5 w-full bg-secondary-bg rounded text-primary-text'
                      onClick={() => setActiveStep(1)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=' hover:cursor-pointer '>
            <div className='shadow-md rounded space-y-5 min-h-[400px] text-white hover:cursor-pointer flex-1'>
              <DonutChart />
              <DonutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
