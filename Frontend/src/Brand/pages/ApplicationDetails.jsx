
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Users,
  Eye,
  TrendingUp,
  IndianRupee,
  CheckCircle2,
  Bookmark,
  XCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

import { applicationsData } from "../../BrandData/applicationsData";
import { PLATFORM_ICONS } from "../Components/Icon/PlatformIcons";

const platformIcons = {
  Instagram: PLATFORM_ICONS.Instagram,
  YouTube: PLATFORM_ICONS.YouTube,
  Facebook: PLATFORM_ICONS.Facebook
};

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const application = applicationsData.find(
    (item) => item.id === applicationId
  );

  const [status, setStatus] = useState(
    application?.status || "pending"
  );

  if (!application) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10">
          <AlertCircle size={28} className="text-red-400" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-white">
          Application Not Found
        </h2>

        <p className="mt-2 text-xs text-gray-500">
          No application found with ID: {applicationId}
        </p>

        <button
          onClick={() => navigate("/brand/applications")}
          className="mt-5 rounded-xl bg-[#D0FF71] px-5 py-3 text-xs font-bold text-black"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  const PlatformIcon =
    platformIcons[application.platform] || Instagram;

  const handleStatusUpdate = (newStatus) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus} this application?`
    );

    if (!confirmed) return;

    setStatus(newStatus);

    // TODO: Connect backend status update API.
    console.log(application.id, newStatus);
  };

  const statusStyles = {
    pending:
      "border-amber-400/20 bg-amber-400/10 text-amber-400",
    shortlisted:
      "border-blue-400/20 bg-blue-400/10 text-blue-400",
    approved:
      "border-[#D0FF71]/20 bg-[#D0FF71]/10 text-[#D0FF71]",
    rejected:
      "border-red-400/20 bg-red-400/10 text-red-400",
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] pb-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/brand/applications")}
        className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-[#D0FF71]"
      >
        <ArrowLeft size={15} />
        Back to Applications
      </button>

      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 text-[10px] text-gray-500">
            Brand Dashboard / Applications / {application.id}
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Application Details
          </h1>

          <p className="mt-2 text-xs text-gray-500">
            Review creator profile and collaboration proposal.
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1.5 text-[10px] font-semibold capitalize ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      {/* CREATOR PROFILE */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <img
              src={application.avatar}
              alt={application.name}
              className="h-20 w-20 rounded-2xl border border-white/10 object-cover sm:h-24 sm:w-24"
            />

            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                {application.name}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                @{application.username}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <PlatformIcon size={13} />
                  {application.platform}
                </span>

                <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <MapPin size={13} />
                  {application.location}
                </span>
              </div>
            </div>
          </div>

          <a
            href={`https://www.${application.platform.toLowerCase()}.com/${application.username}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold text-gray-300 transition hover:border-[#D0FF71]/30 hover:text-[#D0FF71]"
          >
            View Social Profile
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* CREATOR METRICS */}
      <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Followers",
            value: application.followers.toLocaleString("en-IN"),
            icon: Users,
          },
          {
            label: "Average Views",
            value: application.avgViews.toLocaleString("en-IN"),
            icon: Eye,
          },
          {
            label: "Engagement Rate",
            value: `${application.engagement}%`,
            icon: TrendingUp,
          },
          {
            label: "Proposed Price",
            value: `₹${application.proposedPrice.toLocaleString("en-IN")}`,
            icon: IndianRupee,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.07] bg-[#171917] p-4 sm:p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D0FF71]/10">
                <Icon size={17} className="text-[#D0FF71]" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                {item.value}
              </h3>

              <p className="mt-1 text-[10px] text-gray-500">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="space-y-5 xl:col-span-2">

          {/* CAMPAIGN INFORMATION */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5">
            <h3 className="text-sm font-semibold text-white">
              Campaign Applied For
            </h3>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#101210] p-4">
              <p className="text-sm font-semibold text-white">
                {application.campaignName}
              </p>

              <p className="mt-2 text-[10px] text-gray-500">
                {application.category} · {application.campaignId}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
                <span className="text-[10px] text-gray-500">
                  Creator's Proposed Fee
                </span>

                <span className="text-sm font-bold text-[#D0FF71]">
                  ₹{application.proposedPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* APPLICATION MESSAGE */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5">
            <h3 className="text-sm font-semibold text-white">
              Creator's Application Message
            </h3>

            <p className="mt-4 rounded-xl border border-white/[0.07] bg-[#101210] p-4 text-xs leading-7 text-gray-400">
              {application.message}
            </p>
          </div>

          {/* AUDIENCE INSIGHTS */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5">
            <h3 className="text-sm font-semibold text-white">
              Audience Overview
            </h3>

            <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#101210] p-4">
              <div className="mb-3 flex justify-between text-[10px]">
                <span className="text-gray-400">
                  Female Audience
                </span>

                <span className="font-semibold text-white">
                  {application.audience.female}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#D0FF71]"
                  style={{
                    width: `${application.audience.female}%`,
                  }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-5">
                <div>
                  <p className="text-[10px] text-gray-500">
                    Male Audience
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {application.audience.male}%
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Top Age Group
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {application.audience.topAge}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Top Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {application.audience.topLocation}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Creator Category
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {application.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          {/* APPLICATION ACTIONS */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5">
            <h3 className="text-sm font-semibold text-white">
              Application Actions
            </h3>

            <p className="mt-2 text-[10px] leading-5 text-gray-500">
              Review this creator and decide whether to collaborate.
            </p>

            {status !== "approved" && status !== "rejected" ? (
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => handleStatusUpdate("approved")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF71] py-3 text-xs font-bold text-black transition hover:bg-[#c2f45f]"
                >
                  <CheckCircle2 size={15} />
                  Approve Application
                </button>

                <button
                  onClick={() => handleStatusUpdate("shortlisted")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-400/10 py-3 text-xs font-semibold text-blue-400 transition hover:bg-blue-400/20"
                >
                  <Bookmark size={15} />
                  Add to Shortlist
                </button>

                <button
                  onClick={() => handleStatusUpdate("rejected")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 py-3 text-xs font-semibold text-red-400 transition hover:bg-red-400/20"
                >
                  <XCircle size={15} />
                  Reject Application
                </button>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#101210] p-4 text-center">
                <p className="text-xs font-semibold capitalize text-white">
                  Application {status}
                </p>

                <p className="mt-2 text-[10px] text-gray-500">
                  This application has already been reviewed.
                </p>
              </div>
            )}
          </div>

          {/* APPLICATION INFORMATION */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5">
            <h3 className="text-sm font-semibold text-white">
              Application Information
            </h3>

            <div className="mt-5 space-y-4">
              {[
                ["Application ID", application.id],
                [
                  "Applied On",
                  new Date(application.appliedAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  ),
                ],
                ["Platform", application.platform],
                ["Category", application.category],
                ["Campaign ID", application.campaignId],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
                >
                  <p className="text-[10px] text-gray-500">
                    {label}
                  </p>

                  <p className="break-all text-xs font-medium text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
