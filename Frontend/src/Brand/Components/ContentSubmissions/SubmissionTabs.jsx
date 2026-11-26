const tabs = [
  { label: "All Submissions", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Revision Requested", value: "revision_requested" },
  { label: "Rejected", value: "rejected" },
];

const SubmissionTabs = ({ activeTab, onChange, submissions }) => {
  const getCount = (value) => {
    if (value === "all") return submissions.length;

    return submissions.filter((item) => item.status === value).length;
  };

  return (
    <div className="flex gap-2 overflow-x-auto border-b border-white/[0.08] pb-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition ${
            activeTab === tab.value
              ? "bg-[#D0FF71] font-semibold text-black"
              : "bg-[#202220] text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
          <span
            className={`rounded-md px-1.5 py-0.5 text-xs ${
              activeTab === tab.value
                ? "bg-black/10 text-black"
                : "bg-white/10 text-gray-300"
            }`}
          >
            {getCount(tab.value)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SubmissionTabs;