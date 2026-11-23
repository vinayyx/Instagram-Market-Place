
import {
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  RefreshCw,
  Banknote
} from "lucide-react";
import { Link } from "react-router-dom";

const InstagramConnectCard = ({
  isConnected = false,
  username = "",
  onConnect,
}) => {
  if (isConnected) {
    return (
      <div className="rounded-2xl border border-[#D0FF71]/20 bg-[#1A1C1A] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D0FF71]/10">
              <Banknote className="text-[#D0FF71]" size={25} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">
                  Instagram Connected
                </h3>
                <CheckCircle2 size={16} className="text-[#D0FF71]" />
              </div>

              <p className="mt-1 text-sm text-gray-400">
                @{username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#D0FF71]/20 bg-[#D0FF71]/10 px-3 py-2 text-sm text-[#D0FF71]">
            <span className="h-2 w-2 rounded-full bg-[#D0FF71]" />
            Account Active
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
          <p className="text-xs text-gray-500">
            Your Instagram insights can be tracked when supported by Meta's API.
          </p>

          <Link
            to="/creator/settings"
            className="flex items-center gap-2 text-sm font-medium text-[#D0FF71] hover:underline"
          >
            Manage Account
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D0FF71]/20 bg-[#1A1C1A] p-5 sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#D0FF71]/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D0FF71]/10">
            <Banknote size={26} className="text-[#D0FF71]" />
          </div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Connect your Instagram account
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Connect your professional Instagram account to verify
            your Reels, track performance and earn based on actual
            campaign results.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#D0FF71]" />
              Verified Reel Views
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#D0FF71]" />
              Performance Tracking
            </span>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={onConnect}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-6 py-3 font-semibold text-[#101110] transition hover:bg-[#c1f45c] sm:w-auto"
          >
            <Banknote size={19} />
            Connect Instagram
            <ArrowUpRight size={17} />
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck size={14} />
            Secure connection via Meta
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramConnectCard;
