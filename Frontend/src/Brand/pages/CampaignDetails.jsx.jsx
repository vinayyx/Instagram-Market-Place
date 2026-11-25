import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  Eye,
  Wallet,
  CheckCircle2,
  Pause,
  Play,
  FileEdit,
  Megaphone,
  Clock3,
  Target,
  ArrowUpRight,
} from "lucide-react";

import { campaignsData } from "../../Brand/Data/campaignsData";
import { PLATFORM_ICONS } from "../Components/Icon/PlatformIcons";

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const campaign = campaignsData.find(
    (item) => item.id === campaignId
  );

  const [status, setStatus] = useState(campaign?.status || "");

  if (!campaign) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05]">
          <Megaphone size={28} className="text-gray-400" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-white">
          Campaign Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The campaign you're looking for doesn't exist or may have been removed.
        </p>

        <button
          onClick={() => navigate("/brand/campaigns")}
          className="mt-5 rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-black hover:bg-[#c1f45e]"
        >
          Back to Campaigns
        </button>
      </div>
    );
  }

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const progress =
    campaign.budget > 0
      ? Math.min((campaign.spent / campaign.budget) * 100, 100)
      : 0;

  const remainingBudget = Math.max(
    campaign.budget - campaign.spent,
    0
  );

  const statusStyles = {
    active: "bg-[#D0FF71]/10 text-[#D0FF71]",
    draft: "bg-blue-400/10 text-blue-400",
    paused: "bg-orange-400/10 text-orange-400",
    completed: "bg-emerald-400/10 text-emerald-400",
  };

  const PlatformIcon =
    PLATFORM_ICONS?.[campaign.platform] || Instagram;

  const handleToggleStatus = () => {
    setStatus((previous) =>
      previous === "active" ? "paused" : "active"
    );
  };

  const stats = [
    {
      label: "Total Budget",
      value: formatCurrency(campaign.budget),
      icon: Wallet,
    },
    {
      label: "Creators Hired",
      value: `${campaign.creators}/${campaign.totalSlots}`,
      icon: Users,
    },
    {
      label: "Total Views",
      value: Number(campaign.totalViews || 0).toLocaleString("en-IN"),
      icon: Eye,
    },
    {
      label: "Applications",
      value: campaign.applications,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] space-y-6 pb-8">
      {/* Back navigation */}
      <button
        onClick={() => navigate("/brand/campaigns")}
        className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D0FF71]"
      >
        <ArrowLeft size={17} />
        Back to Campaigns
      </button>

      {/* Page heading */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D0FF71]/10 text-[#D0FF71]">
            <Megaphone size={25} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  statusStyles[status] || statusStyles.draft
                }`}
              >
                {status}
              </span>

              <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-gray-400">
                {campaign.category}
              </span>

              <span className="text-xs text-gray-500">
                {campaign.id}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              {campaign.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              {campaign.description}
            </p>
          </div>
        </div>

        {["active", "paused"].includes(status) && (
          <button
            onClick={handleToggleStatus}
            className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
              status === "active"
                ? "border-orange-400/20 text-orange-400 hover:bg-orange-400/10"
                : "border-[#D0FF71]/20 text-[#D0FF71] hover:bg-[#D0FF71]/10"
            }`}
          >
            {status === "active" ? (
              <>
                <Pause size={16} />
                Pause Campaign
              </>
            ) : (
              <>
                <Play size={16} />
                Resume Campaign
              </>
            )}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 sm:text-sm">
                  {item.label}
                </p>

                <div className="rounded-xl bg-[#D0FF71]/10 p-2">
                  <Icon size={17} className="text-[#D0FF71]" />
                </div>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Left section */}
        <div className="space-y-5 xl:col-span-2">
          {/* Budget overview */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Budget Overview
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Track your campaign spending
                </p>
              </div>

              <span className="rounded-lg bg-[#D0FF71]/10 px-3 py-2 text-sm font-semibold text-[#D0FF71]">
                {Math.round(progress)}% Used
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">Total Budget</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">
                  {formatCurrency(campaign.budget)}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Amount Spent</p>
                <h3 className="mt-1 text-lg font-semibold text-[#D0FF71]">
                  {formatCurrency(campaign.spent)}
                </h3>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-[#D0FF71] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>Spent: {formatCurrency(campaign.spent)}</span>
              <span>Remaining: {formatCurrency(remainingBudget)}</span>
            </div>
          </section>

          {/* Campaign performance */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Campaign Performance
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Views against your campaign target
                </p>
              </div>

              <Eye size={19} className="text-[#D0FF71]" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.035] p-4">
                <p className="text-xs text-gray-500">Current Views</p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {Number(campaign.totalViews || 0).toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="rounded-xl bg-white/[0.035] p-4">
                <p className="text-xs text-gray-500">Target Views</p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {Number(campaign.targetViews || 0).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-gray-400">Target completion</span>
                <span className="font-medium text-[#D0FF71]">
                  {campaign.targetViews
                    ? Math.round(
                        (campaign.totalViews / campaign.targetViews) * 100
                      )
                    : 0}
                  %
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full bg-[#D0FF71]"
                  style={{
                    width: `${
                      campaign.targetViews
                        ? Math.min(
                            (campaign.totalViews / campaign.targetViews) * 100,
                            100
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* Creator requirements */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-[#D0FF71]" />
              <h2 className="text-base font-semibold text-white">
                Creator Requirements
              </h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(campaign.requirements || []).map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right section */}
        <div className="space-y-5">
          {/* Timeline */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#D0FF71]" />
              <h2 className="text-base font-semibold text-white">
                Campaign Timeline
              </h2>
            </div>

            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#D0FF71]" />
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {formatDate(campaign.startDate)}
                  </p>
                </div>
              </div>

              <div className="ml-1 h-6 border-l border-dashed border-white/20" />

              <div className="flex gap-3">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-400" />
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {formatDate(campaign.endDate)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Platform & deliverables */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5">
            <div className="flex items-center gap-2">
              <PlatformIcon size={18} className="text-[#D0FF71]" />
              <h2 className="text-base font-semibold text-white">
                Platform & Deliverables
              </h2>
            </div>

            <p className="mt-5 text-xs text-gray-500">Platform</p>
            <p className="mt-1 text-sm font-medium text-white">
              {campaign.platform}
            </p>

            <div className="my-4 border-t border-white/[0.07]" />

            <p className="text-xs text-gray-500">Deliverables</p>

            <div className="mt-3 space-y-3">
              {(campaign.deliverables || []).map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-[#D0FF71]"
                  />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Creator slots */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#D0FF71]" />
              <h2 className="text-base font-semibold text-white">
                Creator Slots
              </h2>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {campaign.creators}
                  <span className="text-sm font-normal text-gray-500">
                    {" "}/ {campaign.totalSlots}
                  </span>
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Creators hired
                </p>
              </div>

              <span className="text-sm font-medium text-[#D0FF71]">
                {campaign.totalSlots > 0
                  ? Math.round(
                      (campaign.creators / campaign.totalSlots) * 100
                    )
                  : 0}
                %
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-[#D0FF71]"
                style={{
                  width: `${
                    campaign.totalSlots > 0
                      ? Math.min(
                          (campaign.creators / campaign.totalSlots) * 100,
                          100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-gray-500">
              {Math.max(campaign.totalSlots - campaign.creators, 0)} slots remaining
            </p>
          </section>
        </div>
      </div>

      {/* Footer info */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-[#181A18] p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock3 size={15} />
          Campaign ID: {campaign.id}
        </div>

        <button
          onClick={() => navigate("/brand/applications")}
          className="flex items-center gap-2 text-sm font-medium text-[#D0FF71] hover:text-white"
        >
          View Applications
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CampaignDetails;