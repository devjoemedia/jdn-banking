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
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useToast } from "@chakra-ui/react";
import useCustomMutation from "../hooks/useCustonMutation";

interface ITransaction {
  amount: number;
  comment: string;
  transactionRef: string;
  receiver: string;
  sender: string;
  status: string;
  receivingAccount: string;
  receivingBank: string;
  paymentMethod: string;
  accountNumber: string;
  paymentDate: string;
}

interface IRecordTransactionProps {
  ref: string;
  status: string;
  createdAt: string
}

export default function Home() {
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

  const recordTransaction = async ( {ref, status, createdAt}: IRecordTransactionProps ) => {
    try {
      const payload: ITransaction = {
        amount: 100,
        comment: "test",
        sender: "000011111000001",
        receiver: "000011111000001",
        status: ref.status,
        transactionRef: ref.ref,
        paymentDate: ref.paymentDate

      }

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

  const config: any = {
    public_key: process.env.FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: 200,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: "0703456676",
      name: "john doe",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    if (activeStep == 2) {
      handleFlutterPayment({
        callback: async (response) => {
          console.log(response);
          await recordTransaction({
            ref: response.flw_ref,
            status: response.status,
            createdAt: response.created_at as unknown as string
          });
          closePaymentModal(); // this will close the modal programmatically
          setActiveStep(activeStep + 1);
        },
        onClose: () => {},
      });
    } else {
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
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                  />
                )}
                {activeStep == 2 && <Amount />}
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
