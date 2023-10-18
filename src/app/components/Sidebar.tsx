import React from 'react'
import Image from "next/image"
import Link from "next/link"
import Link2 from "../assets/icons/svg/cast.svg"
import Link3 from "../assets/icons/svg/Gmail.svg"
import Link4 from "../assets/icons/svg/server.svg"
import Link5 from "../assets/icons/svg/image 1.svg"
import Link6 from "../assets/icons/svg/settings.svg"

const Sidebar = () => {
  return (
    <section className='flex h-full'>
      <nav className="flex w-fit flex-col gap-2 justify-between bg-blue">
        <ul className="flex flex-col  h-full gap-3 justify-start p-2">
          <div className="h-full flex flex-col justify-start gap-5">
            <li className="cursor-pointer">
              <Link href={"#"}>
                <Image src={Link5} alt="" className="w-8 h-8" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"#"}>
                <Image src={Link2} alt="" className="w-6 h-6" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"#"}>
                <Image src={Link4} alt="" className="w-5 h-5" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"#"}>
                <Image src={Link3} alt="" className="w-5 h-5" />
              </Link>
            </li>
          </div>
          <li className="cursor-pointer justify-self-end">
            <Link href={"#"}>
              <Image src={Link6} alt="" className="w-6 h-6" />
            </Link>
          </li>
        </ul> 
      </nav>
      <section className="">

      </section>
    </section>
  )
}

export default Sidebar
