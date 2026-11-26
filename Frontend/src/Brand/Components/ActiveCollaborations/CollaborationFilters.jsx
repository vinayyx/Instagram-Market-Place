import { Search, SlidersHorizontal } from "lucide-react";

const CollaborationFilters = ({
  search,
  setSearch,
  activeTab,
  setActiveTab,
  sortBy,
  setSortBy,
}) => {
  const tabs = [
    { label: "All", value: "all" },
    { label: "In Progress", value: "in_progress" },
    { label: "Content Submitted", value: "content_submitted" },
    { label: "Under Review", value: "under_review" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creator or campaign..."
            className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#181A18] pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-gray-500" />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 rounded-xl border border-white/[0.08] bg-[#181A18] px-4 text-sm text-gray-300 outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="deadline">Deadline: Soonest</option>
            <option value="amount">Highest Amount</option>
          </select>
        </div>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              activeTab === tab.value
                ? "bg-[#D0FF71] text-black"
                : "border border-white/[0.07] bg-[#181A18] text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollaborationFilters;