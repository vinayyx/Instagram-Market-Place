import { campaignStatusOptions } from "../../Data/campaignsData";

const CampaignTabs = ({ activeTab, onChange, campaigns }) => {
  const getCount = (status) => {
    if (status === "all") return campaigns.length;

    return campaigns.filter((item) => item.status === status).length;
  };

  return (
    <div className="flex gap-2 overflow-x-auto border-b border-white/[0.08] pb-3">
      {campaignStatusOptions.map((tab) => {
        const active = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-[#D0FF71] text-black"
                : "bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {tab.label}

            <span
              className={`rounded-md px-1.5 py-0.5 text-xs ${
                active
                  ? "bg-black/10 text-black"
                  : "bg-white/[0.08] text-gray-400"
              }`}
            >
              {getCount(tab.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CampaignTabs;