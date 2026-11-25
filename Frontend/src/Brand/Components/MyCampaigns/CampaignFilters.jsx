import { Search, SlidersHorizontal, X } from "lucide-react";

const CampaignFilters = ({ search, onSearchChange, sort, onSortChange }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search campaigns..."
          className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#181A18] pl-11 pr-10 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
        />

        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="relative sm:w-52">
        <SlidersHorizontal
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-white/[0.08] bg-[#181A18] pl-10 pr-4 text-sm text-gray-300 outline-none focus:border-[#D0FF71]/50"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="budget-high">Highest Budget</option>
          <option value="budget-low">Lowest Budget</option>
          <option value="most-views">Most Views</option>
        </select>
      </div>
    </div>
  );
};

export default CampaignFilters;