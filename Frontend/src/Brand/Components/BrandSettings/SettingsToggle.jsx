export default function BrandSettingsToggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-4 last:border-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-200">
          {label}
        </p>

        {description && (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#D0FF71]" : "bg-[#383D38]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full transition ${
            checked
              ? "left-6 bg-black"
              : "left-1 bg-white"
          }`}
        />
      </button>
    </div>
  );
}