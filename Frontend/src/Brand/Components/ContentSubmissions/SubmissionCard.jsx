import {
  Eye,
  Heart,
  MessageCircle,
  ExternalLink,
  Clock3,
  CheckCircle2,
  RotateCcw,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending Review",
    className: "bg-amber-400/10 text-amber-400",
    icon: Clock3,
  },
  approved: {
    label: "Approved",
    className: "bg-[#D0FF71]/10 text-[#D0FF71]",
    icon: CheckCircle2,
  },
  revision_requested: {
    label: "Revision Requested",
    className: "bg-blue-400/10 text-blue-400",
    icon: RotateCcw,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-400/10 text-red-400",
    icon: XCircle,
  },
};

import { PLATFORM_ICONS } from "../Icon/PlatformIcons";

const SubmissionCard = ({ submission, onView, onStatusChange }) => {
  const status = statusConfig[submission.status] || statusConfig.pending;
  const StatusIcon = status.icon;
  const PlatformIcon =
    submission.platform === "YouTube" ? PLATFORM_ICONS.YouTube : PLATFORM_ICONS.YouTube;

  const formatNumber = (num) =>
    num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191B19] transition hover:border-white/15">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
        <div className="relative h-48 shrink-0 overflow-hidden rounded-xl bg-[#252725] sm:h-36 sm:w-52">
          <img
            src={submission.thumbnail}
            alt={submission.caption}
            className="h-full w-full object-cover"
          />

          <div className="absolute left-3 top-3 rounded-lg bg-black/70 p-2">
            <PlatformIcon size={17} className="text-white" />
          </div>

          <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
            {submission.contentType}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
            >
              <StatusIcon size={13} />
              {status.label}
            </span>

            <span className="text-xs text-gray-500">{submission.id}</span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <img
              src={submission.avatar}
              alt={submission.creatorName}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h3 className="font-semibold text-white">
                {submission.creatorName}
              </h3>
              <p className="text-xs text-gray-500">{submission.username}</p>
            </div>
          </div>

          <h4 className="mt-3 line-clamp-1 text-sm font-medium text-white">
            {submission.campaignName}
          </h4>

          <p className="mt-1 line-clamp-1 text-xs text-gray-500">
            {submission.caption}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Eye size={14} /> {formatNumber(submission.views)} views
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={14} /> {formatNumber(submission.likes)}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle size={14} /> {formatNumber(submission.comments)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 sm:px-5">
        <p className="text-xs text-gray-500">
          Submitted on {submission.submittedAt}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.open(submission.contentUrl, "_blank", "noopener,noreferrer")}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/5"
          >
            <ExternalLink size={14} />
            View Reel
          </button>

          <button
            onClick={() => onView(submission)}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white hover:bg-white/5"
          >
            Review Details
          </button>

          {submission.status === "pending" && (
            <>
              <button
                onClick={() => onStatusChange(submission.id, "approved")}
                className="rounded-lg bg-[#D0FF71] px-3 py-2 text-xs font-semibold text-black hover:bg-[#c1f45e]"
              >
                Approve
              </button>

              <button
                onClick={() => onStatusChange(submission.id, "rejected")}
                className="rounded-lg border border-red-400/20 px-3 py-2 text-xs text-red-400 hover:bg-red-400/10"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;