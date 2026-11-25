
import { useMemo, useState } from "react";
import { Users, Bookmark, Sparkles } from "lucide-react";

import {
  creators,
  creatorCategories,
} from "../../BrandData/creatorsData";

import CreatorStats from "../Components/ExploreCreators/CreatorStats";
import CreatorFilters from "../Components/ExploreCreators/CreatorFilters";
import CreatorCard from "../Components/ExploreCreators/CreatorCard";
import CreatorDetailsModal from "./CreatorDetails";
import EmptyCreators from "../Components/ExploreCreators/EmptyCreators";

const initialFilters = {
  search: "",
  category: "All Categories",
  platform: "All Platforms",
  followers: "Any Followers",
  engagement: "Any Engagement",
  sort: "Recommended",
};

const ExploreCreators = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [shortlisted, setShortlisted] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCreator, setSelectedCreator] = useState(null);

  // SHORTLIST TOGGLE
  const toggleShortlist = (creator) => {
    setShortlisted((previous) =>
      previous.some((item) => item.id === creator.id)
        ? previous.filter((item) => item.id !== creator.id)
        : [...previous, creator]
    );
  };

  // RESET FILTERS
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // FILTER + SORT CREATORS
  const filteredCreators = useMemo(() => {
    let result = [...creators];

    // SHORTLIST TAB
    if (activeTab === "shortlisted") {
      result = result.filter((creator) =>
        shortlisted.some((item) => item.id === creator.id)
      );
    }

    // SEARCH
    if (filters.search.trim()) {
      const search = filters.search.toLowerCase().trim();

      result = result.filter((creator) =>
        [
          creator.name,
          creator.username,
          creator.category,
          creator.location,
          creator.bio,
        ].some((value) => value.toLowerCase().includes(search))
      );
    }

    // CATEGORY
    if (filters.category !== "All Categories") {
      result = result.filter(
        (creator) => creator.category === filters.category
      );
    }

    // PLATFORM
    if (filters.platform !== "All Platforms") {
      result = result.filter((creator) =>
        creator.platforms.includes(filters.platform)
      );
    }

    // FOLLOWERS
    if (filters.followers !== "Any Followers") {
      const ranges = {
        "1K-10K": [1000, 10000],
        "10K-50K": [10000, 50000],
        "50K-100K": [50000, 100000],
        "100K-500K": [100000, 500000],
        "500K+": [500000, Infinity],
      };

      const [min, max] = ranges[filters.followers];

      result = result.filter(
        (creator) =>
          creator.followers >= min && creator.followers < max
      );
    }

    // ENGAGEMENT
    if (filters.engagement !== "Any Engagement") {
      const minimum = Number(filters.engagement.replace("+", ""));

      result = result.filter(
        (creator) => creator.engagement >= minimum
      );
    }

    // SORT
    switch (filters.sort) {
      case "Most Followers":
        result.sort((a, b) => b.followers - a.followers);
        break;

      case "Highest Engagement":
        result.sort((a, b) => b.engagement - a.engagement);
        break;

      case "Most Views":
        result.sort((a, b) => b.avgViews - a.avgViews);
        break;

      case "Lowest Price":
        result.sort((a, b) => a.startingPrice - b.startingPrice);
        break;

      default:
        break;
    }

    return result;
  }, [filters, activeTab, shortlisted]);

  return (
    <div className="mx-auto w-full max-w-[1600px]">

      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={15} className="text-[#D0FF71]" />
            <p className="text-[10px] font-semibold tracking-[1.5px] text-[#D0FF71]">
              CREATOR DISCOVERY
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Explore Creators
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
            Discover talented creators and find the perfect match for your brand.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#171917] px-4 py-3">
          <Users size={17} className="text-[#D0FF71]" />

          <div>
            <p className="text-xs font-bold text-white">
              {creators.length} Creators
            </p>
            <p className="mt-0.5 text-[9px] text-gray-500">
              In your discovery network
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <CreatorStats
        creators={creators}
        shortlistedCount={shortlisted.length}
      />

      {/* TABS */}
      <div className="mb-5 flex items-center gap-5 border-b border-white/[0.07]">
        <button
          onClick={() => setActiveTab("all")}
          className={`relative flex items-center gap-2 pb-3 text-xs font-semibold transition ${
            activeTab === "all"
              ? "text-[#D0FF71]"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <Users size={14} />
          All Creators

          {activeTab === "all" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#D0FF71]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("shortlisted")}
          className={`relative flex items-center gap-2 pb-3 text-xs font-semibold transition ${
            activeTab === "shortlisted"
              ? "text-[#D0FF71]"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <Bookmark size={14} />
          Shortlisted

          <span className="rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[9px]">
            {shortlisted.length}
          </span>

          {activeTab === "shortlisted" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#D0FF71]" />
          )}
        </button>
      </div>

      {/* FILTERS */}
      <CreatorFilters
        filters={filters}
        onChange={setFilters}
        categories={creatorCategories}
        onReset={resetFilters}
      />

      {/* RESULTS HEADER */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">
            {activeTab === "shortlisted"
              ? "Your Shortlisted Creators"
              : "Discover Creators"}
          </h2>

          <p className="mt-1 text-[10px] text-gray-500">
            Showing {filteredCreators.length} of{" "}
            {activeTab === "shortlisted"
              ? shortlisted.length
              : creators.length}{" "}
            creators
          </p>
        </div>

        <span className="text-[10px] text-gray-600">
          Sorted by: {filters.sort}
        </span>
      </div>

      {/* CREATOR GRID */}
      {filteredCreators.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              isShortlisted={shortlisted.some(
                (item) => item.id === creator.id
              )}
              onShortlist={toggleShortlist}
              onViewProfile={setSelectedCreator}
            />
          ))}
        </div>
      ) : (
        <EmptyCreators onReset={() => {
          resetFilters();
          if (activeTab === "shortlisted") {
            setActiveTab("all");
          }
        }} />
      )}

      {/* DETAILS MODAL */}
      {selectedCreator && (
        <CreatorDetailsModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          isShortlisted={shortlisted.some(
            (item) => item.id === selectedCreator.id
          )}
          onShortlist={toggleShortlist}
        />
      )}
    </div>
  );
};

export default ExploreCreators;
