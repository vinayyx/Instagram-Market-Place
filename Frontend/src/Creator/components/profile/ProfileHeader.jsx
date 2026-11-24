
import { Camera, MapPin } from "lucide-react";

export default function ProfileHeader({ profile, onImageChange }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#171817] p-6">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#D0FF71]/5 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#D0FF71] bg-[#252825] text-3xl font-bold text-[#D0FF71]">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              profile.name?.charAt(0)
            )}
          </div>

          <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#D0FF71] text-black">
            <Camera size={15} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{profile.username}</p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-400">
            <MapPin size={15} />
            {profile.location}
          </p>
        </div>
      </div>
    </div>
  );
}
