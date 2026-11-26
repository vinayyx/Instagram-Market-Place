import { Wallet, ArrowUpRight } from "lucide-react";

const SpendingOverview = ({ campaigns }) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
      <div>
        <h2 className="font-semibold text-white">Campaign Spending</h2>
        <p className="mt-1 text-xs text-gray-500">
          Budget utilization by campaign
        </p>
      </div>

      <div className="mt-5 space-y-5">
        {campaigns.map((item) => {
          const percentage =
            item.budget > 0
              ? Math.min((item.spent / item.budget) * 100, 100)
              : 0;

          return (
            <div key={item.campaignId}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {item.campaign}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {item.campaignId}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold text-white">
                  {percentage.toFixed(0)}%
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#D0FF71]"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>
                  ₹{item.spent.toLocaleString("en-IN")} spent
                </span>
                <span>
                  ₹{item.budget.toLocaleString("en-IN")} budget
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingOverview;