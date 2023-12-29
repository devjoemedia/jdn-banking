"use client";
import Complete from "../Complete";
import { BsSendFill } from "react-icons/bs";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import useCustonFetch from "app/hooks/useCustonFetch";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createTransactionReference } from "app/lib/utils";
import HighestTransactions from "@/components/HighestTransactions";
import Print from "@/components/Print";
import { useSearchParams } from 'next/navigation'

export interface ITransaction {
  amount: number;
  comment: string;
  transactionRef: string;
  receiver: { name: string; email: string };
  sender: { name: string; email: string };
  status: string;
  receivingBank?: string;
  paymentMethod?: string;
  createdAt: number;
}

export default function Send() {
  const searchParams = useSearchParams()
   
  const ref = searchParams.get('ref')

  const {data:transaction, isLoading} = useCustonFetch({url: `/transactions/${ref}`, queryKey: ['transaction_'+ref]})

  return (
    <div>
      <div className='p-0 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>
        <div className='lg:grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
          <div className='col-span-2 gap-x-6'>
            <div className='w-full min-h-[400px] bg-primary-bg hover:cursor-pointer p-5 flex-1'>
              {isLoading ? <p className='text-center text-secondary-text'>Loading transaction details</p>: <Complete data={transaction}/>}
            </div>
          </div>

          <div className='hidden lg:block hover:cursor-pointer '>
            <HighestTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
