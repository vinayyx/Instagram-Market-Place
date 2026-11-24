
import {
  ArrowDownLeft,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    style: "bg-green-400/10 text-green-400",
  },
  pending: {
    label: "Pending",
    icon: Clock3,
    style: "bg-yellow-400/10 text-yellow-400",
  },
  processing: {
    label: "Processing",
    icon: LoaderCircle,
    style: "bg-blue-400/10 text-blue-400",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    style: "bg-red-400/10 text-red-400",
  },
};

export default function WithdrawalCard({
  withdrawal,
  onViewDetails,
}) {
    console.log(  withdrawal)
  const status = statusConfig[withdrawal.status] || statusConfig.pending;
  console.log(status,  withdrawal)
  const StatusIcon = status.icon;

  const date = new Date(withdrawal.requestedAt);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191A1C] p-4 transition hover:border-white/15 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-[#D0FF71]">
            <ArrowDownLeft size={22} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Withdrawal Request
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {withdrawal.id}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="text-left sm:text-right">
            <p className="text-lg font-semibold text-white">
              ₹{withdrawal.amount.toLocaleString("en-IN")}
            </p>
            <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${status.style}`}>
              <StatusIcon size={12} />
              {status.label}
            </span>
          </div>

          <button
            onClick={() => onViewDetails(withdrawal)}
            className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:border-[#D0FF71]/40 hover:text-[#D0FF71]"
          >
            Details
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
        <div>
          <p className="text-[10px] text-gray-500">Payment Method</p>
          <p className="mt-1 text-xs text-gray-300">
            {withdrawal.paymentMethod} · {withdrawal.upiId}
          </p>
        </div>

        {withdrawal.transactionId && (
          <div className="text-left sm:text-right">
            <p className="text-[10px] text-gray-500">Transaction ID</p>
            <p className="mt-1 text-xs text-gray-300">
              {withdrawal.transactionId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
