export default function BrandProfileField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
  rows = 4,
}) {
  const classes =
    "w-full rounded-xl border border-white/[0.08] bg-[#101210] px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-[#D0FF71]/60";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={rows}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${classes} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={classes}
        />
      )}
    </div>
  );
}