import ContactCard from "@/components/ContactCard";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { useState } from "react";

interface SelectContactProps {
  setActiveStep: Function;
  activeStep: number;
}

const SelectContact = ({ setActiveStep, activeStep }: any) => {
  const [contact, setContact] = useState();

  const selectContact = (item: any) => {
    setContact(item);
    setActiveStep(activeStep + 1);
  };

  return (
    <div className='min-h-[350px]'>
      <Tabs colorScheme='green'>
        <TabList>
          <Tab>My Contacts</Tab>
          <Tab>New Contact</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div>
              <input
                type='text'
                placeholder='Search contacts'
                aria-label='Search contacts'
                className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
              />

              <div className='h-[350px] my-3 overflow-y-scroll'>
                <ContactCard setContact={selectContact} contact={null} />
                <ContactCard setContact={selectContact} contact={null} />
                <ContactCard setContact={selectContact} contact={null} />
                <ContactCard setContact={selectContact} contact={null} />
                <ContactCard setContact={selectContact} contact={null} />
                <ContactCard setContact={selectContact} contact={null} />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='relative mt-6 space-y-5'>
              <input
                type='text'
                placeholder='Full Name'
                aria-label='Full Name'
                className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20'
              />

              <input
                type='email'
                placeholder='Email'
                aria-label='Email'
                className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
              />

              <input
                type='text'
                placeholder='Phone'
                aria-label='Phone'
                className='block focus:outline-none w-full bg-secondary-bg rounded-md py-4 pl-6 pr-20 '
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SelectContact;
