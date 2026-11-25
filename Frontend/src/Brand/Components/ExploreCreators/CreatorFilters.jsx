
import { Search, SlidersHorizontal, X } from "lucide-react";

const selectClass =
  "h-10 w-full rounded-xl border border-white/10 bg-[#191B19] px-3 text-xs text-gray-300 outline-none transition focus:border-[#D0FF71]/40";

const CreatorFilters = ({
  filters,
  onChange,
  categories,
  onReset,
}) => {
  const update = (key, value) => {
    onChange((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const hasFilters =
    filters.category !== "All Categories" ||
    filters.platform !== "All Platforms" ||
    filters.followers !== "Any Followers" ||
    filters.engagement !== "Any Engagement" ||
    filters.sort !== "Recommended";

  return (
    <div className="mb-6 rounded-2xl border border-white/[0.07] bg-[#171917] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#D0FF71]" />
          <h3 className="text-xs font-semibold text-white">
            Find Your Perfect Creator
          </h3>
        </div>

        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[10px] font-medium text-gray-500 transition hover:text-[#D0FF71]"
          >
            <X size={12} />
            Clear filters
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="relative mb-4">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Search by creator name, username or niche..."
          className="h-11 w-full rounded-xl border border-white/10 bg-[#101210] pl-10 pr-4 text-xs text-white outline-none transition placeholder:text-gray-600 focus:border-[#D0FF71]/40"
        />
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-5">
        <select
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
          className={selectClass}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filters.platform}
          onChange={(e) => update("platform", e.target.value)}
          className={selectClass}
        >
          <option value="All Platforms">All Platforms</option>
          <option value="Instagram">Instagram</option>
          <option value="YouTube">YouTube</option>
        </select>

        <select
          value={filters.followers}
          onChange={(e) => update("followers", e.target.value)}
          className={selectClass}
        >
          <option value="Any Followers">Any Followers</option>
          <option value="1K-10K">1K - 10K</option>
          <option value="10K-50K">10K - 50K</option>
          <option value="50K-100K">50K - 100K</option>
          <option value="100K-500K">100K - 500K</option>
          <option value="500K+">500K+</option>
        </select>

        <select
          value={filters.engagement}
          onChange={(e) => update("engagement", e.target.value)}
          className={selectClass}
        >
          <option value="Any Engagement">Any Engagement</option>
          <option value="3+">3% or more</option>
          <option value="5+">5% or more</option>
          <option value="7+">7% or more</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value)}
          className={selectClass}
        >
          <option value="Recommended">Recommended</option>
          <option value="Most Followers">Most Followers</option>
          <option value="Highest Engagement">Highest Engagement</option>
          <option value="Most Views">Most Views</option>
          <option value="Lowest Price">Lowest Price</option>
        </select>
      </div>
    </div>
  );
};

export default CreatorFilters;
