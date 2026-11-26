
import { useMemo, useState } from "react";
import {
  Eye,
  Heart,
  IndianRupee,
  TrendingUp,
  Download,
} from "lucide-react";

import {
  analyticsStats,
  performanceData,
  campaignPerformance,
  topCreators,
  platformPerformance,
} from "../../BrandData/analyticsData";

import AnalyticsStatCard from "../Components/Analytics/AnalyticsStatCard";
import PerformanceChart from "../Components/Analytics/PerformanceChart";
import CampaignPerformance from "../Components/Analytics/CampaignPerformance";
import TopCreators from "../Components/Analytics/TopCreators";
import PlatformPerformance from "../Components/Analytics/PlatformPerformance";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("30");

  const filteredData = useMemo(() => {
    if (dateRange === "all") return performanceData;

    const days = Number(dateRange);
    return performanceData.slice(-Math.ceil(days / 2.5));
  }, [dateRange]);

  const stats = [
    {
      title: "Total Views",
      value: "2.45M",
      change: "+18.5%",
      icon: Eye,
    },
    {
      title: "Total Engagement",
      value: "1.86L",
      change: "+12.8%",
      icon: Heart,
    },
    {
      title: "Total Campaign Spend",
      value: "₹3.85L",
      change: "+8.2%",
      icon: IndianRupee,
    },
    {
      title: "Average CPV",
      value: "₹0.16",
      change: "-5.4%",
      icon: TrendingUp,
    },
  ];

  const handleExport = () => {
    const headers = [
      "Campaign",
      "Views",
      "Engagement",
      "Spent",
      "Budget",
      "Creators",
    ];

    const rows = campaignPerformance.map((item) => [
      item.name,
      item.views,
      item.engagement,
      item.spent,
      item.budget,
      item.creators,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "brand-analytics.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#D0FF71]">Brand Workspace</p>
          <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Track your campaign performance and marketing results.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#191B19] px-4 py-3 text-sm text-white transition hover:bg-white/5"
        >
          <Download size={17} />
          Export Report
        </button>
      </div>

      {/* Date Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          Performance Summary
        </p>

        <div className="flex rounded-xl border border-white/[0.08] bg-[#191B19] p-1">
          {[
            { label: "7 Days", value: "7" },
            { label: "30 Days", value: "30" },
            { label: "90 Days", value: "90" },
            { label: "All Time", value: "all" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setDateRange(item.value)}
              className={`rounded-lg px-3 py-2 text-xs transition sm:px-4 ${
                dateRange === item.value
                  ? "bg-[#D0FF71] font-semibold text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <AnalyticsStatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Chart */}
      <PerformanceChart data={filteredData} />

      {/* Campaign and Top Creators */}
      <div className="grid gap-5 xl:grid-cols-2">
        <CampaignPerformance campaigns={campaignPerformance} />
        <TopCreators creators={topCreators} />
      </div>

      {/* Platform Performance */}
      <PlatformPerformance platforms={platformPerformance} />

    </div>
  );
};

export default Analytics;
