
import { ArrowUpRight, Eye } from "lucide-react";

const formatNumber = (value) =>
  value >= 1000000
    ? `${(value / 1000000).toFixed(2)}M`
    : value >= 1000
    ? `${(value / 1000).toFixed(1)}K`
    : value;

const CampaignPerformance = ({ campaigns }) => {
  const sortedCampaigns = [...campaigns].sort(
    (a, b) => b.views - a.views
  );

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
      <div>
        <h2 className="font-semibold text-white">Campaign Performance</h2>
        <p className="mt-1 text-xs text-gray-500">
          Compare views and budget utilization
        </p>
      </div>

      <div className="mt-5 space-y-5">
        {sortedCampaigns.map((campaign) => {
          const budgetPercentage =
            campaign.budget > 0
              ? Math.min((campaign.spent / campaign.budget) * 100, 100)
              : 0;

          return (
            <div key={campaign.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-white">
                    {campaign.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {campaign.creators} creators · {campaign.category}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-white">
                    {formatNumber(campaign.views)}
                  </p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#D0FF71]"
                  style={{
                    width: `${budgetPercentage}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>₹{campaign.spent.toLocaleString("en-IN")} spent</span>
                <span>{budgetPercentage.toFixed(0)}% budget used</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignPerformance;
