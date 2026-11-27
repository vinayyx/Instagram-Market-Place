import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

const selectClass =
  "h-10 w-full min-w-0 appearance-none rounded-xl border bg-[#191B19] pl-3 pr-9 text-xs outline-none transition focus:border-[#D0FF71]/50 focus-visible:ring-2 focus-visible:ring-[#D0FF71]/20";

const Field = ({ label, active, children }) => (
  <label className="flex min-w-0 flex-col gap-1.5">
    <span className="text-[10px] font-medium text-gray-500">{label}</span>

    <div className="relative">
      {children(
        active
          ? "border-[#D0FF71]/40 text-white"
          : "border-white/10 text-gray-300 hover:border-white/20",
      )}

      <ChevronDown
        size={14}
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
          active ? "text-[#D0FF71]" : "text-gray-500"
        }`}
      />
    </div>
  </label>
);

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
    filters.creatorType !== "All Types" ||
    filters.category !== "All Categories" ||
    filters.platform !== "All Platforms" ||
    filters.followers !== "Any Followers" ||
    filters.engagement !== "Any Engagement" ||
    filters.sort !== "Recommended";

  return (
    <div className="mb-6 rounded-2xl border border-white/[0.07] bg-[#171917] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D0FF71]/15 bg-[#D0FF71]/[0.08]">
            <SlidersHorizontal size={15} className="text-[#D0FF71]" />
          </span>

          <div className="min-w-0">
            <h3 className="truncate text-xs font-semibold text-white sm:text-[13px]">
              Find Your Perfect Creator
            </h3>
            <p className="hidden truncate text-[10px] text-gray-500 sm:block">
              Search and narrow down by type, niche, reach and engagement
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex shrink-0 items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] font-medium text-gray-400 transition hover:border-[#D0FF71]/30 hover:text-[#D0FF71] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40"
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
          className="h-11 w-full rounded-xl border border-white/10 bg-[#101210] pl-10 pr-4 text-xs text-white outline-none transition placeholder:text-gray-600 focus:border-[#D0FF71]/50 focus-visible:ring-2 focus-visible:ring-[#D0FF71]/20"
        />
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        <Field label="Type" active={filters.type !== "All Types"}>
          {(tone) => (
            <select
              value={filters.creatorType}
              onChange={(e) => update("creatorType", e.target.value)}
              className={`${selectClass} ${tone}`}
            >
              <option value="">All Types</option>
              <option value="theme_page">Theme Page</option>
              <option value="individual">Creator</option>
            </select>
          )}
        </Field>

        <Field label="Category" active={filters.category !== "All Categories"}>
          {(tone) => (
            <select
              value={filters.category}
              onChange={(e) => update("category", e.target.value)}
              className={`${selectClass} ${tone}`}
            >
               <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field label="Platform" active={filters.platform !== "All Platforms"}>
          {(tone) => (
            <select
              value={filters.platform}
              onChange={(e) => update("platform", e.target.value)}
              className={`${selectClass} ${tone}`}
            >
              <option value="All Platforms">All Platforms</option>
              <option value="Instagram">Instagram</option>
            </select>
          )}
        </Field>

        <Field label="Followers" active={filters.followers !== "Any Followers"}>
          {(tone) => (
            <select
              value={filters.followers}
              onChange={(e) => update("followers", e.target.value)}
              className={`${selectClass} ${tone}`}
            >
              <option value="Any Followers">Any Followers</option>
              <option value="1K-10K">1K - 10K</option>
              <option value="10K-50K">10K - 50K</option>
              <option value="50K-100K">50K - 100K</option>
              <option value="100K-500K">100K - 500K</option>
              <option value="500K+">500K+</option>
            </select>
          )}
        </Field>

        <Field
          label="Engagement"
          active={filters.engagement !== "Any Engagement"}
        >
          {(tone) => (
            <select
              value={filters.engagement}
              onChange={(e) => update("engagement", e.target.value)}
              className={`${selectClass} ${tone}`}
            >
              <option value="Any Engagement">Any Engagement</option>
              <option value="3+">3% or more</option>
              <option value="5+">5% or more</option>
              <option value="7+">7% or more</option>
            </select>
          )}
        </Field>

        <Field label="Sort by" active={filters.sort !== "Recommended"}>
          {(tone) => (
            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
              className={`${selectClass} ${tone}`}
            >
              <option value="Recommended">Recommended</option>
              <option value="Most Followers">Most Followers</option>
              <option value="Highest Engagement">Highest Engagement</option>
              <option value="Most Views">Most Views</option>
            </select>
          )}
        </Field>
      </div>
    </div>
  );
};

export default CreatorFilters;