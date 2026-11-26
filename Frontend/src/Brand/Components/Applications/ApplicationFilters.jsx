import { Search, SlidersHorizontal, X } from "lucide-react";

const ApplicationFilters = ({
  search,
  setSearch,
  campaign,
  setCampaign,
  platform,
  setPlatform,
  sortBy,
  setSortBy,
  campaigns,
  onClear,
}) => {
  return (
    <div className="mb-5 rounded-2xl border border-white/[0.07] bg-[#171917] p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creator..."
            className="w-full rounded-xl border border-white/10 bg-[#101210] py-3 pl-10 pr-3 text-xs text-white outline-none placeholder:text-gray-600 focus:border-[#D0FF71]/40"
          />
        </div>

        <select
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#101210] px-3 py-3 text-xs text-gray-300 outline-none focus:border-[#D0FF71]/40"
        >
          <option value="all">All Campaigns</option>
          {campaigns.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#101210] px-3 py-3 text-xs text-gray-300 outline-none focus:border-[#D0FF71]/40"
        >
          <option value="all">All Platforms</option>
          <option value="Instagram">Instagram</option>
          <option value="YouTube">YouTube</option>
          <option value="Facebook">Facebook</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#101210] px-3 py-3 text-xs text-gray-300 outline-none focus:border-[#D0FF71]/40"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="followers">Most Followers</option>
          <option value="engagement">Highest Engagement</option>
          <option value="price-low">Lowest Price</option>
        </select>
      </div>

      {(search || campaign !== "all" || platform !== "all") && (
        <button
          type="button"
          onClick={onClear}
          className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-[#D0FF71]"
        >
          <X size={13} />
          Clear filters
        </button>
      )}
    </div>
  );
};

export default ApplicationFilters;