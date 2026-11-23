import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Zap } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1. CONFIG: change options here, UI updates automatically           */
/* ------------------------------------------------------------------ */
const STEPS = ["Account", "Profile", "Portfolio"];
const STEP_INFO = [
  { title: "Create your account", desc: "Start with your basic details.", short: "Email, mobile and password" },
  { title: "Tell us about you", desc: "This helps brands discover you in your niche.", short: "Niche, followers and location" },
  { title: "Show your best work", desc: "Brands pick creators based on real results.", short: "Your top reels" },
];
const PERKS = ["Free to join", "No minimum followers", "Earn from real engagement"];
const NICHES = ["Fashion & Beauty", "Fitness & Health", "Technology", "Gaming", "Travel", "Food", "Lifestyle", "Education", "Entertainment", "Finance", "Photography", "Comedy", "Other"];
const LANGUAGES = ["Hindi", "English", "Marathi", "Gujarati", "Punjabi", "Tamil", "Telugu", "Bengali", "Other"];
const STORAGE_KEY = "creatorSignup";

const INITIAL = {
  // step 1
  fullName: "", email: "", mobile: "",
  password: "", confirm: "", dob: "",
  // step 2
  accountType: "individual", username: "", instagramUrl: "", followers: "",
  primaryNiche: "", secondaryNiches: [], languages: [], bio: "",
  city: "", state: "", // individual only
  pageName: "", audienceCountry: "", contentType: "", hasRights: "", sponsored: "", // theme only
  // step 3
  bestUrl: "", bestViews: "", bestLikes: "", bestComments: "", bestShares: "",
  avgViews: "", avgLikes: "",
  r2Url: "", r2Views: "", r2Likes: "", r2Comments: "",
  r3Url: "", r3Views: "", r3Likes: "", r3Comments: "",
};

/* ------------------------------------------------------------------ */
/* 2. BACKEND PLACEHOLDERS: replace these with your real API calls    */
/* ------------------------------------------------------------------ */
async function submitRegistration(payload) {
  // TODO: await fetch("/api/creators/register", { method: "POST", headers: {...}, body: JSON.stringify(payload) })
  console.log("Registration payload:", payload);
  await new Promise((r) => setTimeout(r, 800));
}

/* ------------------------------------------------------------------ */
/* 3. VALIDATION: one function per step, returns { field: "message" } */
/* ------------------------------------------------------------------ */
const isInt = (v) => /^\d+$/.test(String(v).trim());
const IG_PROFILE = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?(\?.*)?$/i;
const IG_REEL = /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|reels|p)\/[A-Za-z0-9_-]+\/?(\?.*)?$/i;

function ageFrom(dob) {
  const d = new Date(dob);
  if (isNaN(d)) return 0;
  const t = new Date();
  let age = t.getFullYear() - d.getFullYear();
  if (t < new Date(t.getFullYear(), d.getMonth(), d.getDate())) age--;
  return age;
}

