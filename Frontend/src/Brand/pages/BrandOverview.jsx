
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Users, Video } from "lucide-react";

import {
  overviewStats,
  performanceData,
  activeCampaigns,
  recentApplications,
  topCreators,
  recentSubmissions,
  budgetData,
  recentActivities,
} from "../Data/overviewData"

import WelcomeHeader from "../Components/Overview/WelcomeHeader";
import StatCard from "../Components/Overview/StatCard";
import PerformanceChart from "../Components/Overview/PerformanceChart";
import ActiveCampaignCard from "../Components/Overview/ActiveCampaignCard";
import ApplicationRow from "../Components/Overview/ApplicationRow";
import CreatorCard from "../Components/Overview/CreatorCard";
import SubmissionRow from "../Components/Overview/SubmissionRow";
import BudgetOverview from "../Components/Overview/BudgetOverview";
import RecentActivity from "../Components/Overview/RecentActivity";

const SectionHeader = ({ title, description, link, linkText = "View All" }) => (
  <div className="mb-4 flex items-center justify-between gap-3">
    <div>
      <h2 className="text-sm font-semibold text-white sm:text-base">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
          {description}
        </p>
      )}
    </div>

    {link && (
      <Link
        to={link}
        className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-[#D0FF71] transition hover:text-white sm:text-xs"
      >
        {linkText}
        <ArrowRight size={13} />
      </Link>
    )}
  </div>
);

const BrandOverview = () => {
  const [dateRange, setDateRange] = useState("30 Days");

  const handleApprove = (application) => {
    console.log("Approve application:", application.id);
    alert(`Demo: ${application.name}'s application approved.`);
  };

  const handleReject = (application) => {
    console.log("Reject application:", application.id);
    alert(`Demo: ${application.name}'s application rejected.`);
  };

  return (
    <div className="mx-auto w-full max-w-[1600px]">

      {/* WELCOME HEADER */}
      <WelcomeHeader
        dateRange={dateRange}
        onDateChange={setDateRange}
      />

      {/* STATS */}
      <section className="mb-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            At a Glance
          </h2>

          <span className="text-[10px] text-gray-600">
            Overview statistics
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </div>
      </section>

      {/* PERFORMANCE CHART */}
      <section className="mb-7">
        <PerformanceChart
          data={performanceData[dateRange]}
        />
      </section>

      {/* ACTIVE CAMPAIGNS */}
      <section className="mb-8">
        <SectionHeader
          title="Active Campaigns"
          description="Keep track of your ongoing campaigns."
          link="/brand/campaigns"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeCampaigns.map((campaign) => (
            <ActiveCampaignCard
              key={campaign.id}
              campaign={campaign}
            />
          ))}
        </div>
      </section>

      {/* APPLICATIONS + TOP CREATORS */}
      <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* RECENT APPLICATIONS */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
          <SectionHeader
            title="Recent Applications"
            description="Review creators who want to collaborate."
            link="/brand/applications"
          />

          <div>
            {recentApplications.map((application) => (
              <ApplicationRow
                key={application.id}
                application={application}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </div>

        {/* TOP CREATORS */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
          <SectionHeader
            title="Top Performing Creators"
            description="Creators generating the best results."
            link="/brand/creators"
            linkText="Explore"
          />

          <div className="space-y-3">
            {topCreators.map((creator, index) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT + BUDGET */}
      <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* CONTENT SUBMISSIONS */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
          <SectionHeader
            title="Recent Content Submissions"
            description="Review the latest creator submissions."
            link="/brand/content"
          />

          <div>
            {recentSubmissions.map((submission) => (
              <SubmissionRow
                key={submission.id}
                submission={submission}
              />
            ))}
          </div>

          <Link
            to="/brand/content"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-[11px] font-semibold text-gray-400 transition hover:border-[#D0FF71]/30 hover:text-[#D0FF71]"
          >
            <Video size={14} />
            Manage All Submissions
          </Link>
        </div>

        {/* BUDGET */}
        <BudgetOverview budget={budgetData} />
      </section>

      {/* RECENT ACTIVITY */}
      <section className="mb-5">
        <RecentActivity activities={recentActivities} />
      </section>

      {/* QUICK ACTION */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#D0FF71]/15 bg-gradient-to-r from-[#D0FF71]/[0.08] to-transparent p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D0FF71]/10 text-[#D0FF71]">
              <Plus size={17} />
            </div>

            <h3 className="text-sm font-semibold text-white">
              Ready to grow your brand?
            </h3>
          </div>

          <p className="mt-2 text-[11px] text-gray-500">
            Launch your next campaign and connect with amazing creators.
          </p>
        </div>

        <Link
          to="/brand/create-campaign"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#c2f45f] sm:w-auto"
        >
          Create New Campaign
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default BrandOverview;
