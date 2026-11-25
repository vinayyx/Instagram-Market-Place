import {
  Megaphone,
  PlayCircle,
  FileEdit,
  CheckCircle2,
  Wallet,
} from "lucide-react";

const CampaignStats = ({ campaigns }) => {
  const stats = [
    {
      label: "Total Campaigns",
      value: campaigns.length,
      icon: Megaphone,
      color: "text-white",
      bg: "bg-white/5",
    },
    {
      label: "Active Campaigns",
      value: campaigns.filter((item) => item.status === "active").length,
      icon: PlayCircle,
      color: "text-[#D0FF71]",
      bg: "bg-[#D0FF71]/10",
    },
    {
      label: "Draft Campaigns",
      value: campaigns.filter((item) => item.status === "draft").length,
      icon: FileEdit,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Completed",
      value: campaigns.filter((item) => item.status === "completed").length,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Total Budget",
      value: `₹${campaigns.reduce((sum, item) => sum + item.budget, 0).toLocaleString("en-IN")}`,
      icon: Wallet,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-gray-400 sm:text-sm">{stat.label}</p>
              <div className={`rounded-xl p-2 ${stat.bg}`}>
                <Icon size={17} className={stat.color} />
              </div>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default CampaignStats;