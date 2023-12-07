import RequireAuth from "../contexts/requireAuth";
import { FilterDropDown } from "./FilterDropDown";
import { SearchBar } from "./SearchBar";
import { Table } from "./TableRow";
import { TopButton } from "./TopButton";

interface WithSearchParam {
  searchParams: {
    [key: string]: string;
  };
}

export default function Rafe({ searchParams }: WithSearchParam) {
  const filter = searchParams.filter;
  const search = searchParams.search;
  return (
    <RequireAuth>
      <main className="container h-full p-2 mx-auto border-l space-y-6">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <TopButton status="delete" />
            <TopButton status="pause" />
            <TopButton status="resume" />
          </div>
          <div className="flex items-center justify-end w-full gap-3">
            <FilterDropDown />
            <SearchBar />
          </div>
        </header>
        <section>
          <Table />
        </section>
      </main>
    </RequireAuth>
  );
}
