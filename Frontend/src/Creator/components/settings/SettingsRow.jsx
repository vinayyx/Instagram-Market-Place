
export default function SettingsRow({
  title,
  description,
  children,
}) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>

      <div className="sm:min-w-[220px]">{children}</div>
    </div>
  );
}
