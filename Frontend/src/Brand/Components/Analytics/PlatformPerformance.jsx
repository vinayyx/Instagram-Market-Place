
import { PLATFORM_ICONS } from "../Icon/PlatformIcons";
const icons = {
  Instagram : PLATFORM_ICONS.Instagram,
  YouTube: PLATFORM_ICONS.YouTube,
  Facebook: PLATFORM_ICONS.Facebook,
};

const PlatformPerformance = ({ platforms }) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
      <h2 className="font-semibold text-white">Platform Performance</h2>
      <p className="mt-1 text-xs text-gray-500">
        Views distribution by social platform
      </p>

      <div className="mt-5 space-y-5">
        {platforms.map((item) => {
          const Icon = icons[item.platform] || Instagram;

          return (
            <div key={item.platform}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/[0.06] p-2">
                    <Icon size={18} className="text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.platform}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.engagement}% engagement
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    {(item.views / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.percentage}%
                  </p>
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#D0FF71]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformPerformance;
