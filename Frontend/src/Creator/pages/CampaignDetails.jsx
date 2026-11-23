
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  Wallet,
  FileText,
  ShieldCheck,
  AlertCircle,
  Bookmark,
  Share2,
  BriefcaseBusiness,
} from "lucide-react";

import { campaigns } from "../../data/campaigns";

const CampaignDetails = () => {
  const { id } = useParams();
  const campaign = campaigns.find((item) => item.id === id);

  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!campaign) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <BriefcaseBusiness size={40} className="text-gray-500" />
        <h2 className="mt-4 text-xl font-semibold text-white">
          Campaign not found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          This campaign may have expired or been removed.
        </p>
        <Link
          to="/creator/campaigns"
          className="mt-5 rounded-lg bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-[#101110]"
        >
          Explore Campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">

      {/* Back */}
      <Link
        to="/creator/campaigns"
        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D0FF71]"
      >
        <ArrowLeft size={17} />
        Back to Campaigns
      </Link>

      {/* Main Header */}
      <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D0FF71]/10 text-2xl font-bold text-[#D0FF71]">
              {campaign.brandInitial}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-white">
                  {campaign.brand}
                </h2>

                <span className="flex items-center gap-1 rounded-full bg-[#D0FF71]/10 px-2 py-1 text-[10px] text-[#D0FF71]">
                  <ShieldCheck size={12} />
                  Verified Brand
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {campaign.title}
              </h1>

              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  {campaign.contentType}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {campaign.posted}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  India
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition ${
                saved
                  ? "border-[#D0FF71]/30 bg-[#D0FF71]/10 text-[#D0FF71]"
                  : "border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <Bookmark
                size={16}
                fill={saved ? "currentColor" : "none"}
              />
              {saved ? "Saved" : "Save"}
            </button>

            <button
              onClick={() =>
                navigator.clipboard?.writeText(window.location.href)
              }
              className="rounded-xl border border-white/10 p-2.5 text-gray-400 hover:text-white"
              aria-label="Copy campaign link"
            >
              <Share2 size={17} />
            </button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-gray-500">Payment</p>
            <h3 className="mt-2 text-xl font-bold text-[#D0FF71]">
              ₹{campaign.rate.toLocaleString("en-IN")}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {campaign.paymentModel === "Fixed Payment"
                ? "Fixed amount"
                : "Per 1K views"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Maximum Payout</p>
            <h3 className="mt-2 text-xl font-bold text-white">
              ₹{campaign.maxPayout.toLocaleString("en-IN")}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Subject to campaign terms
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Minimum Followers</p>
            <h3 className="mt-2 text-xl font-bold text-white">
              {campaign.minFollowers.toLocaleString("en-IN")}+
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Instagram followers
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Available Slots</p>
            <h3 className="mt-2 text-xl font-bold text-white">
              {campaign.slots}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Out of {campaign.totalSlots} slots
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left */}
        <div className="space-y-6 lg:col-span-2">

          {/* About */}
          <section className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <FileText size={18} className="text-[#D0FF71]" />
              About This Campaign
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              {campaign.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-300">
                {campaign.category}
              </span>
              <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-300">
                {campaign.contentType}
              </span>
              <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-300">
                {campaign.duration}
              </span>
            </div>
          </section>

          {/* Requirements */}
          <section className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <Users size={18} className="text-[#D0FF71]" />
              Creator Requirements
            </h2>

            <div className="mt-5 space-y-4">
              {campaign.requirements.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#D0FF71]"
                  />
                  <p className="text-sm text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Deliverables */}
          <section className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <Users size={18} className="text-[#D0FF71]" />
              Content Deliverables
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              What you need to create and submit
            </p>

            <div className="mt-5 space-y-4">
              {campaign.deliverables.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D0FF71]/10 text-xs font-semibold text-[#D0FF71]">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Guidelines */}
          <section className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <ShieldCheck size={18} className="text-[#D0FF71]" />
              Campaign Guidelines
            </h2>

            <div className="mt-5 space-y-4">
              {campaign.guidelines.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[#D0FF71]"
                  />
                  <p className="text-sm leading-6 text-gray-400">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <CalendarDays size={18} className="text-[#D0FF71]" />
              Campaign Timeline
            </h2>

            <div className="mt-6 space-y-6">
              {campaign.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D0FF71]/10 text-xs font-bold text-[#D0FF71]">
                      {index + 1}
                    </div>

                    {index !== campaign.timeline.length - 1 && (
                      <div className="mt-1 h-7 w-px bg-white/10" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-5">

          {/* Apply card */}
          <div className="h-fit rounded-2xl border border-[#D0FF71]/20 bg-[#1A1C1A] p-5 lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold text-white">
              Interested in this campaign?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Apply now and collaborate with {campaign.brand}.
            </p>

            <div className="mt-5 space-y-4 border-y border-white/5 py-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Application deadline</span>
                <span className="font-medium text-white">
                  {campaign.deadline}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Content duration</span>
                <span className="font-medium text-white">
                  {campaign.duration}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment model</span>
                <span className="font-medium text-white">
                  {campaign.paymentModel}
                </span>
              </div>
            </div>

            {applied ? (
              <div className="mt-5 rounded-xl border border-[#D0FF71]/20 bg-[#D0FF71]/10 p-4 text-center">
                <CheckCircle2
                  size={25}
                  className="mx-auto text-[#D0FF71]"
                />
                <p className="mt-2 font-semibold text-[#D0FF71]">
                  Application Submitted
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Your application is awaiting review.
                </p>
              </div>
            ) : (
              <button
                onClick={() => setApplied(true)}
                disabled={campaign.slots === 0}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-3.5 text-sm font-bold text-[#101110] transition hover:bg-[#c1f45c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apply for Campaign
                <ArrowUpRight size={17} />
              </button>
            )}

            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-gray-500">
              <ShieldCheck size={15} className="mt-0.5 shrink-0" />
              Your application will be reviewed by the brand.
            </p>
          </div>

          {/* Payment info */}
          <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5">
            <h3 className="flex items-center gap-2 font-semibold text-white">
              <Wallet size={18} className="text-[#D0FF71]" />
              Payment Information
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Payment type</span>
                <span className="text-right text-white">
                  {campaign.paymentModel}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Rate</span>
                <span className="text-right text-[#D0FF71]">
                  ₹{campaign.rate.toLocaleString("en-IN")}
                  {campaign.paymentModel === "Per 1K Views"
                    ? " / 1K views"
                    : ""}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Maximum payout</span>
                <span className="text-right text-white">
                  ₹{campaign.maxPayout.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2 rounded-xl bg-white/5 p-3">
              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-[#D0FF71]"
              />
              <p className="text-xs leading-5 text-gray-400">
                Actual earnings depend on verified performance,
                campaign limits and the brand's payment terms.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CampaignDetails;
