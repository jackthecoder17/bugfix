import React from 'react'
import TextInput from '@/app/(auth)/components/TextInput'

const Signup = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-3">
        <TextInput placeholder="e.g. John" label="Full Name"/>
        <TextInput placeholder="e.g. mail@domain.com" label="Email address"/>
      </div>
      <TextInput placeholder="e.g. john23" label="Username"/>
      <TextInput placeholder="e.g. 2insksdioi23" label="Password" inputType="password"/>
      <button type="button" className="mt-2 bg-blue text-white rounded-md capitalize p-2 w-full outline-none">Create Account</button>
    </div>
  )
}

export default Signup
