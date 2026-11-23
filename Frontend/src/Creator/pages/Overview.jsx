
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Eye,
  Megaphone,
  Trophy,
  Clock3,
  CheckCircle2,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  CalendarDays,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import InstagramConnectCard from "../components/InstagramConnectCard";

const stats = [
  {
    title: "Total Earnings",
    value: "₹24,500",
    change: "+12.5%",
    icon: Wallet,
    positive: true,
  },
  {
    title: "Active Campaigns",
    value: "04",
    change: "2 new",
    icon: Megaphone,
    positive: true,
  },
  {
    title: "Total Views",
    value: "1.2M",
    change: "+18.2%",
    icon: Eye,
    positive: true,
  },
  {
    title: "Completed Campaigns",
    value: "18",
    change: "+3 this month",
    icon: Trophy,
    positive: true,
  },
];

const earnings = [
  { day: "Mon", amount: 35 },
  { day: "Tue", amount: 55 },
  { day: "Wed", amount: 42 },
  { day: "Thu", amount: 75 },
  { day: "Fri", amount: 60 },
  { day: "Sat", amount: 90 },
  { day: "Sun", amount: 68 },
];

const campaigns = [
  {
    id: 1,
    brand: "Urban Style",
    title: "Summer Fashion Promotion",
    type: "Instagram Reel",
    views: "45.2K",
    earned: "₹2,400",
    progress: 75,
    deadline: "28 Nov 2026",
  },
  {
    id: 2,
    brand: "TechNova",
    title: "Smart Gadgets Campaign",
    type: "Instagram Reel",
    views: "28.5K",
    earned: "₹1,800",
    progress: 45,
    deadline: "30 Nov 2026",
  },
];

const activities = [
  {
    title: "Payment received",
    description: "₹2,400 credited to your wallet",
    time: "2 hours ago",
    icon: Wallet,
  },
  {
    title: "Campaign approved",
    description: "Your application for Urban Style was approved",
    time: "Yesterday",
    icon: CheckCircle2,
  },
  {
    title: "Reel views updated",
    description: "Your campaign Reel reached 45.2K views",
    time: "2 days ago",
    icon: Eye,
  },
];

const recommended = [
  {
    brand: "Glow Cosmetics",
    title: "Beauty Product Promotion",
    niche: "Beauty",
    budget: "₹5,000",
    type: "Instagram Reel",
  },
  {
    brand: "FitLife",
    title: "Fitness Brand Collaboration",
    niche: "Fitness",
    budget: "₹3,500",
    type: "Instagram Reel",
  },
];

const topContent = [
  {
    title: "My Daily Routine",
    views: "250K",
    likes: "18.2K",
    comments: "1,240",
    shares: "850",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
  },
  {
    title: "Fashion Transformation",
    views: "180K",
    likes: "12.5K",
    comments: "920",
    shares: "640",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  },
];

