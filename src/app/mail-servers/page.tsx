"use client"
import { useRouter } from "next/navigation"
import EmptyListPlaceholder from "../components/EmptyListPlaceholder"
import NotFound from "@/app/assets/images/illustrations/page-not-found.svg"
import PersonWithXMark from "@/app/assets/images/illustrations/result-not-found.svg"
import { useAppSelector } from "../store/hooks"
import { selectMailServers } from "../store/slices/mailServersSlice"

export default function MailService(){
  const mailServers = useAppSelector(selectMailServers)
  const router = useRouter()
  function goToCreateMailServer(){
    router.push("/mail-servers/new")
  }

  if (!mailServers || mailServers.length === 0){
    return (
      <EmptyListPlaceholder title="Warmup Mail Servers" ctaLabel="Add Mail Server" ctaAction={goToCreateMailServer}/>
    )
  }

  const results: typeof mailServers | null = mailServers

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
                    <NotFound />
                  </div>
                  <h2 className="text-gray-800 text-2xl text-center font-medium">Warmup not found</h2>
                  <p className="text-gray-500 text-sm text-center">We couldn't find Email that match your search. Please try using <br />different, fewer filters or typing another search request.</p>
                </div>
              </div>
            ):(
                (!results || (results && results.length  === 0)) ? (
                  <div className="flex flex-col items-center justify-center text-center h-full w-full gap-5 p-3 md:p-5">
                    <div>
                      <PersonWithXMark />
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

