
import { ChevronRight } from "lucide-react";

export default function ProfileSection({
  title,
  description,
  children,
  action,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#171817] p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
