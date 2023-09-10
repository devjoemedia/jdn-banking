import ContactCard from "@/components/ContactCard";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { useState } from "react";

interface SelectContactProps {
  setActiveStep: Function;
  activeStep: number;
}

const SelectContact = ({ setContact, name, email, phone, setName, setPhone, setEmail }: any) => {

  const contact = {
    name: 'Joseph Nartey',
    email: 'joenart@example.com',
    phone: '00043458545'
  }

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
                <ContactCard setContact={setContact} contact={contact} />
                <ContactCard setContact={setContact} contact={contact} />
                <ContactCard setContact={setContact} contact={contact} />
                <ContactCard setContact={setContact} contact={contact} />
                <ContactCard setContact={setContact} contact={contact} />
                <ContactCard setContact={setContact} contact={contact} />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='relative mt-6 space-y-5'>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SelectContact;
