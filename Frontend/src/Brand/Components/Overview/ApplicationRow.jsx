
import { Eye, Check, X } from "lucide-react";

const ApplicationRow = ({ application, onApprove, onReject }) => {
  return (
    <div className="flex flex-col gap-3 border-b border-white/[0.06] py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={application.avatar}
          alt={application.name}
          className="h-10 w-10 rounded-full border border-white/10 object-cover"
        />

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-white">
            {application.name}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-gray-500">
            {application.username} · {application.followers} followers
          </p>
          <p className="mt-1 truncate text-[10px] text-gray-600">
            {application.campaign}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <div className="sm:text-right">
          <p className="text-[10px] font-semibold text-[#D0FF71]">
            {application.engagement} ER
          </p>
          <p className="mt-1 text-[9px] text-gray-600">
            {application.applied}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onApprove?.(application)}
            aria-label="Approve application"
            className="rounded-lg border border-[#D0FF71]/20 bg-[#D0FF71]/[0.08] p-2 text-[#D0FF71] transition hover:bg-[#D0FF71] hover:text-black"
          >
            <Check size={14} />
          </button>

          <button
            onClick={() => onReject?.(application)}
            aria-label="Reject application"
            className="rounded-lg border border-red-500/20 bg-red-500/[0.06] p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <X size={14} />
          </button>

          <button
            aria-label="View application"
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationRow;
