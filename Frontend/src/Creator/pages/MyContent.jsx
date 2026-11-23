import { useMemo, useState } from "react";

import {
  Search,
  Eye,
  Heart,
  Wallet,
  PlayCircle,
  X,
  ExternalLink,
  CheckCircle2,
  Clock3,
  XCircle,
  MessageCircle,
  Share2,
  Bookmark,
  CalendarDays,
  RefreshCw,
  User,
} from "lucide-react";

import ContentCard from "../components/ContentCard";
import { myContent as initialContent } from "../../data/myContent";

const tabs = [
  { label: "All Content", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Under Review", value: "under_review" },
  { label: "Rejected", value: "rejected" },
];

const MyContent = () => {
  const [contents] = useState(initialContent);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const [selectedContent, setSelectedContent] = useState(null);

  // Unique campaign names for filter
  const campaigns = useMemo(() => {
    return [...new Set(contents.map((item) => item.campaignTitle))];
  }, [contents]);

  // Overview stats
  const stats = useMemo(() => {
    const verifiedContent = contents.filter(
      (item) => item.status === "verified"
    );

    return {
      total: contents.length,

      views: contents.reduce(
        (total, item) => total + item.views,
        0
      ),

      likes: contents.reduce(
        (total, item) => total + item.likes,
        0
      ),

      earnings: verifiedContent.reduce(
        (total, item) => total + item.earnedAmount,
        0
      ),

      verified: verifiedContent.length,

      pending: contents.filter(
        (item) => item.status === "under_review"
      ).length,
    };
  }, [contents]);

  // Search, tabs, filters and sorting
  const filteredContent = useMemo(() => {
    let result = contents.filter((item) => {
      const matchesTab =
        activeTab === "all" || item.status === activeTab;

      const searchText = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.brand.toLowerCase().includes(searchText) ||
        item.campaignTitle.toLowerCase().includes(searchText) ||
        item.id.toLowerCase().includes(searchText);

      const matchesCampaign =
        campaignFilter === "all" ||
        item.campaignTitle === campaignFilter;

      return matchesTab && matchesSearch && matchesCampaign;
    });

    if (sort === "highest_views") {
      result.sort((a, b) => b.views - a.views);
    } else if (sort === "highest_earnings") {
      result.sort((a, b) => b.earnedAmount - a.earnedAmount);
    } else if (sort === "newest") {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [contents, activeTab, search, campaignFilter, sort]);

  const resetFilters = () => {
    setActiveTab("all");
    setSearch("");
    setCampaignFilter("all");
    setSort("newest");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">

      {/* Heading */}
      <div>
        <div className="flex items-center gap-2 text-sm text-[#D0FF71]">
          <User size={16} />
          Creator Workspace
        </div>

        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          My Content
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Track your submitted Reels and monitor their performance
          across campaigns.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          title="Total Content"
          value={stats.total}
          icon={<PlayCircle size={19} />}
        />

        <StatCard
          title="Total Views"
          value={formatNumber(stats.views)}
          icon={<Eye size={19} />}
        />

        <StatCard
          title="Total Likes"
          value={formatNumber(stats.likes)}
          icon={<Heart size={19} />}
        />

        <StatCard
          title="Total Earnings"
          value={`₹${stats.earnings.toLocaleString("en-IN")}`}
          icon={<Wallet size={19} />}
        />
      </div>

      {/* Quick status summary */}
      <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-white/10 bg-[#181A18] px-5 py-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={17} className="text-[#D0FF71]" />
          <span className="text-sm text-gray-400">
            Verified: <strong className="text-white">{stats.verified}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={17} className="text-yellow-400" />
          <span className="text-sm text-gray-400">
            Under Review: <strong className="text-white">{stats.pending}</strong>
          </span>
        </div>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">

        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Reel, campaign or brand..."
              className="w-full rounded-xl border border-white/10 bg-[#181A18] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
            />
          </div>

          {/* Campaign filter */}
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#181A18] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#D0FF71]/50"
          >
            <option value="all">All Campaigns</option>

            {campaigns.map((campaign) => (
              <option key={campaign} value={campaign}>
                {campaign}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#181A18] px-4 py-3 text-sm text-gray-300 outline-none focus:border-[#D0FF71]/50"
          >
            <option value="newest">Newest First</option>
            <option value="highest_views">Highest Views</option>
            <option value="highest_earnings">Highest Earnings</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                activeTab === tab.value
                  ? "bg-[#D0FF71] text-black"
                  : "border border-white/10 bg-[#181A18] text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results heading */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white">
          Submitted Reels
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({filteredContent.length})
          </span>
        </h2>
      </div>

      {/* Content grid */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredContent.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onViewDetails={setSelectedContent}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#181A18] px-5 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-gray-400">
            <User size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-white">
            No content found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            No submitted Reels match your current filters.
          </p>

          <button
            onClick={resetFilters}
            className="mt-5 text-sm font-medium text-[#D0FF71] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Details modal */}
      {selectedContent && (
        <ContentDetailsModal
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
};

/* ---------------- Stats Card ---------------- */

const StatCard = ({ title, value, icon }) => (
  <div className="rounded-2xl border border-white/10 bg-[#181A18] p-4 sm:p-5">
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-400 sm:text-sm">{title}</p>
      <div className="text-[#D0FF71]">{icon}</div>
    </div>

    <p className="mt-4 text-2xl font-bold text-white">{value}</p>
  </div>
);

/* ---------------- Content Details Modal ---------------- */

const ContentDetailsModal = ({ content, onClose }) => {
  const statusConfig = {
    verified: {
      label: "Verified",
      icon: CheckCircle2,
      className: "text-[#D0FF71] bg-[#D0FF71]/10",
    },
    under_review: {
      label: "Under Review",
      icon: Clock3,
      className: "text-yellow-400 bg-yellow-500/10",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "text-red-400 bg-red-500/10",
    },
  };

  const status = statusConfig[content.status] || statusConfig.under_review;
  const StatusIcon = status.icon;

  const metrics = [
    { label: "Views", value: content.views, icon: <Eye size={17} /> },
    { label: "Likes", value: content.likes, icon: <Heart size={17} /> },
    {
      label: "Comments",
      value: content.comments,
      icon: <MessageCircle size={17} />,
    },
    { label: "Shares", value: content.shares, icon: <Share2 size={17} /> },
    {
      label: "Saves",
      value: content.saves,
      icon: <Bookmark size={17} />,
    },
    {
      label: "Engagement",
      value: `${content.engagementRate}%`,
      icon: <RefreshCw size={17} />,
    },
  ];

  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#181A18] p-5 shadow-2xl sm:p-6">

        {/* Modal header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Content Details
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {content.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content info */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div
            className={`flex aspect-[4/5] w-full items-center justify-center rounded-xl bg-gradient-to-br ${content.thumbnailColor} sm:w-36`}
          >
            <User size={35} className="text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-white">
              {content.title}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {content.brand}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {content.campaignTitle}
            </p>

            <div
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
            >
              <StatusIcon size={14} />
              {status.label}
            </div>

            <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <CalendarDays size={14} />
              Submitted: {content.submittedAt}
            </p>

            <a
              href={content.reelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#D0FF71] hover:underline"
            >
              View on Instagram
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-7">
          <h4 className="mb-3 font-semibold text-white">
            Performance Metrics
          </h4>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl bg-[#222522] p-3"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  {metric.icon}
                  <span className="text-xs">{metric.label}</span>
                </div>

                <p className="mt-2 text-lg font-bold text-white">
                  {typeof metric.value === "number"
                    ? formatNumber(metric.value)
                    : metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#D0FF71]/10 bg-[#D0FF71]/5 p-4">
            <p className="text-xs text-gray-400">Verified Earnings</p>
            <p className="mt-2 text-xl font-bold text-[#D0FF71]">
              ₹{content.earnedAmount.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-xl bg-[#222522] p-4">
            <p className="text-xs text-gray-400">Estimated Earnings</p>
            <p className="mt-2 text-xl font-bold text-white">
              ₹{content.estimatedEarnings.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Rejection reason */}
        {content.status === "rejected" && (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-sm font-medium text-red-400">
              Rejection Reason
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {content.rejectionReason || "No reason provided."}
            </p>
          </div>
        )}

        {/* Sync info */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-xs text-gray-500">
            Last synced: {content.lastSynced}
          </p>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Helpers ---------------- */

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number || 0);
};

export default MyContent;