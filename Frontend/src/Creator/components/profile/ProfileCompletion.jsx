
export default function ProfileCompletion({ percentage = 80 }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#171817] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Profile completion</p>
          <p className="mt-1 text-xs text-gray-500">
            Complete your profile to attract more brands.
          </p>
        </div>
        <span className="text-xl font-bold text-[#D0FF71]">
          {percentage}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#D0FF71]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
