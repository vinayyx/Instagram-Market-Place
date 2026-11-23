import {
  ArrowUpRight,
  CalendarDays,
  Eye,
  Wallet,
  CheckCircle2,
  Clock3,
  PlayCircle,
} from "lucide-react";

const statusConfig = {
  active: {
    label: "Not Started",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-[#D0FF71]/10 text-[#D0FF71] border-[#D0FF71]/20",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
};

const ActiveCampaignCard = ({
  campaign,
  onViewDetails,
  onSubmitReel,
}) => {
  const status = statusConfig[campaign.status] || statusConfig.active;

  const totalDeliverables =
    campaign.deliverables.reels + campaign.deliverables.stories;

  const completedDeliverables =
    campaign.completedDeliverables.reels +
    campaign.completedDeliverables.stories;

  const progress =
    totalDeliverables > 0
      ? Math.round((completedDeliverables / totalDeliverables) * 100)
      : 0;

  const viewProgress =
    campaign.targetViews > 0
      ? Math.min(
          Math.round(
            (campaign.currentViews / campaign.targetViews) * 100
          ),
          100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181A18] p-5 transition hover:border-white/20">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-lg font-bold text-[#D0FF71]">
            {campaign.brandInitial}
          </div>

          <div className="min-w-0">
            <p className="text-sm text-gray-400">{campaign.brand}</p>
            <h3 className="truncate font-semibold text-white">
              {campaign.title}
            </h3>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Category and deadline */}
      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <span className="rounded-md bg-white/5 px-2.5 py-1.5">
          {campaign.category}
        </span>

        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} />
          Due: {campaign.deadline}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock3 size={14} />
          {campaign.daysLeft} days left
        </span>
      </div>

      {/* Earnings and views */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#222522] p-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Wallet size={14} />
            Earned so far
          </div>

          <p className="mt-2 text-xl font-bold text-[#D0FF71]">
            ₹{campaign.earnedAmount.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Max ₹{campaign.maxPayout.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-xl bg-[#222522] p-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Eye size={14} />
            Total views
          </div>

          <p className="mt-2 text-xl font-bold text-white">
            {campaign.currentViews.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {campaign.targetViews > 0
              ? `Target: ${campaign.targetViews.toLocaleString("en-IN")}`
              : "View target not applicable"}
          </p>
        </div>
      </div>

      {/* View progress */}
      {campaign.targetViews > 0 && (
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-gray-400">View target progress</span>
            <span className="font-medium text-white">{viewProgress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#D0FF71] transition-all"
              style={{ width: `${viewProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Deliverables */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-gray-400">Deliverables completed</span>
          <span className="text-white">
            {completedDeliverables}/{totalDeliverables}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
          <span>
            Reels: {campaign.completedDeliverables.reels}/
            {campaign.deliverables.reels}
          </span>
          <span>
            Stories: {campaign.completedDeliverables.stories}/
            {campaign.deliverables.stories}
          </span>
        </div>
      </div>

      {/* Footer actions */}
      <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4">
        <button
          onClick={() => onViewDetails(campaign)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/5"
        >
          View Details
          <ArrowUpRight size={16} />
        </button>

        {campaign.status !== "completed" && (
          <button
            onClick={() => onSubmitReel(campaign)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#c1f45e]"
          >
            <Wallet size={16} />
            Submit Content
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveCampaignCard;