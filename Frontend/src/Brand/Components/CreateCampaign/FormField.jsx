import { ChevronDown } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#101210] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D0FF71]/50";

export const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
  max,
  hint,
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-medium text-gray-300">
        {label}
        {required && <span className="ml-1 text-[#D0FF71]">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className={inputClass}
      />

      {hint && (
        <p className="mt-2 text-[10px] text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
};

export const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  hint,
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-medium text-gray-300">
        {label}
        {required && <span className="ml-1 text-[#D0FF71]">*</span>}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${inputClass} resize-none`}
      />

      {hint && (
        <p className="mt-2 text-[10px] text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
};

export const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-medium text-gray-300">
        {label}
        {required && <span className="ml-1 text-[#D0FF71]">*</span>}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${inputClass} appearance-none pr-10`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value || option}
              value={option.value || option}
              className="bg-[#171917]"
            >
              {option.label || option}
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
};