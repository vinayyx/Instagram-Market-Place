const tabs = [
  { label: "All Applications", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const ApplicationTabs = ({
  activeTab,
  onChange,
  applications,
}) => {
  const getCount = (value) => {
    if (value === "all") return applications.length;

    return applications.filter((item) => item.status === value).length;
  };

  return (
    <div className="mb-5 flex gap-2 overflow-x-auto border-b border-white/[0.07] pb-3">
      {tabs.map((tab) => {
        const active = activeTab === tab.value;

        return (
          <button
            type="button"
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition ${
              active
                ? "bg-[#D0FF71] text-black"
                : "bg-[#171917] text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}

            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                active
                  ? "bg-black/10 text-black"
                  : "bg-white/[0.07] text-gray-400"
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

export default ApplicationTabs;