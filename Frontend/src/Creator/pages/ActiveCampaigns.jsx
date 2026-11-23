import { useMemo, useState } from "react";
import {
  Search,
  Megaphone,
  Wallet,
  CheckCircle2,
  Clock3,
  X,
  ExternalLink,
} from "lucide-react";

import ActiveCampaignCard from "../components/ActiveCampaignCard";
import { activeCampaigns as initialCampaigns } from "../../data/activeCampaigns";

const tabs = [
  { label: "All Campaigns", value: "all" },
  { label: "In Progress", value: "in_progress" },
  { label: "Not Started", value: "active" },
  { label: "Completed", value: "completed" },
];

const ActiveCampaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [submitCampaign, setSubmitCampaign] = useState(null);
  const [reelUrl, setReelUrl] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const stats = useMemo(
    () => ({
      total: campaigns.length,
      inProgress: campaigns.filter(
        (item) => item.status === "in_progress"
      ).length,
      completed: campaigns.filter(
        (item) => item.status === "completed"
      ).length,
      totalEarnings: campaigns.reduce(
        (total, item) => total + item.earnedAmount,
        0
      ),
    }),
    [campaigns]
  );

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesTab =
        activeTab === "all" || campaign.status === activeTab;

      const searchText = search.toLowerCase();

      const matchesSearch =
        campaign.title.toLowerCase().includes(searchText) ||
        campaign.brand.toLowerCase().includes(searchText) ||
        campaign.category.toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [campaigns, activeTab, search]);

  const handleSubmitReel = (campaign) => {
    setSubmitCampaign(campaign);
    setReelUrl(campaign.reelUrl || "");
    setSuccessMessage("");
  };

  // Demo only: production mein API call se submit karna.
  const handleReelSubmit = (e) => {
    e.preventDefault();

    const instagramUrl =
      /^https:\/\/(www\.)?instagram\.com\/(reel|reels|p)\/.+/i;

    if (!instagramUrl.test(reelUrl.trim())) {
      alert("Please enter a valid Instagram Reel URL.");
      return;
    }

    setCampaigns((previous) =>
      previous.map((campaign) =>
        campaign.id === submitCampaign.id
          ? { ...campaign, reelUrl: reelUrl.trim() }
          : campaign
      )
    );

    setSuccessMessage("Reel link submitted successfully!");
    setSubmitCampaign(null);
    setReelUrl("");
  };

  const closeModals = () => {
    setSelectedCampaign(null);
    setSubmitCampaign(null);
    setReelUrl("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 text-sm text-[#D0FF71]">
          <Megaphone size={16} />
          Creator Workspace
        </div>

        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Active Campaigns
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage your approved campaigns, track performance and submit
          your content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          title="Total Campaigns"
          value={stats.total}
          icon={<Megaphone size={19} />}
        />

        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Clock3 size={19} />}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 size={19} />}
        />

        <StatCard
          title="Total Earnings"
          value={`₹${stats.totalEarnings.toLocaleString("en-IN")}`}
          icon={<Wallet size={19} />}
        />
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns or brands..."
            className="w-full rounded-xl border border-white/10 bg-[#181A18] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                activeTab === tab.value
                  ? "bg-[#D0FF71] text-black"
                  : "border border-white/10 bg-[#181A18] text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign cards */}
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <ActiveCampaignCard
              key={campaign.id}
              campaign={campaign}
              onViewDetails={setSelectedCampaign}
              onSubmitReel={handleSubmitReel}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#181A18] px-5 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-gray-400">
            <Megaphone size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-white">
            No campaigns found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or selecting another filter.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setActiveTab("all");
            }}
            className="mt-5 text-sm font-medium text-[#D0FF71] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-[#D0FF71]/20 bg-[#20251B] px-5 py-3 text-sm text-[#D0FF71] shadow-xl">
          {successMessage}
          <button
            onClick={() => setSuccessMessage("")}
            className="ml-4 text-gray-400 hover:text-white"
          >
            <X size={15} className="inline" />
          </button>
        </div>
      )}

      {/* Campaign details modal */}
      {selectedCampaign && (
        <Modal onClose={closeModals} title="Campaign Details">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400">
                {selectedCampaign.brand}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                {selectedCampaign.title}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                Approved on {selectedCampaign.approvedAt}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DetailBox
                label="Payment Model"
                value={selectedCampaign.paymentModel}
              />
              <DetailBox
                label="Maximum Payout"
                value={`₹${selectedCampaign.maxPayout.toLocaleString("en-IN")}`}
              />
              <DetailBox
                label="Deadline"
                value={selectedCampaign.deadline}
              />
              <DetailBox
                label="Category"
                value={selectedCampaign.category}
              />
            </div>

            <div>
              <h4 className="mb-3 font-medium text-white">
                Campaign Requirements
              </h4>

              <ul className="space-y-3">
                {selectedCampaign.requirements.map((requirement, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm text-gray-400"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#D0FF71]"
                    />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            {selectedCampaign.reelUrl && (
              <a
                href={selectedCampaign.reelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#D0FF71] hover:underline"
              >
                View submitted Reel <ExternalLink size={14} />
              </a>
            )}

            <button
              onClick={() => {
                const campaign = selectedCampaign;
                setSelectedCampaign(null);
                handleSubmitReel(campaign);
              }}
              className="w-full rounded-xl bg-[#D0FF71] py-3 font-semibold text-black hover:bg-[#c1f45e]"
            >
              Submit / Update Reel Link
            </button>
          </div>
        </Modal>
      )}

      {/* Submit Reel modal */}
      {submitCampaign && (
        <Modal onClose={closeModals} title="Submit Instagram Reel">
          <form onSubmit={handleReelSubmit} className="space-y-5">
            <div>
              <p className="text-sm text-gray-400">
                Campaign
              </p>
              <h3 className="mt-1 font-semibold text-white">
                {submitCampaign.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {submitCampaign.brand}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Instagram Reel URL
              </label>

              <div className="relative">
                <Wallet
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="url"
                  required
                  value={reelUrl}
                  onChange={(e) => setReelUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full rounded-xl border border-white/10 bg-[#222522] py-3 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#D0FF71]/50"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Paste the public link of the Reel you created for this
                campaign.
              </p>
            </div>

            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-xs leading-5 text-yellow-200/80">
              Make sure your Reel is published and its link is accessible.
              Views and eligibility should be verified through your
              connected Instagram account.
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#D0FF71] py-3 font-semibold text-black hover:bg-[#c1f45e]"
            >
              Submit Reel
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="rounded-2xl border border-white/10 bg-[#181A18] p-4 sm:p-5">
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-400 sm:text-sm">{title}</p>
      <div className="text-[#D0FF71]">{icon}</div>
    </div>

    <p className="mt-4 text-2xl font-bold text-white">{value}</p>
  </div>
);

const DetailBox = ({ label, value }) => (
  <div className="rounded-xl bg-[#222522] p-3">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 text-sm font-medium text-white">{value}</p>
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
  >
    <div className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#181A18] p-5 shadow-2xl sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <X size={19} />
        </button>
      </div>

      {children}
    </div>
  </div>
);

export default ActiveCampaigns;