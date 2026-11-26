import {
  Eye,
  Bookmark,
  Check,
  X,
  Clock3,
  MapPin,
  Users,
  TrendingUp,
  IndianRupee,
  ExternalLink,
} from "lucide-react";

import { PLATFORM_ICONS } from "../Icon/PlatformIcons";

const platformIcons = {
  Instagram : PLATFORM_ICONS.Instagram,
  YouTube: PLATFORM_ICONS.YouTube,
  Facebook: PLATFORM_ICONS.Facebook,
};

const statusStyles = {
  pending: "border-amber-400/20 bg-amber-400/10 text-amber-400",
  shortlisted: "border-blue-400/20 bg-blue-400/10 text-blue-400",
  approved: "border-[#D0FF71]/20 bg-[#D0FF71]/10 text-[#D0FF71]",
  rejected: "border-red-400/20 bg-red-400/10 text-red-400",
};

const ApplicationCard = ({
  application,
  onView,
  onShortlist,
  onApprove,
  onReject,
}) => {
  const PlatformIcon = platformIcons[application.platform] || Instagram;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-4 transition hover:border-white/15 sm:p-5">

      {/* TOP */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${statusStyles[application.status]}`}
        >
          {application.status}
        </span>

        <span className="text-right text-[10px] text-gray-500">
          {new Date(application.appliedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* CREATOR */}
      <div className="mt-5 flex items-center gap-3">
        <img
          src={application.avatar}
          alt={application.name}
          className="h-14 w-14 rounded-full border border-white/10 object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">
            {application.name}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            @{application.username}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-gray-400">
            <PlatformIcon size={13} />
            <span className="text-[10px]">{application.platform}</span>
            <span className="mx-1 text-gray-700">•</span>
            <MapPin size={12} />
            <span className="text-[10px]">{application.location}</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="my-5 grid grid-cols-3 gap-2 border-y border-white/[0.07] py-4">
        <div>
          <div className="flex items-center gap-1 text-gray-500">
            <Users size={12} />
            <span className="text-[9px]">Followers</span>
          </div>
          <p className="mt-1 text-sm font-bold text-white">
            {application.followers >= 1000
              ? `${(application.followers / 1000).toFixed(1)}K`
              : application.followers}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-gray-500">
            <TrendingUp size={12} />
            <span className="text-[9px]">Engagement</span>
          </div>
          <p className="mt-1 text-sm font-bold text-white">
            {application.engagement}%
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-gray-500">
            <Eye size={12} />
            <span className="text-[9px]">Avg. Views</span>
          </div>
          <p className="mt-1 text-sm font-bold text-white">
            {application.avgViews >= 1000
              ? `${(application.avgViews / 1000).toFixed(1)}K`
              : application.avgViews}
          </p>
        </div>
      </div>

      {/* CAMPAIGN */}
      <div className="rounded-xl bg-[#101210] p-3">
        <p className="text-[10px] text-gray-500">Applied for campaign</p>
        <p className="mt-1 line-clamp-1 text-xs font-semibold text-white">
          {application.campaignName}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[10px] text-gray-500">
            {application.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#D0FF71]">
            <IndianRupee size={12} />
            {application.proposedPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onView(application)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 text-[10px] font-semibold text-gray-300 transition hover:border-white/25 hover:text-white"
        >
          <Eye size={13} />
          View Details
        </button>

        {application.status !== "approved" &&
          application.status !== "rejected" && (
            <>
              {application.status !== "shortlisted" && (
                <button
                  type="button"
                  onClick={() => onShortlist(application)}
                  title="Shortlist"
                  className="flex items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 px-3 py-2.5 text-blue-400 transition hover:bg-blue-400/20"
                >
                  <Bookmark size={14} />
                </button>
              )}

              <button
                type="button"
                onClick={() => onReject(application)}
                title="Reject"
                className="flex items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2.5 text-red-400 transition hover:bg-red-400/20"
              >
                <X size={14} />
              </button>

              <button
                type="button"
                onClick={() => onApprove(application)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#D0FF71] px-3 py-2.5 text-[10px] font-bold text-black transition hover:bg-[#c2f45f]"
              >
                <Check size={14} />
                Approve
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default ApplicationCard;