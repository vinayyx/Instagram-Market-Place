
import {
  ArrowUpRight,
  Clock3,
  CalendarDays,
  Wallet,
  Eye,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";

import { Link } from "react-router-dom";

const statusConfig = {
  pending: {
    label: "Pending Review",
    icon: Clock3,
    className: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-[#D0FF71]/10 text-[#D0FF71] border-[#D0FF71]/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-400/10 text-red-400 border-red-400/20",
  },
  withdrawn: {
    label: "Withdrawn",
    icon: AlertCircle,
    className: "bg-gray-400/10 text-gray-400 border-gray-400/20",
  },
};

const ApplicationCard = ({
  application,
  onWithdraw,
  onViewDetails,
}) => {
  const status = statusConfig[application.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  const isPending = application.status === "pending";
  const isApproved = application.status === "approved";

  return (
    <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 transition hover:border-[#D0FF71]/20">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-xl font-bold text-[#D0FF71]">
            {application.brandInitial}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-white">
              {application.brand}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {application.category}
            </p>
          </div>
        </div>

        <span
          className={`flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${status.className}`}
        >
          <StatusIcon size={13} />
          {status.label}
        </span>
      </div>

      {/* Campaign */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold text-white">
          {application.title}
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Application ID: {application.id}
        </p>
      </div>

      {/* Information */}
      <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-[#101110] p-4">

        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Wallet size={14} />
            Payment Model
          </div>

          <p className="mt-2 text-sm font-semibold text-white">
            {application.paymentModel === "Fixed Payment"
              ? "Fixed Payment"
              : `₹${application.rate} / 1K views`}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Eye size={14} />
            Maximum Payout
          </div>

          <p className="mt-2 text-sm font-semibold text-[#D0FF71]">
            ₹{application.maxPayout.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CalendarDays size={14} />
            Applied On
          </div>

          <p className="mt-2 text-sm font-medium text-white">
            {application.appliedAt}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock3 size={14} />
            Last Updated
          </div>

          <p className="mt-2 text-sm font-medium text-white">
            {application.updatedAt}
          </p>
        </div>
      </div>

      {/* Rejection reason */}
      {application.status === "rejected" &&
        application.rejectionReason && (
          <div className="mt-4 flex gap-3 rounded-xl border border-red-400/10 bg-red-400/5 p-4">
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <div>
              <p className="text-xs font-semibold text-red-400">
                Reason for rejection
              </p>

              <p className="mt-1 text-sm leading-5 text-gray-400">
                {application.rejectionReason}
              </p>
            </div>
          </div>
        )}

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-xs text-gray-500">
          {isPending && "Waiting for brand response"}
          {isApproved && "Your application has been accepted"}
          {application.status === "rejected" && "Application was not accepted"}
          {application.status === "withdrawn" && "You withdrew this application"}
        </p>

        <div className="flex flex-wrap gap-2">

          {isPending && (
            <button
              onClick={() => onWithdraw?.(application)}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:border-red-400/30 hover:text-red-400"
            >
              <XCircle size={14} />
              Withdraw
            </button>
          )}

          {isApproved && (
            <Link
              to="/creator/active-campaigns"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#D0FF71] px-4 py-2.5 text-xs font-semibold text-[#101110] hover:bg-[#c1f45c]"
            >
              View Campaign
              <ArrowUpRight size={14} />
            </Link>
          )}

          <button
            onClick={() => onViewDetails?.(application)}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#D0FF71]/20 px-4 py-2.5 text-xs font-medium text-[#D0FF71] transition hover:bg-[#D0FF71]/10"
          >
            View Details
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
