"use client";
import SearchIcon from "@/app/assets/icons/svg/search.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <div className="flex items-center px-2 overflow-hidden border rounded-md gap-2">
        <SearchIcon />
        <input
          className="p-2 focus:outline"
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
            router.push(pathName + "?" + createQueryString("search", query));
          }}
          value={query}
        />
      </div>
    </div>
  );
}
