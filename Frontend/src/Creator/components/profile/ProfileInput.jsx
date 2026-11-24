
export default function ProfileInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-white/10 bg-[#202220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D0FF71] disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
