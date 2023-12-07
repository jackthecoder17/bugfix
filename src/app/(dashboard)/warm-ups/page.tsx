"use client";
import { AllWarmupServersApi } from "@/app/api/allwarmupserversapi";
import { DeleteWarmupApi } from "@/app/api/deletewarmupapi";
import { UpdateWarmupApi } from "@/app/api/updatewarmupapi";
import CheckGreen from "@/app/assets/icons/svg/check-green.svg";
import CheckRed from "@/app/assets/icons/svg/check-red.svg";
import CheckYellow from "@/app/assets/icons/svg/check-yellow.svg";
import DeleteIcon from "@/app/assets/icons/svg/delete.svg";
import PauseIcon from "@/app/assets/icons/svg/pause.svg";
import ResumeIcon from "@/app/assets/icons/svg/resume.svg";
import NotFound from "@/app/assets/images/illustrations/notfound.svg";
import { routes } from "@/app/constants";
import { useGlobalToastContext } from "@/app/contexts/GlobalToastProvider";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EmptyListPlaceholder from "../components/EmptyListPlaceholder";
import Search from "../components/Header/Search";
import Loader1 from "../components/Loader1";
import SelectInput from "../components/SelectInput";
import RequireAuth from "../contexts/requireAuth";
import { formatDateToDDMMYYYY } from "../email-lists/components/formatdate";
import { ViewAllModal } from "./components/viewallmodal";

