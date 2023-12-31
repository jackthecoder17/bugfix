"use client";
import { useState, useEffect, useRef } from "react";
import { DeleteListApi } from "@/app/api/deletelistapi";
import { AllEmailListApi } from "@/app/api/allemaillistapi";
import Loader1 from "../../components/Loader1";
import Funel from "@/app/assets/icons/svg/funel.svg";
import Search from "../../components/Header/Search";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { routes } from "@/app/constants";
import DragNDrop from "./DragNDrop";
import EditDragNDrop from "./editDragNDrop";
import { formatDateToDDMMYYYY } from "./formatdate";
import { useGlobalToastContext } from "@/app/contexts/GlobalToastProvider";
import path from "path";
export default function EmailList({
  results,
  setResults,
}: {
  results: any[];
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { showErrorToast, showSuccessToast } = useGlobalToastContext();
  const [dropdownStates, setDropdownStates] = useState<Map<number, boolean>>(
    new Map()
  );

  const buttons = [
    {
      text: "create reply email",
      url: "#",
    },
    {
      text: "create client email",
      url: "#",
    },
  ];
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragNDropOpen, setIsDragNDropOpen] = useState(false);
  const [isEditDragNDropOpen, setIsEditDragNDropOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [routeurl, setRouteUrl] = useState<string>("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropdown(null); // or however you close the dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/email-lists/reply-emails") {
      console.log("reply");
      setRouteUrl("replyEmails");
    } else if (path === "/email-lists/client-emails") {
      console.log("client");
      setRouteUrl("clientEmails");
    } else {
      setRouteUrl(""); // Set routeUrl to null if pathname doesn't match any condition
    }
    console.log(path);
  }, [path]); // This useEffect runs only once on initial mount due to the empty dependency array

  let button = buttons[0];
  const pathname = usePathname();
  if (pathname.startsWith(routes.CLIENT_EMAILS)) {
    button = buttons[1];
  }

  function openDragNDrop() {
    setIsDragNDropOpen(true);
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allRowIds = results.map((server) => server._id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const toggleDropdown = (dropdownId: number) => {
    const newDropdownStates = new Map(dropdownStates);
    newDropdownStates.set(dropdownId, !newDropdownStates.get(dropdownId));
    setDropdownStates(newDropdownStates);
    console.log(dropdownId);
  };

  const handleRowSelect = (rowId: number) => {
    let updatedSelectedRows = [...selectedRows];
    if (updatedSelectedRows.includes(rowId)) {
      updatedSelectedRows = updatedSelectedRows.filter((id) => id !== rowId);
    } else {
      updatedSelectedRows.push(rowId);
    }
    setSelectedRows(updatedSelectedRows);
  };
  const handleDeleteRows = async () => {
    if (selectedRows.length === 0) return;

    setIsLoading(true);

    try {
      const emailListIds = selectedRows.map((id) => id.toString()); // Convert IDs to strings if necessary

      const data = JSON.stringify({ emailListIds }); // Create the required data format

      // Make the API call to delete selected rows
      const response = await DeleteListApi(data);
      console.log(response); // Log success message
      showSuccessToast("Email List deleted successfully");
      const newResults = await AllEmailListApi(routeurl);
      setResults(newResults.data.emailLists);
      // Upon successful deletion, clear selected rows and stop the loader
      setSelectedRows([]);
    } catch (error) {
      console.log(error);
      showErrorToast("Unable to delete Email List");
    } finally {
      setIsLoading(false); // Stop loader whether deletion succeeds or fails
    }
  };
  const handleEditModal = (rowId: any) => () => {
    localStorage.setItem("rowId", rowId);
    console.log(rowId);
    setIsEditDragNDropOpen(true);
  };

  // Update the rendering logic for results based on the search query
  const filteredResults = results.filter((server) =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      {isDragNDropOpen && (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <DragNDrop
            close={() => setIsDragNDropOpen(false)}
            setResults={setResults}
          />
        </section>
      )}
      {isEditDragNDropOpen && (
        <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <EditDragNDrop
            close={() => setIsEditDragNDropOpen(false)}
            setResults={setResults}
          />
        </section>
      )}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Loader1 />
        </div>
      )}
      <div className="flex  justify-between w-full h-fit  items-center p-5">
        <button
          type="button"
          onClick={() => openDragNDrop()}
          className="capitalize rounded-[7px] bg-blue-500  text-white  flex items-center gap-4 px-6 py-2"
        >
          <IconContext.Provider value={{ color: "" }}>
            <FaPlus />
          </IconContext.Provider>
          <span>{button.text}</span>
        </button>
        <div className="w-fit">
          {pathname.startsWith(routes.CLIENT_EMAILS) ? (
            <Search
              placeholder={"Search Emails"}
              FlareIcon={<Funel />}
              hideSearchIcon={true}
              hideBorder={true}
              onChange={(value) => setSearchQuery(value)}
            />
          ) : (
            <Search
              placeholder={"Search Emails"}
              hideSearchIcon={true}
              hideBorder={true}
              hideFlare={true}
              onChange={(value) => setSearchQuery(value)}
            />
          )}
        </div>
      </div>
      <div>
        <button
          onClick={handleDeleteRows}
          disabled={selectedRows.length === 0}
          className=" bg-[red] text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed ml-10 mb-3
       "
        >
          Delete Selected
        </button>
      </div>
      <table className="overflow-auto border-collapse w-full">
        <thead>
          <tr>
            {/* button to select all */}
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Last Modified</th>
            <th className="px-4 py-2">Total Emails</th>
            <th className="px-4 py-2">List Type</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // Display a message if no results are found
            filteredResults.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center text-gray-800">
                  No results found
                </td>
              </tr>
            )
          }
          {filteredResults.map((server) => (
            <tr key={server._id} className="border-b border-gray-200">
              {/* checkbox to select each row */}
              <td className="px-4 py-2 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(server._id)}
                  onChange={() => handleRowSelect(server._id)}
                />
              </td>
              <td className="px-4 py-2 text-center">{server.name}</td>
              <td className="px-4 py-2 text-center">
                {formatDateToDDMMYYYY(server.createdAt)}
              </td>
              <td className="px-4 py-2 text-center">
                {formatDateToDDMMYYYY(server.lastModified)}
              </td>
              <td className="px-4 py-2 text-center">{server.totalEmails}</td>
              <td className="px-4 py-2 text-center">{server.emailListType}</td>
              <td className="px-4 py-2 text-center flex items-center justify-center">
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(server._id)}
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      viewBox="0 0 3 15"
                      fill="currentColor"
                    >
                      {/* Three dots SVG path */}
                      <circle cx="1.5" cy="2.5" r="1.5" />
                      <circle cx="1.5" cy="7.5" r="1.5" />
                      <circle cx="1.5" cy="12.5" r="1.5" />
                    </svg>
                  </button>
                  {dropdownStates.get(server._id) && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
                    >
                      {/* Dropdown content */}
                      <button
                        onClick={handleEditModal(server._id)}
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
