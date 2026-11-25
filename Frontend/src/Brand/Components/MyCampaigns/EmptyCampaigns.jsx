import { Megaphone, Plus, Search } from "lucide-react";

const EmptyCampaigns = ({ hasSearch, onReset, onCreate }) => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#181A18] px-5 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D0FF71]/10">
        {hasSearch ? (
          <Search size={27} className="text-[#D0FF71]" />
        ) : (
          <Megaphone size={27} className="text-[#D0FF71]" />
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {hasSearch ? "No campaigns found" : "No campaigns here yet"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        {hasSearch
          ? "Try changing your search or selected filters to find your campaigns."
          : "Create your first campaign and start collaborating with talented creators."}
      </p>

      <div className="mt-5">
        {hasSearch ? (
          <button
            onClick={onReset}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-white hover:bg-white/5"
          >
            Clear Search
          </button>
        ) : (
          <button
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#c1f45e]"
          >
            <Plus size={17} />
            Create Campaign
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyCampaigns;