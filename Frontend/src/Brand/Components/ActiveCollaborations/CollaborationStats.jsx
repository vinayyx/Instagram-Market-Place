import {
  Users,
  CheckCircle2,
  Clock,
  IndianRupee,
} from "lucide-react";

const CollaborationStats = ({ collaborations }) => {
  const active = collaborations.filter(
    (item) => item.status !== "completed"
  ).length;

  const completed = collaborations.filter(
    (item) => item.status === "completed"
  ).length;

  const pending = collaborations.filter(
    (item) =>
      item.status === "content_submitted" ||
      item.status === "under_review"
  ).length;

  const totalSpent = collaborations.reduce(
    (total, item) => total + item.paidAmount,
    0
  );

  const stats = [
    {
      title: "Active Collaborations",
      value: active,
      icon: Users,
      description: "Currently running",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      description: "Successfully completed",
    },
    {
      title: "Pending Review",
      value: pending,
      icon: Clock,
      description: "Content needs attention",
    },
    {
      title: "Total Paid",
      value: `₹${totalSpent.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      description: "Payments completed",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/[0.07] bg-[#181A18] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{stat.title}</p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-[#D0FF71]">
                <Icon size={19} />
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              {stat.value}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CollaborationStats;