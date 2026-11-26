import { ChevronDown } from "lucide-react";

export default function BrandSettingsRow({
  label,
  description,
  value,
  options = [],
  onChange,
}) {
  return (
    <div className="flex flex-col justify-between gap-3 border-b border-white/[0.06] py-4 last:border-0 last:pb-0 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium text-gray-200">
          {label}
        </p>

        {description && (
          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        )}
      </div>

      <div className="relative w-full sm:w-56">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#101210] px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-[#D0FF71]/60"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#171917]"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
}