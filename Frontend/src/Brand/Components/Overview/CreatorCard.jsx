
import { Eye, Users, ArrowUpRight } from "lucide-react";

const CreatorCard = ({ creator, rank }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#121412] p-3 transition hover:border-[#D0FF71]/20">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D0FF71]/[0.08] text-[10px] font-bold text-[#D0FF71]">
        #{rank}
      </div>

      <img
        src={creator.avatar}
        alt={creator.name}
        className="h-10 w-10 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-white">
          {creator.name}
        </p>
        <p className="mt-0.5 truncate text-[10px] text-gray-500">
          {creator.username}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <span className="flex items-center gap-1 text-[9px] text-gray-500">
            <Users size={11} />
            {creator.followers}
          </span>
          <span className="flex items-center gap-1 text-[9px] text-gray-500">
            <Eye size={11} />
            {creator.views}
          </span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-[11px] font-semibold text-[#D0FF71]">
          {creator.engagement}
        </p>
        <p className="mt-1 text-[9px] text-gray-600">
          Engagement
        </p>
        <ArrowUpRight size={13} className="ml-auto mt-2 text-gray-600" />
      </div>
    </div>
  );
};

export default CreatorCard;
