import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  Bookmark,
} from "lucide-react";

const ApplicationStats = ({ applications }) => {
  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: Users,
      color: "text-white",
      bg: "bg-white/10",
    },
    {
      title: "Pending Review",
      value: applications.filter((a) => a.status === "pending").length,
      icon: Clock3,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      title: "Approved",
      value: applications.filter((a) => a.status === "approved").length,
      icon: CheckCircle2,
      color: "text-[#D0FF71]",
      bg: "bg-[#D0FF71]/10",
    },
    {
      title: "Rejected",
      value: applications.filter((a) => a.status === "rejected").length,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      title: "Shortlisted",
      value: applications.filter((a) => a.status === "shortlisted").length,
      icon: Bookmark,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/[0.07] bg-[#171917] p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg}`}>
                <Icon size={17} className={stat.color} />
              </div>
              <span className="text-[10px] text-gray-600">All time</span>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">
              {stat.value}
            </h3>

            <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationStats;