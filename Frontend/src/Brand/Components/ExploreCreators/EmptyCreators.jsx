
import { SearchX, RotateCcw } from "lucide-react";

const EmptyCreators = ({ onReset }) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#171917] px-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D0FF71]/10 text-[#D0FF71]">
        <SearchX size={25} />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-white">
        No creators found
      </h3>

      <p className="mt-2 max-w-xs text-xs leading-relaxed text-gray-500">
        We couldn't find any creators matching your filters. Try changing
        your search or clearing the filters.
      </p>

      <button
        onClick={onReset}
        className="mt-5 flex items-center gap-2 rounded-xl bg-[#D0FF71] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#c2f45f]"
      >
        <RotateCcw size={14} />
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyCreators;