function validate(step, d) {
  const e = {};
  const theme = d.accountType === "theme";
  if (step === 0) {
    if (d.fullName.trim().length < 2) e.fullName = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(d.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (d.password.length < 8 || !/[A-Za-z]/.test(d.password) || !/\d/.test(d.password)) e.password = "Use 8+ characters with letters and numbers";
    if (d.confirm !== d.password) e.confirm = "Passwords do not match";
    if (!d.dob) e.dob = "Select your date of birth";
    else if (ageFrom(d.dob) < 18) e.dob = "You must be 18 or older";
  }
  if (step === 1) {
    if (theme && d.pageName.trim().length < 2) e.pageName = "Enter your page name";
    if (!/^@?[A-Za-z0-9._]{3,30}$/.test(d.username.trim())) e.username = "Enter your Instagram username";
    if (!IG_PROFILE.test(d.instagramUrl.trim())) e.instagramUrl = "Enter a valid Instagram profile link";
    if (!isInt(d.followers)) e.followers = "Enter your follower count";
    if (!d.primaryNiche) e.primaryNiche = "Choose your main niche";
    if (d.languages.length === 0) e.languages = "Choose at least one language";
    if (d.bio.trim().length < 10) e.bio = "Write at least 10 characters";
    if (!theme) {
      if (!d.city.trim()) e.city = "Enter your city";
      if (!d.state.trim()) e.state = "Enter your state";
    } else {
      if (!d.audienceCountry.trim()) e.audienceCountry = "Enter your main audience country";
      if (!d.contentType) e.contentType = "Choose one";
      if (d.contentType && d.contentType !== "original" && !d.hasRights) e.hasRights = "Choose one";
    }
  }
  if (step === 2) {
    if (!IG_REEL.test(d.bestUrl.trim())) e.bestUrl = "Enter a valid Instagram reel link";
    if (!isInt(d.bestViews) || Number(d.bestViews) < 1) e.bestViews = "Enter reel views";
    if (!isInt(d.bestLikes)) e.bestLikes = "Enter reel likes";
    if (!isInt(d.bestComments)) e.bestComments = "Enter reel comments";
    ["avgViews", "avgLikes"].forEach((k) => {
      if (d[k] === "" && theme) e[k] = "Required for theme pages";
      else if (d[k] !== "" && !isInt(d[k])) e[k] = "Numbers only";
    });
    ["r2", "r3"].forEach((p) => {
      if (d[p + "Url"] && !IG_REEL.test(d[p + "Url"].trim())) e[p + "Url"] = "Enter a valid reel link";
      ["Views", "Likes", "Comments"].forEach((k) => {
        if (d[p + k] !== "" && !isInt(d[p + k])) e[p + k] = "Numbers only";
      });
    });
  }
  return e;
}

/* ------------------------------------------------------------------ */
/* 4. SMALL REUSABLE UI PIECES                                        */
/* ------------------------------------------------------------------ */
const inputCls = (bad) =>
  `w-full rounded-lg border bg-white/[0.04] px-4 py-3 text-sm outline-none transition placeholder:text-neutral-600 focus:border-lime-400 ${bad ? "border-red-400/60" : "border-white/10"}`;

function Field({ label, optional, hint, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-neutral-200">
        {label}
        {optional && <span className="text-xs font-normal text-neutral-500">Optional</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1.5 block text-xs text-neutral-500">{hint}</span>}
      {error && <span role="alert" className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

function Input({ label, name, d, set, err, optional, hint, ...rest }) {
  return (
    <Field label={label} optional={optional} hint={hint} error={err[name]}>
      <input value={d[name]} onChange={(e) => set(name, e.target.value)} aria-invalid={!!err[name]} className={inputCls(err[name])} {...rest} />
    </Field>
  );
}

function Select({ label, name, d, set, err, options, placeholder = "Select" }) {
  return (
    <Field label={label} error={err[name]}>
      <select value={d[name]} onChange={(e) => set(name, e.target.value)} className={inputCls(err[name])}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o} className="bg-[#0d100d]">{o.label ?? o}</option>
        ))}
      </select>
    </Field>
  );
}

function Chips({ options, value, onChange, error }) {
  const toggle = (o) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o);
          return (
            <button key={o} type="button" aria-pressed={on} onClick={() => toggle(o)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${on ? "border-lime-400 bg-lime-400 font-semibold text-black" : "border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/30"}`}>
              {o}
            </button>
          );
        })}
      </div>
      {error && <p role="alert" className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. THE THREE STEPS (each one only renders its own fields)          */
/* ------------------------------------------------------------------ */
function StepAccount({ d, set, err }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-5">
      <Input label="Full name" name="fullName" d={d} set={set} err={err} autoComplete="name" placeholder="Vinay Sharma" />

      <Input label="Email" name="email" d={d} set={set} err={err} type="email" autoComplete="email" placeholder="you@example.com" />
      <Input label="Mobile number" name="mobile" d={d} set={set} err={err} type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" placeholder="9876543210" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Password" error={err.password} hint="8+ characters, letters and numbers">
          <div className="relative">
            <input type={show ? "text" : "password"} value={d.password} onChange={(e) => set("password", e.target.value)} autoComplete="new-password" className={`${inputCls(err.password)} pr-11`} />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>
        <Input label="Confirm password" name="confirm" d={d} set={set} err={err} type={show ? "text" : "password"} autoComplete="new-password" />
      </div>

      <Input label="Date of birth" name="dob" d={d} set={set} err={err} type="date" max={new Date().toISOString().slice(0, 10)} hint="You must be 18 or older" />
    </div>
  );
}

function StepProfile({ d, set, err }) {
  const theme = d.accountType === "theme";
  return (
    <div className="space-y-5">
      <div role="radiogroup" aria-label="Account type" className="grid gap-3 sm:grid-cols-2">
        {[
          ["individual", "Individual creator", "You appear in your content"],
          ["theme", "Theme page", "Curated or themed content, no face needed"],
        ].map(([v, t, s]) => (
          <button key={v} type="button" role="radio" aria-checked={d.accountType === v} onClick={() => set("accountType", v)}
            className={`rounded-xl border p-4 text-left transition ${d.accountType === v ? "border-lime-400 bg-lime-400/10" : "border-white/10 bg-white/[0.03] hover:border-white/30"}`}>
            <p className="text-sm font-semibold">{t}</p>
            <p className="mt-1 text-xs text-neutral-400">{s}</p>
          </button>
        ))}
      </div>

      {theme && <Input label="Page name" name="pageName" d={d} set={set} err={err} placeholder="Daily Motivation" />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Instagram username" name="username" d={d} set={set} err={err} placeholder="@vinaycreates" />
        <Input label="Followers" name="followers" d={d} set={set} err={err} inputMode="numeric" placeholder="5000" />
      </div>
      <Input label="Instagram profile link" name="instagramUrl" d={d} set={set} err={err} type="url" placeholder="instagram.com/username" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Primary niche" name="primaryNiche" d={d} set={set} err={err} options={NICHES} />
        <div>
          <span className="mb-1.5 block text-sm font-medium text-neutral-200">Other niches <span className="text-xs font-normal text-neutral-500">Optional</span></span>
          <Chips options={NICHES.filter((n) => n !== d.primaryNiche)} value={d.secondaryNiches} onChange={(v) => set("secondaryNiches", v)} />
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-neutral-200">Content languages</span>
        <Chips options={LANGUAGES} value={d.languages} onChange={(v) => set("languages", v)} error={err.languages} />
      </div>

      {!theme ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="City" name="city" d={d} set={set} err={err} placeholder="Indore" />
          <Input label="State" name="state" d={d} set={set} err={err} placeholder="Madhya Pradesh" />
        </div>
      ) : (
        <>
          <Input label="Main audience country" name="audienceCountry" d={d} set={set} err={err} placeholder="India" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Select label="Is your content original or curated?" name="contentType" d={d} set={set} err={err}
              options={[{ value: "original", label: "Original" }, { value: "curated", label: "Curated" }, { value: "both", label: "Both" }]} />
            {d.contentType && d.contentType !== "original" && (
              <Select label="Do you have rights to use the content?" name="hasRights" d={d} set={set} err={err}
                options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
            )}
          </div>
          <Select label="Do you publish sponsored content?" name="sponsored" d={d} set={set} err={{}} placeholder="Select (optional)"
            options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
        </>
      )}

      <Field label={theme ? "Page description" : "Bio"} error={err.bio}>
        <textarea rows={3} value={d.bio} onChange={(e) => set("bio", e.target.value)} className={inputCls(err.bio)}
          placeholder={theme ? "Daily fitness motivation and workout tips" : "Fitness and lifestyle creator"} />
      </Field>
    </div>
  );
}

function StepPortfolio({ d, set, err }) {
  const theme = d.accountType === "theme";
  return (
    <div className="space-y-6">
      <p className="text-sm leading-6 text-neutral-400">
        Brands use this to choose creators. Share your best-performing reel. We may ask you to verify these numbers later.
      </p>

      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-sm font-semibold">Your best reel</p>
        <Input label="Reel link" name="bestUrl" d={d} set={set} err={err} type="url" placeholder="instagram.com/reel/..." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Input label="Views" name="bestViews" d={d} set={set} err={err} inputMode="numeric" placeholder="250000" />
          <Input label="Likes" name="bestLikes" d={d} set={set} err={err} inputMode="numeric" placeholder="18500" />
          <Input label="Comments" name="bestComments" d={d} set={set} err={err} inputMode="numeric" placeholder="420" />
          <Input label="Shares" name="bestShares" d={d} set={set} err={err} optional inputMode="numeric" placeholder="300" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Average reel views" name="avgViews" d={d} set={set} err={err} optional={!theme} inputMode="numeric" />
        <Input label="Average reel likes" name="avgLikes" d={d} set={set} err={err} optional={!theme} inputMode="numeric" />
      </div>

      {[2, 3].map((n) => (
        <details key={n} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <summary className="cursor-pointer text-sm font-semibold">Add reel {n} <span className="font-normal text-neutral-500">(optional)</span></summary>
          <div className="mt-5 space-y-5">
            <Input label="Reel link" name={`r${n}Url`} d={d} set={set} err={err} type="url" placeholder="instagram.com/reel/..." />
            <div className="grid grid-cols-3 gap-4">
              <Input label="Views" name={`r${n}Views`} d={d} set={set} err={err} inputMode="numeric" />
              <Input label="Likes" name={`r${n}Likes`} d={d} set={set} err={err} inputMode="numeric" />
              <Input label="Comments" name={`r${n}Comments`} d={d} set={set} err={err} inputMode="numeric" />
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Influnex home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-black"><Zap size={18} fill="currentColor" /></span>
      <span className="text-xl font-bold tracking-tight">influnex</span>
    </a>
  );
}

function Stepper({ step, onGo }) {
  return (
    <ol className="mt-10">
      {STEPS.map((label, i) => {
        const done = i < step;
        const cur = i === step;
        return (
          <li key={label} className="relative pb-8 last:pb-0">
            {i < STEPS.length - 1 && <span className={`absolute -bottom-1 left-4 top-9 w-px ${done ? "bg-lime-400" : "bg-white/10"}`} />}
            <button type="button" disabled={!done} onClick={() => onGo(i)} aria-current={cur ? "step" : undefined} className="relative flex gap-4 text-left disabled:cursor-default">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition ${done ? "border-lime-400 bg-lime-400 text-black" : cur ? "border-lime-400 text-lime-400" : "border-white/15 text-neutral-500"}`}>
                {done ? <Check size={16} strokeWidth={3} /> : i + 1}
              </span>
              <span>
                <span className={`block text-sm font-semibold ${cur || done ? "text-white" : "text-neutral-500"}`}>{label}</span>
                <span className="block text-xs text-neutral-500">{STEP_INFO[i].short}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* 6. MAIN PAGE: holds ALL data + current step                        */
/* ------------------------------------------------------------------ */
export default function CreatorSignup() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  // restore draft (never contains passwords)
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      if (saved) { setData((d) => ({ ...d, ...saved.data })); setStep(saved.step || 0); }
    } catch { /* ignore */ }
  }, []);

  // save draft on every change, without password fields
  useEffect(() => {
    try {
      const { password, confirm, ...safe } = data;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data: safe, step }));
    } catch { /* ignore */ }
  }, [data, step]);

  const set = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const go = (n) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const onNext = async () => {
    const e = validate(step, data);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < STEPS.length - 1) return go(step + 1);

    setSubmitting(true); setSubmitError("");
    try {
      const { confirm, ...payload } = data;
      await submitRegistration(payload);
      sessionStorage.removeItem(STORAGE_KEY);
      setDone(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const shared = { d: data, set, err: errors };
  const last = step === STEPS.length - 1;
  const hasErrors = Object.values(errors).some(Boolean);

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080a08] px-4 text-white antialiased">
        <div className="w-full max-w-md text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-black"><Check size={28} strokeWidth={3} /></span>
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">You're in, {data.fullName.split(" ")[0]}!</h1>
          <p className="mt-3 text-neutral-400">Your creator account is ready. Next, complete your profile so brands can find you.</p>
          <a href="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-semibold text-black hover:bg-lime-300">
            Go to dashboard <ArrowRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a08] text-white antialiased selection:bg-lime-400 selection:text-black lg:grid lg:grid-cols-[24rem_minmax(0,1fr)] xl:grid-cols-[28rem_minmax(0,1fr)]">
      {/* Left panel (desktop): stays fixed while the form scrolls */}
      <aside className="hidden border-r border-white/10 bg-[#0b0e0b] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden p-10">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-lime-400/10 blur-[100px]" />
          <div className="relative"><Logo /></div>
          <div className="relative">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">Start earning from your content</h2>
            <p className="mt-3 text-neutral-400">Create your creator profile and get discovered by brands in your niche.</p>
            <Stepper step={step} onGo={go} />
          </div>
          <ul className="relative space-y-2.5 text-sm text-neutral-400">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-2.5"><Check size={16} className="text-lime-400" /> {p}</li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Sticky progress bar: always visible while scrolling */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080a08]/85 backdrop-blur-lg">
          <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4 sm:px-6">
            <div className="lg:hidden"><Logo /></div>
            <p className="text-sm text-neutral-400">
              <span className="font-semibold text-white">Step {step + 1}</span> of {STEPS.length} · {STEPS[step]}
            </p>
          </div>
          <div className="h-0.5 bg-white/10" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
            <div className="h-full bg-lime-400 transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </header>

        <main className="mx-auto w-full max-w-xl px-4 pt-8 sm:px-6 lg:pt-12">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{STEP_INFO[step].title}</h1>
          <p className="mt-2 text-neutral-400">{STEP_INFO[step].desc}</p>

          <div className="mt-8">
            {step === 0 && <StepAccount {...shared} />}
            {step === 1 && <StepProfile {...shared} />}
            {step === 2 && <StepPortfolio {...shared} />}
          </div>

          {hasErrors && <p role="alert" className="mt-6 text-sm text-red-400">Please fix the highlighted fields.</p>}
          {submitError && <p role="alert" className="mt-4 text-sm text-red-400">{submitError}</p>}

          {/* Sticky action bar */}
          <div className="sticky bottom-0 z-30 -mx-4 mt-10 flex items-center justify-between gap-3 border-t border-white/10 bg-[#080a08]/90 px-4 py-4 backdrop-blur-lg sm:-mx-6 sm:px-6">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} className="flex items-center gap-1.5 rounded-lg px-3 py-3 text-sm text-neutral-400 hover:text-white">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <span />}
            <button type="button" onClick={onNext} disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:opacity-60">
              {submitting ? "Creating account..." : last ? "Create account" : "Continue"} {!submitting && <ArrowRight size={16} />}
            </button>
          </div>

          <p className="py-8 text-center text-sm text-neutral-500">
            Already have an account? <a href="/login" className="font-medium text-lime-400 hover:underline">Log in</a>
          </p>
        </main>
      </div>
    </div>
  );
}