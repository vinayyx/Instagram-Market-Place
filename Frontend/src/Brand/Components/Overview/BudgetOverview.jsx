
import { Wallet, ArrowUpRight, Clock3, CircleDollarSign } from "lucide-react";

const BudgetOverview = ({ budget }) => {
  const spentPercentage = (budget.spent / budget.totalBudget) * 100;
  const pendingPercentage = (budget.pending / budget.totalBudget) * 100;
  const remainingPercentage = Math.max(
    0,
    100 - spentPercentage - pendingPercentage
  );

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Budget Overview
          </h2>
          <p className="mt-1 text-[10px] text-gray-500">
            Your campaign budget breakdown
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-[#D0FF71]">
          <Wallet size={17} />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] text-gray-500">Total allocated budget</p>
        <h3 className="mt-1 text-2xl font-bold text-white">
          {formatCurrency(budget.totalBudget)}
        </h3>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full bg-[#D0FF71]"
          style={{ width: `${spentPercentage}%` }}
        />
        <div
          className="h-full bg-amber-400"
          style={{ width: `${pendingPercentage}%` }}
        />
        <div
          className="h-full bg-[#454A45]"
          style={{ width: `${remainingPercentage}%` }}
        />
      </div>

      {/* BUDGET STATS */}
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D0FF71]" />
            <span className="text-xs text-gray-400">Spent</span>
          </div>
          <span className="text-xs font-semibold text-white">
            {formatCurrency(budget.spent)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-xs text-gray-400">Pending payments</span>
          </div>
          <span className="text-xs font-semibold text-white">
            {formatCurrency(budget.pending)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#454A45]" />
            <span className="text-xs text-gray-400">Remaining</span>
          </div>
          <span className="text-xs font-semibold text-white">
            {formatCurrency(budget.remaining)}
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5">
        <div className="rounded-xl bg-[#101210] p-3">
          <CircleDollarSign size={15} className="text-[#D0FF71]" />
          <p className="mt-2 text-[9px] text-gray-500">Spent percentage</p>
          <p className="mt-1 text-sm font-bold text-white">
            {spentPercentage.toFixed(1)}%
          </p>
        </div>

        <div className="rounded-xl bg-[#101210] p-3">
          <Clock3 size={15} className="text-amber-400" />
          <p className="mt-2 text-[9px] text-gray-500">Pending amount</p>
          <p className="mt-1 text-sm font-bold text-white">
            {formatCurrency(budget.pending)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
