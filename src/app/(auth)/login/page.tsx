import React from 'react'
import TextInput from '@/app/(auth)/components/TextInput'

const Login = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <TextInput placeholder="e.g. mail@domain.com" label="Email address"/>
      <TextInput placeholder="e.g. 2insksdioi23" label="Password" inputType="password"/>
      <button type="button" className="mt-2 bg-blue text-white rounded-md capitalize p-2 w-full outline-none">Login</button>
    </div>
  )
}

export default Login
