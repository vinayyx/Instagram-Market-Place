
import {
  ArrowUpRight,
  Clock3,
  Users,
  Bookmark,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CampaignCard = ({ campaign }) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="group flex flex-col rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D0FF71]/30">

      {/* Brand */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-lg font-bold text-[#D0FF71]">
            {campaign.brandInitial}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              {campaign.brand}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Verified Brand
            </p>
          </div>
        </div>

        <button
          onClick={() => setSaved(!saved)}
          className={`rounded-lg border p-2 transition ${
            saved
              ? "border-[#D0FF71]/30 bg-[#D0FF71]/10 text-[#D0FF71]"
              : "border-white/10 text-gray-400 hover:text-white"
          }`}
          aria-label="Save campaign"
        >
          <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Title */}
      <div className="mt-5">
        <div className="flex flex-wrap gap-2">
          {campaign.featured && (
            <span className="flex items-center gap-1 rounded-md bg-[#D0FF71]/10 px-2 py-1 text-[10px] font-medium text-[#D0FF71]">
              <Star size={11} />
              Featured
            </span>
          )}

          <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-gray-400">
            {campaign.category}
          </span>
        </div>

        <h2 className="mt-3 text-lg font-semibold text-white transition group-hover:text-[#D0FF71]">
          {campaign.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
          {campaign.description}
        </p>
      </div>

      {/* Content type */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <Users size={15} className="text-[#D0FF71]" />
        {campaign.contentType}
      </div>

      {/* Payment */}
      <div className="mt-5 rounded-xl border border-[#D0FF71]/15 bg-[#D0FF71]/5 p-4">
        <p className="text-xs text-gray-400">
          {campaign.paymentModel === "Fixed Payment"
            ? "Fixed Campaign Payment"
            : "Payment Rate"}
        </p>

        <div className="mt-1 flex items-end justify-between gap-2">
          <h3 className="text-2xl font-bold text-[#D0FF71]">
            ₹{campaign.paymentModel === "Fixed Payment"
              ? campaign.rate.toLocaleString("en-IN")
              : campaign.rate}
          </h3>

          <span className="pb-1 text-xs text-gray-400">
            {campaign.paymentModel === "Fixed Payment"
              ? "Fixed"
              : "Per 1K views"}
          </span>
        </div>

        {campaign.paymentModel !== "Fixed Payment" && (
          <p className="mt-2 text-xs text-gray-500">
            Maximum payout: ₹{campaign.maxPayout.toLocaleString("en-IN")}
          </p>
        )}
      </div>

      {/* Requirements */}
      <div className="mt-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Users size={15} />
          {campaign.minFollowers.toLocaleString("en-IN")}+ followers
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock3 size={15} />
          {campaign.slots} slots left
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div>
          <p className="text-[11px] text-gray-500">
            Apply before
          </p>
          <p className="mt-1 text-xs font-medium text-white">
            {campaign.deadline}
          </p>
        </div>

        <Link
          to={`/creator/campaigns/${campaign.id}`}
          className="flex items-center gap-2 rounded-lg bg-[#D0FF71] px-4 py-2.5 text-xs font-semibold text-[#101110] transition hover:bg-[#c1f45c]"
        >
          View Details
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
