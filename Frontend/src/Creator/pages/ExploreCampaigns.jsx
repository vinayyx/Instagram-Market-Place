
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  Megaphone,
  X,
} from "lucide-react";

import { campaigns } from "../../data/campaigns";
import CampaignCard from "../components/CampaignCard";

const ExploreCampaigns = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [payment, setPayment] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Beauty",
    "Fitness",
    "Fashion",
    "Technology",
  ];

  const filteredCampaigns = useMemo(() => {
    let result = campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(search.toLowerCase()) ||
        campaign.brand.toLowerCase().includes(search.toLowerCase()) ||
        campaign.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || campaign.category === category;

      const matchesPayment =
        payment === "All" || campaign.paymentModel === payment;

      return matchesSearch && matchesCategory && matchesPayment;
    });

    if (sort === "Highest Paying") {
      result.sort((a, b) => b.maxPayout - a.maxPayout);
    }

    if (sort === "Lowest Followers") {
      result.sort((a, b) => a.minFollowers - b.minFollowers);
    }

    return result;
  }, [search, category, payment, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPayment("All");
    setSort("Newest");
  };

  return (
    <div className="space-y-7 pb-10">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-[#D0FF71]">
            <Megaphone size={17} />
            Creator Marketplace
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Explore Campaigns
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Discover brand collaborations and find your next opportunity.
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#1A1C1A] px-4 py-3">
          <p className="text-xs text-gray-500">Available campaigns</p>
          <p className="mt-1 text-xl font-bold text-[#D0FF71]">
            {campaigns.length}
          </p>
        </div>
      </div>

      {/* Search and sorting */}
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns, brands or niches..."
            className="w-full rounded-xl border border-white/10 bg-[#1A1C1A] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#D0FF71]/50"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1A1C1A] px-4 py-3 text-sm text-white hover:border-[#D0FF71]/30 lg:flex-none"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

          <div className="relative flex-1 lg:flex-none">
            <ArrowDownWideNarrow
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-full w-full appearance-none rounded-xl border border-white/10 bg-[#1A1C1A] py-3 pl-9 pr-8 text-sm text-white outline-none focus:border-[#D0FF71]/50 lg:w-48"
            >
              <option>Newest</option>
              <option>Highest Paying</option>
              <option>Lowest Followers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold text-white">Filter Campaigns</h3>

            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={19} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs text-gray-400">
                Category / Niche
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#101110] px-4 py-3 text-sm text-white outline-none focus:border-[#D0FF71]/50"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs text-gray-400">
                Payment Model
              </label>

              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#101110] px-4 py-3 text-sm text-white outline-none focus:border-[#D0FF71]/50"
              >
                <option>All</option>
                <option>Per 1K Views</option>
                <option>Fixed Payment</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-[#D0FF71] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
              category === item
                ? "border-[#D0FF71] bg-[#D0FF71] text-[#101110]"
                : "border-white/10 bg-[#1A1C1A] text-gray-400 hover:border-[#D0FF71]/30 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Campaign Results */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Available Opportunities
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Showing {filteredCampaigns.length} campaigns
            </p>
          </div>

          {(search || category !== "All" || payment !== "All") && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#D0FF71] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
              <Search size={24} className="text-gray-500" />
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No campaigns found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-[#D0FF71] px-5 py-2.5 text-sm font-semibold text-[#101110]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExploreCampaigns;
