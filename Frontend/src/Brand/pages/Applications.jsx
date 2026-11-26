import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowRight,
  ClipboardList,
  Filter,
  RefreshCw,
} from "lucide-react";

import { applicationsData } from "../../BrandData/applicationsData";

import ApplicationStats from "../Components/Applications/ApplicationStats";
import ApplicationTabs from "../Components/Applications/ApplicationTabs";
import ApplicationFilters from "../Components/Applications/ApplicationFilters";
import ApplicationCard from "../Components/Applications/ApplicationCard";
import EmptyApplications from "../Components/Applications/EmptyApplications";

const Applications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState(applicationsData);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [search, setSearch] = useState("");
  const [campaign, setCampaign] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const campaigns = useMemo(
    () => [...new Set(applicationsData.map((item) => item.campaignName))],
    [],
  );

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // STATUS FILTER
    if (activeTab !== "all") {
      result = result.filter((item) => item.status === activeTab);
    }

    // SEARCH FILTER
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.username.toLowerCase().includes(query) ||
          item.campaignName.toLowerCase().includes(query),
      );
    }

    // CAMPAIGN FILTER
    if (campaign !== "all") {
      result = result.filter((item) => item.campaignName === campaign);
    }

    // PLATFORM FILTER
    if (platform !== "all") {
      result = result.filter((item) => item.platform === platform);
    }

    // SORTING
    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => new Date(a.appliedAt) - new Date(b.appliedAt));
        break;

      case "followers":
        result.sort((a, b) => b.followers - a.followers);
        break;

      case "engagement":
        result.sort((a, b) => b.engagement - a.engagement);
        break;

      case "price-low":
        result.sort((a, b) => a.proposedPrice - b.proposedPrice);
        break;

      default:
        result.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
    }

    return result;
  }, [applications, activeTab, search, campaign, platform, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setCampaign("all");
    setPlatform("all");
    setSortBy("newest");
    setActiveTab("all");
  };

  const updateStatus = (application, status) => {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === application.id ? { ...item, status } : item,
      ),
    );

    setSelectedApplication(null);
  };

  const handleApprove = (application) => {
    const confirmed = window.confirm(
      `Are you sure you want to approve ${application.name}'s application?`,
    );

    if (!confirmed) return;

    updateStatus(application, "approved");

    // TODO: Connect approve application API.
    console.log("Approved application:", application.id);
  };

  const handleReject = (application) => {
    const confirmed = window.confirm(
      `Are you sure you want to reject ${application.name}'s application?`,
    );

    if (!confirmed) return;

    updateStatus(application, "rejected");

    // TODO: Connect reject application API.
    console.log("Rejected application:", application.id);
  };

  const handleShortlist = (application) => {
    updateStatus(application, "shortlisted");

    // TODO: Connect shortlist application API.
    console.log("Shortlisted application:", application.id);
  };

  const handleExport = () => {
    const headers = [
      "Application ID",
      "Creator",
      "Username",
      "Campaign",
      "Platform",
      "Followers",
      "Engagement",
      "Proposed Price",
      "Status",
    ];

    const rows = filteredApplications.map((item) => [
      item.id,
      item.name,
      item.username,
      item.campaignName,
      item.platform,
      item.followers,
      item.engagement,
      item.proposedPrice,
      item.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "brand-applications.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] pb-10">
      {/* HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[10px] text-gray-500">
            <span>Brand Dashboard</span>
            <ArrowRight size={12} />
            <span className="text-[#D0FF71]">Applications</span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Applications
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Discover, review and manage creators applying to your campaigns.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold text-gray-300 transition hover:border-white/25 hover:text-white"
          >
            <ArrowDownToLine size={15} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => navigate("/brand/campaigns")}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-4 py-3 text-xs font-bold text-black transition hover:bg-[#c2f45f]"
          >
            <ClipboardList size={15} />
            My Campaigns
          </button>
        </div>
      </div>

      {/* STATS */}
      <ApplicationStats applications={applications} />

      {/* PENDING NOTICE */}
      {applications.some((item) => item.status === "pending") && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10">
              <Filter size={17} className="text-amber-400" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Applications need your attention
              </p>
              <p className="mt-1 text-[10px] text-gray-500">
                You have{" "}
                {
                  applications.filter((item) => item.status === "pending")
                    .length
                }{" "}
                pending applications waiting for review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className="self-start text-[11px] font-semibold text-amber-400 hover:text-amber-300 sm:self-center"
          >
            Review Pending <ArrowRight size={13} className="ml-1 inline" />
          </button>
        </div>
      )}

      {/* APPLICATIONS SECTION */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Creator Applications
          </h2>
          <p className="mt-1 text-[10px] text-gray-500">
            Review creator profiles and make collaboration decisions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setApplications(applicationsData);
            clearFilters();
          }}
          title="Reset demo data"
          className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[10px] text-gray-400 hover:text-[#D0FF71]"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* TABS */}
      <ApplicationTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        applications={applications}
      />

      {/* FILTERS */}
      <ApplicationFilters
        search={search}
        setSearch={setSearch}
        campaign={campaign}
        setCampaign={setCampaign}
        platform={platform}
        setPlatform={setPlatform}
        sortBy={sortBy}
        setSortBy={setSortBy}
        campaigns={campaigns}
        onClear={clearFilters}
      />

      {/* RESULTS INFO */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] text-gray-500">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredApplications.length}
          </span>{" "}
          applications
        </p>

        <span className="text-[10px] text-gray-600">
          Updated just now · Demo data
        </span>
      </div>

      {/* APPLICATION LIST */}
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onView={(item) =>
                navigate(`/brand/applications/${encodeURIComponent(item.id)}`)
              }
              onShortlist={handleShortlist}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      ) : (
        <EmptyApplications
          hasFilters={
            Boolean(search) ||
            campaign !== "all" ||
            platform !== "all" ||
            activeTab !== "all"
          }
          onClear={clearFilters}
        />
      )}

      {/* DETAILS MODAL */}
      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onShortlist={handleShortlist}
        />
      )}
    </div>
  );
};

export default Applications;
