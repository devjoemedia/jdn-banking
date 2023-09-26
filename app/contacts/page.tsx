'use client'
import CreateContactModal from '@/components/CreateContactModal'
import useCustonFetch from 'app/hooks/useCustonFetch';
import HighestTransactions from "@/components/HighestTransactions";

const Contacts = () => {
  const {data} = useCustonFetch({url: '/contacts', queryKey: ['allContacts']})

  return (
    <div>
      <div className='p-3 md:p-8 space-y-5 flex-1 text-primary-text h-100 overflow-y-scroll'>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-0'>
          <div className='col-span-3 lg:col-span-2 gap-x-6 shadow-md rounded bg-primary-bg p-3 w-[100%]  min-h-[400px]'>
            <div className='w-full md:flex justify-between items-center'>
              <div className='p-5 text-lg font-semibold text-left text-primary-text  '>
                <p className='text-xl font-semibold'>My Contacts</p>
                <p className='mt-1 text-sm font-normal text-secondary-text'>
                  Browse a list of all your contacts.
                </p>
              </div>

              <CreateContactModal />
            </div>

            <table className='w-full mt-5 text-sm text-left text-secondary-text '>
              <thead className='text-xs text-primary-text border-b border-primary-bg uppercase bg-secondary-bg'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3 text-right'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.contacts?.map((item:any)=> (
                  <tr key={item._id} className='bg-secondary-bg border-b border-primary-bg'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-primary-text whitespace-nowrap '
                    >
                      {item.name}
                    </th>

                    <td className='px-6 py-4'>
                      <p>{item.email}</p>
                    </td>

                    <td className='px-6 py-4 text-right'>
                      <p>Delete</p>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>

          <div className='col-span-3 lg:col-span-1 mt-2 lg:mt-0 hover:cursor-pointer '>
            <HighestTransactions />
            {/* <div className='shadow-md rounded text-white min-h-[400px] bg-primary hover:cursor-pointer p-3 flex-1'>
              <p className=' text-2xl'>$600,000</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts