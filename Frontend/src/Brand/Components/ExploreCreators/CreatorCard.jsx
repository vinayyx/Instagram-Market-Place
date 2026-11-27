import {
  Bookmark,
  MapPin,
  Users,
  Eye,
  TrendingUp,
  BadgeCheck,
  ArrowUpRight,
  LayoutGrid,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { PLATFORM_ICONS } from "../Icon/PlatformIcons";

const FALLBACK_COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='160'><rect width='100%' height='100%' fill='#1c1f1c'/></svg>`,
  );

const getInitial = (name = "") => name.trim().charAt(0).toUpperCase() || "C";

const TYPE_META = {
  theme_page: { label: "Theme Page", icon: LayoutGrid },
  individual: { label: "Creator", icon: User },
};

const CreatorCard = ({
  creator,
  isShortlisted,
  onShortlist,
  onViewProfile,
}) => {
  const platforms = creator.platforms ?? [];
  const isAvailable = creator.availability === "Available";
  const navigate = useNavigate();

  const type = TYPE_META[creator.accountType] ?? TYPE_META.individual;
  const TypeIcon = type.icon;

  const metrics = [
    { icon: Users, value: creator.followersLabel, label: "Followers" },
    {
      icon: TrendingUp,
      value: creator.engagement != null ? `${creator.engagement}%` : "-",
      label: "Engagement",
    },
    { icon: Eye, value: creator.avgViewsLabel, label: "Avg. Views" },
  ];

  const openProfile = () => {
    navigate(`/brand/creators/${encodeURIComponent(creator._id)}`, {
      state: { creator },
    });
  };

  return (
    <article className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171917] transition-colors duration-200 hover:border-[#D0FF71]/30 hover:bg-[#191c19]">
      {/* COVER */}
      <div className="relative h-24 shrink-0 overflow-hidden bg-[#1c1f1c] sm:h-28">
        <img
          src={creator.cover || FALLBACK_COVER}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_COVER;
          }}
          className="h-full w-full object-cover opacity-40"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(208,255,113,0.14),transparent_60%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171917] via-[#171917]/30 to-transparent" />

        {/* TYPE */}
        <span className="absolute left-3 top-3 flex max-w-[65%] items-center gap-1.5 rounded-lg border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md sm:text-[11px]">
          <TypeIcon size={12} className="shrink-0 text-[#D0FF71]" />
          <span className="truncate">{type.label}</span>
        </span>

        {/* SHORTLIST */}
        <button
          type="button"
          onClick={() => onShortlist?.(creator)}
          aria-pressed={isShortlisted}
          aria-label={
            isShortlisted ? "Remove from shortlist" : "Add to shortlist"
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/60 ${
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

          <div className="min-w-0 flex-1 pt-0.5">
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

        {/* AVAILABILITY + LOCATION */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] sm:text-[11px]">
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium ${
              isAvailable
                ? "border-[#D0FF71]/20 bg-[#D0FF71]/[0.06] text-[#D0FF71]"
                : "border-amber-400/20 bg-amber-400/[0.06] text-amber-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isAvailable ? "bg-[#D0FF71]" : "bg-amber-400"
              }`}
            />
            {creator.availability}
          </span>

          <span className="flex min-w-0 items-center gap-1 text-gray-500">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{creator.location}</span>
          </span>
        </div>

        {/* BIO */}
        <p className="mt-3 line-clamp-2 min-h-[34px] text-[11px] leading-relaxed text-gray-400 sm:min-h-[36px] sm:text-xs">
          {creator.bio}
        </p>

        {/* CATEGORY + PLATFORMS */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-[#D0FF71]/[0.08] px-2.5 py-1 text-[10px] font-medium text-[#D0FF71] sm:text-[11px]">
            {creator.category}
          </span>

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

        {/* METRICS */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.07] rounded-xl border border-white/[0.07] bg-white/[0.02]">
          {metrics.map(({ icon: Icon, value, label }) => (
            <div key={label} className="min-w-0 px-2.5 py-2.5 sm:px-3">
              <div className="mb-1 flex items-center gap-1 text-gray-500">
                <Icon size={12} className="shrink-0" />
                <p className="truncate text-[10px]">{label}</p>
              </div>
              <p className="truncate text-xs font-bold text-white sm:text-sm">
                {value ?? "-"}
              </p>
            </div>
          ))}
        </div>

        {/* PRICE + ACTION (always at bottom, cards equal height) */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
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
            onClick={openProfile}
            className="group/btn ml-auto flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#D0FF71] px-3.5 py-2.5 text-[11px] font-bold text-black transition-colors hover:bg-[#c2f45f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/60 sm:text-xs"
          >
            View Profile
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CreatorCard;