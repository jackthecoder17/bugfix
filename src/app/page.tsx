"use client"
import Loader1 from "./components/Loader1"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/warm-ups")
  }, [])

  return (
  <section className="flex justify-center items-center p-5 bg-white h-full w-full overflow-auto">
      <Loader1 />
    </section>
  )
}
