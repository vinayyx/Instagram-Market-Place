import {
  FileVideo,
  Clock3,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

const SubmissionStats = ({ submissions }) => {
  const stats = [
    {
      label: "Total Submissions",
      value: submissions.length,
      icon: FileVideo,
      color: "text-white",
      bg: "bg-white/10",
    },
    {
      label: "Pending Review",
      value: submissions.filter((s) => s.status === "pending").length,
      icon: Clock3,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Approved",
      value: submissions.filter((s) => s.status === "approved").length,
      icon: CheckCircle2,
      color: "text-[#D0FF71]",
      bg: "bg-[#D0FF71]/10",
    },
    {
      label: "Revision Requested",
      value: submissions.filter((s) => s.status === "revision_requested").length,
      icon: RotateCcw,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400 sm:text-sm">{stat.label}</p>
              <div className={`rounded-xl p-2 ${stat.bg}`}>
                <Icon size={18} className={stat.color} />
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionStats;