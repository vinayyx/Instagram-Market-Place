
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  Users,
  Eye,
  TrendingUp,
  Check,
  Bookmark,
  Info,
} from "lucide-react";

import { PLATFORM_ICONS } from "../Components/Icon/PlatformIcons";
import { creators } from "../../BrandData/creatorsData";

const FALLBACK_COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='300'><rect width='100%' height='100%' fill='#1c1f1c'/></svg>`
  );

const getInitial = (name = "") =>
  name.trim().charAt(0).toUpperCase() || "C";

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-white sm:text-[15px]">
    {children}
  </h3>
);

const CreatorDetails = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [isShortlisted, setIsShortlisted] = useState(false);

  // Dummy data se creator find kar rahe hain
  const creator = creators.find(
    (item) => item.username === username
  );

  if (!creator) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-white">
          Creator not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          This creator profile does not exist.
        </p>

        <button
          onClick={() => navigate("/brand/creators")}
          className="mt-5 rounded-xl bg-[#D0FF71] px-5 py-2.5 text-sm font-bold text-black"
        >
          Back to Creators
        </button>
      </div>
    );
  }

  const platforms = creator.platforms ?? [];
  const contentTypes = creator.contentTypes ?? [];
  const audience = creator.audience;
  const isAvailable = creator.availability === "Available";

  const stats = [
    {
      label: "Followers",
      value: creator.followersLabel,
      icon: Users,
    },
    {
      label: "Avg. Views",
      value: creator.avgViewsLabel,
      icon: Eye,
    },
    {
      label: "Engagement",
      value:
        creator.engagement != null
          ? `${creator.engagement}%`
          : "-",
      icon: TrendingUp,
    },
    {
      label: "Campaigns",
      value: creator.completedCampaigns,
      icon: Check,
    },
  ];

  const audienceItems = audience
    ? [
        { label: "Male Audience", value: `${audience.male}%` },
        { label: "Age Group", value: audience.age },
        { label: "Top Location", value: audience.topLocation },
      ]
    : [];

  const handleShortlist = () => {
    setIsShortlisted((prev) => !prev);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 pb-8">

      {/* BACK BUTTON */}
      <button
        type="button"
        onClick={() => navigate("/brand/creators")}
        className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D0FF71]"
      >
        <ArrowLeft size={17} />
        Back to Creators
      </button>

      {/* MAIN PROFILE CARD */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171917]">

        {/* COVER */}
        <div className="relative h-36 overflow-hidden bg-[#1c1f1c] sm:h-52">
          <img
            src={creator.cover || FALLBACK_COVER}
            alt=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_COVER;
            }}
            className="h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#171917] via-[#171917]/30 to-transparent" />
        </div>

        <div className="px-4 pb-6 sm:px-7 sm:pb-8">

          {/* PROFILE HEADER */}
          <div className="relative z-10 -mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex min-w-0 items-end gap-3">
              {creator.avatar ? (
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="h-20 w-20 shrink-0 rounded-2xl border-4 border-[#171917] bg-[#1c1f1c] object-cover shadow-lg shadow-black/40 sm:h-24 sm:w-24"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-[#171917] bg-[#1c1f1c] text-2xl font-bold text-[#D0FF71] sm:h-24 sm:w-24">
                  {getInitial(creator.name)}
                </div>
              )}

              <div className="min-w-0 pb-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <h1 className="truncate text-lg font-bold text-white sm:text-xl">
                    {creator.name}
                  </h1>

                  {creator.verified && (
                    <BadgeCheck
                      size={18}
                      className="shrink-0 text-[#D0FF71]"
                      fill="#D0FF71"
                      stroke="#171917"
                    />
                  )}
                </div>

                <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-[13px]">
                  {creator.username}
                </p>
              </div>
            </div>

            {/* SHORTLIST */}
            <button
              type="button"
              onClick={handleShortlist}
              aria-pressed={isShortlisted}
              className={`flex w-full shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition sm:w-auto sm:py-2.5 ${
                isShortlisted
                  ? "border border-[#D0FF71]/30 bg-[#D0FF71]/10 text-[#D0FF71]"
                  : "bg-[#D0FF71] text-black hover:bg-[#c2f45f]"
              }`}
            >
              {isShortlisted ? (
                <Check size={15} />
              ) : (
                <Bookmark size={15} />
              )}

              {isShortlisted ? "Shortlisted" : "Add to Shortlist"}
            </button>
          </div>

          {/* BASIC INFO */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-gray-400">

            {creator.location && (
              <span className="flex min-w-0 items-center gap-1.5">
                <MapPin size={14} className="shrink-0" />
                <span className="truncate">{creator.location}</span>
              </span>
            )}

            {creator.category && (
              <span className="rounded-lg bg-[#D0FF71]/10 px-2.5 py-1 text-[#D0FF71]">
                {creator.category}
              </span>
            )}

            {creator.availability && (
              <span
                className={`rounded-lg px-2.5 py-1 ${
                  isAvailable
                    ? "bg-[#D0FF71]/10 text-[#D0FF71]"
                    : "bg-amber-400/10 text-amber-400"
                }`}
              >
                {creator.availability}
              </span>
            )}
          </div>

          {/* BIO */}
          {creator.bio && (
            <section className="mt-7">
              <SectionTitle>About Creator</SectionTitle>

              <p className="mt-2 max-w-3xl text-[13px] leading-6 text-gray-400">
                {creator.bio}
              </p>
            </section>
          )}

          {/* PERFORMANCE */}
          <section className="mt-7">
            <SectionTitle>Performance Overview</SectionTitle>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="min-w-0 rounded-xl border border-white/[0.07] bg-[#101210] p-3 sm:p-4"
                >
                  <Icon size={17} className="text-[#D0FF71]" />

                  <p className="mt-3 truncate text-base font-bold text-white sm:text-lg">
                    {value ?? "-"}
                  </p>

                  <p className="mt-0.5 truncate text-[11px] text-gray-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* AUDIENCE */}
          {audience && (
            <section className="mt-7">
              <SectionTitle>Audience Insights</SectionTitle>

              <div className="mt-3 rounded-xl border border-white/[0.07] bg-[#101210] p-4">

                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-gray-400">
                    Female Audience
                  </span>

                  <span className="font-semibold text-white">
                    {audience.female}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#D0FF71]"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, Number(audience.female) || 0)
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
                  {audienceItems.map((item) => (
                    <div key={item.label} className="min-w-0">
                      <p className="text-[11px] text-gray-500">
                        {item.label}
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CONTENT TYPES */}
          {contentTypes.length > 0 && (
            <section className="mt-7">
              <SectionTitle>Content Categories</SectionTitle>

              <div className="mt-3 flex flex-wrap gap-2">
                {contentTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* PRICE + PLATFORMS */}
          <section className="mt-7 flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-[11px] text-gray-500">
                Starting Collaboration Price
              </p>

              <p className="mt-1 text-2xl font-bold text-[#D0FF71]">
                ₹{Number(creator.startingPrice ?? 0).toLocaleString("en-IN")}

                <span className="text-xs font-normal text-gray-500">
                  {" "}/ post
                </span>
              </p>
            </div>

            {platforms.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {platforms.map((platform) => {
                  const Icon = PLATFORM_ICONS[platform];

                  return (
                    <span
                      key={platform}
                      className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-gray-300"
                    >
                      {Icon ? <Icon size={16} /> : <Users size={15} />}
                      {platform}
                    </span>
                  );
                })}
              </div>
            )}
          </section>

          {/* NOTE */}
          <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-gray-600">
            <Info size={13} className="mt-0.5 shrink-0" />
            Pricing and audience statistics are sample data. Confirm creator
            rates and insights before finalizing a collaboration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorDetails;
