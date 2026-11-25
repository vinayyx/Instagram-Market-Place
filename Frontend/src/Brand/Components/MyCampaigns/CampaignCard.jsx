import {
  CalendarDays,
  Eye,
  Users,
  Wallet,
  ArrowUpRight,
  MoreHorizontal,
  Pause,
  Play,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

const statusStyles = {
  active: "bg-[#D0FF71]/10 text-[#D0FF71]",
  draft: "bg-blue-400/10 text-blue-400",
  paused: "bg-orange-400/10 text-orange-400",
  completed: "bg-emerald-400/10 text-emerald-400",
};

const CampaignCard = ({ campaign, onView, onToggleStatus }) => {
  const budgetProgress =
    campaign.budget > 0
      ? Math.min((campaign.spent / campaign.budget) * 100, 100)
      : 0;

  const statusLabel = {
    active: "Active",
    draft: "Draft",
    paused: "Paused",
    completed: "Completed",
  };

  const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#181A18] p-4 transition hover:border-white/[0.15] sm:p-5">
      {/* Top section */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-[#D0FF71]">
            <span className="text-lg font-bold">
              {campaign.title.charAt(0)}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">
              {campaign.title}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {campaign.id} <span className="mx-1">·</span>{" "}
              {campaign.category}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[campaign.status]}`}
        >
          {statusLabel[campaign.status]}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
        {campaign.description}
      </p>

      {/* Metrics */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.035] p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Wallet size={15} />
            <span className="text-xs">Total Budget</span>
          </div>
          <p className="mt-2 text-base font-semibold text-white">
            {formatCurrency(campaign.budget)}
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.035] p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Users size={15} />
            <span className="text-xs">Creators Hired</span>
          </div>
          <p className="mt-2 text-base font-semibold text-white">
            {campaign.creators}
            <span className="ml-1 text-xs font-normal text-gray-500">
              / {campaign.totalSlots} slots
            </span>
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.035] p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Eye size={15} />
            <span className="text-xs">Total Views</span>
          </div>
          <p className="mt-2 text-base font-semibold text-white">
            {campaign.totalViews.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.035] p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <CalendarDays size={15} />
            <span className="text-xs">End Date</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">
            {formatDate(campaign.endDate)}
          </p>
        </div>
      </div>

      {/* Budget progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400">Budget Utilization</span>
          <span className="text-xs font-medium text-white">
            {Math.round(budgetProgress)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-[#D0FF71] transition-all"
            style={{ width: `${budgetProgress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs">
          <span className="text-gray-500">
            Spent: {formatCurrency(campaign.spent)}
          </span>
          <span className="text-gray-500">
            Remaining: {formatCurrency(campaign.budget - campaign.spent)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="h-2 w-2 rounded-full bg-[#D0FF71]" />
          {campaign.applications} applications received
        </div>

        <div className="flex items-center gap-2">
          {campaign.status === "active" && (
            <button
              onClick={() => onToggleStatus(campaign.id, "paused")}
              title="Pause campaign"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-orange-400/10 hover:text-orange-400"
            >
              <Pause size={15} />
            </button>
          )}

          {campaign.status === "paused" && (
            <button
              onClick={() => onToggleStatus(campaign.id, "active")}
              title="Resume campaign"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-[#D0FF71]/10 hover:text-[#D0FF71]"
            >
              <Play size={15} />
            </button>
          )}

          {campaign.status === "draft" && (
            <span className="flex h-9 items-center gap-1 rounded-lg border border-white/10 px-2 text-xs text-gray-400">
              <FileEdit size={14} /> Draft
            </span>
          )}

          {campaign.status === "completed" && (
            <span className="flex h-9 items-center gap-1 rounded-lg border border-emerald-400/20 px-2 text-xs text-emerald-400">
              <CheckCircle2 size={14} /> Done
            </span>
          )}

          <button
            onClick={() => onView(campaign)}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#D0FF71] px-3 text-xs font-semibold text-black transition hover:bg-[#c1f45e]"
          >
            View Details
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;