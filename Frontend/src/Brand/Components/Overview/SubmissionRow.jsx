
import { Clock3, Eye, CheckCircle2, AlertCircle } from "lucide-react";

const SubmissionRow = ({ submission }) => {
  const approved = submission.status === "Approved";

  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] py-3 last:border-0">
      <img
        src={submission.thumbnail}
        alt={submission.campaign}
        className="h-14 w-11 shrink-0 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-white">
          {submission.creator}
        </p>

        <p className="mt-1 truncate text-[10px] text-gray-500">
          {submission.campaign}
        </p>

        <p className="mt-1 flex items-center gap-1 text-[9px] text-gray-600">
          <Clock3 size={10} />
          {submission.submitted}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <span
          className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-semibold ${
            approved
              ? "bg-[#D0FF71]/10 text-[#D0FF71]"
              : "bg-amber-400/10 text-amber-400"
          }`}
        >
          {approved ? (
            <CheckCircle2 size={10} />
          ) : (
            <AlertCircle size={10} />
          )}
          {submission.status}
        </span>

        <p className="mt-2 flex items-center justify-end gap-1 text-[10px] text-gray-500">
          <Eye size={11} />
          {submission.views}
        </p>
      </div>
    </div>
  );
};

export default SubmissionRow;
