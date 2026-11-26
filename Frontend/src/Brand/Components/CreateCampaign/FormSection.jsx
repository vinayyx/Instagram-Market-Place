import { ChevronDown } from "lucide-react";

const FormSection = ({ number, title, description, children }) => {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#171917] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D0FF71]/10 text-sm font-bold text-[#D0FF71]">
          {number}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white sm:text-base">
            {title}
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
};

export default FormSection;