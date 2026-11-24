
import { useMemo, useState } from "react";
import {
  Wallet,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  XCircle,
  Search,
  ArrowDownToLine,
  X,
  Copy,
  Info,
} from "lucide-react";

import WithdrawalCard from "../components/WithdrawalCard";

import {
  withdrawalStats,
  withdrawals,
} from "../../data/withdrawals";

export default function Withdrawals() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const stats = [
    {
      title: "Total Withdrawn",
      amount: withdrawalStats.totalWithdrawn,
      icon: CheckCircle2,
      color: "text-[#D0FF71]",
      bg: "bg-[#D0FF71]/10",
    },
    {
      title: "Pending Amount",
      amount: withdrawalStats.pendingAmount,
      icon: Clock3,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      title: "Processing Amount",
      amount: withdrawalStats.processingAmount,
      icon: LoaderCircle,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Failed Amount",
      amount: withdrawalStats.failedAmount,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
  ];

  console.log(withdrawalStats , withdrawals )

  const filteredWithdrawals = useMemo(() => {
    return withdrawals.filter((item) => {
      const matchesFilter =
        filter === "all" || item.status === filter;

      const query = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.upiId.toLowerCase().includes(query) ||
        (item.transactionId || "").toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard may be unavailable on insecure origins.
    }
  };

  return (
    <div className="min-h-screen space-y-7 bg-[#111214] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <p className="text-sm text-gray-500">
          Creator Dashboard / Withdrawals
        </p>

        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Withdrawals
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Track your withdrawal requests and payment status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.07] bg-[#191A1C] p-5"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                <Icon size={21} />
              </div>

              <p className="mt-5 text-sm text-gray-400">
                {item.title}
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                ₹{item.amount.toLocaleString("en-IN")}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#D0FF71]/15 bg-[#D0FF71]/[0.05] p-4">
        <Info size={19} className="mt-0.5 shrink-0 text-[#D0FF71]" />

        <div>
          <h3 className="text-sm font-medium text-white">
            Withdrawal information
          </h3>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            Track each payout from request submission to successful
            payment. Your transaction ID will appear once payment
            has been completed.
          </p>
        </div>
      </div>

      {/* Withdrawal history */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#191A1C] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Withdrawal History
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {filteredWithdrawals.length} withdrawal requests found
            </p>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID or UPI..."
              className="w-full rounded-xl border border-white/10 bg-[#222326] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#D0FF71]/40"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
            { label: "Processing", value: "processing" },
            { label: "Failed", value: "failed" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition ${
                filter === item.value
                  ? "bg-[#D0FF71] text-black"
                  : "bg-white/[0.05] text-gray-400 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-4 space-y-3">
          {filteredWithdrawals.length > 0 ? (
            filteredWithdrawals.map((withdrawal) => (
              <WithdrawalCard
                key={withdrawal.id}
                withdrawal={withdrawal}
                onViewDetails={setSelectedWithdrawal}
              />
            ))
          ) : (
            <div className="py-16 text-center">
              <Wallet
                size={36}
                className="mx-auto text-gray-600"
              />
              <h3 className="mt-4 text-sm font-medium text-white">
                No withdrawals found
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Try changing your filters or search.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedWithdrawal && (
        <div
          onClick={() => setSelectedWithdrawal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1B1D] p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Withdrawal Details
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedWithdrawal.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedWithdrawal(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-[#D0FF71]/[0.06] p-5 text-center">
              <p className="text-xs text-gray-400">
                Withdrawal Amount
              </p>

              <h3 className="mt-2 text-3xl font-bold text-[#D0FF71]">
                ₹{selectedWithdrawal.amount.toLocaleString("en-IN")}
              </h3>

              <p className="mt-2 text-xs text-gray-400">
                {selectedWithdrawal.status.toUpperCase()}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Request ID", selectedWithdrawal.id],
                ["Payment Method", selectedWithdrawal.paymentMethod],
                ["UPI ID", selectedWithdrawal.upiId],
                [
                  "Requested On",
                  new Date(selectedWithdrawal.requestedAt).toLocaleString("en-IN"),
                ],
                [
                  "Processed On",
                  selectedWithdrawal.processedAt
                    ? new Date(selectedWithdrawal.processedAt).toLocaleString("en-IN")
                    : "Not processed yet",
                ],
                [
                  "Transaction ID",
                  selectedWithdrawal.transactionId || "Not generated yet",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-3"
                >
                  <span className="text-xs text-gray-500">
                    {label}
                  </span>

                  <div className="flex max-w-[65%] items-center gap-2 text-right">
                    <span className="break-all text-xs text-gray-200">
                      {value}
                    </span>

                    {(label === "Request ID" ||
                      label === "Transaction ID") &&
                      !value.includes("Not generated") && (
                        <button
                          onClick={() => copyText(value)}
                          className="shrink-0 text-gray-500 hover:text-[#D0FF71]"
                          title="Copy"
                        >
                          <Copy size={13} />
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-white/[0.04] p-3">
              <p className="text-xs leading-5 text-gray-400">
                {selectedWithdrawal.note}
              </p>
            </div>

            <button
              onClick={() => setSelectedWithdrawal(null)}
              className="mt-5 w-full rounded-xl border border-white/10 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
