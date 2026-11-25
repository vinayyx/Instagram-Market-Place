
import {
  UserPlus,
  Video,
  Trophy,
  Wallet,
} from "lucide-react";

const activityIcons = {
  application: UserPlus,
  content: Video,
  milestone: Trophy,
  payment: Wallet,
};

const RecentActivity = ({ activities }) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">
          Recent Activity
        </h2>
        <p className="mt-1 text-[10px] text-gray-500">
          Latest updates from your workspace
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] || Wallet;

          return (
            <div key={activity.id} className="flex gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D0FF71]/[0.08] text-[#D0FF71]">
                  <Icon size={16} />
                </div>

                {index !== activities.length - 1 && (
                  <div className="absolute left-1/2 top-10 h-5 w-px -translate-x-1/2 bg-white/10" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-200">
                  {activity.title}
                </p>

                <p className="mt-1 text-[10px] leading-relaxed text-gray-500">
                  {activity.description}
                </p>

                <p className="mt-1.5 text-[9px] text-gray-600">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
