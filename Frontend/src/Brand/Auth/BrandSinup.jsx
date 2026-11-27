import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  ImagePlus,
  X,
  Zap,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom"

/* ------------------------------------------------------------------ */
/* 1. CONFIG: change options here, UI updates automatically           */
/* ------------------------------------------------------------------ */
const STEPS = ["Account", "Business", "Preferences"];
const STEP_INFO = [
  {
    title: "Create your account",
    desc: "Start with your contact details.",
    short: "Email, mobile and password",
  },
  {
    title: "Tell us about your brand",
    desc: "Creators will see this when you send them a campaign.",
    short: "Brand name, category, Instagram",
  },
  {
    title: "Who do you want to reach?",
    desc: "Optional. We use this to suggest creators. You can change it later.",
    short: "Creator niches and budget",
  },
];
const PERKS = [
  "Free to join",
  "Pay only for engagement",
  "Choose creators in your niche",
];

const CATEGORIES = [
  "Fashion & Apparel",
  "Beauty & Skincare",
  "Fitness & Supplements",
  "Food & Beverages",
  "Technology",
  "Electronics",
  "Education",
  "Travel & Hospitality",
  "Gaming",
  "Lifestyle",
  "E-commerce",
  "Other",
];
const CREATOR_NICHES = [
  "Fashion & Beauty",
  "Fitness & Health",
  "Technology",
  "Gaming",
  "Travel",
  "Food",
  "Lifestyle",
  "Education",
  "Entertainment",
  "Finance",
  "Photography",
  "Comedy",
];
const BUDGETS = [
  "Under ₹10,000",
  "₹10,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "Not sure yet",
];
const STORAGE_KEY = "brandSignup";
const MAX_LOGO_MB = 2;

const INITIAL = {
  contactName: "",
  email: "",
  mobile: "",
  password: "",
  confirm: "",
  brandName: "",
  category: "",
  instagramUrl: "",
  website: "",
  description: "",
  state: "",
  city: "",
  creatorNiches: [],
  budget: "",
};

/* ------------------------------------------------------------------ */
/* 2. BACKEND PLACEHOLDER: replace with your real API call            */
/* ------------------------------------------------------------------ */
async function submitRegistration(payload, logoFile) {
  const newPayload = {
    contactPersonName: payload.contactName,
    businessEmail: payload.email,
    mobileNumber: payload.mobile,
    password: payload.password,

    brandName: payload.brandName,
    businessCategory: payload.category,

    instagramProfileLink: payload.instagramUrl.startsWith("http")
      ? payload.instagramUrl
      : `https://${payload.instagramUrl}`,

    website: payload.website.startsWith("http")
      ? payload.website
      : `https://${payload.website}`,

    state: payload.state,
    city: payload.city,

    businessDescription: payload.description,
    brandLogo: payload.brandLogo || "",

    creatorNiches: payload.creatorNiches,

    monthlyMarketingBudget: Number(
      payload.budget.replace(/[₹,]/g, "").split("–")[1].trim(),
    ),
  };

  console.log("Brand registration:", newPayload, logoFile);
  await new Promise((r) => setTimeout(r, 800));
}

/* ------------------------------------------------------------------ */
/* 3. VALIDATION                                                      */
/* ------------------------------------------------------------------ */
const IG_PROFILE =
  /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?(\?.*)?$/i;
const WEBSITE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

function validate(step, d) {
  const e = {};
  if (step === 0) {
    if (d.contactName.trim().length < 2)
      e.contactName = "Enter the contact person's name";
    if (!/^\S+@\S+\.\S+$/.test(d.email))
      e.email = "Enter a valid business email";
    if (!/^[6-9]\d{9}$/.test(d.mobile))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (
      d.password.length < 8 ||
      !/[A-Za-z]/.test(d.password) ||
      !/\d/.test(d.password)
    )
      e.password = "Use 8+ characters with letters and numbers";
    if (d.confirm !== d.password) e.confirm = "Passwords do not match";
  }
  if (step === 1) {
    if (d.brandName.trim().length < 2)
      e.brandName = "Enter your brand or company name";
    if (!d.category) e.category = "Choose a category";
    if (!IG_PROFILE.test(d.instagramUrl.trim()))
      e.instagramUrl = "Enter a valid Instagram profile link";
    if (d.website.trim() && !WEBSITE.test(d.website.trim()))
      e.website = "Enter a valid website";
    if (d.description.trim().length < 10)
      e.description = "Write at least 10 characters";
    if (!d.state.trim()) e.state = "Enter your state";
    if (!d.city.trim()) e.city = "Enter your city";
  }
  return e; // step 2 is optional, nothing to check
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
        {optional && (
          <span className="text-xs font-normal text-neutral-500">Optional</span>
        )}
      </span>
      {children}
      {hint && !error && (
        <span className="mt-1.5 block text-xs text-neutral-500">{hint}</span>
      )}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}

