
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export default function TransactionRow({ transaction }) {
  const isEarning = transaction.type === "earning";

  const statusConfig = {
    completed: {
      label: "Completed",
      className: "text-green-400 bg-green-400/10",
    },
    pending: {
      label: "Pending",
      className: "text-yellow-400 bg-yellow-400/10",
    },
    under_review: {
      label: "Under Review",
      className: "text-blue-400 bg-blue-400/10",
    },
    failed: {
      label: "Failed",
      className: "text-red-400 bg-red-400/10",
    },
  };

  const status = statusConfig[transaction.status] || statusConfig.pending;

  return (
    <div className="flex flex-col gap-3 border-b border-white/[0.06] py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isEarning
              ? "bg-[#D0FF71]/10 text-[#D0FF71]"
              : "bg-blue-400/10 text-blue-400"
          }`}
        >
          {isEarning ? (
            <ArrowDownLeft size={20} />
          ) : (
            <ArrowUpRight size={20} />
          )}
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-sm font-medium text-white">
            {transaction.title}
          </h4>
          <p className="mt-1 text-xs text-gray-500">
            {transaction.subtitle} · {transaction.date}
          </p>
          <p className="mt-1 text-[10px] text-gray-600">
            {transaction.id}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span
          className={`text-sm font-semibold ${
            isEarning ? "text-[#D0FF71]" : "text-white"
          }`}
        >
          {isEarning ? "+" : "-"}₹
          {transaction.amount.toLocaleString("en-IN")}
        </span>

        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${status.className}`}
        >
          {transaction.status === "completed" ? (
            <CheckCircle2 size={12} />
          ) : (
            <Clock3 size={12} />
          )}
          {status.label}
        </span>
      </div>
    </div>
  );
}
