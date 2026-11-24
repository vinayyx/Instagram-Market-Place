
export default function SettingsSection({
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#171817] p-5 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className="space-y-5">{children}</div>
    </section>
  );
}
