import { useState } from "react";

import {
  Save,
  RotateCcw,
  Building2,
  UserRound,
  MapPin,
  Globe,
  Share2,
} from "lucide-react";

import BrandProfileHeader from "../Components/BrandProfile/BrandProfileHeader";
import BrandProfileSection from "../Components/BrandProfile/BrandProfileSection";
import BrandProfileField from "../Components/BrandProfile/BrandProfileField";
import BrandSocialLinks from "../Components/BrandProfile/BrandSocialLinks";

import { initialBrandProfile } from "../../BrandData/brandProfileData";

export default function BrandProfile() {
  const [profile, setProfile] = useState(initialBrandProfile);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const updateSocialLink = (platform, value) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));

    setSaved(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField("logo", reader.result);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = () => {
    console.log("Brand Profile:", profile);

    // TODO: Connect PUT /api/brand/profile API here.
    setSaved(true);
  };

  const handleReset = () => {
    setProfile(initialBrandProfile);
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Brand Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your company information and brand identity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c1f45d]"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="rounded-xl border border-[#D0FF71]/20 bg-[#D0FF71]/10 px-4 py-3 text-sm text-[#D0FF71]">
          Profile saved successfully in demo mode.
        </div>
      )}

      {/* Brand Header */}
      <BrandProfileHeader
        profile={profile}
        onLogoChange={handleLogoChange}
      />

      {/* Company Information */}
      <BrandProfileSection
        title="Company Information"
        description="Basic information about your business."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <Building2 size={18} />
          <span className="text-sm font-medium">
            Business Details
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <BrandProfileField
            label="Company Name"
            value={profile.companyName}
            onChange={(v) => updateField("companyName", v)}
            placeholder="Enter company name"
          />

          <BrandProfileField
            label="Brand Username"
            value={profile.username}
            onChange={(v) => updateField("username", v)}
            placeholder="Enter username"
          />

          <BrandProfileField
            label="Industry"
            value={profile.industry}
            onChange={(v) => updateField("industry", v)}
            placeholder="Enter industry"
          />

          <BrandProfileField
            label="Company Size"
            value={profile.companySize}
            onChange={(v) => updateField("companySize", v)}
            placeholder="e.g. 11-50 Employees"
          />

          <BrandProfileField
            label="Founded Year"
            value={profile.foundedYear}
            onChange={(v) => updateField("foundedYear", v)}
            placeholder="e.g. 2021"
          />

          <BrandProfileField
            label="GST Number"
            value={profile.gstNumber}
            onChange={(v) => updateField("gstNumber", v)}
            placeholder="Enter GST number"
          />
        </div>

        <div className="mt-5">
          <BrandProfileField
            label="Company Description"
            value={profile.description}
            onChange={(v) => updateField("description", v)}
            placeholder="Tell creators about your brand..."
            textarea
          />
        </div>
      </BrandProfileSection>

      {/* Contact Information */}
      <BrandProfileSection
        title="Contact Information"
        description="Your primary business contact details."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <UserRound size={18} />
          <span className="text-sm font-medium">
            Contact Details
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <BrandProfileField
            label="Contact Person"
            value={profile.contactPerson}
            onChange={(v) => updateField("contactPerson", v)}
            placeholder="Enter contact person"
          />

          <BrandProfileField
            label="Designation"
            value={profile.designation}
            onChange={(v) => updateField("designation", v)}
            placeholder="e.g. Marketing Manager"
          />

          <BrandProfileField
            label="Business Email"
            value={profile.email}
            onChange={(v) => updateField("email", v)}
            placeholder="Enter email"
            type="email"
          />

          <BrandProfileField
            label="Phone Number"
            value={profile.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="Enter phone number"
            type="tel"
          />
        </div>
      </BrandProfileSection>

      {/* Address */}
      <BrandProfileSection
        title="Business Address"
        description="Your registered or primary business location."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <MapPin size={18} />
          <span className="text-sm font-medium">
            Location Details
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <BrandProfileField
            label="Address"
            value={profile.address}
            onChange={(v) => updateField("address", v)}
            placeholder="Enter address"
          />

          <BrandProfileField
            label="City"
            value={profile.city}
            onChange={(v) => updateField("city", v)}
            placeholder="Enter city"
          />

          <BrandProfileField
            label="State"
            value={profile.state}
            onChange={(v) => updateField("state", v)}
            placeholder="Enter state"
          />

          <BrandProfileField
            label="Country"
            value={profile.country}
            onChange={(v) => updateField("country", v)}
            placeholder="Enter country"
          />

          <BrandProfileField
            label="Pincode"
            value={profile.pincode}
            onChange={(v) => updateField("pincode", v)}
            placeholder="Enter pincode"
          />
        </div>
      </BrandProfileSection>

      {/* Website and Social Links */}
      <BrandProfileSection
        title="Online Presence"
        description="Manage your website and social media profiles."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <Globe size={18} />
          <span className="text-sm font-medium">
            Company Website
          </span>
        </div>

        <BrandProfileField
          label="Website URL"
          value={profile.website}
          onChange={(v) => updateField("website", v)}
          placeholder="https://example.com"
          type="url"
        />

        <div className="mb-5 mt-7 flex items-center gap-2 text-[#D0FF71]">
          <Share2 size={18} />
          <span className="text-sm font-medium">
            Social Media Links
          </span>
        </div>

        <BrandSocialLinks
          links={profile.socialLinks}
          onChange={updateSocialLink}
        />
      </BrandProfileSection>

      {/* Bottom Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#D0FF71] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c1f45d]"
        >
          <Save size={17} />
          Save Profile
        </button>
      </div>
    </div>
  );
}