function Input({ label, name, d, set, err, optional, hint, ...rest }) {
  return (
    <Field label={label} optional={optional} hint={hint} error={err[name]}>
      <input
        value={d[name]}
        onChange={(e) => set(name, e.target.value)}
        aria-invalid={!!err[name]}
        className={inputCls(err[name])}
        {...rest}
      />
    </Field>
  );
}

function Select({
  label,
  name,
  d,
  set,
  err,
  options,
  optional,
  placeholder = "Select",
}) {
  return (
    <Field label={label} optional={optional} error={err[name]}>
      <select
        value={d[name]}
        onChange={(e) => set(name, e.target.value)}
        className={inputCls(err[name])}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0d100d]">
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

function Chips({ options, value, onChange }) {
  const toggle = (o) =>
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(o)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition ${on ? "border-lime-400 bg-lime-400 font-semibold text-black" : "border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/30"}`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function LogoUpload({ file, onChange, error }) {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!file) return setPreview("");
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div>
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-neutral-200">
        Brand logo{" "}
        <span className="text-xs font-normal text-neutral-500">Optional</span>
      </span>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/[0.03] text-neutral-500">
          {preview ? (
            <img
              src={preview}
              alt="Logo preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlus size={22} />
          )}
        </div>
        <div className="min-w-0">
          <label className="inline-block cursor-pointer rounded-lg border border-white/15 px-4 py-2 text-sm font-medium transition hover:bg-white/5 focus-within:ring-2 focus-within:ring-lime-300">
            {file ? "Change logo" : "Upload logo"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(e) => {
                onChange(e.target.files?.[0] || null);
                e.target.value = "";
              }}
            />
          </label>
          {file && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="ml-3 inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white"
            >
              <X size={14} /> Remove
            </button>
          )}
          <p className="mt-1.5 text-xs text-neutral-500">
            PNG, JPG or WebP, up to {MAX_LOGO_MB} MB
          </p>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Influnex home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-black">
        <Zap size={18} fill="currentColor" />
      </span>
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
            {i < STEPS.length - 1 && (
              <span
                className={`absolute -bottom-1 left-4 top-9 w-px ${done ? "bg-lime-400" : "bg-white/10"}`}
              />
            )}
            <button
              type="button"
              disabled={!done}
              onClick={() => onGo(i)}
              aria-current={cur ? "step" : undefined}
              className="relative flex gap-4 text-left disabled:cursor-default"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition ${done ? "border-lime-400 bg-lime-400 text-black" : cur ? "border-lime-400 text-lime-400" : "border-white/15 text-neutral-500"}`}
              >
                {done ? <Check size={16} strokeWidth={3} /> : i + 1}
              </span>
              <span>
                <span
                  className={`block text-sm font-semibold ${cur || done ? "text-white" : "text-neutral-500"}`}
                >
                  {label}
                </span>
                <span className="block text-xs text-neutral-500">
                  {STEP_INFO[i].short}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* 5. THE THREE STEPS                                                 */
/* ------------------------------------------------------------------ */
function StepAccount({ d, set, err }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-5">
      <Input
        label="Contact person name"
        name="contactName"
        d={d}
        set={set}
        err={err}
        autoComplete="name"
        placeholder="Vinay Sharma"
      />
      <Input
        label="Business email"
        name="email"
        d={d}
        set={set}
        err={err}
        type="email"
        autoComplete="email"
        placeholder="you@yourbrand.com"
      />
      <Input
        label="Mobile number"
        name="mobile"
        d={d}
        set={set}
        err={err}
        type="tel"
        inputMode="numeric"
        maxLength={10}
        autoComplete="tel-national"
        placeholder="9876543210"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Password"
          error={err.password}
          hint="8+ characters, letters and numbers"
        >
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={d.password}
              onChange={(e) => set("password", e.target.value)}
              autoComplete="new-password"
              className={`${inputCls(err.password)} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>
        <Input
          label="Confirm password"
          name="confirm"
          d={d}
          set={set}
          err={err}
          type={show ? "text" : "password"}
          autoComplete="new-password"
        />
      </div>
    </div>
  );
}

function StepBusiness({ d, set, err, logo, setLogo, logoError }) {
  return (
    <div className="space-y-5">
      <Input
        label="Brand / company name"
        name="brandName"
        d={d}
        set={set}
        err={err}
        placeholder="Fit Fuel Co."
      />
      <Select
        label="Business category"
        name="category"
        d={d}
        set={set}
        err={err}
        options={CATEGORIES}
      />
      <Input
        label="Instagram profile link"
        name="instagramUrl"
        d={d}
        set={set}
        err={err}
        type="url"
        placeholder="instagram.com/yourbrand"
      />
      <Input
        label="Website"
        name="website"
        d={d}
        set={set}
        err={err}
        optional
        type="url"
        placeholder="yourbrand.com"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="State"
          name="state"
          d={d}
          set={set}
          err={err}
          placeholder="Madhya Pradesh"
        />
        <Input
          label="City"
          name="city"
          d={d}
          set={set}
          err={err}
          placeholder="Indore"
        />
      </div>
      <Field
        label="Business description"
        error={err.description}
        hint={`${d.description.length}/300`}
      >
        <textarea
          rows={3}
          maxLength={300}
          value={d.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputCls(err.description)}
          placeholder="We make protein snacks for everyday fitness lovers."
        />
      </Field>
      <LogoUpload file={logo} onChange={setLogo} error={logoError} />
    </div>
  );
}

function StepPreferences({ d, set, err }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="mb-2 block text-sm font-medium text-neutral-200">
          Creator niches you want to work with
        </span>
        <Chips
          options={CREATOR_NICHES}
          value={d.creatorNiches}
          onChange={(v) => set("creatorNiches", v)}
        />
      </div>
      <Select
        label="Monthly marketing budget"
        name="budget"
        d={d}
        set={set}
        err={err}
        options={BUDGETS}
        optional
        placeholder="Select a range"
      />
      <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-neutral-400">
        Audience, language and campaign goals are set when you create each
        campaign, so you can change them every time.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. MAIN PAGE: holds ALL data + current step                        */
/* ------------------------------------------------------------------ */
export default function BrandSignup() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [logo, setLogoFile] = useState(null);
  const [logoError, setLogoError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);
  const { registerBrand } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // restore draft (never contains passwords or the logo file)
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      if (saved) {
        setData((d) => ({ ...d, ...saved.data }));
        setStep(saved.step || 0);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      const { password, confirm, ...safe } = data;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data: safe, step }));
    } catch {
      /* ignore */
    }
  }, [data, step]);

  const set = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setLogo = (file) => {
    setLogoError("");
    if (file && !["image/png", "image/jpeg", "image/webp"].includes(file.type))
      return setLogoError("Use a PNG, JPG or WebP image");
    if (file && file.size > MAX_LOGO_MB * 1024 * 1024)
      return setLogoError(`Logo must be under ${MAX_LOGO_MB} MB`);
    setLogoFile(file);
  };

  const go = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (skipPrefs = false) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const { confirm, ...payload } = data;
      if (skipPrefs) {
        payload.creatorNiches = [];
        payload.budget = "";
      }
      await handleSubmit(payload, logo);
      sessionStorage.removeItem(STORAGE_KEY);
      setDone(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const handleSubmit = async (payload , logo) => {
   
    try {
      const newPayload = {
        contactPersonName: payload.contactName,
        businessEmail: payload.email,
        mobileNumber: payload.mobile,
        password: payload.password,

        brandName: payload.brandName,
        businessCategory: payload.category,

        instagramProfileLink: payload.instagramUrl.startsWith("http")
          ? payload.instagramUrl
          : `https://${payload.instagramUrl}`,

        website: payload.website.startsWith("http")
          ? payload.website
          : `https://${payload.website}`,

        state: payload.state,
        city: payload.city,

        businessDescription: payload.description,
        brandLogo: payload.brandLogo || "",

        creatorNiches: payload.creatorNiches,

        monthlyMarketingBudget: Number(
          payload.budget.replace(/[₹,]/g, "").split("–")[1].trim()
        ),
      };

      await registerBrand(newPayload);

      navigate("/brand", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const onNext = () => {
    const e = validate(step, data);
    setErrors(e);
    if (Object.keys(e).length) return;
    step < STEPS.length - 1 ? go(step + 1) : submit();
  };

  const last = step === STEPS.length - 1;
  const hasErrors = Object.values(errors).some(Boolean);

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080a08] px-4 text-white antialiased">
        <div className="w-full max-w-md text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-black">
            <Check size={28} strokeWidth={3} />
          </span>
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
            Welcome, {data.brandName.trim()}!
          </h1>
          <p className="mt-3 text-neutral-400">
            Your brand account is ready. Next, create your first campaign and
            choose creators in your niche.
          </p>
          <a
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-semibold text-black hover:bg-lime-300"
          >
            Go to dashboard <ArrowRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a08] text-white antialiased selection:bg-lime-400 selection:text-black lg:grid lg:grid-cols-[24rem_minmax(0,1fr)] xl:grid-cols-[28rem_minmax(0,1fr)]">
      {/* Left panel (desktop) */}
      <aside className="hidden border-r border-white/10 bg-[#0b0e0b] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden p-10">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-lime-400/10 blur-[100px]" />
          <div className="relative">
            <Logo />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Reach the right audience. Pay for engagement.
            </h2>
            <p className="mt-3 text-neutral-400">
              Set up your brand, create a campaign and choose creators from your
              niche.
            </p>
            <Stepper step={step} onGo={go} />
          </div>
          <ul className="relative space-y-2.5 text-sm text-neutral-400">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Check size={16} className="text-lime-400" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Sticky progress bar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080a08]/85 backdrop-blur-lg">
          <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4 sm:px-6">
            <div className="lg:hidden">
              <Logo />
            </div>
            <p className="text-sm text-neutral-400">
              <span className="font-semibold text-white">Step {step + 1}</span>{" "}
              of {STEPS.length} · {STEPS[step]}
            </p>
          </div>
          <div
            className="h-0.5 bg-white/10"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={step + 1}
          >
            <div
              className="h-full bg-lime-400 transition-all duration-300"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </header>

        <main className="mx-auto w-full max-w-xl px-4 pt-8 sm:px-6 lg:pt-12">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {STEP_INFO[step].title}
          </h1>
          <p className="mt-2 text-neutral-400">{STEP_INFO[step].desc}</p>

          <div className="mt-8">
            {step === 0 && <StepAccount d={data} set={set} err={errors} />}
            {step === 1 && (
              <StepBusiness
                d={data}
                set={set}
                err={errors}
                logo={logo}
                setLogo={setLogo}
                logoError={logoError}
              />
            )}
            {step === 2 && <StepPreferences d={data} set={set} err={errors} />}
          </div>

          {hasErrors && (
            <p role="alert" className="mt-6 text-sm text-red-400">
              Please fix the highlighted fields.
            </p>
          )}
          {submitError && (
            <p role="alert" className="mt-4 text-sm text-red-400">
              {submitError}
            </p>
          )}

          {/* Sticky action bar */}
          <div className="sticky bottom-0 z-30 -mx-4 mt-10 flex items-center justify-between gap-3 border-t border-white/10 bg-[#080a08]/90 px-4 py-4 backdrop-blur-lg sm:-mx-6 sm:px-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => go(step - 1)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-3 text-sm text-neutral-400 hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              {last && (
                <button
                  type="button"
                  onClick={() => submit(true)}
                  disabled={submitting}
                  className="rounded-lg px-3 py-3 text-sm text-neutral-400 hover:text-white disabled:opacity-60"
                >
                  Skip for now
                </button>
              )}
              <button
                type="button"
                onClick={onNext}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:opacity-60"
              >
                {submitting
                  ? "Creating account..."
                  : last
                    ? "Create account"
                    : "Continue"}{" "}
                {!submitting && <ArrowRight size={16} />}
              </button>
            </div>
          </div>

          <p className="py-8 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-lime-400 hover:underline"
            >
              Log in
            </a>
          </p>
        </main>
      </div>
    </div>
  );
}
