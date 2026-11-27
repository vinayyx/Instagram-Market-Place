import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Users, Bookmark, Sparkles, LoaderCircle } from "lucide-react";

import CreatorStats from "../Components/ExploreCreators/CreatorStats";
import CreatorFilters from "../Components/ExploreCreators/CreatorFilters";
import CreatorCard from "../Components/ExploreCreators/CreatorCard";
import EmptyCreators from "../Components/ExploreCreators/EmptyCreators";

import { creatorCategories } from "../../BrandData/creatorsData";
import { useBrand } from "../../hooks/useBrand";

const initialFilters = {
  search: "",
  category: "All Categories",
  platform: "All Platforms",
  followers: "Any Followers",
  engagement: "Any Engagement",
  sort: "Recommended",
};

const getApiFilters = (filters, search) => {
  const params = {
    search: search.trim(),
    sort:
      {
        Recommended: "most_followers",
        "Most Followers": "most_followers",
        "Highest Engagement": "highest_engagement",
        "Most Views": "most_views",
      }[filters.sort] || "most_followers",
  };

  if (filters.category !== "All Categories") {
    params.category = filters.category;
  }

  if (filters.creatorType !== "All Types") {
    params.creatorType = filters.creatorType;
  }

  if (filters.platform !== "All Platforms") {
    params.platform = filters.platform.toLowerCase();
  }

  const followerRanges = {
    "1K-10K": [1000, 10000],
    "10K-50K": [10000, 50000],
    "50K-100K": [50000, 100000],
    "100K-500K": [100000, 500000],
    "500K+": [500000, null],
  };

  if (followerRanges[filters.followers]) {
    const [min, max] = followerRanges[filters.followers];
    params.minFollowers = min;

    if (max !== null) {
      params.maxFollowers = max;
    }
  }

  if (filters.engagement !== "Any Engagement") {
    params.minEngagement = Number(filters.engagement.replace("+", ""));
  }

  return params;
};

const ExploreCreators = () => {
  const {
    creators,
    creatorLoading,
    creatorError,
    hasMoreCreators,
    totalCreators,
    fetchCreators,
  } = useBrand();

  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [shortlisted, setShortlisted] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const observerRef = useRef(null);
  const loadingMoreRef = useRef(false);

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(filters.search);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // API FILTERS
  const apiFilters = useMemo(
    () => getApiFilters(filters, searchTerm),
    [filters, searchTerm],
  );

  // FIRST API CALL + FILTER CHANGE
  useEffect(() => {
    const controller = new AbortController();

    setCurrentPage(1);
    loadingMoreRef.current = false;

    fetchCreators({
      page: 1,
      filters: apiFilters,
      append: false,
      signal: controller.signal,
    }).catch(() => {});

    return () => controller.abort();
  }, [apiFilters, fetchCreators]);

  // LOAD NEXT PAGE
  const loadMoreCreators = useCallback(async () => {
    if (
      creatorLoading ||
      !hasMoreCreators ||
      loadingMoreRef.current ||
      activeTab === "shortlisted"
    ) {
      return;
    }

    loadingMoreRef.current = true;

    const nextPage = currentPage + 1;

    try {
      await fetchCreators({
        page: nextPage,
        filters: apiFilters,
        append: true,
      });

      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Load more creators error:", error);
    } finally {
      loadingMoreRef.current = false;
    }
  }, [
    creatorLoading,
    hasMoreCreators,
    activeTab,
    currentPage,
    apiFilters,
    fetchCreators,
  ]);

  // INTERSECTION OBSERVER
  useEffect(() => {
    const element = observerRef.current;

    if (!element || activeTab === "shortlisted") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCreators();
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadMoreCreators, activeTab]);

  // SHORTLIST
  const toggleShortlist = (creator) => {
    setShortlisted((previous) =>
      previous.some((item) => item._id === creator._id)
        ? previous.filter((item) => item._id !== creator._id)
        : [...previous, creator],
    );
  };

  // RESET FILTERS
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // DISPLAY DATA
  const displayedCreators =
    activeTab === "shortlisted" ? shortlisted : creators;

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      {/* HEADER */}
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
            Discover talented creators and find the perfect match for your
            brand.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#171917] px-4 py-3">
          <Users size={17} className="text-[#D0FF71]" />

          <div>
            <p className="text-xs font-bold text-white">
              {totalCreators} Creators
            </p>
            <p className="mt-0.5 text-[9px] text-gray-500">
              In your discovery network
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <CreatorStats creators={creators} shortlistedCount={shortlisted.length} />

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
      {activeTab === "all" && (
        <CreatorFilters
          filters={filters}
          onChange={setFilters}
          categories={creatorCategories}
          onReset={resetFilters}
        />
      )}

      {/* RESULTS HEADER */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">
            {activeTab === "shortlisted"
              ? "Your Shortlisted Creators"
              : "Discover Creators"}
          </h2>

          <p className="mt-1 text-[10px] text-gray-500">
            Showing {displayedCreators.length} of{" "}
            {activeTab === "shortlisted" ? shortlisted.length : totalCreators}{" "}
            creators
          </p>
        </div>

        {activeTab === "all" && (
          <span className="text-[10px] text-gray-600">
            Sorted by: {filters.sort}
          </span>
        )}
      </div>

      {/* ERROR */}
      {creatorError && creators.length === 0 && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-center">
          <p className="text-sm text-red-400">{creatorError}</p>

          <button
            onClick={() =>
              fetchCreators({
                page: 1,
                filters: apiFilters,
                append: false,
              }).catch(() => {})
            }
            className="mt-3 text-xs font-semibold text-[#D0FF71]"
          >
            Try Again
          </button>
        </div>
      )}

      {/* INITIAL LOADING */}
      {creatorLoading && creators.length === 0 && activeTab === "all" && (
        <div className="flex justify-center py-16">
          <LoaderCircle className="animate-spin text-[#D0FF71]" size={30} />
        </div>
      )}

      {/* CREATOR GRID */}
      {displayedCreators.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {displayedCreators.map((creator) => (
            <CreatorCard
              key={creator._id}
              creator={creator}
              isShortlisted={shortlisted.some(
                (item) => item._id === creator._id,
              )}
              onShortlist={toggleShortlist}
            />
          ))}
        </div>
      ) : (
        !creatorLoading && (
          <EmptyCreators
            onReset={() => {
              resetFilters();
              if (activeTab === "shortlisted") {
                setActiveTab("all");
              }
            }}
          />
        )
      )}

      {/* INFINITE SCROLL SENTINEL */}
      {activeTab === "all" && (
        <div
          ref={observerRef}
          className="flex min-h-20 items-center justify-center py-6"
        >
          {creatorLoading && creators.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <LoaderCircle size={18} className="animate-spin text-[#D0FF71]" />
              Loading more creators...
            </div>
          )}

          {!hasMoreCreators && creators.length > 0 && (
            <p className="text-[11px] text-gray-600">
              You have reached the end
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreCreators;
