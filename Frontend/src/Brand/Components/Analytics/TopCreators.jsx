
import { Eye, TrendingUp } from "lucide-react";

const TopCreators = ({ creators }) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
      <h2 className="font-semibold text-white">Top Performing Creators</h2>
      <p className="mt-1 text-xs text-gray-500">
        Creators driving the most views
      </p>

      <div className="mt-5 space-y-4">
        {creators.map((creator, index) => (
          <div
            key={creator.id}
            className="flex items-center gap-3 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
          >
            <span className="w-5 text-sm font-semibold text-gray-500">
              #{index + 1}
            </span>

            <img
              src={creator.avatar}
              alt={creator.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-white">
                {creator.name}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {creator.username}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="flex items-center justify-end gap-1 text-sm font-semibold text-white">
                <Eye size={13} className="text-[#D0FF71]" />
                {(creator.views / 1000).toFixed(1)}K
              </p>
              <p className="mt-1 flex items-center justify-end gap-1 text-xs text-[#D0FF71]">
                <TrendingUp size={12} />
                {creator.engagement}% engagement
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
