"use client"
import React from 'react'
import TextInput from '@/app/(dashboard)/components/TextInput'

export default function CreateMailServer() {
  return (
    <section className="w-full h-full overflow-auto flex bg-gray-150 px-5 py-10">
      <div className="w-full h-fit flex flex-col items-center just50y-center gap-5 ">
        <form className="bg-white p-5 lg:p-10 rounded-3xl border-[1px] border-[#C2C2C2] w-full max-w-[60rem] flex flex-col gap-7 h-fit">
          <div className="flex justify-between gap-3">
            <h3 className="text-xl text-blue font-medium">Mail Service</h3>
          </div>
          <div className="flex flex-col gap-12 h-full w-full">
            <div className="w-full flex flex-col md:flex-row gap-5">
              <TextInput label='Name of email service' placeholder='Enter your warm-up name' />
              <TextInput label='UID' placeholder='Enter your warm-up name' />
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-gray-800 text-xl">SMTP (sending emails)</h3>
              <div className="w-full flex flex-col md:flex-row gap-5">
                <TextInput label='Host' placeholder='Enter your warm-up name' />
                <TextInput label='Port' placeholder='Enter your warm-up name' />
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5">
                <TextInput label="From SMTP Email" placeholder="Enter your warm-up name" />
                <TextInput label="SMTP User" placeholder="Enter your warm-up name" />
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <TextInput label="SMTP Password" placeholder="Enter your warm-up name" />
              </div>
              <button type="button" className="px-5 md:px-10 py-2 bg-blue rounded-md text-white w-fit">Verify</button>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-gray-800 text-xl">IMAP (receiving emails)</h3>
              <div className="w-full flex flex-col md:flex-row gap-5">
                <TextInput label='Host' placeholder='Enter your warm-up name' />
                <TextInput label='Port' placeholder='Enter your warm-up name' />
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5">
                <TextInput label="From IMAP Email" placeholder="Enter your warm-up name" />
                <TextInput label="SMTP User" placeholder="Enter your warm-up name" />
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <TextInput label="IMAP Password" placeholder="Enter your warm-up name" />
              </div>
              <button type="button" className="px-5 md:px-10 py-2 bg-blue rounded-md text-white w-fit">Verify</button>
            </div>
            <button type="button" className="px-5 md:px-10 py-2 bg-blue rounded-md text-white w-fit">Continue</button>
          </div>
        </form>
      </div>
    </section>
  )
}
