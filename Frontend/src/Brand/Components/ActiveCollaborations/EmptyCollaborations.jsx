import { Users } from "lucide-react";

const EmptyCollaborations = () => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#181A18] px-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D0FF71]/10 text-[#D0FF71]">
        <Users size={25} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        No Collaborations Found
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        You don't have any collaborations matching your current search or
        filter. Try changing your filters.
      </p>
    </div>
  );
};

export default EmptyCollaborations;