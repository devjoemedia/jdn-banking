import React from "react";
import useCustonFetch from "app/hooks/useCustonFetch";
import TransactionCard from "@/components/TransactionCard";

const HighestTransactions = () => {
  const { data } = useCustonFetch({
    url: "/transactions",
    queryKey: ["allTransactions"],
  });

  const transactions = data?.transactions?.sort(
    (a: any, b: any) => b.amount - a.amount
  );

  return (
    <div className='text-primary-text shadow-md bg-primary-bg mb-2 py-2'>
      <p className='text-xl font-semibold px-5 mb-5'>Top (6) Transactions</p>

      {transactions?.slice(0, 6)?.map((item: any) => (
        <TransactionCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default HighestTransactions;
