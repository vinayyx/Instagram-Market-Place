
import { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Clock3,
  CheckCircle2,
  ArrowDownToLine,
  Download,
  X,
  IndianRupee,
  CreditCard,
  Info,
} from "lucide-react";

import EarningStatCard from "../components/EarningStatCard";
import TransactionRow from "../components/TransactionRow";

import {
  earningStats,
  earningsChart,
  transactions,
} from "../../data/earnings";

export default function Earnings() {
  const [period, setPeriod] = useState("30days");
  const [filter, setFilter] = useState("all");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const chartData = earningsChart[period];

  const maxAmount = Math.max(
    ...chartData.map((item) => item.amount),
    1
  );

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;

    return transactions.filter((item) => item.type === filter);
  }, [filter]);

  const handleWithdraw = (e) => {
    e.preventDefault();

    const requestedAmount = Number(amount);

    if (!upiId.trim() || !upiId.includes("@")) {
      setRequestMessage("Please enter a valid UPI ID.");
      return;
    }

    if (
      !Number.isFinite(requestedAmount) ||
      requestedAmount <= 0 ||
      requestedAmount > earningStats.availableBalance
    ) {
      setRequestMessage("Please enter a valid withdrawal amount.");
      return;
    }

    // Demo only: connect this action to your withdrawal API.
    setRequestMessage(
      "Demo request validated. Connect your withdrawal API to submit this request."
    );
  };

  return (
    <div className="min-h-screen space-y-7 bg-[#111214] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">
            Creator Dashboard / Earnings
          </p>

          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            My Earnings
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Track your income, manage withdrawals and view transactions.
          </p>
        </div>

        <button
          onClick={() => setShowWithdraw(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#c2f55c]"
        >
          <ArrowDownToLine size={18} />
          Withdraw Money
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <EarningStatCard
          title="Available Balance"
          amount={earningStats.availableBalance}
          description="Ready to withdraw"
          icon={Wallet}
          highlight
        />

        <EarningStatCard
          title="Total Earnings"
          amount={earningStats.totalEarnings}
          description="Lifetime approved earnings"
          icon={TrendingUp}
        />

        <EarningStatCard
          title="Pending Earnings"
          amount={earningStats.pendingEarnings}
          description="Awaiting verification"
          icon={Clock3}
        />

        <EarningStatCard
          title="Total Withdrawn"
          amount={earningStats.totalWithdrawn}
          description="Successfully paid"
          icon={CheckCircle2}
        />
      </div>

      {/* Chart + Available balance */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Earnings chart */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#191A1C] p-5 sm:p-6 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                Earnings Overview
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Your earnings over time
              </p>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#222326] px-3 py-2 text-xs text-white outline-none"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="6months">Last 6 Months</option>
            </select>
          </div>

          <div className="mt-8 flex h-56 items-end justify-between gap-2 sm:gap-4">
            {chartData.map((item, index) => {
              const height = Math.max(
                (item.amount / maxAmount) * 100,
                5
              );

              return (
                <div
                  key={item.day}
                  className="group flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="relative flex h-full w-full items-end justify-center">
                    <div
                      style={{ height: `${height}%` }}
                      className={`relative w-full max-w-12 rounded-t-lg transition-all duration-300 group-hover:opacity-80 ${
                        index === chartData.length - 1
                          ? "bg-[#D0FF71]"
                          : "bg-[#D0FF71]/25"
                      }`}
                    >
                      <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#303136] px-2 py-1 text-[10px] text-white group-hover:block">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-500 sm:text-xs">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D0FF71]" />
            <span className="text-xs text-gray-500">
              Earnings (INR)
            </span>
          </div>
        </div>

        {/* Withdraw card */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#D0FF71]/20 bg-gradient-to-br from-[#D0FF71]/10 to-[#191A1C] p-5 sm:p-6">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-[#D0FF71]">
              <Wallet size={24} />
            </div>

            <p className="mt-6 text-sm text-gray-400">
              Available to withdraw
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#D0FF71]">
              ₹{earningStats.availableBalance.toLocaleString("en-IN")}
            </h2>

            <p className="mt-3 text-xs leading-5 text-gray-500">
              Your approved earnings are ready for withdrawal.
              Submit a request using your registered UPI ID.
            </p>
          </div>

          <button
            onClick={() => setShowWithdraw(true)}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF71] py-3 text-sm font-semibold text-black transition hover:bg-[#c2f55c]"
          >
            <ArrowDownToLine size={17} />
            Request Withdrawal
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#191A1C] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Transaction History
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              View all your earnings and withdrawal records.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs text-gray-300 transition hover:bg-white/5"
          >
            <Download size={15} />
            Export / Print
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "All Transactions", value: "all" },
            { label: "Earnings", value: "earning" },
            { label: "Withdrawals", value: "withdrawal" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                filter === item.value
                  ? "bg-[#D0FF71] text-black"
                  : "bg-white/[0.05] text-gray-400 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="mt-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <Wallet
                size={32}
                className="mx-auto text-gray-600"
              />
              <p className="mt-3 text-sm text-gray-400">
                No transactions found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdraw && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => {
            setShowWithdraw(false);
            setRequestMessage("");
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1B1D] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Withdraw Money
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Request a payout to your UPI account.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowWithdraw(false);
                  setRequestMessage("");
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-[#D0FF71]/20 bg-[#D0FF71]/[0.06] p-4">
              <p className="text-xs text-gray-400">
                Available Balance
              </p>
              <h3 className="mt-1 text-2xl font-bold text-[#D0FF71]">
                ₹{earningStats.availableBalance.toLocaleString("en-IN")}
              </h3>
            </div>

            <form onSubmit={handleWithdraw} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-300">
                  Withdrawal Amount
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#222326] px-3 focus-within:border-[#D0FF71]/50">
                  <IndianRupee size={17} className="text-gray-500" />
                  <input
                    type="number"
                    min="1"
                    max={earningStats.availableBalance}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setRequestMessage("");
                    }}
                    placeholder="Enter amount"
                    className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-300">
                  UPI ID
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#222326] px-3 focus-within:border-[#D0FF71]/50">
                  <CreditCard size={17} className="text-gray-500" />
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      setRequestMessage("");
                    }}
                    placeholder="example@upi"
                    className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg bg-white/[0.04] p-3">
                <Info size={16} className="mt-0.5 shrink-0 text-[#D0FF71]" />
                <p className="text-[11px] leading-5 text-gray-400">
                  Your withdrawal request will be reviewed before
                  payment processing. Actual payout timelines and
                  minimum withdrawal rules should be configured by Infule.
                </p>
              </div>

              {requestMessage && (
                <p className="rounded-lg bg-white/[0.05] p-3 text-xs text-gray-300">
                  {requestMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#D0FF71] py-3 text-sm font-semibold text-black transition hover:bg-[#c2f55c]"
              >
                Submit Withdrawal Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
