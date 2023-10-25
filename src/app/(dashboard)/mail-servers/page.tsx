"use client"
import { BsX as XMark } from "react-icons/bs"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import EmptyListPlaceholder from "../components/EmptyListPlaceholder"
import SearchNotFound from "../components/SearchNotFound"
import { useUserContext } from "../contexts/UserProvider"
import { routes } from "@/app/constants"
import { useGetMailServersQuery } from "../store/api/apiSlice"
import Loader1 from "../components/Loader1"
import { MailServer } from "@/app/types"
import { IconContext } from "react-icons"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

export default function MailServers(){
  const userData = useUserContext()
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const { data, isLoading, isError, refetch } = useGetMailServersQuery({ token: userData.token as string, index })


  useEffect(() => {
    console.log("index: ", index)
  }, [index])

  if (isLoading){
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader1 />
      </div>
    ) 
  }

  if (isError){
    return (
      <div>
        <p>Couldn't fetch mail servers</p>
        <button className="rounded-md px-3 py-2 bg-gray-500 text-white" onClick={() => refetch()} type="button">Try again</button>
      </div>
    )
  }

  if (!data){
    return (
      <div>
        <p>Couldn't fetch mail servers</p>
        <button className="rounded-md px-3 py-2 bg-gray-500 text-white" onClick={() => refetch()} type="button">Try again</button>
      </div>
    )
  }

  const searchTerm = "search"

  const mailServers = data?.results as MailServer[]
  const totalResults = data?.totalResults as number
  const firstItemCount = index + 1
  const lastItemCount = index + mailServers.length
  const hasNext = index + mailServers.length < totalResults
  const hasPrev = index - mailServers.length > 0

  function goToCreateMailServer(){
    router.push(routes.NEW_MAIL_SERVER)
  }

  function next(){
    if (index + mailServers.length < totalResults){
      setIndex(prev => prev + mailServers.length)
    }
  }

  function prev(){
    if (index - mailServers.length > 0){
      setIndex(prev => prev - mailServers.length)
    }
  }
  // <div className="grid grid-cols-8 gap-3 text-gray-800 p-4 lg:px-8 border-b-[0.5px]">
  //   <div className="">
  //     <input type="checkbox" className="scale-105 rounded-md" />
  //   </div>
  //   <div className="">No</div>
  //   <div className="">Name</div>
  //   <div>Email</div>
  //   <div className="flex justify-center">Day</div>
  //   <div className="flex justify-center">Reputation</div>
  //   <div className="flex justify-center">Bounce Rate</div>
  //   <div className="flex justify-center">Spam Rate</div>
  // </div>


  if (mailServers.length === 0){
    return (
      <EmptyListPlaceholder title="Mail Servers" ctaLabel="Add Mail Server" ctaAction={goToCreateMailServer}/>
    )
  }

  return (
    <section className='flex w-full h-full overflow-hidden'>
      <div className="flex w-full h-full border-x-[0.5px] text-sm">
        <div className="flex flex-col w-full">
          {
            // attempt to display the search results, after it's done loading, if there's a search Term
            searchTerm ? (
              mailServers.length === 0 ? (
                <SearchNotFound />
              ):(
                  <MailServersList results={mailServers} next={next} prev={prev} totalResults={totalResults} lastItemCount={lastItemCount} firstItemCount={firstItemCount} hasNext={hasNext} hasPrev={hasPrev}/>
                )
            ):(
                <MailServersList results={mailServers} next={next} prev={prev} totalResults={totalResults} lastItemCount={lastItemCount} firstItemCount={firstItemCount} hasNext={hasNext} hasPrev={hasPrev}/>
              )
          }
        </div>
      </div>
    </section>
  )
}


