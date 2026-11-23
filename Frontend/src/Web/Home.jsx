import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  ChevronDown,
  Heart,
  Megaphone,
  Menu,
  MessageCircle,
  Share2,
  Target,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const NAV = [
  { label: "For brands", href: "#brands" },
  { label: "For creators", href: "#creators" },
  { label: "Why Influnex", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

const BRAND_FLOW = [
  { icon: Megaphone, title: "Create your campaign", desc: "Set your goal and your budget. Takes a few minutes." },
  { icon: Target, title: "Choose creators in your niche", desc: "Pick creators whose audience already cares about your category." },
  { icon: Camera, title: "Creators post", desc: "They make the content and publish it to their own audience." },
  { icon: Wallet, title: "Pay only for engagement", desc: "Likes, comments and shares count. Reach alone does not cost you." },
];

const CREATOR_FLOW = [
  { icon: Target, title: "Pick a campaign", desc: "Browse campaigns in your niche. No follower minimum." },
  { icon: Camera, title: "Post your content", desc: "Create it your way and publish it on your account." },
  { icon: Heart, title: "Engagement is tracked", desc: "Likes, comments and shares on your post are counted." },
  { icon: Wallet, title: "Get paid", desc: "The more your audience engages, the more you earn." },
];

const COMPARE = [
  ["You pay for", "Ad views or clicks", "Real engagement"],
  ["Who talks to your customer", "Your brand's ad", "A creator they already follow"],
  ["Targeting", "Ad settings and guesswork", "Creators in your exact niche"],
  ["Small budget", "Competes in a crowded ad feed", "Start low, scale what works"],
];

const FEATURES = [
  { icon: Users, title: "Open to every creator", desc: "Small and large creators all get access to campaigns.", span: "lg:col-span-2" },
  { icon: Target, title: "Niche matching", desc: "Fashion, fitness, tech, food and more.", span: "" },
  { icon: BarChart3, title: "Performance tracking", desc: "See engagement and results per campaign.", span: "" },
  { icon: Zap, title: "One workspace", desc: "Apply, collaborate, publish and get paid without switching tools.", span: "lg:col-span-2" },
];

const FAQ = [
  { q: "Do I need a minimum number of followers?", a: "No. Creators of any size can join campaigns. Earnings are based on engagement." },
  { q: "How do brands pay?", a: "Brands set a campaign budget and pay based on the engagement a creator delivers." },
  { q: "Is it free to sign up?", a: "Creating an account is free for both creators and brands." },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Influnex home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-black">
        <Zap size={18} fill="currentColor" />
      </span>
      <span className="text-xl font-bold tracking-tight">
        influnex
      </span>
    </a>
  );
}

function Button({ href, children, variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-lime-400 text-black hover:bg-lime-300",
    ghost: "border border-white/15 text-white hover:bg-white/5",
    dark: "bg-black text-white hover:bg-neutral-900",
  };
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

function Flow({ steps }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {steps.map((st, i) => (
        <li key={st.title} className="relative rounded-2xl border border-white/10 bg-[#0e110e] p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
            <st.icon size={20} />
          </span>
          <h3 className="mt-4 font-semibold">{st.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-neutral-400">{st.desc}</p>
          {i < steps.length - 1 && (
            <ArrowRight size={18} className="absolute -right-[22px] top-1/2 hidden -translate-y-1/2 text-lime-400 lg:block" />
          )}
        </li>
      ))}
    </ol>
  );
}

function Bar({ icon: Icon, label, value, pct }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-neutral-300"><Icon size={15} className="text-lime-400" />{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-lime-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function BrandGraphic() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101310] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Summer launch campaign</p>
        <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs text-lime-400">Sample data</span>
      </div>
      <div className="mt-5 rounded-xl bg-white/[0.04] p-4">
        <div className="flex justify-between text-sm text-neutral-400">
          <span>Budget used</span><span>₹6,200 of ₹10,000</span>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-white/10">
          <div className="h-full w-[62%] rounded-full bg-lime-400" />
        </div>
        <p className="mt-3 text-xs text-neutral-500">Money is spent only as engagement happens.</p>
      </div>
      <div className="mt-5 space-y-4">
        <Bar icon={Heart} label="Likes" value="1,240" pct={85} />
        <Bar icon={MessageCircle} label="Comments" value="86" pct={30} />
        <Bar icon={Share2} label="Shares" value="214" pct={50} />
      </div>
    </div>
  );
}

function CreatorGraphic() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101310] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Your Reel</p>
        <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs text-lime-400">Sample data</span>
      </div>
      <div className="mt-5 space-y-4">
        <Bar icon={Heart} label="Likes" value="640" pct={70} />
        <Bar icon={MessageCircle} label="Comments" value="48" pct={35} />
        <Bar icon={Share2} label="Shares" value="95" pct={45} />
      </div>
      <div className="mt-5 flex items-center justify-between rounded-xl border border-lime-400/20 bg-lime-400/[0.06] p-4">
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <TrendingUp size={16} className="text-lime-400" /> You earned
        </div>
        <span className="text-2xl font-bold text-lime-400">₹1,800</span>
      </div>
    </div>
  );
}

