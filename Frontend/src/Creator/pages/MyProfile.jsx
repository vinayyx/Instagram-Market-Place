
import { useState } from "react";
import {
  Save,
  UserRound,
  CreditCard,
  Globe,
  ShieldCheck,
} from "lucide-react";

import { creatorProfile } from "../../data/creatorProfile";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSection from "../components/profile/ProfileSection";
import ProfileInput from "../components/profile/ProfileInput";
import SocialAccountCard from "../components/profile/SocialAccountCard";
import ProfileCompletion from "../components/profile/ProfileCompletion";

export default function MyProfile() {
  const [profile, setProfile] = useState(creatorProfile);

  const updateField = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePayment = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    updateField("profileImage", URL.createObjectURL(file));
  };

  const handleSave = () => {
    // Connect this to your profile update API.
    console.log("Updated Profile:", profile);
  };

  const handleSocialConnect = (platform) => {
    // Connect official OAuth flow here.
    console.log("Connect account:", platform);
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#111211] pb-10 text-white">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#D0FF71]">Account Settings</p>
          <h1 className="mt-1 text-2xl font-bold">My Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and creator account.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#c1f15f]"
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>

      <ProfileCompletion percentage={80} />

      <ProfileHeader
        profile={profile}
        onImageChange={handleImageChange}
      />

      {/* Personal Information */}
      <ProfileSection
        title="Personal Information"
        description="Update your basic profile details."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <UserRound size={18} />
          <span className="text-sm font-medium">Basic Details</span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ProfileInput
            label="Full Name"
            value={profile.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <ProfileInput
            label="Username"
            value={profile.username}
            onChange={(e) => updateField("username", e.target.value)}
          />

          <ProfileInput
            label="Email Address"
            value={profile.email}
            disabled
          />

          <ProfileInput
            label="Phone Number"
            value={profile.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <ProfileInput
            label="Date of Birth"
            type="date"
            value={profile.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
          />

          <ProfileInput
            label="Location"
            value={profile.location}
            onChange={(e) => updateField("location", e.target.value)}
          />

          <ProfileInput
            label="Gender"
            value={profile.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          />

          <ProfileInput
            label="Creator Category"
            value={profile.category}
            onChange={(e) => updateField("category", e.target.value)}
          />
        </div>

        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium text-gray-400">Bio</label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Tell brands about yourself..."
            className="w-full resize-none rounded-xl border border-white/10 bg-[#202220] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#D0FF71]"
          />
        </div>
      </ProfileSection>

      {/* Social Accounts */}
      <ProfileSection
        title="Social Accounts"
        description="Connect your social media accounts to showcase your audience."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <Globe size={18} />
          <span className="text-sm font-medium">Connected Platforms</span>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {profile.socialAccounts.map((account) => (
            <SocialAccountCard
              key={account.platform}
              account={account}
              onConnect={() => handleSocialConnect(account.platform)}
            />
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Social accounts must be connected through the official platform
          authorization process.
        </p>
      </ProfileSection>

      {/* Payment Information */}
      <ProfileSection
        title="Payment Information"
        description="Manage the payment details where you receive your earnings."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <CreditCard size={18} />
          <span className="text-sm font-medium">Payout Details</span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ProfileInput
            label="Account Holder Name"
            value={profile.payment.accountHolder}
            onChange={(e) => updatePayment("accountHolder", e.target.value)}
          />

          <ProfileInput
            label="UPI ID"
            value={profile.payment.upiId}
            onChange={(e) => updatePayment("upiId", e.target.value)}
          />

          <ProfileInput
            label="Bank Name"
            value={profile.payment.bankName}
            onChange={(e) => updatePayment("bankName", e.target.value)}
          />

          <ProfileInput
            label="Account Number"
            value={profile.payment.accountNumber}
            onChange={(e) => updatePayment("accountNumber", e.target.value)}
          />

          <ProfileInput
            label="IFSC Code"
            value={profile.payment.ifscCode}
            onChange={(e) => updatePayment("ifscCode", e.target.value)}
          />
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#D0FF71]/10 bg-[#D0FF71]/5 p-4">
          <ShieldCheck className="mt-0.5 shrink-0 text-[#D0FF71]" size={19} />
          <p className="text-xs leading-5 text-gray-400">
            Your payment information should be securely stored and verified
            before withdrawals are enabled.
          </p>
        </div>
      </ProfileSection>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#D0FF71] px-6 py-3 text-sm font-bold text-black hover:bg-[#c1f15f]"
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