function WarmUp() {
  console.log("Component Mounted");
  const [warmups, setWarmups] = useState<
    EmailMarketingProcess["results"] | any[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [checkboxes, setCheckboxes] = useState<Map<number, boolean>>(new Map());

  const [selectAll, setSelectAll] = useState(false);
  // State to control the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { showSuccessToast, showErrorToast } = useGlobalToastContext();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownStates, setDropdownStates] = useState<Map<number, boolean>>(
    new Map()
  );
  const [isEditDragNDropOpen, setIsEditDragNDropOpen] = useState(false);
  const router = useRouter();
  const index = 0;

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

  function toggleDropdown(dropdownId: number | null) {
    if (dropdownId) {
      const newDropdownStates = new Map(dropdownStates);
      newDropdownStates.set(dropdownId, !newDropdownStates.get(dropdownId));
      setDropdownStates(newDropdownStates);
      console.log(dropdownId);
    }
  }
  const handleEditModal = (rowId: any) => () => {
    localStorage.setItem("rowId", rowId);
    // Find the mail server object corresponding to the rowId
    if (warmups) {
      const selectedWarmUp = warmups.find((server) => server._id === rowId);

      // Check if the selectedMailServer is found
      if (selectedWarmUp) {
        // Save the selected object to localStorage
        console.log(selectedWarmUp);
        localStorage.setItem("selectedWarmUp", JSON.stringify(selectedWarmUp));
        setIsEditDragNDropOpen(true);
      } else {
        console.error("Mail server not found for the given rowId:", rowId);
      }
    }
  };

  useEffect(() => {
    async function fetchWarmups() {
      try {
        const response = await AllWarmupServersApi(index, null);
        const data: EmailMarketingProcess = await response.data;
        const resultsWithChecked = data.results.map((warmup) => ({
          ...warmup,
          checked: false, // Initialize 'checked' field to false
        }));
        setWarmups(resultsWithChecked);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchWarmups();
  }, []);

  // filtervalue and search query
  useEffect(() => {
    const fetchWarmups = async () => {
      setIsLoading(true);

      try {
        const response = await AllWarmupServersApi(
          index,
          searchQuery,
          filterValue
        );
        console.log(response.data);
        setWarmups(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchWarmups();
  }, [filterValue, searchQuery]);

  function goToCreateWarmup() {
    router.push(routes.NEW_WARM_UP);
  }

  if (!warmups || warmups.length === 0) {
    return (
      <EmptyListPlaceholder
        title="Everything you need to warm up your email"
        ctaLabel="Add Warm-Up"
        ctaAction={goToCreateWarmup}
      />
    );
  }

  async function handleDeleteRows() {
    try {
      setIsLoading(true);
      const warmupIds = selectedRows.map((row) => row);
      const data = JSON.stringify({ warmupIds });
      console.log(data);
      const response = await DeleteWarmupApi(data);
      console.log(response.data);
      setIsLoading(false);
      setSelectedRows([]);
      setSelectAll(false);
      showSuccessToast("Warmup deleted successfully");
      const fetchWarmups = async () => {
        setIsLoading(true);
        try {
          const response = await AllWarmupServersApi(index);
          console.log(response.data);
          setWarmups(response.data.results);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      fetchWarmups();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showErrorToast("Error deleting warmup");
    }
  }

  // handlePause function update
  async function handlePause() {
    try {
      setIsLoading(true);
      const warmupIds = selectedRows.map((row) => row);
      const data = {
        warmupIds: warmupIds,
        state: "pause",
      };
      const response = await UpdateWarmupApi(data);
      console.log(response.data);
      setIsLoading(false);
      setSelectedRows([]);
      setSelectAll(false);
      showSuccessToast("Warmup paused successfully");

      const fetchWarmups = async () => {
        setIsLoading(true);
        try {
          const response = await AllWarmupServersApi(index);
          console.log(response.data);
          setWarmups(response.data.results);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      fetchWarmups();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showErrorToast("Error pausing warmup");
    }
  }
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  async function handleResume() {
    try {
      setIsLoading(true);
      const warmupIds = selectedRows.map((row) => row);
      const data = {
        warmupIds: warmupIds,
        state: "resume",
      };
      const response = await UpdateWarmupApi(data);
      console.log(response.data);
      setIsLoading(false);
      setSelectedRows([]);
      setSelectAll(false);
      showSuccessToast("Warmup resumed successfully");
      const fetchWarmups = async () => {
        setIsLoading(true);
        try {
          const response = await AllWarmupServersApi(index);
          console.log(response.data);
          setWarmups(response.data.results);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      fetchWarmups();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showErrorToast("Error resuming warmup");
    }
  }

  return (
    <RequireAuth>
      <section className="flex w-full h-full overflow-hidden">
        {isLoading && (
          <div
            style={{
              position: "absolute",
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
        {isEditDragNDropOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center w-full overflow-y-auto">
            <ViewAllModal onClose={setIsEditDragNDropOpen} />
          </div>
        )}
        {
          // delete confirmation modal
          showDeleteModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center w-full overflow-y-auto">
              <div className="p-10 text-center bg-white rounded shadow-lg">
                <h2 className="mb-10">Are you sure you want to delete?</h2>
                <div className="flex justify-center">
                  <button
                    onClick={handleDeleteRows}
                    className="w-fit bg-[#dd2222] px-3 py-1 disabled:opacity-20 rounded-md text-white"
                  >
                    Confirm Delete
                  </button>
                  <button
                    onClick={toggleDeleteModal}
                    className="px-3 py-1 ml-2 text-white bg-gray-800 w-fit disabled:opacity-20 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        }
        <div className="flex flex-col w-full h-full overflow-x-auto border-x-[0.5px] text-sm">
          {/* action buttons */}
          <div className="flex justify-between items-center min-w-[60rem]">
            <div className="flex w-full p-2">
              <button
                className="flex items-center w-fit bg-[#dd2222] px-3 py-2 text-base disabled:opacity-20 rounded-md text-white"
                onClick={toggleDeleteModal}
                disabled={selectedRows.length === 0}
              >
                <DeleteIcon />
              </button>

              {/* pause */}
              <button
                className="w-fit bg-[#FFFF00] px-3 py-2 text-base disabled:opacity-20 rounded-md text-black ml-2"
                disabled={selectedRows.length === 0}
                onClick={handlePause}
              >
                <PauseIcon />
              </button>
              {/* resume */}
              <button
                className="w-fit bg-[#28B446] px-3 py-2 text-base disabled:opacity-20 rounded-md text-white ml-2"
                disabled={selectedRows.length === 0}
                onClick={handleResume}
              >
                <ResumeIcon />
              </button>
            </div>
            {/* select input */}
            <div className="flex items-center justify-center w-full p-2 mr-3 gap-3">
              <SelectInput
                value={filterValue}
                onChange={(selectedValue) => setFilterValue(selectedValue)}
                placeholder="Filter"
                options={[
                  { value: "", text: "All" },
                  { value: "running", text: "Running" },
                  { value: "completed", text: "Completed" },
                  { value: "failed", text: "Failed" },
                  { value: "notStarted", text: "Not Started" },
                  { value: "paused", text: "Paused" },
                ]}
              />
              <Search
                placeholder={"Search Emails"}
                onChange={(value) => setSearchQuery(value)}
                hideFlare={true}
              />
            </div>
          </div>

          <div className="flex flex-col w-full min-w-[60rem]">
            <div className="grid grid-cols-7  p-4 lg:px-8 border-b-[0.5px]">
              <div className="flex justify-center">
                <input type="checkbox" />
              </div>
              <div className="flex justify-center text-gray-800">Name</div>
              <div className="flex justify-center text-gray-800">Status</div>
              <div className="flex justify-center text-gray-800">
                Emails Sent
              </div>
              <div className="flex justify-center text-gray-800">CreatedAt</div>
              <div className="flex justify-center text-gray-800">MaxDays</div>
              <div className="flex justify-center text-gray-800">Actions</div>
            </div>
            {warmups.length === 0 ? (
              // warmups.length === 0
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="mt-10">
                    <NotFound />
                  </div>
                  <h2 className="text-2xl font-medium text-center text-gray-800">
                    Warmup not found
                  </h2>
                  <p className="text-sm text-center text-gray-500">
                    We couldn't find Email that match your search. Please try
                    using <br />
                    different, fewer filters or typing another search request.
                  </p>
                </div>
              </div>
            ) : (
              warmups.map((warmup) => (
                <div
                  className="grid grid-cols-7 p-4 lg:px-8 border-b-[0.5px]"
                  key={warmup._id}
                >
                  <div className="flex justify-center w-full">
                    {warmup.checked ? "apple" : "butter"}
                    <input
                      type="checkbox"
                      checked={warmup.checked}
                      onChange={() => {
                        setWarmups((prevWarmups) =>
                          prevWarmups.map((prevWarmup) =>
                            prevWarmup._id === warmup._id
                              ? { ...prevWarmup, checked: !prevWarmup.checked }
                              : prevWarmup
                          )
                        );
                      }}
                    />
                  </div>
                  <div className="flex mx-auto text-center">{warmup.name}</div>
                  <div className="flex justify-center items-center w-full mx-auto gap-1.5">
                    <div className="w-4 h-4">
                      {warmup.state === "notStarted" ? (
                        <CheckYellow />
                      ) : warmup.state === "running" ? (
                        <CheckGreen />
                      ) : warmup.state === "completed" ? (
                        <CheckGreen />
                      ) : warmup.state === "failed" ? (
                        <CheckRed />
                      ) : (
                        <CheckYellow />
                      )}
                    </div>
                    <p>{warmup.state}</p>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    {warmup.totalAddressesMailed}
                  </div>
                  <div className="flex items-center justify-center w-full mx-auto">
                    {
                      // warmup.createdAt
                      formatDateToDDMMYYYY(warmup.createdAt)
                    }
                  </div>
                  <div className="flex items-center justify-center w-full">
                    {warmup.maxDays}
                  </div>
                  <div className="flex items-center justify-center w-full text-center">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(warmup._id)}
                        className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
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
                      {/* dropdownStates.get(warmup._id) && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white shadow-xl rounded-md"
                        >
                          <button
                            onClick={handleEditModal(warmup._id)}
                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
                          >
                            View Contents
                          </button>
                        </div>
                      ) */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </RequireAuth>
  );
}

export default WarmUp;
