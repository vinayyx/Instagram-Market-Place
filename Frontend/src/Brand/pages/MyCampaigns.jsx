import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Megaphone, ArrowUpRight } from "lucide-react";

import { campaignsData } from "../../BrandData/campaignsData";

import CampaignStats from "../Components/MyCampaigns/CampaignStats";
import CampaignTabs from "../Components/MyCampaigns/CampaignTabs";
import CampaignFilters from "../Components/MyCampaigns/CampaignFilters";
import CampaignCard from "../Components/MyCampaigns/CampaignCard";
import EmptyCampaigns from "../Components/MyCampaigns/EmptyCampaigns";

const MyCampaigns = () => {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState(campaignsData);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  // Search, filter and sorting
  const filteredCampaigns = useMemo(() => {
    let result = [...campaigns];

    if (activeTab !== "all") {
      result = result.filter((campaign) => campaign.status === activeTab);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(query) ||
          campaign.category.toLowerCase().includes(query) ||
          campaign.id.toLowerCase().includes(query),
      );
    }

    switch (sort) {
      case "oldest":
        result.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        break;

      case "budget-high":
        result.sort((a, b) => b.budget - a.budget);
        break;

      case "budget-low":
        result.sort((a, b) => a.budget - b.budget);
        break;

      case "most-views":
        result.sort((a, b) => b.totalViews - a.totalViews);
        break;

      default:
        result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }

    return result;
  }, [campaigns, activeTab, search, sort]);

  // Pause and resume campaign
  const handleToggleStatus = (campaignId, nextStatus) => {
    setCampaigns((previous) =>
      previous.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, status: nextStatus }
          : campaign,
      ),
    );
  };

  const handleCreateCampaign = () => {
    navigate("/brand/create-campaign");
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Megaphone size={15} />
            <span>Campaign Management</span>
            <span>/</span>
            <span className="text-[#D0FF71]">My Campaigns</span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            My Campaigns
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Create, manage and track all your brand campaigns in one place.
          </p>
        </div>

        <button
          onClick={handleCreateCampaign}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-5 text-sm font-semibold text-black transition hover:bg-[#c1f45e]"
        >
          <Plus size={18} />
          Create Campaign
          <ArrowUpRight size={15} />
        </button>
      </div>

      {/* Stats */}
      <CampaignStats campaigns={campaigns} />

      {/* Campaign list section */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-white">All Campaigns</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your campaigns and monitor their performance.
          </p>
        </div>

        {/* Tabs */}
        <CampaignTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          campaigns={campaigns}
        />

        {/* Filters */}
        <CampaignFilters
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-medium text-white">
              {filteredCampaigns.length}
            </span>{" "}
            {filteredCampaigns.length === 1 ? "campaign" : "campaigns"}
          </p>
        </div>

        {/* Campaign cards */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onView={() =>
                  navigate(
                    `/brand/campaigns/${encodeURIComponent(campaign.id)}`,
                  )
                }
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <EmptyCampaigns
            hasSearch={Boolean(search.trim()) || activeTab !== "all"}
            onReset={() => {
              setSearch("");
              setActiveTab("all");
            }}
            onCreate={handleCreateCampaign}
          />
        )}
      </section>
    </div>
  );
};

export default MyCampaigns;
