'use client'
import CreateBankModal from '@/components/CreateBankModal'
import useCustonFetch from 'app/hooks/useCustonFetch';

const BankAccounts = () => {
  const {data} = useCustonFetch({url: '/banks', queryKey: ['allBanks']})

  return (
    <div>
      <div className='p-5 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
          <div className='col-span-2 gap-x-6 shadow-md rounded bg-primary-bg p-3 w-[100%]  min-h-[400px]'>
            <div className='w-full flex justify-between items-center'>
              <caption className='p-5 text-lg font-semibold text-left text-primary-text  '>
                {/* Investments */}
                <p className='text-xl font-semibold'>My Banks</p>
                <p className='mt-1 text-sm font-normal text-secondary-text'>
                  Browse a list of all your banks.
                </p>
              </caption>
              <CreateBankModal />
            </div>

            <table className='w-full mt-5 text-sm text-left text-secondary-text '>
              <thead className='text-xs text-primary-text border-b border-primary-bg uppercase bg-secondary-bg'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Balance
                  </th>
                  <th scope='col' className='px-6 py-3 text-right'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {data?.banks?.map((item:any)=>(
                <tr key={item._id} className='bg-secondary-bg border-b border-primary-bg'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-primary-text whitespace-nowrap '
                  >
                    {item.name}
                  </th>

                  <td className='px-6 py-4'>
                     <p>GH₵ {item?.balance?.toFixed(2)}</p>
                  </td>

                  <td className='px-6 py-4 text-right'>
                     <p>Delete</p>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className=' hover:cursor-pointer '>
            <div className=' grid-cols-2 grid gap-5 min-h-[400px] hover:cursor-pointer flex-1'>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
              <div className=' shadow-md rounded  min-h-[200px] bg-primary-bg hover:cursor-pointer p-3 flex-1'>
                <p className=' text-2xl'>$600,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankAccounts