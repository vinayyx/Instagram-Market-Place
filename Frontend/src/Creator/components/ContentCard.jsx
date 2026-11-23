import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ExternalLink,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  XCircle,
  User,
} from "lucide-react";

const statusConfig = {
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    className: "bg-[#D0FF71]/10 text-[#D0FF71] border-[#D0FF71]/20",
  },
  under_review: {
    label: "Under Review",
    icon: Clock3,
    className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number || 0);
};

const ContentCard = ({ content, onViewDetails }) => {
  const status = statusConfig[content.status] || statusConfig.under_review;
  const StatusIcon = status.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181A18] transition hover:border-white/20">

      {/* Reel thumbnail */}
      <div
        className={`relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${content.thumbnailColor}`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm">
          <User size={25} />
        </div>

        <div className="absolute left-4 top-4">
          <span
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md ${status.className}`}
          >
            <StatusIcon size={13} />
            {status.label}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 rounded-lg bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
          {content.category}
        </div>
      </div>

      {/* Content information */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D0FF71]/10 font-bold text-[#D0FF71]">
            {content.brandInitial}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-white">
              {content.title}
            </h3>

            <p className="mt-1 truncate text-xs text-gray-400">
              {content.brand} · {content.campaignTitle}
            </p>
          </div>

          <a
            href={content.reelUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="View on Instagram"
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 hover:text-[#D0FF71]"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-4 gap-2">
          <Metric icon={<Eye size={15} />} value={formatNumber(content.views)} label="Views" />

          <Metric icon={<Heart size={15} />} value={formatNumber(content.likes)} label="Likes" />

          <Metric
            icon={<MessageCircle size={15} />}
            value={formatNumber(content.comments)}
            label="Comments"
          />

          <Metric icon={<Share2 size={15} />} value={formatNumber(content.shares)} label="Shares" />
        </div>

        {/* Earnings */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-[#222522] p-3">
          <div>
            <p className="text-xs text-gray-400">
              {content.status === "verified"
                ? "Verified Earnings"
                : "Estimated Earnings"}
            </p>

            <p className="mt-1 text-lg font-bold text-[#D0FF71]">
              ₹{content.status === "verified"
                ? content.earnedAmount.toLocaleString("en-IN")
                : content.estimatedEarnings.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">Engagement</p>
            <p className="mt-1 font-semibold text-white">
              {content.engagementRate}%
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500">
            Submitted {content.submittedAt}
          </span>

          <button
            onClick={() => onViewDetails(content)}
            className="flex items-center gap-1 text-sm font-medium text-[#D0FF71] transition hover:text-white"
          >
            View Details
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ icon, value, label }) => (
  <div className="min-w-0 text-center">
    <div className="flex items-center justify-center gap-1 text-gray-400">
      {icon}
      <span className="truncate text-xs font-medium text-white">{value}</span>
    </div>

    <p className="mt-1 text-[11px] text-gray-500">{label}</p>
  </div>
);

export default ContentCard;