function ProductMock() {
  const rows = [
    { icon: Camera, name: "Fashion brand", type: "Instagram Reel", amount: "₹2,500", status: "Paid", live: false },
    { icon: Heart, name: "Beauty launch", type: "Instagram Story", amount: "₹1,200", status: "Live", live: true },
    { icon: Share2, name: "Lifestyle campaign", type: "Instagram Post", amount: "₹1,800", status: "Paid", live: false },
  ];
  const line = "M0,82 C25,78 45,60 75,63 S125,38 155,44 S210,22 240,26 S278,12 292,10";
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-lime-400/10 blur-3xl" />

      {/* Floating chips */}
      <div className="absolute -top-4 right-2 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#161a16] px-3 py-2 shadow-xl sm:-right-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/15 text-pink-400"><Heart size={14} fill="currentColor" /></span>
        <div className="leading-tight">
          <p className="text-xs font-semibold">1,240 likes</p>
          <p className="text-[10px] text-neutral-500">on your Reel</p>
        </div>
      </div>
      <div className="absolute -bottom-5 left-2 z-10 flex items-center gap-2 rounded-xl border border-lime-400/30 bg-[#161a16] px-3 py-2 shadow-xl sm:-left-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-black"><Check size={14} strokeWidth={3} /></span>
        <div className="leading-tight">
          <p className="text-xs font-semibold">Brand paid ₹1,800</p>
          <p className="text-[10px] text-neutral-500">For engagement</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#151a15] to-[#0d100d] p-5 shadow-2xl shadow-lime-400/5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-sm font-bold text-black">A</span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">Aarav</p>
              <p className="text-xs text-neutral-500">Fashion creator</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-[11px] text-neutral-400">Sample data</span>
        </div>

        {/* Earnings + chart */}
        <div className="mt-5">
          <p className="text-xs text-neutral-400">Total earned</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <p className="text-4xl font-bold tracking-tight sm:text-5xl">₹12,450</p>
            <span className="flex items-center gap-1 rounded-full bg-lime-400/15 px-2.5 py-1 text-xs font-semibold text-lime-400">
              <TrendingUp size={12} /> +18%
            </span>
          </div>
          <svg viewBox="0 0 300 100" className="mt-4 h-auto w-full" role="img" aria-label="Earnings growing over time">
            <defs>
              <linearGradient id="earnFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a3e635" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.06" strokeDasharray="3 4" />
            ))}
            <path d={`${line} L292,100 L0,100 Z`} fill="url(#earnFill)" />
            <path d={line} fill="none" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="292" cy="10" r="9" fill="#a3e635" fillOpacity="0.2" />
            <circle cx="292" cy="10" r="4" fill="#a3e635" />
          </svg>
        </div>

        {/* Campaigns */}
        <div className="mt-5 flex items-center justify-between text-xs text-neutral-500">
          <span>Your campaigns</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 motion-safe:animate-pulse" /> 1 live
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {rows.map((r) => (
            <li key={r.name} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400">
                <r.icon size={17} />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-medium">{r.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{r.type}</p>
              </div>
              <div className="shrink-0 text-right leading-tight">
                <p className="text-sm font-semibold">{r.amount}</p>
                <p className={`mt-0.5 text-[11px] ${r.live ? "text-amber-300" : "text-lime-400"}`}>{r.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div id="top" className="min-h-screen scroll-smooth bg-[#080a08] text-white antialiased selection:bg-lime-400 selection:text-black">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080a08]/80 backdrop-blur-lg">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />

          <div className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-white">{n.label}</a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a href="/login" className="px-3 py-2 text-sm text-neutral-300 hover:text-white">Log in</a>
            <Button href="/account-type">Get started</Button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0b0d0b] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1 text-sm">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-neutral-300 hover:bg-white/5">
                  {n.label}
                </a>
              ))}
              <a href="/login" className="rounded-lg px-3 py-3 text-neutral-300 hover:bg-white/5">Log in</a>
              <Button href="/account-type" className="mt-2">Get started</Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-lime-400/10 blur-[120px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-tight">
                The influencer marketplace that pays for <span className="text-lime-400">engagement</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg lg:mx-0">
                Brands create a campaign, choose creators in their niche and pay only for engagement. Creators earn for the engagement they bring, not for follower count.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button href="/creator-singup">I'm a creator <ArrowRight size={16} /></Button>
                <Button href="/brand-singup" variant="ghost">I'm a brand</Button>
              </div>
              <p className="mt-5 flex items-center justify-center gap-2 text-sm text-neutral-500 lg:justify-start">
                <Check size={16} className="text-lime-400" /> Free to join. No minimum followers.
              </p>
            </div>

            <ProductMock />
          </div>
        </section>

        {/* Brands */}
        <section id="brands" className="scroll-mt-16 border-t border-white/10 bg-[#0b0d0b] px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-sm font-medium text-lime-400">For brands</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Run your own campaign. Pay only for engagement.
                </h2>
                <p className="mt-4 max-w-lg leading-7 text-neutral-400">
                  You decide the budget and pick the creators. A small budget can reach people who actually care, because
                  you choose creators from your own niche.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-neutral-300">
                  {["Create a campaign yourself, no agency needed", "Choose creators who fit your niche", "Start with a low budget and scale what works", "Pay for likes, comments and shares"].map((p) => (
                    <li key={p} className="flex items-center gap-3"><Check size={18} className="shrink-0 text-lime-400" />{p}</li>
                  ))}
                </ul>
                <Button href="/brand-singup" className="mt-8">Launch a campaign <ArrowRight size={16} /></Button>
              </div>
              <BrandGraphic />
            </div>
            <div className="mt-14"><Flow steps={BRAND_FLOW} /></div>
          </div>
        </section>

        {/* Compare */}
        <section id="compare" className="scroll-mt-16 border-t border-white/10 px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why not just run ads?</h2>
            <p className="mt-3 max-w-xl text-neutral-400">Ads and creator campaigns work differently. Here is how Influnex compares with typical ad platforms like Meta.</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-white/[0.03] text-neutral-400">
                  <tr>
                    <th className="px-5 py-4 font-medium"></th>
                    <th className="px-5 py-4 font-medium">Typical ads</th>
                    <th className="px-5 py-4 font-semibold text-lime-400">Influnex</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {COMPARE.map(([k, a, b]) => (
                    <tr key={k}>
                      <td className="px-5 py-4 font-medium">{k}</td>
                      <td className="px-5 py-4 text-neutral-400">{a}</td>
                      <td className="px-5 py-4 text-white">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Creators */}
        <section id="creators" className="scroll-mt-16 border-t border-white/10 bg-[#0b0d0b] px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <CreatorGraphic />
              <div className="lg:order-first">
                <p className="text-sm font-medium text-lime-400">For creators</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Your audience is your income
                </h2>
                <p className="mt-4 max-w-lg leading-7 text-neutral-400">
                  You do not need thousands of followers. Join a campaign in your niche, post, and earn based on the
                  engagement your content gets.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-neutral-300">
                  {["No minimum followers", "Campaigns that match your niche", "Earn more as engagement grows", "See exactly what you earned"].map((p) => (
                    <li key={p} className="flex items-center gap-3"><Check size={18} className="shrink-0 text-lime-400" />{p}</li>
                  ))}
                </ul>
                <Button href="/creator-singup" className="mt-8">Start earning <ArrowRight size={16} /></Button>
              </div>
            </div>
            <div className="mt-14"><Flow steps={CREATOR_FLOW} /></div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-16 border-t border-white/10 px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">Built for results</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className={`rounded-2xl border border-white/10 bg-[#0e110e] p-6 ${f.span}`}>
                  <f.icon size={24} className="text-lime-400" />
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-16 border-t border-white/10 px-4 py-20 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions</h2>
            <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0e110e]">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q}>
                    <button
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium sm:text-base"
                    >
                      {f.q}
                      <ChevronDown size={18} className={`shrink-0 text-neutral-500 transition ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && <p className="px-5 pb-5 text-sm leading-6 text-neutral-400">{f.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 sm:px-6 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl bg-lime-400 px-6 py-14 text-center text-black sm:px-12 md:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Turn your influence into income
            </h2>
            <p className="mx-auto mt-4 max-w-md text-black/70">Join as a creator or a brand. It takes a few minutes.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/creator-singup" variant="dark">Join as creator</Button>
              <a
                href="/brand-singup"
                className="inline-flex items-center justify-center rounded-lg border-2 border-black/20 px-5 py-3 text-sm font-semibold transition hover:bg-black/5"
              >
                Join as brand
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-neutral-500 md:flex-row">
          <Logo />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="/login" className="hover:text-white">Log in</a>
            <a href="/creator-singup" className="hover:text-white">Creator sign up</a>
            <a href="/brand-singup" className="hover:text-white">Brand sign up</a>
          </div>
          <p>© {new Date().getFullYear()} Influnex</p>
        </div>
      </footer>
    </div>
  );
}