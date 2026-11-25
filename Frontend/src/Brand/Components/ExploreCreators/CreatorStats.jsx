
import { Users, UserCheck, TrendingUp, Bookmark } from "lucide-react";

const CreatorStats = ({ creators, shortlistedCount }) => {
  const totalCreators = creators.length;

  const availableCreators = creators.filter(
    (creator) => creator.availability === "Available"
  ).length;

  const averageEngagement = totalCreators
    ? (
        creators.reduce((sum, creator) => sum + creator.engagement, 0) /
        totalCreators
      ).toFixed(1)
    : "0.0";

  const stats = [
    {
      title: "Total Creators",
      value: totalCreators,
      icon: Users,
    },
    {
      title: "Available Creators",
      value: availableCreators,
      icon: UserCheck,
    },
    {
      title: "Avg. Engagement",
      value: `${averageEngagement}%`,
      icon: TrendingUp,
    },
    {
      title: "Shortlisted",
      value: shortlistedCount,
      icon: Bookmark,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/[0.07] bg-[#171917] p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium text-gray-500 sm:text-xs">
                {stat.title}
              </p>

              <Icon size={17} className="text-[#D0FF71]" />
            </div>

            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default CreatorStats;
