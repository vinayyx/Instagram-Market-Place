import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, FileVideo } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { contentSubmissionsData } from "../../BrandData/contentSubmissionsData";

import SubmissionStats from "../Components/ContentSubmissions/SubmissionStats";
import SubmissionTabs from "../Components/ContentSubmissions/SubmissionTabs";
import SubmissionCard from "../Components/ContentSubmissions/SubmissionCard";

const ContentSubmissions = () => {
  const [submissions, setSubmissions] = useState(contentSubmissionsData);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const navigate = useNavigate();

  const campaigns = [
    ...new Map(
      submissions.map((item) => [
        item.campaignId,
        { id: item.campaignId, name: item.campaignName },
      ]),
    ).values(),
  ];

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      const matchesTab = activeTab === "all" || item.status === activeTab;

      const searchText = search.toLowerCase();

      const matchesSearch =
        item.creatorName.toLowerCase().includes(searchText) ||
        item.campaignName.toLowerCase().includes(searchText) ||
        item.id.toLowerCase().includes(searchText);

      const matchesCampaign =
        campaignFilter === "all" || item.campaignId === campaignFilter;

      return matchesTab && matchesSearch && matchesCampaign;
    });
  }, [submissions, activeTab, search, campaignFilter]);

  const handleStatusChange = (submissionId, newStatus) => {
    setSubmissions((previous) =>
      previous.map((item) =>
        item.id === submissionId ? { ...item, status: newStatus } : item,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#D0FF71]">Brand Workspace</p>
          <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Content Submissions
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Review and manage content submitted by your creators.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#191B19] px-4 py-3">
          <FileVideo size={18} className="text-[#D0FF71]" />
          <span className="text-sm text-gray-300">
            {submissions.length} Total Submissions
          </span>
        </div>
      </div>

      {/* Stats */}
      <SubmissionStats submissions={submissions} />

      {/* Main content */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-4 sm:p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            All Submitted Content
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Review creator content and manage its approval status.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-5 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creator, campaign or submission ID..."
              className="w-full rounded-xl border border-white/[0.08] bg-[#202220] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#202220] py-3 pl-9 pr-8 text-sm text-white outline-none focus:border-[#D0FF71]/50 lg:w-64"
            >
              <option value="all">All Campaigns</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <SubmissionTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          submissions={submissions}
        />

        {/* Submission list */}
        <div className="mt-5 space-y-4">
          {filteredSubmissions.length > 0 ? (
            filteredSubmissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onView={(item) =>
                  navigate(`/brand/content/${encodeURIComponent(item.id)}`)
                }
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 py-16 text-center">
              <FileVideo size={32} className="mx-auto text-gray-600" />
              <h3 className="mt-4 font-medium text-white">
                No submissions found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ContentSubmissions;