function MailServersList({results, next, prev, lastItemCount, firstItemCount, totalResults, hasNext, hasPrev}: {
  results:  MailServer[],
  next: () => void, 
  prev: () => void,
  lastItemCount: number,
  firstItemCount: number,
  totalResults: number,
  hasNext: boolean,
  hasPrev: boolean
}){
  const  [mailServer, setMailServer] = useState<null | MailServer>(null)
  const [isOpen, setIsOpen] = useState(false)

  function handleMailServerSelect(server: MailServer){
    setMailServer(server)
    setIsOpen(true)
  }

  // <div key={server._id} className="grid grid-cols-8 gap-3 text-gray-500 p-4 lg:px-8 border-b-[0.5px] w-full">
  //   <div className="">
  //     <input type="checkbox" className="scale-105 rounded-md" />
  //   </div>
  //   <div className="">{index + 1}</div>
  //   <div className="">{server.name}</div>
  //   <div className="flex items-center w-full gap-1.5 break-all" >{""}</div>
  //   <div className=""><p className="w-full text-center">{""}</p></div>
  //   <div className="flex justify-center">{server.addedOn.toString()}%</div>
  //   <div className="flex justify-center">{"29"}%</div>
  //   <div className="flex justify-center">{"23"}%</div>
  // </div>
  //


  return (
    <div className="flex gap-2 w-full h-full p-2 relative">
      <div className="relative w-full flex flex-col gap-3">
        <div className="flex">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="scale-105 rounded-md" />
            <p>Select all</p>
          </label>
        </div>
        <div className="flex flex-col h-full w-full overflow-auto">
          <div className="flex flex-col gap-2 w-full h-fit ">
            {
              results.map((server, index) => { 
                const itemNumber = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(index + 1)
                return (
                  <div key={server._id} role="button" className={`w-full text-gray-500 border-2 border-gray-100 rounded-md hover:bg-gray-100 px-3 py-2 ${ server._id === mailServer?._id ? "bg-gray-100":"bg-[#fafafa]" }`} onClick={() => handleMailServerSelect(server)}>
                    <div>
                      <div className="flex gap-2 items-center flex-col lg:flex-row">
                        <input type="checkbox" className="scale-105 rounded-md" />
                        <h3 className="line-clamp-1 w-full text-xl text-gray-800">{itemNumber }.  { server.name }</h3>
                      </div>
                      <div className="flex gap-2 items-center flex-col lg:flex-row">
                        <p className="text-gray-500">added on: { (new Date(server.addedOn).toDateString()).toString() }</p>
                      </div>
                    </div>
                  </div>
                )})
            }
          </div>
        </div>
        <div className="flex gap-2 items-center w-full justify-center">
          <p>{ `${firstItemCount} - ${ lastItemCount } of ${ totalResults }` }</p>
          <button type="button" onClick={prev} disabled={hasPrev === false} className="disabled:cursor-not-allowed disabled:opacity-50">
            <IconContext.Provider value={{ size: "2.5em", className: `rounded-md hover:bg-gray-500 bg-white p-2 transition hover:text-white` }}>
              <FaAngleLeft />
            </IconContext.Provider>
          </button>
          <button type="button"  onClick={next} disabled={ hasNext === false } className="disabled:cursor-not-allowed disabled:opacity-50">
            <IconContext.Provider value={{ size: "2.5em", className: `rounded-md hover:bg-gray-500 bg-white p-2 transition hover:text-white` }}>
              <FaAngleRight  />
            </IconContext.Provider>
          </button>
        </div>
      </div>

      <div className={`w-full h-full md:p-3 bg-gray-100 absolute md:relative md:w-3/5 xl:w-3/4 text-gray-800 rounded-md flex flex-col overflow-y-auto transition duration-300 ${isOpen ? "translate-x-0 md:translate-x-0":"translate-x-full md:translate-x-0"}`}>
        {
          mailServer ? (
            <>
              <div className="flex">
                <div className="w-full px-3 py-2">
                  <div className="flex gap-2 items-center justify-between">
                    <h2 className="text-2xl">{`${mailServer.name}`}</h2>
                    <p className="text-xs px-2 py-1 rounded-full bg-white text-gray-placeholder line-clamp-1 text-ellipsis">added on: { new Date(mailServer.addedOn).toDateString() }</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center md:justify-between text-gray-placeholder gap-2 text-sm">
                    <p>lastModified: { new Date(mailServer.lastModified).toDateString() }</p>
                    <Link href={`${routes.MAIL_SERVERS}/${mailServer._id}`} className="px-3 py-1 bg-blue-500 text-white rounded-md">edit</Link>
                  </div>
                </div>
                <div className="flex justify-end px-2 pt-2 md:hidden" >
                  <button type="button" onClick={() => setIsOpen(false)}>
                    <IconContext.Provider value={{ size: "3rem", className: "hover:bg-[#ddd] rounded-full transition duration-200 p-2" }}>
                      <XMark />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-5 p-2 md:p-3">
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg">IMAP Details</h4>
                  <div className="flex flex-col">
                    <p>hostname: { mailServer.imapDetails.hostname }</p>
                    <p>port: { mailServer.imapDetails.port }</p>
                    <p>email: { mailServer.imapDetails.email }</p>
                    <p>password: { mailServer.imapDetails.password }</p>
                    <p>security: <span className="uppercase">{ mailServer.imapDetails.security }</span></p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg">SMTP Details</h4>
                  <div className="flex flex-col">
                    <p>hostname: { mailServer.smtpDetails.hostname }</p>
                    <p>port: { mailServer.smtpDetails.port }</p>
                    <p>email: { mailServer.smtpDetails.email }</p>
                    <p>password: { mailServer.smtpDetails.password }</p>
                    <p>security: <span className="uppercase">{ mailServer.smtpDetails.security }</span></p>
                  </div>
                </div>
              </div>
            </>
          ):(
              <></>
            )
        }
      </div>

    </div>
  )
}

