"use client";
// TODO: Render things based on states which you can get  from the react query object
import { AllWarmupServersApi } from "@/app/api/allwarmupserversapi";
import CheckGreen from "@/app/assets/icons/svg/check-green.svg";
import CheckRed from "@/app/assets/icons/svg/check-red.svg";
import CheckYellow from "@/app/assets/icons/svg/check-yellow.svg";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatDateToDDMMYYYY } from "../email-lists/components/formatdate";

interface CheckedRowsState {
  [key: string]: boolean;
}
const tableHead = [
  "Name",
  "Status",
  "Emails Sent",
  "Created At",
  "Max Days",
  "Actions",
];

export function Table() {
  let index = 0;
  async function fetchWarmups() {
    const response = await AllWarmupServersApi(index);
    const data: EmailMarketingProcess = await response.data;
    const resultsWithChecked = data.results.map((warmup) => ({
      ...warmup,
      checked: false,
    }));
    return resultsWithChecked;
  }
  const { data: warmups } = useQuery({
    queryKey: ["warmups"],
    queryFn: () => fetchWarmups(),
  });

  const [checkedRows, setCheckedRows] = useState<CheckedRowsState>({});

  function handleSelectAll() {
    const areAllChecked = Object.values(checkedRows).every(Boolean);
    const updatedCheckedRows: CheckedRowsState = {};

    if (!areAllChecked && warmups) {
      warmups.forEach((warmup) => {
        updatedCheckedRows[warmup._id] = true;
      });
    }

    setCheckedRows(updatedCheckedRows);
  }

  function handleCheckboxChange(id: string) {
    setCheckedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  if (warmups)
    return (
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2 whitespace-nowrap">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={Object.values(checkedRows).every(Boolean)}
              />
            </th>
            {tableHead.map((head, index) => (
              <th key={index} className="p-2 whitespace-nowrap">
                <div className="text-sm font-light">{head}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {warmups.map((warmup, index) => (
            <tr
              key={index}
              className="hover:bg-gray-200/20 transition-all duration-300"
            >
              <td className="flex justify-center p-2">
                <input
                  type="checkbox"
                  checked={checkedRows[warmup._id]}
                  onChange={() => handleCheckboxChange(warmup._id)}
                />
              </td>
              <td className="p-2 text-center">{warmup.name}</td>
              <td className="flex justify-center p-2 gap-3">
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
                <>{warmup.state}</>
              </td>
              <td className="p-2 text-center">{warmup.totalAddressesMailed}</td>
              <td className="p-2 text-center">
                {formatDateToDDMMYYYY(warmup.createdAt)}
              </td>
              <td className="p-2 text-center">{warmup.maxDays}</td>
              <td className="flex justify-center p-2">
                <button className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-300 focus:outline-none">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  return <></>;
}
