"use client"
import Hero from "@/app/assets/images/illustrations/home.svg"
import Image from "next/image"
import { IconContext } from "react-icons"
import { FaPlus } from "react-icons/fa"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Home() {
  return (
  <section className="flex justify-center items-center p-5 bg-white h-full w-full overflow-auto">
      <div className="flex flex-col justify-center items-center gap-5 text-gray-800">
        <div>
          <Image src={Hero} alt="hero image" />
        </div>
        <h2 className={`text-4xl font-semibold text-center ${montserrat.className}`}>Connect accounts to keep <br/> Warm-up & Send emails </h2>
        <p className="text-gray-800 text-center">Warm up your mailbox to improve deliverability, grow sender reputation <br className="hidden md:block" /> and prepare new email accounts for campaigns.</p>
        <button type="button" className="capitalize rounded-[7px] bg-blue text-white  flex gap-4 items-center px-6 py-2">
          <IconContext.Provider value={{ color: "" }}>
            <FaPlus />
          </IconContext.Provider>
          <span>add new</span>
        </button>
      </div>
    </section>
  )
}
