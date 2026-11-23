
import { useMemo, useState } from "react";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  SlidersHorizontal,
  X,
  CalendarDays,
  Wallet,
  AlertCircle,
} from "lucide-react";

import ApplicationCard from "../components/ApplicationCard";
import { applications as dummyApplications } from "../../data/applications";

const MyApplications = () => {
  const [applications, setApplications] = useState(dummyApplications);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [withdrawApplication, setWithdrawApplication] = useState(null);

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: FileText,
      color: "text-white",
      bg: "bg-white/5",
    },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "pending").length,
      icon: Clock3,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Approved",
      value: applications.filter((a) => a.status === "approved").length,
      icon: CheckCircle2,
      color: "text-[#D0FF71]",
      bg: "bg-[#D0FF71]/10",
    },
    {
      label: "Rejected",
      value: applications.filter((a) => a.status === "rejected").length,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
  ];

  const tabs = [
    { label: "All Applications", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Withdrawn", value: "withdrawn" },
  ];

  const filteredApplications = useMemo(() => {
    let result = applications.filter((application) => {
      const matchesTab =
        activeTab === "all" || application.status === activeTab;

      const matchesSearch =
        application.title.toLowerCase().includes(search.toLowerCase()) ||
        application.brand.toLowerCase().includes(search.toLowerCase()) ||
        application.id.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });

    if (sort === "newest") {
      result = [...result].reverse();
    }

    return result;
  }, [applications, activeTab, search, sort]);

  const handleWithdraw = () => {
    if (!withdrawApplication) return;

    setApplications((prev) =>
      prev.map((application) =>
        application.id === withdrawApplication.id
          ? {
              ...application,
              status: "withdrawn",
              updatedAt: "Just now",
            }
          : application
      )
    );

    setWithdrawApplication(null);
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="space-y-7 pb-10">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm text-[#D0FF71]">
          Creator Dashboard / Applications
        </p>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          My Applications
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Track your campaign applications and brand responses.
        </p>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>

                <span className="text-xs text-gray-500">
                  All time
                </span>
              </div>

              <p className="mt-5 text-sm text-gray-400">
                {stat.label}
              </p>

              <h2 className={`mt-1 text-2xl font-bold ${stat.color}`}>
                {stat.value.toString().padStart(2, "0")}
              </h2>
            </div>
          );
        })}
      </section>

      {/* Search and Sort */}
      <section className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by campaign, brand or application ID..."
            className="w-full rounded-xl border border-white/10 bg-[#1A1C1A] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-[#1A1C1A] py-3.5 pl-9 pr-8 text-sm text-white outline-none focus:border-[#D0FF71]/50 sm:w-44"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-white/5 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`shrink-0 rounded-lg px-4 py-2.5 text-xs font-medium transition ${
              activeTab === tab.value
                ? "bg-[#D0FF71] text-[#101110]"
                : "bg-[#1A1C1A] text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}

            {tab.value === "all" && (
              <span className="ml-2 opacity-70">
                {applications.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Application List */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">
              {tabs.find((tab) => tab.value === activeTab)?.label}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {filteredApplications.length} applications found
            </p>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onWithdraw={setWithdrawApplication}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
              <FileText size={25} className="text-gray-500" />
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No applications found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try another search term."
                : "You haven't submitted any applications in this category yet."}
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveTab("all");
              }}
              className="mt-5 text-sm font-semibold text-[#D0FF71] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Withdraw Confirmation Modal */}
      {withdrawApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1C1A] p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10">
                <AlertCircle size={22} className="text-red-400" />
              </div>

              <button
                onClick={() => setWithdrawApplication(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Withdraw Application?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Are you sure you want to withdraw your application for{" "}
              <span className="font-medium text-white">
                {withdrawApplication.title}
              </span>
              ? This action will cancel your application.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setWithdrawApplication(null)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/5"
              >
                Keep Application
              </button>

              <button
                onClick={handleWithdraw}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApplication && (
        <div
          onClick={() => setSelectedApplication(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1A1C1A] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#D0FF71]">
                  APPLICATION DETAILS
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  {selectedApplication.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedApplication.brand}
                </p>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-sm text-gray-500">Application ID</span>
                <span className="text-sm text-white">
                  {selectedApplication.id}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-sm text-gray-500">Applied On</span>
                <span className="text-sm text-white">
                  {selectedApplication.appliedAt}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-sm text-gray-500">Current Status</span>
                <span className="text-sm capitalize text-[#D0FF71]">
                  {selectedApplication.status}
                </span>
              </div>

              {selectedApplication.reviewedAt && (
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-500">Reviewed On</span>
                  <span className="text-sm text-white">
                    {selectedApplication.reviewedAt}
                  </span>
                </div>
              )}

              {selectedApplication.rejectionReason && (
                <div className="rounded-xl bg-red-400/5 p-4">
                  <p className="text-xs font-semibold text-red-400">
                    Brand Feedback
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {selectedApplication.rejectionReason}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedApplication(null)}
              className="mt-6 w-full rounded-xl bg-[#D0FF71] py-3 text-sm font-semibold text-[#101110] hover:bg-[#c1f45c]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
