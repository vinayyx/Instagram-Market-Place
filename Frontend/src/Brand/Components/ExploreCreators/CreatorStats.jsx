import { Users, UserCheck, TrendingUp, Bookmark } from "lucide-react";

const CreatorStats = ({ creators, shortlistedCount }) => {
  const totalCreators = creators.length;

  const availableCreators = creators.filter(
    (creator) => creator.availability === "Available",
  ).length;

  const averageEngagement = totalCreators
    ? (
        creators.reduce(
          (sum, creator) => sum + Number(creator.engagement || 0),
          0,
        ) / totalCreators
      ).toFixed(1)
    : "0.0";

  const stats = [
    {
      title: "Total Creators",
      hint: "Matching your filters",
      value: totalCreators,
      icon: Users,
    },
    {
      title: "Available Creators",
      hint: "Ready to collaborate",
      value: availableCreators,
      icon: UserCheck,
    },
    {
      title: "Avg. Engagement",
      hint: "Across this list",
      value: `${averageEngagement}%`,
      icon: TrendingUp,
    },
    {
      title: "Shortlisted",
      hint: "Saved by you",
      value: shortlistedCount,
      icon: Bookmark,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171917] p-4 transition hover:border-[#D0FF71]/25 sm:p-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#D0FF71]/[0.06] blur-2xl transition group-hover:bg-[#D0FF71]/[0.12]"
            />

            <div className="relative flex items-start justify-between gap-2">
              <p className="min-w-0 truncate text-[11px] font-medium text-gray-400 sm:text-xs">
                {stat.title}
              </p>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D0FF71]/15 bg-[#D0FF71]/[0.08]">
                <Icon size={15} className="text-[#D0FF71]" />
              </span>
            </div>

            <h3 className="relative mt-3 truncate text-2xl font-bold tracking-tight text-white sm:text-[28px]">
              {stat.value}
            </h3>

            <p className="relative mt-1 truncate text-[10px] text-gray-500 sm:text-[11px]">
              {stat.hint}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CreatorStats;