
import { useState } from "react";

import { initialSettings } from "../../data/settings";

import SettingsSection from "../components/settings/SettingsSection";
import SettingsToggle from "../components/settings/SettingsToggle";
import SettingsRow from "../components/settings/SettingsRow";

const selectClass =
  "w-full rounded-xl border border-white/10 bg-[#202220] px-4 py-3 text-sm text-white outline-none focus:border-[#D0FF71]";

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const updateSetting = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateGeneral = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Settings:", settings);
    setMessage("Settings updated successfully!");
  };

  const handlePasswordChange = () => {
    setMessage("");

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setMessage("New password must be at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    console.log("Password change requested");
    setMessage("Password change API needs to be connected.");

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const updatePassword = (key, value) => {
    setPasswords((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#111211] pb-10 text-white">

      {/* Header */}
      <div>
        <p className="text-sm text-[#D0FF71]">Account Management</p>
        <h1 className="mt-1 text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your preferences, notifications and account security.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-[#D0FF71]/20 bg-[#D0FF71]/5 px-4 py-3 text-sm text-[#D0FF71]">
          {message}
        </div>
      )}

      {/* General Preferences */}
      <SettingsSection
        title="General Preferences"
        description="Customize your dashboard experience."
      >
        <SettingsRow
          title="Language"
          description="Choose your preferred language."
        >
          <select
            className={selectClass}
            value={settings.language}
            onChange={(e) => updateGeneral("language", e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </SettingsRow>

        <div className="border-t border-white/5" />

        <SettingsRow
          title="Timezone"
          description="Used for campaign deadlines and notifications."
        >
          <select
            className={selectClass}
            value={settings.timezone}
            onChange={(e) => updateGeneral("timezone", e.target.value)}
          >
            <option value="Asia/Kolkata">India (IST)</option>
            <option value="Asia/Dubai">Dubai</option>
            <option value="Europe/London">London</option>
            <option value="America/New_York">New York</option>
          </select>
        </SettingsRow>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        title="Notifications"
        description="Choose which updates you want to receive."
      >
        <SettingsToggle
          title="Campaign Updates"
          description="Get notified about new campaigns and campaign changes."
          checked={settings.notifications.campaignUpdates}
          onChange={(v) => updateSetting("notifications", "campaignUpdates", v)}
        />

        <div className="border-t border-white/5" />

        <SettingsToggle
          title="Application Updates"
          description="Get notified when brands approve or reject your applications."
          checked={settings.notifications.applicationUpdates}
          onChange={(v) => updateSetting("notifications", "applicationUpdates", v)}
        />

        <div className="border-t border-white/5" />

        <SettingsToggle
          title="Payment Notifications"
          description="Receive updates about earnings and withdrawals."
          checked={settings.notifications.paymentUpdates}
          onChange={(v) => updateSetting("notifications", "paymentUpdates", v)}
        />

        <div className="border-t border-white/5" />

        <SettingsToggle
          title="Marketing Emails"
          description="Receive promotional offers and creator opportunities."
          checked={settings.notifications.marketingEmails}
          onChange={(v) => updateSetting("notifications", "marketingEmails", v)}
        />

        <div className="border-t border-white/5" />

        <SettingsToggle
          title="Product Updates"
          description="Get updates about new Infule features."
          checked={settings.notifications.productUpdates}
          onChange={(v) => updateSetting("notifications", "productUpdates", v)}
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        title="Privacy"
        description="Control how brands can discover and view your profile."
      >
        <SettingsToggle
          title="Public Creator Profile"
          description="Allow brands to view your creator profile."
          checked={settings.privacy.publicProfile}
          onChange={(v) => updateSetting("privacy", "publicProfile", v)}
        />

        <div className="border-t border-white/5" />

        <SettingsToggle
          title="Show Earnings"
          description="Allow brands to see your earnings information."
          checked={settings.privacy.showEarnings}
          onChange={(v) => updateSetting("privacy", "showEarnings", v)}
        />

        <div className="border-t border-white/5" />

        <SettingsToggle
          title="Brand Discovery"
          description="Allow brands to find your profile when searching for creators."
          checked={settings.privacy.allowBrandDiscovery}
          onChange={(v) => updateSetting("privacy", "allowBrandDiscovery", v)}
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection
        title="Security"
        description="Keep your Infule account secure."
      >
        <SettingsToggle
          title="Two-Factor Authentication"
          description="Add an additional verification step when signing in."
          checked={settings.security.twoFactorEnabled}
          onChange={(v) => updateSetting("security", "twoFactorEnabled", v)}
        />

        <div className="border-t border-white/5" />

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Change Password
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="password"
              placeholder="Current password"
              value={passwords.currentPassword}
              onChange={(e) => updatePassword("currentPassword", e.target.value)}
              className={selectClass}
            />

            <input
              type="password"
              placeholder="New password"
              value={passwords.newPassword}
              onChange={(e) => updatePassword("newPassword", e.target.value)}
              className={selectClass}
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={passwords.confirmPassword}
              onChange={(e) => updatePassword("confirmPassword", e.target.value)}
              className={selectClass}
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="mt-4 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#D0FF71] hover:text-[#D0FF71]"
          >
            Update Password
          </button>
        </div>
      </SettingsSection>

      {/* Danger Zone */}
      <section className="rounded-2xl border border-red-500/20 bg-[#171817] p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
        <p className="mt-1 text-sm text-gray-500">
          These actions can affect your Infule account.
        </p>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-white">Deactivate Account</p>
            <p className="mt-1 text-xs text-gray-500">
              Temporarily disable your creator account.
            </p>
          </div>

          <button
            onClick={() => alert("Connect account deactivation API")}
            className="rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10"
          >
            Deactivate
          </button>
        </div>

        <div className="my-5 border-t border-white/5" />

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-white">Delete Account</p>
            <p className="mt-1 text-xs text-gray-500">
              Permanently delete your account and associated data.
            </p>
          </div>

          <button
            onClick={() => alert("Connect account deletion API")}
            className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-xl bg-[#D0FF71] px-7 py-3 text-sm font-bold text-black transition hover:bg-[#c1f15f]"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
