
import { Link } from "react-router-dom";
import {
  Users,
  Eye,
  CalendarDays,
  ArrowUpRight,
  Video,
} from "lucide-react";

const ActiveCampaignCard = ({ campaign }) => {
  const remaining = campaign.budget - campaign.spent;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171917] transition hover:border-[#D0FF71]/20">
      <div className="relative h-36 overflow-hidden">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <span className="absolute left-3 top-3 rounded-lg border border-[#D0FF71]/20 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-[#D0FF71] backdrop-blur-md">
          {campaign.status}
        </span>

        <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-[10px] text-gray-200 backdrop-blur-md">
          {campaign.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-white">
          {campaign.title}
        </h3>

        <p className="mt-1 text-[10px] text-gray-600">
          Campaign ID: {campaign.id}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-white/[0.06] py-3">
          <div>
            <Users size={14} className="mb-2 text-gray-500" />
            <p className="text-sm font-semibold text-white">
              {campaign.creators}
            </p>
            <p className="mt-0.5 text-[9px] text-gray-500">Creators</p>
          </div>

          <div>
            <Video size={14} className="mb-2 text-gray-500" />
            <p className="text-sm font-semibold text-white">
              {campaign.submissions}
            </p>
            <p className="mt-0.5 text-[9px] text-gray-500">Reels</p>
          </div>

          <div>
            <Eye size={14} className="mb-2 text-gray-500" />
            <p className="text-sm font-semibold text-white">
              {campaign.views}
            </p>
            <p className="mt-0.5 text-[9px] text-gray-500">Views</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex justify-between text-[10px]">
            <span className="text-gray-500">Campaign progress</span>
            <span className="font-semibold text-[#D0FF71]">
              {campaign.progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-[#D0FF71]"
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] text-gray-500">Budget remaining</p>
            <p className="mt-1 text-xs font-semibold text-white">
              ₹{remaining.toLocaleString("en-IN")}
              <span className="font-normal text-gray-600">
                {" "} / ₹{campaign.budget.toLocaleString("en-IN")}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-[9px] text-gray-500">
            <CalendarDays size={12} />
            {campaign.deadline}
          </div>
        </div>

        <Link
          to="/brand/campaigns"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-[11px] font-semibold text-gray-300 transition hover:border-[#D0FF71]/30 hover:bg-[#D0FF71]/[0.06] hover:text-[#D0FF71]"
        >
          View Campaign
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ActiveCampaignCard;
