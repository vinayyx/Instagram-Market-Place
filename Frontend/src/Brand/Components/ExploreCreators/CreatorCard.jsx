import {
  Bookmark,
  MapPin,
  Users,
  Eye,
  TrendingUp,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { PLATFORM_ICONS } from "../Icon/PlatformIcons";

const FALLBACK_COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='160'><rect width='100%' height='100%' fill='#1c1f1c'/></svg>`,
  );

const getInitial = (name = "") => name.trim().charAt(0).toUpperCase() || "C";

const CreatorCard = ({
  creator,
  isShortlisted,
  onShortlist,
  onViewProfile,
}) => {
  const platforms = creator.platforms ?? [];
  const isAvailable = creator.availability === "Available";
  const navigate = useNavigate();

  const metrics = [
    { icon: Users, value: creator.followersLabel, label: "Followers" },
    {
      icon: TrendingUp,
      value: creator.engagement != null ? `${creator.engagement}%` : "-",
      label: "Engagement",
    },
    { icon: Eye, value: creator.avgViewsLabel, label: "Avg. Views" },
  ];

  return (
    <article className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171917] transition duration-300 hover:border-[#D0FF71]/25 md:hover:-translate-y-1">
      {/* COVER */}
      <div className="relative h-28 shrink-0 overflow-hidden bg-[#1c1f1c] sm:h-32">
        <img
          src={creator.cover || FALLBACK_COVER}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_COVER;
          }}
          className="h-full w-full object-cover opacity-40 transition duration-500 md:group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171917] via-[#171917]/30 to-transparent" />

        {/* AVAILABILITY aur SHORTLIST button waise hi rahenge, kuch change nahi */}

        {/* AVAILABILITY */}
        <span
          className={`absolute left-3 top-3 max-w-[60%] truncate rounded-lg border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md sm:text-[11px] ${
            isAvailable
              ? "border-[#D0FF71]/20 bg-black/50 text-[#D0FF71]"
              : "border-amber-400/20 bg-black/50 text-amber-400"
          }`}
        >
          {creator.availability}
        </span>

        {/* SHORTLIST */}
        <button
          type="button"
          onClick={() => onShortlist?.(creator)}
          aria-pressed={isShortlisted}
          aria-label={
            isShortlisted ? "Remove from shortlist" : "Add to shortlist"
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/60 ${
            isShortlisted
              ? "border-[#D0FF71]/30 bg-[#D0FF71] text-black"
              : "border-white/20 bg-black/40 text-white hover:border-[#D0FF71]/40 hover:text-[#D0FF71]"
          }`}
        >
          <Bookmark size={16} fill={isShortlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* PROFILE */}
        <div className="relative z-10 flex items-start gap-3">
          {creator.avatar ? (
            <img
              src={creator.avatar}
              alt={creator.name}
              loading="lazy"
              className="-mt-10 h-14 w-14 shrink-0 rounded-full border-[3px] border-[#171917] bg-[#1c1f1c] object-cover shadow-lg shadow-black/40 sm:h-16 sm:w-16"
            />
          ) : (
            <div className="-mt-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-[#171917] bg-[#1c1f1c] text-lg font-bold text-[#D0FF71] shadow-lg shadow-black/40 sm:h-16 sm:w-16">
              {getInitial(creator.name)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <h3 className="truncate text-sm font-semibold text-white sm:text-[15px]">
                {creator.name}
              </h3>

              {creator.verified && (
                <BadgeCheck
                  size={15}
                  className="shrink-0 text-[#D0FF71]"
                  fill="#D0FF71"
                  stroke="#101110"
                  aria-label="Verified"
                />
              )}
            </div>

            <p className="mt-0.5 truncate text-[11px] text-gray-500 sm:text-xs">
              {creator.username}
            </p>
          </div>
        </div>

        {/* BIO */}
        <p className="mt-3 line-clamp-2 min-h-[34px] text-[11px] leading-relaxed text-gray-400 sm:min-h-[36px] sm:text-xs">
          {creator.bio}
        </p>

        {/* CATEGORY + LOCATION */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-lg bg-[#D0FF71]/[0.08] px-2.5 py-1 text-[10px] font-medium text-[#D0FF71] sm:text-[11px]">
            {creator.category}
          </span>

          <span className="flex min-w-0 items-center gap-1 text-[10px] text-gray-500 sm:text-[11px]">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{creator.location}</span>
          </span>
        </div>

        {/* PLATFORMS */}
        {platforms.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {platforms.map((platform) => {
              const Icon = PLATFORM_ICONS[platform] ?? Users;

              return (
                <span
                  key={platform}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-2 py-1 text-[10px] text-gray-400 sm:text-[11px]"
                >
                  <Icon size={12} />
                  {platform}
                </span>
              );
            })}
          </div>
        )}

        {/* METRICS */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-white/[0.07] py-3">
          {metrics.map(({ icon: Icon, value, label }) => (
            <div key={label} className="min-w-0">
              <Icon size={13} className="mb-1.5 text-gray-500" />
              <p className="truncate text-xs font-bold text-white sm:text-[13px]">
                {value ?? "-"}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-gray-500">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* PRICE + ACTION (always bottom me, cards equal height) */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500">Starting from</p>
            <p className="mt-0.5 text-sm font-bold text-white sm:text-[15px]">
              ₹{Number(creator.startingPrice ?? 0).toLocaleString("en-IN")}
              <span className="text-[10px] font-normal text-gray-500">
                {" "}
                / post
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              navigate(
                `/brand/creators/${(creator.username)}`,
                {
                  state: { creator },
                },
              );
            }}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#D0FF71] px-3.5 py-2.5 text-[11px] font-bold text-black transition hover:bg-[#c2f45f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/60 max-[360px]:w-full sm:text-xs"
          >
            View Profile
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CreatorCard;
