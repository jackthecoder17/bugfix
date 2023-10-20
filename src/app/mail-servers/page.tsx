"use client"
import { useRouter } from "next/navigation"
import EmptyListPlaceholder from "../components/EmptyListPlaceholder"
import { useState } from "react"
import Image from "next/image"
import CheckGreen from "@/app/assets/icons/svg/check-green.svg"
import CheckRed from "@/app/assets/icons/svg/check-red.svg"
import NotFound from "@/app/assets/images/illustrations/page-not-found.svg"
import PersonWithXMark from "@/app/assets/images/illustrations/result-not-found.svg"

let sampleMailServers = [
  {
    _id: "wwlkwk",
    no: "01",
    name: "Neww1",
    email: "anwar359**@gmail.com",
    day: 5,
    reputation: 70,
    bounceRate: 15,
    spamRate: 2
  },
  {
    _id: "asdkfjasdf",
    no: "02",
    name: "New mail service2",
    email: "sadiq65**@gmail.com",
    day: 8,
    reputation: 60,
    bounceRate: 20,
    spamRate: 2
  },
  {
    _id: "aklsdfnsdmf",
    no: "03",
    name: "Mail man mail service",
    email: "mailman232@yahoo.com",
    day: 20,
    reputation: 80,
    bounceRate: 10,
    spamRate: 1
  },
]


export default function MailService(){
  const [mailServers, setMailServers] = useState<typeof sampleMailServers>(sampleMailServers)
  // const [mailServers, setMailServers] = useState<typeof sampleMailServers>([])
  const router = useRouter()
  function goToCreateMailServer(){
    router.push("/mail-servers/new")
  }

  if (!mailServers || mailServers.length === 0){
    return (
      <EmptyListPlaceholder title="Warmup Mail Servers" ctaLabel="Add Mail Server" ctaAction={goToCreateMailServer}/>
    )
  }

  // const results = mailServers
  const results = null

  return (
    <section className='flex w-full h-full overflow-hidden'>
      <div className="flex w-full h-full overflow-x-auto border-x-[0.5px] text-sm">
        <div className="flex flex-col w-full min-w-[60rem]">
          <div className="grid grid-cols-7 gap-3 text-gray-800 p-4 lg:px-8 border-b-[0.5px]">
            <div className="">No</div>
            <div className="">Name</div>
            <div>Email</div>
            <div className="flex justify-center">Day</div>
            <div className="flex justify-center">Reputation</div>
            <div className="flex justify-center">Bounce Rate</div>
            <div className="flex justify-center">Spam Rate</div>
          </div>
          {
            mailServers.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div>
                    <Image src={NotFound} alt={"not-found illustration"}/>
                  </div>
                  <h2 className="text-gray-800 text-2xl text-center font-medium">Warmup not found</h2>
                  <p className="text-gray-500 text-sm text-center">We couldn't find Email that match your search. Please try using <br />different, fewer filters or typing another search request.</p>
                </div>
              </div>
            ):(
                (!results || results?.length  === 0) ? (
                  <div className="flex flex-col items-center justify-center text-center h-full w-full gap-5 p-3 md:p-5">
                    <div>
                      <Image src={PersonWithXMark} alt={"person with x mark"} />
                    </div>
                    <p className="text-gray-800 text-2xl">Result Not Found</p>
                    <p className="text-gray-500 text-sm">Whoops this information is not available <br /> for a moment Go Back</p>
                  </div>
                ) : (
                     <>
                      {
                        results.map(server => (
                          <div key={server._id} className="grid grid-cols-7 gap-3 text-gray-500 p-4 lg:px-8 border-b-[0.5px] w-full">
                            <div className="">{server.no}</div>
                            <div className="">{server.name}</div>
                            <div className="flex items-center w-full gap-1.5 break-all" >{server.email}</div>
                            <div className=""><p className="w-full text-center">{server.day}</p></div>
                            <div className="flex justify-center">{server.reputation}%</div>
                            <div className="flex justify-center">{server.bounceRate}%</div>
                            <div className="flex justify-center">{server.spamRate}%</div>
                          </div>
                        ))
                      }
                    </>
                  ) 
              )
          }
        </div>
      </div>
    </section>
  )
}

