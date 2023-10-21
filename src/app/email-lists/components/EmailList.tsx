export default function EmailList({results}: {
  results:  any[]
}){
  return (
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
}
