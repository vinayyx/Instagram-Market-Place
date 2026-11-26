import {
  Camera,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function BrandProfileHeader({
  profile,
  onLogoChange,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <label className="group relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#242824]">
          {profile.logo ? (
            <img
              src={profile.logo}
              alt="Brand Logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2
              size={36}
              className="text-[#D0FF71]"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
            <Camera size={22} className="text-white" />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={onLogoChange}
            className="hidden"
          />
        </label>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold text-white">
              {profile.companyName || "Your Brand"}
            </h2>

            <span className="flex items-center gap-1 rounded-full border border-[#D0FF71]/20 bg-[#D0FF71]/10 px-2.5 py-1 text-xs font-medium text-[#D0FF71]">
              <CheckCircle2 size={13} />
              Brand Account
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            @{profile.username || "yourbrand"}
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Upload your company logo. Recommended size 500 × 500px.
          </p>
        </div>
      </div>
    </div>
  );
}