const Overview = () => {
  const [isInstagramConnected, setIsInstagramConnected] =
    useState(false);

  const handleConnectInstagram = () => {
    // Later: Redirect to your backend Meta OAuth endpoint
    // window.location.href = `${import.meta.env.VITE_API_URL}/api/instagram/connect`;
    console.log("Instagram OAuth connection will start here");
  };

  return (
    <div className="space-y-7 pb-10">

      {/* Welcome */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-400">
            Monday, November 23, 2026
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Welcome back, Vinay 👋
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Here's what's happening with your creator account.
          </p>
        </div>

        <Link
          to="/creator/campaigns"
          className="flex w-fit items-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-[#101110] transition hover:bg-[#c1f45c]"
        >
          <Plus size={18} />
          Explore Campaigns
        </Link>
      </div>

      {/* Instagram Connection */}
      <InstagramConnectCard
        isConnected={isInstagramConnected}
        username="creator_username"
        onConnect={handleConnectInstagram}
      />

      {/* Stats */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Your Overview
          </h2>

          <span className="text-xs text-gray-500">
            All time
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 transition hover:border-[#D0FF71]/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D0FF71]/10">
                    <Icon size={20} className="text-[#D0FF71]" />
                  </div>

                  <span className="flex items-center gap-1 text-xs text-[#D0FF71]">
                    <ArrowUpRight size={14} />
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm text-gray-400">
                  {stat.title}
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white">
                  {stat.value}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* Earnings + Balance */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Earnings Chart */}
        <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5 sm:p-6 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">
                Earnings Overview
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Your earnings over the last 7 days
              </p>
            </div>

            <select className="rounded-lg border border-white/10 bg-[#101110] px-3 py-2 text-xs text-gray-300 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 6 months</option>
            </select>
          </div>

          <div className="mt-7 flex h-48 items-end justify-between gap-3 border-b border-white/10 pb-2">
            {earnings.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="flex h-full w-full items-end">
                  <div
                    style={{ height: `${item.amount}%` }}
                    className="w-full rounded-t-lg bg-[#D0FF71]/80 transition hover:bg-[#D0FF71]"
                  />
                </div>

                <span className="text-xs text-gray-500">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D0FF71]" />
            <span className="text-xs text-gray-400">
              Earnings
            </span>
          </div>
        </div>

        {/* Wallet */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#D0FF71]/20 bg-[#D0FF71] p-6 text-[#101110]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium opacity-70">
                Available Balance
              </span>
              <Wallet size={22} />
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              ₹8,500
            </h2>

            <p className="mt-2 text-sm opacity-70">
              Ready to withdraw
            </p>
          </div>

          <div className="mt-8 border-t border-black/10 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-70">Pending Payments</span>
              <strong>₹2,000</strong>
            </div>

            <Link
              to="/creator/withdrawals"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#101110] px-4 py-3 text-sm font-semibold text-[#D0FF71] transition hover:bg-black"
            >
              Withdraw Earnings
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Active Campaigns
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Track your ongoing collaborations
            </p>
          </div>

          <Link
            to="/creator/active-campaigns"
            className="text-sm text-[#D0FF71] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-[#D0FF71]">
                    {campaign.brand}
                  </p>

                  <h3 className="mt-2 font-semibold text-white">
                    {campaign.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {campaign.type}
                  </p>
                </div>

                <span className="rounded-lg bg-[#D0FF71]/10 px-3 py-1.5 text-xs text-[#D0FF71]">
                  Active
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Total Views</p>
                  <p className="mt-1 font-semibold text-white">
                    {campaign.views}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Earned</p>
                  <p className="mt-1 font-semibold text-[#D0FF71]">
                    {campaign.earned}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-400">Campaign Progress</span>
                  <span className="text-white">
                    {campaign.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    style={{ width: `${campaign.progress}%` }}
                    className="h-full rounded-full bg-[#D0FF71]"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4 text-xs text-gray-500">
                <CalendarDays size={14} />
                Deadline: {campaign.deadline}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Campaigns */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Recommended Campaigns
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Opportunities matching your niche
            </p>
          </div>

          <Link
            to="/creator/campaigns"
            className="text-sm text-[#D0FF71] hover:underline"
          >
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recommended.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#D0FF71]">
                    {item.brand}
                  </p>
                  <h3 className="mt-2 font-semibold text-white">
                    {item.title}
                  </h3>
                </div>

                <Megaphone className="text-gray-500" size={20} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  {item.niche}
                </span>
                <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                  {item.type}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Campaign Budget</p>
                  <p className="mt-1 font-bold text-[#D0FF71]">
                    {item.budget}
                  </p>
                </div>

                <Link
                  to="/creator/campaigns"
                  className="rounded-lg border border-[#D0FF71]/30 px-4 py-2 text-xs font-medium text-[#D0FF71] hover:bg-[#D0FF71]/10"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity + Top Content */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Recent Activities */}
        <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-semibold text-white">
              Recent Activities
            </h2>

            <Clock3 size={18} className="text-gray-500" />
          </div>

          <div className="space-y-6">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D0FF71]/10">
                    <Icon size={18} className="text-[#D0FF71]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-white">
                      {activity.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      {activity.description}
                    </p>

                    <p className="mt-2 text-[11px] text-gray-600">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Content */}
        <div className="rounded-2xl border border-white/5 bg-[#1A1C1A] p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Top Performing Content
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Your best performing Reels
              </p>
            </div>

            <Link
              to="/creator/content"
              className="text-xs text-[#D0FF71]"
            >
              View All
            </Link>
          </div>

          <div className="space-y-5">
            {topContent.map((content) => (
              <div
                key={content.title}
                className="flex gap-4"
              >
                <img
                  src={content.image}
                  alt={content.title}
                  className="h-24 w-20 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-white">
                    {content.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Play size={13} />
                      {content.views}
                    </span>

                    <span className="flex items-center gap-1">
                      <Heart size={13} />
                      {content.likes}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MessageCircle size={13} />
                      {content.comments}
                    </span>

                    <span className="flex items-center gap-1">
                      <Share2 size={13} />
                      {content.shares}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
