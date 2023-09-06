"use client";
import Image from "next/image";
import Analytics from "@/components/Analytics";
import ContactCard from "@/components/ContactCard";
import DonutChart from "@/components/DonutChart";
import SelectContact from "./SelectContact";
import Amount from "./Amount";
import Complete from "./Complete";
import { useState, useEffect } from "react";
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

                {activeStep == 1 && <SelectContact setActiveStep={setActiveStep} activeStep={activeStep} />}
                {activeStep == 2 && <Amount />}
                {activeStep == 3 && <Complete />}

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
                      onClick={() => {
                        activeStep < 3 && setActiveStep(activeStep + 1);
                      }}
                    >
                      {activeStep ==2 ? 'Process Payment' : 'Next'}
                      {activeStep ==2 ? <BsSendFill className='ml-3' /> : <FiArrowRight className='ml-3' />}
                    </button>
                  </div>
                )}


                {activeStep == 3 && (
                  <div className=' my-2 flex w-full gap-5'>
                    <button
                      className='mt-4 py-2 px-5 w-full bg-primary rounded text-white'
                      onClick={()=> console.log('Print Receipt')}
                    >
                      Print
                    </button>
                    <button
                      className='mt-4 ml-3 py-2 px-5 w-full bg-secondary-bg rounded text-primary-text'
                      onClick={()=> setActiveStep(1)}
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
