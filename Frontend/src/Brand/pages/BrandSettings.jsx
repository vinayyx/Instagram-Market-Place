import { useState } from "react";

import {
  Save,
  RotateCcw,
  Settings2,
  Bell,
  Shield,
  LockKeyhole,
  AlertTriangle,
  Globe,
  Mail,
  CreditCard,
  Eye,
  Trash2,
  LogOut,
} from "lucide-react";

import BrandSettingsSection from "../Components/BrandSettings/SettingsSection";
import BrandSettingsToggle from "../Components/BrandSettings/SettingsToggle";
import BrandSettingsRow from "../Components/BrandSettings/SettingsRow";

import { initialBrandSettings } from "../../BrandData/brandSettingsData";

export default function BrandSettings() {
  const [settings, setSettings] = useState(initialBrandSettings);
  const [saved, setSaved] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateSetting = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));

    setSaved(false);
  };

  const handleSave = () => {
    console.log("Brand Settings:", settings);

    // TODO: Connect PUT /api/brand/settings
    setSaved(true);
  };

  const handleReset = () => {
    setSettings(initialBrandSettings);
    setSaved(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      alert("Please fill all password fields.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Connect your password update API to complete this action.");

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleDangerAction = (action) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${action.toLowerCase()}?`
    );

    if (!confirmed) return;

    alert("Please connect the appropriate backend API for this action.");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your brand preferences, notifications and account security.
          </p>
        </div>

        <div className="flex gap-3">
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
          Settings updated in demo mode.
        </div>
      )}

      {/* General Preferences */}
      <BrandSettingsSection
        title="General Preferences"
        description="Customize your dashboard experience."
      >
        <div className="mb-4 flex items-center gap-2 text-[#D0FF71]">
          <Settings2 size={18} />
          <span className="text-sm font-medium">
            Dashboard Preferences
          </span>
        </div>

        <BrandSettingsRow
          label="Language"
          description="Choose your preferred dashboard language."
          value={settings.general.language}
          onChange={(v) => updateSetting("general", "language", v)}
          options={[
            { label: "English", value: "English" },
            { label: "Hindi", value: "Hindi" },
          ]}
        />

        <BrandSettingsRow
          label="Timezone"
          description="Used for campaign deadlines and reports."
          value={settings.general.timezone}
          onChange={(v) => updateSetting("general", "timezone", v)}
          options={[
            { label: "India Standard Time (IST)", value: "Asia/Kolkata" },
            { label: "UTC", value: "UTC" },
            { label: "Eastern Time", value: "America/New_York" },
            { label: "Pacific Time", value: "America/Los_Angeles" },
          ]}
        />

        <BrandSettingsRow
          label="Currency"
          description="Currency used for displaying campaign budgets."
          value={settings.general.currency}
          onChange={(v) => updateSetting("general", "currency", v)}
          options={[
            { label: "Indian Rupee (₹ INR)", value: "INR" },
            { label: "US Dollar ($ USD)", value: "USD" },
            { label: "Euro (€ EUR)", value: "EUR" },
          ]}
        />
      </BrandSettingsSection>

      {/* Notifications */}
      <BrandSettingsSection
        title="Notifications"
        description="Choose which updates you want to receive."
      >
        <div className="mb-3 flex items-center gap-2 text-[#D0FF71]">
          <Bell size={18} />
          <span className="text-sm font-medium">
            Notification Preferences
          </span>
        </div>

        <BrandSettingsToggle
          label="Email Notifications"
          description="Receive important updates through email."
          checked={settings.notifications.emailNotifications}
          onChange={(v) =>
            updateSetting("notifications", "emailNotifications", v)
          }
        />

        <BrandSettingsToggle
          label="New Applications"
          description="Get notified when creators apply to your campaigns."
          checked={settings.notifications.newApplications}
          onChange={(v) =>
            updateSetting("notifications", "newApplications", v)
          }
        />

        <BrandSettingsToggle
          label="Campaign Updates"
          description="Receive updates about your active campaigns."
          checked={settings.notifications.campaignUpdates}
          onChange={(v) =>
            updateSetting("notifications", "campaignUpdates", v)
          }
        />

        <BrandSettingsToggle
          label="Content Submissions"
          description="Get notified when creators submit new content."
          checked={settings.notifications.contentSubmissions}
          onChange={(v) =>
            updateSetting("notifications", "contentSubmissions", v)
          }
        />

        <BrandSettingsToggle
          label="Payment Updates"
          description="Receive wallet recharge and payment notifications."
          checked={settings.notifications.paymentUpdates}
          onChange={(v) =>
            updateSetting("notifications", "paymentUpdates", v)
          }
        />

        <BrandSettingsToggle
          label="Weekly Reports"
          description="Receive a weekly summary of campaign performance."
          checked={settings.notifications.weeklyReports}
          onChange={(v) =>
            updateSetting("notifications", "weeklyReports", v)
          }
        />

        <BrandSettingsToggle
          label="Marketing Emails"
          description="Receive product news, tips and promotional offers."
          checked={settings.notifications.marketingEmails}
          onChange={(v) =>
            updateSetting("notifications", "marketingEmails", v)
          }
        />
      </BrandSettingsSection>

      {/* Privacy */}
      <BrandSettingsSection
        title="Privacy & Visibility"
        description="Control how creators see your brand information."
      >
        <div className="mb-3 flex items-center gap-2 text-[#D0FF71]">
          <Eye size={18} />
          <span className="text-sm font-medium">
            Profile Visibility
          </span>
        </div>

        <BrandSettingsToggle
          label="Public Brand Profile"
          description="Allow creators to discover your brand profile."
          checked={settings.privacy.publicProfile}
          onChange={(v) =>
            updateSetting("privacy", "publicProfile", v)
          }
        />

        <BrandSettingsToggle
          label="Show Website"
          description="Display your company website on your public profile."
          checked={settings.privacy.showWebsite}
          onChange={(v) =>
            updateSetting("privacy", "showWebsite", v)
          }
        />

        <BrandSettingsToggle
          label="Show Social Links"
          description="Allow creators to view your social media links."
          checked={settings.privacy.showSocialLinks}
          onChange={(v) =>
            updateSetting("privacy", "showSocialLinks", v)
          }
        />
      </BrandSettingsSection>

      {/* Security */}
      <BrandSettingsSection
        title="Security"
        description="Keep your brand account protected."
      >
        <div className="mb-5 flex items-center gap-2 text-[#D0FF71]">
          <Shield size={18} />
          <span className="text-sm font-medium">
            Account Security
          </span>
        </div>

        <BrandSettingsToggle
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account."
          checked={settings.security.twoFactorAuth}
          onChange={(v) =>
            updateSetting("security", "twoFactorAuth", v)
          }
        />

        <div className="my-6 border-t border-white/[0.06]" />

        <div className="mb-5 flex items-center gap-2">
          <LockKeyhole size={18} className="text-[#D0FF71]" />
          <div>
            <h3 className="text-sm font-medium text-white">
              Change Password
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Update your account password regularly.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange}>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                key: "currentPassword",
                label: "Current Password",
              },
              {
                key: "newPassword",
                label: "New Password",
              },
              {
                key: "confirmPassword",
                label: "Confirm New Password",
              },
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {field.label}
                </label>

                <input
                  type="password"
                  autoComplete="new-password"
                  value={passwordForm[field.key]}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#101210] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#D0FF71]/60"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-5 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
          >
            Update Password
          </button>
        </form>
      </BrandSettingsSection>

      {/* Account Actions */}
      <BrandSettingsSection
        title="Account Management"
        description="Manage your brand account status."
      >
        <div className="flex items-start gap-3 border-b border-white/[0.06] py-4">
          <div className="rounded-xl bg-white/[0.05] p-3 text-gray-400">
            <LogOut size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-white">
              Deactivate Account
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Temporarily disable your brand account and its visibility.
            </p>
          </div>

          <button
            onClick={() => handleDangerAction("Deactivate account")}
            className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/5"
          >
            Deactivate
          </button>
        </div>

        <div className="flex items-start gap-3 pt-5">
          <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
            <Trash2 size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-red-400">
              Delete Account
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Permanently delete your brand account and associated data.
              This action cannot be undone.
            </p>
          </div>

          <button
            onClick={() => handleDangerAction("Delete account")}
            className="shrink-0 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </BrandSettingsSection>

      {/* Bottom Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#D0FF71] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c1f45d]"
        >
          <Save size={17} />
          Save All Settings
        </button>
      </div>
    </div>
  );
}