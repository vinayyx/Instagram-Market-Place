
export default function SocialAccountCard({ account, onConnect }) {
  const platformLabels = {
    Instagram: "IG",
    YouTube: "YT",
    Facebook: "FB",
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#202220] p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D0FF71]/10 text-sm font-bold text-[#D0FF71]">
          {platformLabels[account.platform] || account.platform.slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="font-medium text-white">{account.platform}</p>
          <p className="truncate text-xs text-gray-500">
            {account.connected
              ? `${account.username} · ${account.followers} followers`
              : "Not connected"}
          </p>
        </div>
      </div>

      <button
        onClick={onConnect}
        className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
          account.connected
            ? "bg-[#D0FF71]/10 text-[#D0FF71]"
            : "bg-[#D0FF71] text-black"
        }`}
      >
        {account.connected ? "Connected" : "Connect"}
      </button>
    </div>
  );
}
