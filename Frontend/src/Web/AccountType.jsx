import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  Heart,
  Megaphone,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

const OPTIONS = [
  {
    role: "brand",
    icon: Megaphone,
    label: "I'm a brand",
    title: "Grow with creators your customers trust",
    desc: "Create your own campaign, pick creators from your niche and pay only for the engagement you get.",
    perks: [
      { icon: Megaphone, text: "Create your own campaign in minutes" },
      { icon: Target, text: "Choose creators in your exact niche" },
      { icon: Wallet, text: "Start with a low budget, scale what works" },
      { icon: BarChart3, text: "Track likes, comments and shares" },
    ],
    cta: "Register as a brand",
    href: "/brand-singup",
  },
  {
    role: "creator",
    icon: Camera,
    label: "I'm a creator",
    title: "Turn your content into real income",
    desc: "Join campaigns that match your niche. No minimum followers. The more your audience engages, the more you earn.",
    perks: [
      { icon: Target, text: "Find campaigns in your niche" },
      { icon: Camera, text: "Create content your way" },
      { icon: Heart, text: "Get rewarded for real engagement" },
      { icon: Wallet, text: "See exactly what you earned" },
    ],
    cta: "Register as a creator",
    href: "/creator-singup",
  },
];

function AccountType() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080a08] text-white antialiased selection:bg-lime-400 selection:text-black">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-lime-400/10 blur-[120px]" />

      {/* Top bar */}
      <header className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          className="flex items-center gap-2"
          aria-label="Influnex home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-black">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="text-xl font-bold tracking-tight">influnex</span>
        </a>
        <a
          href="/"
          className="flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-white"
        >
          <ArrowLeft size={16} /> Back
        </a>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 md:pt-14">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-tight tracking-tight">
            How do you want to use{" "}
            <span className="text-lime-400">Influnex</span>?
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-400 sm:text-lg">
            Pick your side and start in a few minutes. It's free to join.
          </p>
        </div>

        {/* Options */}
        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {OPTIONS.map((o) => (
            <section
              key={o.role}
              aria-labelledby={`${o.role}-title`}
              className="group flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-[#141914] to-[#0d100d] p-6 transition hover:border-lime-400/50 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400 transition group-hover:bg-lime-400 group-hover:text-black">
                  <o.icon size={24} />
                </span>
                <span className="text-sm font-medium text-neutral-400">
                  {o.label}
                </span>
              </div>

              <h2
                id={`${o.role}-title`}
                className="mt-6 text-2xl font-bold leading-snug tracking-tight"
              >
                {o.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400 sm:text-base sm:leading-7">
                {o.desc}
              </p>

              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {o.perks.map((p) => (
                  <li
                    key={p.text}
                    className="flex items-center gap-3 text-sm text-neutral-300"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-lime-400">
                      <p.icon size={15} />
                    </span>
                    {p.text}
                  </li>
                ))}
              </ul>

              <a
                href={o.href}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:mt-auto sm:pt-3.5"
              >
                {o.cta} <ArrowRight size={16} />
              </a>
            </section>
          ))}
        </div>

        {/* Reassurance + login */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center text-sm text-neutral-500">
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-lime-400" /> Free to join
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-lime-400" /> No minimum followers
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-lime-400" /> Pay only for
              engagement
            </span>
          </p>
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-lime-400 hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default AccountType;
