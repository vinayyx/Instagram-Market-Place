import { Inbox, Search } from "lucide-react";

const EmptyApplications = ({ hasFilters, onClear }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#171917] px-5 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D0FF71]/10">
        {hasFilters ? (
          <Search size={24} className="text-[#D0FF71]" />
        ) : (
          <Inbox size={24} className="text-[#D0FF71]" />
        )}
      </div>

      <h3 className="mt-5 text-sm font-semibold text-white">
        {hasFilters ? "No applications found" : "No applications yet"}
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-6 text-gray-500">
        {hasFilters
          ? "Try changing your search or filters to find applications."
          : "When creators apply to your campaigns, their applications will appear here."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-xl bg-[#D0FF71] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#c2f45f]"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyApplications;