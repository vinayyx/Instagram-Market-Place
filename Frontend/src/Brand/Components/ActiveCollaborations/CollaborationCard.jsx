import {
  MapPin,
  Eye,
  CalendarDays,
  IndianRupee,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

const statusConfig = {
  in_progress: {
    label: "In Progress",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  content_submitted: {
    label: "Content Submitted",
    className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  under_review: {
    label: "Under Review",
    className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  completed: {
    label: "Completed",
    className: "bg-[#D0FF71]/10 text-[#D0FF71] border-[#D0FF71]/20",
  },
};

import { PLATFORM_ICONS } from "../Icon/PlatformIcons";

const CollaborationCard = ({ collaboration, onView }) => {
  const status = statusConfig[collaboration.status];

  const progress =
    collaboration.totalDeliverables > 0
      ? (collaboration.completedDeliverables /
          collaboration.totalDeliverables) *
        100
      : 0;

  const PlatformIcon =
    collaboration.platform === "YouTube" ? PLATFORM_ICONS.YouTube : PLATFORM_ICONS.Instagram;

  const deadline = new Date(
    collaboration.deadline
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5 transition hover:border-white/[0.14]">
      {/* Top section */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={collaboration.avatar}
            alt={collaboration.creatorName}
            className="h-12 w-12 rounded-full border border-white/10 object-cover"
          />

          <div>
            <h3 className="font-semibold text-white">
              {collaboration.creatorName}
            </h3>

            <p className="mt-0.5 text-sm text-gray-500">
              {collaboration.username}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${status?.className}`}
        >
          {status?.label}
        </span>
      </div>

      {/* Campaign */}
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#202220] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Campaign</p>

            <h4 className="mt-1 font-medium text-white">
              {collaboration.campaignName}
            </h4>

            <p className="mt-1 text-xs text-gray-500">
              {collaboration.campaignId} · {collaboration.category}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-gray-300">
            <PlatformIcon size={18} />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <IndianRupee size={15} />
            <span className="text-xs">Agreed Amount</span>
          </div>

          <p className="mt-1 text-lg font-semibold text-white">
            ₹{collaboration.agreedAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <Eye size={15} />
            <span className="text-xs">Total Views</span>
          </div>

          <p className="mt-1 text-lg font-semibold text-white">
            {collaboration.views.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <FileText size={15} />
            <span className="text-xs">Deliverables</span>
          </div>

          <p className="mt-1 text-lg font-semibold text-white">
            {collaboration.completedDeliverables}/
            {collaboration.totalDeliverables}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <CalendarDays size={15} />
            <span className="text-xs">Deadline</span>
          </div>

          <p className="mt-1 text-sm font-semibold text-white">
            {deadline}
          </p>
        </div>
      </div>

      {/* Deliverable progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-gray-400">Deliverable Progress</p>

          <p className="text-xs font-medium text-[#D0FF71]">
            {Math.round(progress)}%
          </p>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-[#D0FF71] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {collaboration.status === "completed" ? (
            <CheckCircle2 size={15} className="text-[#D0FF71]" />
          ) : (
            <Clock3 size={15} />
          )}

          <span>
            Paid: ₹
            {collaboration.paidAmount.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={() => onView(collaboration)}
          className="flex items-center gap-2 rounded-xl bg-[#D0FF71] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c1ef61]"
        >
          View Details
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CollaborationCard;