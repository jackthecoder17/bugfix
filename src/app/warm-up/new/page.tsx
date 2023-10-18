"use client"
import React from 'react'
import TextInput from '../components/TextInput'
import { useRouter } from 'next/navigation'

const CreateWarmup = () => {
  const router = useRouter()

  function handleSubmit(){
    router.push("/warm-up/new/details")
  }

  return (
    <section className="w-full h-full overflow-auto flex bg-gray-150">
      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <form className="bg-white p-5 lg:p-10 rounded-3xl border-[1px] border-[#C2C2C2] w-full max-w-[30rem] flex flex-col gap-7">
          <h3 className="text-2xl text-gray-800 font-medium">Create a new Warm-up</h3>
          <div className="w-full flex flex-col gap-3">
            <TextInput label='Warm-up Name' placeholder='New Warm-up list 1' />
            <p className="text-gray-500 text-xs">The name of the list can't contain more than 50 symbols</p>
          </div>
          <button type="button" onClick={handleSubmit} className="px-3 py-2 bg-blue rounded-md text-white">Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreateWarmup
