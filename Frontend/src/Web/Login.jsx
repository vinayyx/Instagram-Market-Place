import { useEffect, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, Heart, TrendingUp, Zap } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1. CONFIG                                                          */
/* ------------------------------------------------------------------ */
const QUOTES = [
  { text: "Followers are a number. Engagement is a result.", sub: "Get paid for the response your content creates." },
  { text: "Your creativity deserves to get paid.", sub: "Join campaigns in your niche. No minimum followers." },
  { text: "Small budget. Right creators.", sub: "Choose creators from your niche and pay only for engagement." },
  { text: "Stop paying for views nobody feels.", sub: "Real likes, comments and shares are what count here." },
];
const PERKS = ["Free to join", "No minimum followers", "Pay only for engagement"];
const SIGNUP_URL = "/account-type";

/* ------------------------------------------------------------------ */
/* 2. BACKEND PLACEHOLDER: replace with your real login API           */
/* ------------------------------------------------------------------ */
async function loginRequest({ email, password, remember }) {
  // TODO: const res = await fetch("/api/auth/login", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ email, password, remember }) });
  // if (!res.ok) throw new Error("Invalid email or password");
  // window.location.href = "/dashboard";
  console.log("Login attempt:", { email, remember });
  await new Promise((r) => setTimeout(r, 800));
}

/* ------------------------------------------------------------------ */
/* 3. SMALL PIECES                                                    */
/* ------------------------------------------------------------------ */
const inputCls = (bad) =>
  `w-full rounded-lg border bg-white/[0.04] px-4 py-3 text-sm outline-none transition placeholder:text-neutral-600 focus:border-lime-400 ${bad ? "border-red-400/60" : "border-white/10"}`;

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Influnex home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-black"><Zap size={18} fill="currentColor" /></span>
      <span className="text-xl font-bold tracking-tight">influnex</span>
    </a>
  );
}

function QuotePanel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const q = QUOTES[i];
  return (
    <div className="relative">
      <div aria-live="polite" className="min-h-[11rem]">
        <p className="text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
          <span className="text-lime-400">“</span>{q.text}<span className="text-lime-400">”</span>
        </p>
        <p className="mt-4 max-w-sm text-neutral-400">{q.sub}</p>
      </div>
      <div className="mt-4 flex gap-2">
        {QUOTES.map((_, n) => (
          <button key={n} type="button" onClick={() => setI(n)} aria-label={`Show quote ${n + 1}`} aria-current={n === i}
            className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-lime-400" : "w-3 bg-white/20 hover:bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}

function FloatingCards() {
  return (
    <div className="relative mt-10 hidden h-36 xl:block" aria-hidden="true">
      <div className="absolute left-0 top-0 w-60 rounded-2xl border border-white/10 bg-[#141914] p-4 shadow-xl">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Campaign engagement</span><span className="text-neutral-600">Sample</span>
        </div>
        <p className="mt-1 text-2xl font-bold text-lime-400">12,850</p>
        <div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-lime-400" /></div>
      </div>
      <div className="absolute bottom-0 left-36 flex items-center gap-2 rounded-xl border border-white/10 bg-[#161a16] px-3 py-2 shadow-xl">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/15 text-pink-400"><Heart size={14} fill="currentColor" /></span>
        <div className="leading-tight">
          <p className="text-xs font-semibold">+1,240 likes</p>
          <p className="text-[10px] text-neutral-500">on a creator's Reel</p>
        </div>
      </div>
      <div className="absolute right-0 top-6 flex items-center gap-2 rounded-xl border border-lime-400/30 bg-[#161a16] px-3 py-2 shadow-xl">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-black"><TrendingUp size={14} /></span>
        <p className="text-xs font-semibold">₹1,800 earned</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. MAIN PAGE                                                       */
/* ------------------------------------------------------------------ */
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
    setFormError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email";
    if (!form.password) er.password = "Enter your password";
    setErrors(er);
    if (Object.keys(er).length) return;

    setLoading(true); setFormError("");
    try {
      await loginRequest(form);
    } catch {
      setFormError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080a08] text-white antialiased selection:bg-lime-400 selection:text-black lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      {/* Left: marketing panel (desktop) */}
      <aside className="relative hidden overflow-hidden border-r border-white/10 bg-[#0b0e0b] lg:block">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-lime-400/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-lime-400/5 blur-[110px]" />
        <div className="sticky top-0 flex h-screen flex-col justify-between p-10 xl:p-14">
          <div className="relative"><Logo /></div>
          <div className="relative">
            <QuotePanel />
            <FloatingCards />
          </div>
          <ul className="relative flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
            {PERKS.map((p) => <li key={p} className="flex items-center gap-2"><Check size={16} className="text-lime-400" /> {p}</li>)}
          </ul>
        </div>
      </aside>

      {/* Right: form */}
      <main className="flex min-h-screen flex-col px-4 sm:px-6 lg:min-h-0">
        <div className="flex h-16 items-center justify-between lg:justify-end">
          <div className="lg:hidden"><Logo /></div>
          <p className="text-sm text-neutral-400">
            New here? <a href={SIGNUP_URL} className="font-medium text-lime-400 hover:underline">Sign up</a>
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-8 lg:min-h-[calc(100vh-4rem)]">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-neutral-400">Log in to manage your campaigns and earnings.</p>

          {/* short quote on mobile only */}
          <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-neutral-300 lg:hidden">
            <span className="text-lime-400">“</span>Followers are a number. Engagement is a result.<span className="text-lime-400">”</span>
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-neutral-200">Email</span>
              <input type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email} className={inputCls(errors.email)} placeholder="you@example.com" />
              {errors.email && <span role="alert" className="mt-1.5 block text-xs text-red-400">{errors.email}</span>}
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-neutral-200">
                Password
                <a href="/forgot-password" className="text-xs font-medium text-lime-400 hover:underline">Forgot password?</a>
              </span>
              <div className="relative">
                <input type={show ? "text" : "password"} autoComplete="current-password" value={form.password} onChange={(e) => set("password", e.target.value)}
                  aria-invalid={!!errors.password} className={`${inputCls(errors.password)} pr-11`} placeholder="Enter your password" />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span role="alert" className="mt-1.5 block text-xs text-red-400">{errors.password}</span>}
            </label>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-300">
              <input type="checkbox" checked={form.remember} onChange={(e) => set("remember", e.target.checked)} className="h-4 w-4 accent-lime-400" />
              Keep me logged in
            </label>

            {formError && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">{formError}</p>}

            <button type="submit" disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60">
              {loading ? "Logging in..." : <>Log in <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-neutral-400">
            Don't have an account?{" "}
            <a href={SIGNUP_URL} className="font-semibold text-lime-400 hover:underline">Create one for free</a>
          </div>
        </div>
      </main>
    </div>
  );
}