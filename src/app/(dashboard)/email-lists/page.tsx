"use client"
import Loader1 from '../components/Loader1'
import { routes } from '@/app/constants'
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'


const EmailLists = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(routes.REPLY_EMAILS)
  }, [])

  return (
    <section className="flex justify-center items-center p-5 bg-white h-full w-full overflow-auto">
      <Loader1 />
    </section>
  )
}

export default EmailLists
