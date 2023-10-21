import React, {DragEvent, useState} from 'react'
import { IconContext } from 'react-icons'
import { BsX as XMark } from 'react-icons/bs'

const DragNDrop = ({ close }: { close: () => void }) => {
  const [fileData, setFileData]  = useState<FileList | null>(null)
  const [isUploadingFiles, setIsUploadingFiles] = useState(false)
  const [fileUploadProgress, setFileUploadProgress] = useState(0)

  // store the data of the uploaded file, so it can be uploaded to the server
  function setSelectedFiles(files: FileList | null) {
    setIsUploadingFiles(false)
    setFileData(files)
  }

  function handleOnDragOver(e: DragEvent){
    e.preventDefault()
    console.log("drag over")
  }

  function handleOnDrop(e: DragEvent){
    e.preventDefault()
    setSelectedFiles(e.dataTransfer.files) 
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    console.log("upload file")
  }

  return (
    <section className="flex justify-center w-full h-full overflow-auto absolute inset-0 bg-opacity-80 bg-gray-100">
      <div className="flex  w-full items-center justify-center max-w-[35rem] p-2">
        {/* upload file section */}
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-center gap-5 px-2 pt-2 pb-10 border-[1px] bg-white border-gray-500 rounded-md border-dashed hover:border-blue " onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
            <button type="button" onClick={() => close()} className="self-end p-2 rounded-full hover:bg-gray-100 transition duration-200">
              <IconContext.Provider value={{ size: "1.5em"}}>
                <XMark />
              </IconContext.Provider>
            </button>
            <h3 className="text-2xl text-gray-800 font-medium">Upload or Drop File</h3>
            <label htmlFor="file-upload" className="rounded-md cursor-pointer bg-blue shadow-md text-white capitalize px-6 md:px-12 py-2">Choose File</label>
            <input type="file" id="file-upload" className="hidden" onChange={(e) => {
              e.preventDefault()
              setSelectedFiles(e.target.files)}
            }/>
            <p className="text-xs text-gray-500 text-center">Reply email tool supports CSV, XLS, XLSX and TXT file formats</p>
          </div>
          {
            isUploadingFiles && <progress value={fileUploadProgress} max={"100"} className="w-full pros-docs-progress"></progress>
          }
          <button onClick={handleSubmit} className={`bg-gray-placeholder ${!fileData ? "invisible": ""}  text-white rounded-md shadow-md px-4 py-1 self-end`}>upload</button>
        </form>
      </div>
    </section>
  )
}

export default DragNDrop
