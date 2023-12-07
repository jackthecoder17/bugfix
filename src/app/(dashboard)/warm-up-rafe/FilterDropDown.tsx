"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const options = [
  {
    name: "All",
    filter: "all",
  },
  {
    name: "Running",
    filter: "running",
  },
  {
    name: "Completed",
    filter: "completed",
  },
  {
    name: "Failed",
    filter: "failed",
  },
  {
    name: "Not Started",
    filter: "not-started",
  },
  {
    name: "Paused",
    filter: "paused",
  },
];

export function FilterDropDown() {
  const [opened, setOpened] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setOpened(false);
      }
    }

    if (opened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened]);

  function handleActive(name: string) {
    if (name === "all" && !filter) {
      return true;
    }
    return name === filter;
  }

  return (
    <div className="max-w-[20rem] w-full relative">
      <button
        onClick={() => setOpened(!opened)}
        className="flex items-center justify-between w-full p-2.5 text-sm border rounded-md"
      >
        <div className="text-sm font-light">Filter</div>
        <FaAngleRight
          className={`${
            opened ? "rotate-90" : "rotate-0"
          } transition-all duration-300`}
        />
      </button>
      <dialog
        ref={dialogRef}
        open={opened}
        className="w-full p-1 bg-white border rounded-md"
      >
        {options.map((option, index) => (
          <Link
            key={index}
            href={`${pathName}?filter=${option.filter}`}
            className="w-full text-sm font-light"
          >
            <div
              className={`p-2 rounded-sm hover:bg-gray-200 transiton-all duration-300 ${
                handleActive(option.filter) && "bg-gray-200"
              }`}
            >
              {option.name}
            </div>
          </Link>
        ))}
      </dialog>
    </div>
  );
}
