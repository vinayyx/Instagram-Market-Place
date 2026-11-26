import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  FileText,
  Info,
  Layers,
  ListChecks,
  Loader2,
  Save,
  Send,
  Users,
  Wallet,
  X,
} from "lucide-react";

import {
  campaignCategories,
  platforms,
  deliverableOptions,
  paymentModels,
} from "../../BrandData/campaignOptions";

import { PLATFORM_ICONS } from "../Components/Icon/PlatformIcons";

/* -------------------------------------------------------------------------- */
/*  Constants & helpers                                                        */
/* -------------------------------------------------------------------------- */

const DRAFT_KEY = "brand_campaign_draft_v1";

const initialForm = {
  title: "",
  category: "",
  description: "",
  campaignBrief: "",
  platforms: [],
  deliverables: [],
  minFollowers: "",
  maxFollowers: "",
  minEngagement: "",
  targetLocation: "",
  creatorNiche: "",
  totalBudget: "",
  creatorSlots: "",
  paymentModel: "fixed",
  fixedPayment: "",
  costPerThousandViews: "",
  maxCreatorPayout: "",
  startDate: "",
  endDate: "",
  applicationDeadline: "",
  additionalRequirements: "",
};

const SECTIONS = [
  {
    id: "basics",
    label: "Basics",
    title: "Campaign basics",
    description: "Tell creators what this campaign is about.",
    icon: FileText,
    fields: ["title", "category", "description", "campaignBrief"],
  },
  {
    id: "platforms",
    label: "Platforms",
    title: "Platforms and deliverables",
    description: "Choose where creators publish and what they deliver.",
    icon: Layers,
    fields: ["platforms", "deliverables"],
  },
  {
    id: "creators",
    label: "Creators",
    title: "Creator requirements",
    description: "Define who can apply to this campaign.",
    icon: Users,
    fields: ["minFollowers", "maxFollowers", "minEngagement"],
  },
  {
    id: "budget",
    label: "Budget",
    title: "Budget and payment",
    description: "Set your total budget and how creators get paid.",
    icon: Wallet,
    fields: [
      "totalBudget",
      "creatorSlots",
      "fixedPayment",
      "costPerThousandViews",
      "maxCreatorPayout",
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    title: "Campaign timeline",
    description: "Choose when the campaign runs and when applications close.",
    icon: CalendarDays,
    fields: ["startDate", "endDate", "applicationDeadline"],
  },
  {
    id: "extra",
    label: "Extra notes",
    title: "Additional instructions",
    description: "Anything else creators should know before they apply.",
    icon: ListChecks,
    fields: [],
    optional: true,
  },
];

const REQUIRED_SECTIONS = SECTIONS.filter((s) => !s.optional);

const FOLLOWER_PRESETS = [
  { label: "Nano", hint: "1K – 10K", min: 1000, max: 10000 },
  { label: "Micro", hint: "10K – 100K", min: 10000, max: 100000 },
  { label: "Mid-tier", hint: "100K – 500K", min: 100000, max: 500000 },
  { label: "Macro", hint: "500K – 1M", min: 500000, max: 1000000 },
];

const NICHE_SUGGESTIONS = [
  "Fashion",
  "Beauty",
  "Lifestyle",
  "Tech",
  "Fitness",
  "Food",
  "Travel",
  "Gaming",
];

const num = (v) => (v === "" || v == null ? NaN : Number(v));

const todayStr = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const inr = (n) =>
  Number.isFinite(n) ? `₹${Number(n).toLocaleString("en-IN")}` : "—";

const compact = (n) =>
  Number.isFinite(n)
    ? new Intl.NumberFormat("en-IN", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(n)
    : "—";

const fmtDate = (s) =>
  s
    ? new Date(`${s}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

const normalizeOption = (o) =>
  typeof o === "string" ? { value: o, label: o } : o;

const maxPayoutPerCreator = (f) =>
  f.paymentModel === "fixed" ? num(f.fixedPayment) : num(f.maxCreatorPayout);

const usesFixed = (m) => m === "fixed" || m === "hybrid";
const usesPerformance = (m) => m === "performance" || m === "hybrid";

function validate(f) {
  const e = {};

  if (!f.title.trim()) e.title = "Enter a campaign title.";
  else if (f.title.trim().length < 5)
    e.title = "Title should be at least 5 characters.";

  if (!f.category) e.category = "Select a category.";
  if (!f.description.trim()) e.description = "Add a short description.";
  if (!f.campaignBrief.trim())
    e.campaignBrief = "Add a brief so creators know what to create.";

  if (!f.platforms.length) e.platforms = "Select at least one platform.";
  if (!f.deliverables.length)
    e.deliverables = "Select at least one deliverable.";

  const minF = num(f.minFollowers);
  const maxF = num(f.maxFollowers);
  if (Number.isNaN(minF)) e.minFollowers = "Enter a minimum follower count.";
  else if (minF < 0) e.minFollowers = "Can't be negative.";
  if (Number.isNaN(maxF)) e.maxFollowers = "Enter a maximum follower count.";
  else if (!Number.isNaN(minF) && maxF <= minF)
    e.maxFollowers = "Must be greater than the minimum.";

  const eng = num(f.minEngagement);
  if (Number.isNaN(eng)) e.minEngagement = "Enter a minimum engagement rate.";
  else if (eng < 0 || eng > 100) e.minEngagement = "Enter a value from 0 to 100.";

  const total = num(f.totalBudget);
  const slots = num(f.creatorSlots);
  if (Number.isNaN(total) || total <= 0)
    e.totalBudget = "Enter a budget greater than 0.";
  if (Number.isNaN(slots) || slots < 1 || !Number.isInteger(slots))
    e.creatorSlots = "Enter a whole number, 1 or more.";

  const fixed = num(f.fixedPayment);
  const cpm = num(f.costPerThousandViews);
  const cap = num(f.maxCreatorPayout);

  if (usesFixed(f.paymentModel) && (Number.isNaN(fixed) || fixed <= 0))
    e.fixedPayment = "Enter a fixed payment greater than 0.";
  if (usesPerformance(f.paymentModel) && (Number.isNaN(cpm) || cpm <= 0))
    e.costPerThousandViews = "Enter a rate greater than 0.";
  if (f.paymentModel !== "fixed") {
    if (Number.isNaN(cap) || cap <= 0)
      e.maxCreatorPayout = "Enter a payout cap greater than 0.";
    else if (f.paymentModel === "hybrid" && !Number.isNaN(fixed) && cap < fixed)
      e.maxCreatorPayout = "Cap must be at least the fixed payment.";
  }

  if (!e.totalBudget && !e.creatorSlots) {
    const per = maxPayoutPerCreator(f);
    if (Number.isFinite(per) && per > 0 && per * slots > total) {
      e.totalBudget = `${slots} creators × ${inr(per)} = ${inr(
        per * slots,
      )}, which is more than your budget.`;
    }
  }

  const today = todayStr();
  if (!f.startDate) e.startDate = "Select a start date.";
  else if (f.startDate < today) e.startDate = "Start date can't be in the past.";

  if (!f.endDate) e.endDate = "Select an end date.";
  else if (f.startDate && f.endDate < f.startDate)
    e.endDate = "End date must be on or after the start date.";

  if (!f.applicationDeadline)
    e.applicationDeadline = "Select an application deadline.";
  else if (f.applicationDeadline < today)
    e.applicationDeadline = "Deadline can't be in the past.";
  else if (f.endDate && f.applicationDeadline > f.endDate)
    e.applicationDeadline = "Deadline must be on or before the end date.";

  return e;
}

function buildPayload(f) {
  const payload = {
    ...f,
    title: f.title.trim(),
    description: f.description.trim(),
    campaignBrief: f.campaignBrief.trim(),
    minFollowers: Number(f.minFollowers),
    maxFollowers: Number(f.maxFollowers),
    minEngagement: Number(f.minEngagement),
    totalBudget: Number(f.totalBudget),
    creatorSlots: Number(f.creatorSlots),
    fixedPayment: usesFixed(f.paymentModel) ? Number(f.fixedPayment) : null,
    costPerThousandViews: usesPerformance(f.paymentModel)
      ? Number(f.costPerThousandViews)
      : null,
    maxCreatorPayout:
      f.paymentModel !== "fixed" ? Number(f.maxCreatorPayout) : null,
  };
  return payload;
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? { ...initialForm, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Small UI building blocks                                                   */
/* -------------------------------------------------------------------------- */

const controlCls = (invalid, extra = "") =>
  `w-full rounded-lg border bg-[#0b0d0b] min-h-[44px] min-w-0 px-3.5 py-2.5 text-base text-white outline-none transition sm:min-h-0 sm:text-sm placeholder:text-gray-600 focus:ring-2 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
    invalid
      ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/15"
      : "border-white/10 hover:border-white/20 focus:border-[#D0FF71]/60 focus:ring-[#D0FF71]/15"
  } ${extra}`;

const Field = ({
  label,
  name,
  error,
  hint,
  optional,
  counter,
  group,
  className = "",
  children,
}) => {
  const Label = group ? "p" : "label";
  return (
    <div className={`min-w-0 ${className}`} data-invalid={error ? "true" : undefined}>
      <Label
        {...(group ? {} : { htmlFor: name })}
        className="mb-1.5 block text-xs font-medium text-gray-300"
      >
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-gray-600">Optional</span>
        )}
      </Label>

      {children}

      {(error || hint || counter) && (
        <div className="mt-1.5 flex items-start justify-between gap-3">
          {error ? (
            <p
              id={`${name}-msg`}
              className="flex items-center gap-1 text-[11px] text-red-400"
            >
              <AlertCircle size={12} className="shrink-0" />
              {error}
            </p>
          ) : (
            <p id={`${name}-msg`} className="text-[11px] text-gray-500">
              {hint}
            </p>
          )}
          {counter && (
            <span className="shrink-0 text-[11px] tabular-nums text-gray-600">
              {counter}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const Adorned = ({ prefix, suffix, children }) => (
  <div className="relative">
    {prefix && (
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500">
        {prefix}
      </span>
    )}
    {children}
    {suffix && (
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500">
        {suffix}
      </span>
    )}
  </div>
);

const SectionCard = ({ section, done, errorCount, children }) => {
  const Icon = section.icon;
  return (
    <section
      id={`section-${section.id}`}
      className="scroll-mt-6 rounded-2xl border border-white/[0.07] bg-[#0f110f]"
    >
      <header className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-4 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="hidden h-9 w-9 shrink-0 items-center sm:flex justify-center rounded-lg border border-white/10 bg-white/[0.03] text-gray-300">
            <Icon size={17} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white sm:text-[15px]">
              {section.title}
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">{section.description}</p>
          </div>
        </div>

        {section.optional ? (
          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-gray-500">
            Optional
          </span>
        ) : errorCount > 0 ? (
          <span className="shrink-0 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-300">
            {errorCount} to fix
          </span>
        ) : done ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#D0FF71]/25 bg-[#D0FF71]/10 px-2.5 py-1 text-[11px] font-medium text-[#D0FF71]">
            <Check size={12} /> Complete
          </span>
        ) : null}
      </header>

      <div className="px-4 py-5 sm:px-6 sm:py-6">{children}</div>
    </section>
  );
};

const Row = ({ label, children }) => (
  <div className="flex items-start justify-between gap-4 py-2 text-xs">
    <dt className="text-gray-500">{label}</dt>
    <dd className="text-right font-medium text-gray-200">{children}</dd>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [restoredDraft] = useState(loadDraft);
  const [form, setForm] = useState(restoredDraft ?? initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [savedAt, setSavedAt] = useState(null);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const publishedRef = useRef(false);

  const errors = useMemo(() => validate(form), [form]);

  /* ---------- toast ---------- */
  const showToast = useCallback((type, message) => {
    clearTimeout(toastTimer.current);
    setToast({ type, message });
    toastTimer.current = setTimeout(() => setToast(null), 3400);
  }, []);

  useEffect(() => {
    if (restoredDraft) showToast("info", "We restored your unsaved draft.");
    return () => clearTimeout(toastTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- autosave ---------- */
  useEffect(() => {
    if (publishedRef.current) return;
    if (JSON.stringify(form) === JSON.stringify(initialForm)) return;

    setSaveState("saving");
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
        setSavedAt(new Date());
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    }, 800);

    return () => clearTimeout(t);
  }, [form]);

  const saveLabel =
    saveState === "saving"
      ? "Saving…"
      : saveState === "saved" && savedAt
        ? `Draft saved at ${savedAt.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        : saveState === "error"
          ? "Couldn't save draft"
          : "Changes save automatically";

  /* ---------- scroll spy ---------- */
  useEffect(() => {
    const els = SECTIONS.map((s) =>
      document.getElementById(`section-${s.id}`),
    ).filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting)
            setActiveSection(en.target.id.replace("section-", ""));
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ---------- form helpers ---------- */
  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  const err = (name) => (submitted || touched[name] ? errors[name] : undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setValues = (values) => setForm((prev) => ({ ...prev, ...values }));

  const toggleArrayValue = (field, value) => {
    touch(field);
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const bind = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: () => touch(name),
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": `${name}-msg`,
    autoComplete: "off",
  });

  const selectedNiches = form.creatorNiche
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  const toggleNiche = (niche) => {
    const exists = selectedNiches.some(
      (n) => n.toLowerCase() === niche.toLowerCase(),
    );
    const next = exists
      ? selectedNiches.filter((n) => n.toLowerCase() !== niche.toLowerCase())
      : [...selectedNiches, niche];
    setValues({ creatorNiche: next.join(", ") });
  };

  /* ---------- actions ---------- */
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      setSavedAt(new Date());
      setSaveState("saved");
      showToast("success", "Draft saved.");
    } catch {
      setSaveState("error");
      showToast("error", "Couldn't save the draft. Check your browser storage.");
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (isPublishing) return;

    setSubmitted(true);

    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      showToast(
        "error",
        `Fix ${errorKeys.length} ${errorKeys.length === 1 ? "issue" : "issues"} before publishing.`,
      );

      const firstSection = SECTIONS.find((s) =>
        s.fields.some((f) => errors[f]),
      );
      if (firstSection) scrollToSection(firstSection.id);

      setTimeout(() => {
        const el = document.querySelector('[data-invalid="true"]');
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
        el
          ?.querySelector("input,select,textarea,button")
          ?.focus({ preventScroll: true });
      }, 60);
      return;
    }

    const payload = buildPayload(form);
    setIsPublishing(true);

    // Demo only: replace this timeout with your backend API call.
    console.log("Campaign to publish:", payload);
    setTimeout(() => {
      publishedRef.current = true;
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setIsPublishing(false);
      showToast("success", "Campaign published.");
      setTimeout(() => navigate("/brand/campaigns"), 900);
    }, 900);
  };

  /* ---------- derived values ---------- */
  const sectionState = SECTIONS.map((s) => ({
    ...s,
    done: !s.optional && s.fields.every((f) => !errors[f]),
    errorCount: s.fields.filter((f) => err(f)).length,
  }));

  const doneCount = sectionState.filter((s) => !s.optional && s.done).length;
  const progress = Math.round((doneCount / REQUIRED_SECTIONS.length) * 100);

  const selectedPayment = paymentModels.find(
    (m) => m.value === form.paymentModel,
  );

  const total = num(form.totalBudget);
  const slots = num(form.creatorSlots);
  const perCreator = maxPayoutPerCreator(form);
  const committed =
    Number.isFinite(perCreator) && Number.isFinite(slots)
      ? perCreator * slots
      : NaN;
  const usedPct =
    Number.isFinite(committed) && Number.isFinite(total) && total > 0
      ? Math.min(100, Math.round((committed / total) * 100))
      : 0;
  const overBudget =
    Number.isFinite(committed) && Number.isFinite(total) && committed > total;

  const fixedNum = num(form.fixedPayment);
  const cpmNum = num(form.costPerThousandViews);
  const capNum = num(form.maxCreatorPayout);
  const viewsToCap =
    usesPerformance(form.paymentModel) &&
    Number.isFinite(cpmNum) &&
    cpmNum > 0 &&
    Number.isFinite(capNum)
      ? ((capNum - (form.paymentModel === "hybrid" && Number.isFinite(fixedNum) ? fixedNum : 0)) /
          cpmNum) *
        1000
      : NaN;

  const durationDays =
    form.startDate && form.endDate && form.endDate >= form.startDate
      ? Math.round(
          (new Date(form.endDate) - new Date(form.startDate)) / 86400000,
        ) + 1
      : null;

  const today = todayStr();

  /* ------------------------------------------------------------------------ */

  const budgetCheck = (
            <div className="rounded-2xl border border-white/[0.07] bg-[#0f110f] p-5">
              <h3 className="text-sm font-semibold text-white">Budget check</h3>

              <dl className="mt-3 divide-y divide-white/[0.05]">
                <Row label="Total budget">{inr(total)}</Row>
                <Row label="Creator slots">
                  {Number.isFinite(slots) ? slots : "—"}
                </Row>
                <Row label="Max per creator">{inr(perCreator)}</Row>
                <Row label="Max commitment">{inr(committed)}</Row>
              </dl>

              <div className="mt-4">
                <div
                  className="h-2 overflow-hidden rounded-full bg-white/[0.06]"
                  role="progressbar"
                  aria-valuenow={usedPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Budget committed to creator payouts"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      overBudget ? "bg-red-400" : "bg-[#D0FF71]"
                    }`}
                    style={{ width: `${usedPct}%` }}
                  />
                </div>
                <p
                  className={`mt-2 text-xs ${
                    overBudget ? "text-red-400" : "text-gray-500"
                  }`}
                >
                  {overBudget
                    ? `Over budget by ${inr(committed - total)}.`
                    : Number.isFinite(committed) && Number.isFinite(total)
                      ? `${usedPct}% committed, ${inr(total - committed)} left for fees and extras.`
                      : "Enter budget, slots and payment to see the split."}
                </p>
              </div>

              {Number.isFinite(viewsToCap) && viewsToCap > 0 && (
                <p className="mt-3 rounded-lg bg-white/[0.03] px-3 py-2 text-xs text-gray-400">
                  A creator reaches the payout cap at about{" "}
                  <span className="font-medium text-gray-200">
                    {compact(viewsToCap)} views
                  </span>
                  .
                </p>
              )}
            </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1280px] pb-6">
      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <button
            type="button"
            onClick={() => navigate("/brand/campaigns")}
            className="mb-3 flex items-center gap-1.5 rounded text-xs text-gray-500 transition hover:text-[#D0FF71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40"
          >
            <ArrowLeft size={14} />
            Campaigns
          </button>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
            Create campaign
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Set up the brief, budget and timeline, then publish to start
            receiving applications.
          </p>
        </div>

        <div
          className="flex items-center gap-2 self-start text-xs text-gray-500 sm:self-auto"
          aria-live="polite"
        >
          {saveState === "saving" ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                saveState === "saved"
                  ? "bg-[#D0FF71]"
                  : saveState === "error"
                    ? "bg-red-400"
                    : "bg-gray-600"
              }`}
            />
          )}
          {saveLabel}
        </div>
      </div>

      <form onSubmit={handlePublish} noValidate>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[190px_minmax(0,1fr)_310px]">
          {/* STEP NAV */}
          <nav
            aria-label="Form sections"
            className="hidden xl:sticky xl:top-6 xl:block xl:self-start"
          >
            <ul className="flex flex-col gap-1">
              {sectionState.map((s) => {
                const active = activeSection === s.id;
                const Icon = s.icon;
                return (
                  <li key={s.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => scrollToSection(s.id)}
                      aria-current={active ? "true" : undefined}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40 ${
                        active
                          ? "bg-white/[0.06] text-white"
                          : "text-gray-500 hover:bg-white/[0.03] hover:text-gray-300"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          s.done
                            ? "border-[#D0FF71] bg-[#D0FF71] text-black"
                            : s.errorCount
                              ? "border-red-400/60 text-red-400"
                              : "border-white/15"
                        }`}
                      >
                        {s.done ? (
                          <Check size={11} strokeWidth={3} />
                        ) : s.errorCount ? (
                          <AlertCircle size={11} />
                        ) : (
                          <Icon size={11} />
                        )}
                      </span>
                      <span className="whitespace-nowrap">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* FORM SECTIONS */}
          <div className="min-w-0 space-y-5">
            {/* BASICS */}
            <SectionCard
              section={sectionState[0]}
              done={sectionState[0].done}
              errorCount={sectionState[0].errorCount}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Campaign title"
                  name="title"
                  error={err("title")}
                >
                  <input
                    {...bind("title")}
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Summer fashion collection"
                    className={controlCls(!!err("title"))}
                  />
                </Field>

                <Field
                  label="Category"
                  name="category"
                  error={err("category")}
                >
                  <select
                    {...bind("category")}
                    className={controlCls(!!err("category"))}
                  >
                    <option value="">Select a category</option>
                    {campaignCategories.map((o) => {
                      const opt = normalizeOption(o);
                      return (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      );
                    })}
                  </select>
                </Field>

                <Field
                  className="sm:col-span-2"
                  label="Description"
                  name="description"
                  error={err("description")}
                  hint="Shown on the campaign card in the creator marketplace."
                  counter={`${form.description.length}/300`}
                >
                  <textarea
                    {...bind("description")}
                    rows={3}
                    maxLength={300}
                    placeholder="Describe the campaign in a couple of sentences."
                    className={controlCls(!!err("description"), "resize-y")}
                  />
                </Field>

                <Field
                  className="sm:col-span-2"
                  label="Brief and guidelines"
                  name="campaignBrief"
                  error={err("campaignBrief")}
                  hint="Key messages, hashtags, brand mentions, content style and dos and don'ts."
                  counter={`${form.campaignBrief.length}/1500`}
                >
                  <textarea
                    {...bind("campaignBrief")}
                    rows={6}
                    maxLength={1500}
                    placeholder="What should creators say and show in their content?"
                    className={controlCls(!!err("campaignBrief"), "resize-y")}
                  />
                </Field>
              </div>
            </SectionCard>

            {/* PLATFORMS */}
            <SectionCard
              section={sectionState[1]}
              done={sectionState[1].done}
              errorCount={sectionState[1].errorCount}
            >
              <div className="space-y-6">
                <Field
                  group
                  label="Platforms"
                  name="platforms"
                  error={err("platforms")}
                >
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {platforms.map((platform) => {
                      const Icon = PLATFORM_ICONS[platform];
                      const selected = form.platforms.includes(platform);
                      return (
                        <button
                          type="button"
                          key={platform}
                          aria-pressed={selected}
                          onClick={() => toggleArrayValue("platforms", platform)}
                          className={`relative flex flex-col items-center gap-2 rounded-xl border px-2 py-3.5 text-center transition sm:flex-row sm:gap-3 sm:px-4 sm:text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40 ${
                            selected
                              ? "border-[#D0FF71]/50 bg-[#D0FF71]/[0.06]"
                              : "border-white/10 bg-[#0b0d0b] hover:border-white/25"
                          }`}
                        >
                          <span className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                            {Icon && (
                              <Icon
                                size={20}
                                className={selected ? "" : "opacity-60"}
                              />
                            )}
                            <span className="text-sm font-medium text-white">
                              {platform}
                            </span>
                          </span>
                          <span
                            className={`absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border sm:static sm:ml-auto sm:h-5 sm:w-5 ${
                              selected
                                ? "border-[#D0FF71] bg-[#D0FF71] text-black"
                                : "border-white/15"
                            }`}
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field
                  group
                  label="Required deliverables"
                  name="deliverables"
                  error={err("deliverables")}
                  hint={
                    form.deliverables.length
                      ? `${form.deliverables.length} selected`
                      : undefined
                  }
                >
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {deliverableOptions.map((item) => {
                      const opt = normalizeOption(item);
                      const selected = form.deliverables.includes(opt.value);
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          aria-pressed={selected}
                          onClick={() =>
                            toggleArrayValue("deliverables", opt.value)
                          }
                          className={`flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40 ${
                            selected
                              ? "border-[#D0FF71]/40 bg-[#D0FF71]/[0.05]"
                              : "border-white/10 bg-[#0b0d0b] hover:border-white/25"
                          }`}
                        >
                          <span
                            className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border ${
                              selected
                                ? "border-[#D0FF71] bg-[#D0FF71] text-black"
                                : "border-white/20"
                            }`}
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </span>
                          <span className="text-[13px] text-gray-200">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>
            </SectionCard>

            {/* CREATORS */}
            <SectionCard
              section={sectionState[2]}
              done={sectionState[2].done}
              errorCount={sectionState[2].errorCount}
            >
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-300">
                    Quick select by audience size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {FOLLOWER_PRESETS.map((p) => {
                      const active =
                        Number(form.minFollowers) === p.min &&
                        Number(form.maxFollowers) === p.max;
                      return (
                        <button
                          type="button"
                          key={p.label}
                          aria-pressed={active}
                          onClick={() => {
                            touch("minFollowers");
                            touch("maxFollowers");
                            setValues({
                              minFollowers: String(p.min),
                              maxFollowers: String(p.max),
                            });
                          }}
                          className={`rounded-full border px-3.5 py-1.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40 ${
                            active
                              ? "border-[#D0FF71]/50 bg-[#D0FF71]/10 text-[#D0FF71]"
                              : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          {p.label}
                          <span className="ml-1.5 text-gray-600">{p.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <Field
                    label="Minimum followers"
                    name="minFollowers"
                    error={err("minFollowers")}
                  >
                    <input
                      {...bind("minFollowers")}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      placeholder="5000"
                      className={controlCls(!!err("minFollowers"))}
                    />
                  </Field>

                  <Field
                    label="Maximum followers"
                    name="maxFollowers"
                    error={err("maxFollowers")}
                  >
                    <input
                      {...bind("maxFollowers")}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      placeholder="100000"
                      className={controlCls(!!err("maxFollowers"))}
                    />
                  </Field>

                  <Field
                    label="Min. engagement rate"
                    name="minEngagement"
                    error={err("minEngagement")}
                  >
                    <Adorned suffix="%">
                      <input
                        {...bind("minEngagement")}
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        min="0"
                        max="100"
                        placeholder="3.5"
                        className={controlCls(!!err("minEngagement"), "pr-8")}
                      />
                    </Adorned>
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Target location"
                    name="targetLocation"
                    optional
                  >
                    <input
                      {...bind("targetLocation")}
                      type="text"
                      placeholder="e.g. India, Mumbai, Delhi"
                      className={controlCls(false)}
                    />
                  </Field>

                  <Field
                    label="Creator niches"
                    name="creatorNiche"
                    optional
                  >
                    <input
                      {...bind("creatorNiche")}
                      type="text"
                      placeholder="Fashion, Beauty, Lifestyle"
                      className={controlCls(false)}
                    />
                  </Field>
                </div>

                <div className="flex flex-wrap gap-2">
                  {NICHE_SUGGESTIONS.map((n) => {
                    const active = selectedNiches.some(
                      (x) => x.toLowerCase() === n.toLowerCase(),
                    );
                    return (
                      <button
                        type="button"
                        key={n}
                        aria-pressed={active}
                        onClick={() => toggleNiche(n)}
                        className={`rounded-full border px-3 py-1 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40 ${
                          active
                            ? "border-[#D0FF71]/50 bg-[#D0FF71]/10 text-[#D0FF71]"
                            : "border-white/10 text-gray-500 hover:border-white/25 hover:text-gray-300"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SectionCard>

            {/* BUDGET */}
            <SectionCard
              section={sectionState[3]}
              done={sectionState[3].done}
              errorCount={sectionState[3].errorCount}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Total campaign budget"
                    name="totalBudget"
                    error={err("totalBudget")}
                  >
                    <Adorned prefix="₹">
                      <input
                        {...bind("totalBudget")}
                        type="number"
                        inputMode="numeric"
                        min="1"
                        placeholder="100000"
                        className={controlCls(!!err("totalBudget"), "pl-8")}
                      />
                    </Adorned>
                  </Field>

                  <Field
                    label="Creator slots"
                    name="creatorSlots"
                    error={err("creatorSlots")}
                    hint="How many creators you want to hire."
                  >
                    <input
                      {...bind("creatorSlots")}
                      type="number"
                      inputMode="numeric"
                      min="1"
                      step="1"
                      placeholder="20"
                      className={controlCls(!!err("creatorSlots"))}
                    />
                  </Field>
                </div>

                <Field group label="Payment model" name="paymentModel">
                  <div
                    role="radiogroup"
                    aria-label="Payment model"
                    className="grid grid-cols-1 gap-3 md:grid-cols-3"
                  >
                    {paymentModels.map((model) => {
                      const selected = form.paymentModel === model.value;
                      return (
                        <button
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          key={model.value}
                          onClick={() => setValues({ paymentModel: model.value })}
                          className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40 ${
                            selected
                              ? "border-[#D0FF71]/50 bg-[#D0FF71]/[0.06]"
                              : "border-white/10 bg-[#0b0d0b] hover:border-white/25"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">
                              {model.label}
                            </span>
                            {selected && (
                              <CheckCircle2
                                size={16}
                                className="text-[#D0FF71]"
                              />
                            )}
                          </span>
                          <span className="mt-1.5 block text-xs leading-relaxed text-gray-500">
                            {model.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {selectedPayment && (
                  <div className="rounded-xl border border-white/[0.07] bg-[#0b0d0b] p-4 sm:p-5">
                    <p className="mb-4 text-xs font-medium text-gray-300">
                      {selectedPayment.label} settings
                    </p>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {usesFixed(form.paymentModel) && (
                        <Field
                          label="Fixed payment per creator"
                          name="fixedPayment"
                          error={err("fixedPayment")}
                        >
                          <Adorned prefix="₹">
                            <input
                              {...bind("fixedPayment")}
                              type="number"
                              inputMode="numeric"
                              min="0"
                              placeholder="3000"
                              className={controlCls(
                                !!err("fixedPayment"),
                                "pl-8",
                              )}
                            />
                          </Adorned>
                        </Field>
                      )}

                      {usesPerformance(form.paymentModel) && (
                        <Field
                          label="Payment per 1,000 views"
                          name="costPerThousandViews"
                          error={err("costPerThousandViews")}
                        >
                          <Adorned prefix="₹">
                            <input
                              {...bind("costPerThousandViews")}
                              type="number"
                              inputMode="numeric"
                              min="0"
                              placeholder="100"
                              className={controlCls(
                                !!err("costPerThousandViews"),
                                "pl-8",
                              )}
                            />
                          </Adorned>
                        </Field>
                      )}

                      {form.paymentModel !== "fixed" && (
                        <Field
                          label="Max payout per creator"
                          name="maxCreatorPayout"
                          error={err("maxCreatorPayout")}
                          hint={
                            form.paymentModel === "hybrid"
                              ? "Total cap including the fixed payment."
                              : "Creators stop earning once they reach this."
                          }
                        >
                          <Adorned prefix="₹">
                            <input
                              {...bind("maxCreatorPayout")}
                              type="number"
                              inputMode="numeric"
                              min="0"
                              placeholder="10000"
                              className={controlCls(
                                !!err("maxCreatorPayout"),
                                "pl-8",
                              )}
                            />
                          </Adorned>
                        </Field>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <Info size={16} className="mt-0.5 shrink-0 text-gray-500" />
                  <p className="text-xs leading-relaxed text-gray-500">
                    Your budget should cover creator payouts plus any platform
                    fees. The final amount is calculated and checked on the
                    server when you publish.
                  </p>
                </div>

                <div className="xl:hidden">{budgetCheck}</div>
              </div>
            </SectionCard>

            {/* TIMELINE */}
            <SectionCard
              section={sectionState[4]}
              done={sectionState[4].done}
              errorCount={sectionState[4].errorCount}
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <Field
                  label="Start date"
                  name="startDate"
                  error={err("startDate")}
                >
                  <input
                    {...bind("startDate")}
                    type="date"
                    min={today}
                    className={controlCls(!!err("startDate"), "[color-scheme:dark] [&::-webkit-date-and-time-value]:text-left")}
                  />
                </Field>

                <Field label="End date" name="endDate" error={err("endDate")}>
                  <input
                    {...bind("endDate")}
                    type="date"
                    min={form.startDate || today}
                    className={controlCls(!!err("endDate"), "[color-scheme:dark] [&::-webkit-date-and-time-value]:text-left")}
                  />
                </Field>

                <Field
                  label="Application deadline"
                  name="applicationDeadline"
                  error={err("applicationDeadline")}
                >
                  <input
                    {...bind("applicationDeadline")}
                    type="date"
                    min={today}
                    max={form.endDate || undefined}
                    className={controlCls(
                      !!err("applicationDeadline"),
                      "[color-scheme:dark] [&::-webkit-date-and-time-value]:text-left",
                    )}
                  />
                </Field>
              </div>
            </SectionCard>

            {/* EXTRA */}
            <SectionCard
              section={sectionState[5]}
              done={false}
              errorCount={0}
            >
              <Field
                label="Additional instructions"
                name="additionalRequirements"
                optional
                hint="Mandatory brand tags, product usage instructions, content restrictions and so on."
                counter={`${form.additionalRequirements.length}/1000`}
              >
                <textarea
                  {...bind("additionalRequirements")}
                  rows={4}
                  maxLength={1000}
                  placeholder="Anything else creators should know?"
                  className={controlCls(false, "resize-y")}
                />
              </Field>
            </SectionCard>
          </div>

          {/* LIVE SUMMARY */}
          <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
            <div className="hidden rounded-2xl border border-white/[0.07] bg-[#0f110f] p-5 xl:block">
              <h3 className="text-sm font-semibold text-white">Summary</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Updates as you fill in the form.
              </p>

              <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#0b0d0b] p-4">
                <p
                  className={`line-clamp-2 text-sm font-medium ${
                    form.title.trim() ? "text-white" : "text-gray-600"
                  }`}
                >
                  {form.title.trim() || "Untitled campaign"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {form.category
                    ? normalizeOption(
                        campaignCategories
                          .map(normalizeOption)
                          .find((o) => o.value === form.category) || {
                          label: form.category,
                        },
                      ).label
                    : "No category"}
                </p>

                <div className="mt-3 flex min-h-[20px] items-center gap-2">
                  {form.platforms.length ? (
                    form.platforms.map((p) => {
                      const Icon = PLATFORM_ICONS[p];
                      return Icon ? (
                        <span key={p} title={p}>
                          <Icon size={18} />
                        </span>
                      ) : (
                        <span key={p} className="text-xs text-gray-400">
                          {p}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-xs text-gray-600">
                      No platforms selected
                    </span>
                  )}
                </div>
              </div>

              <dl className="mt-3 divide-y divide-white/[0.05]">
                <Row label="Deliverables">
                  {form.deliverables.length || "—"}
                </Row>
                <Row label="Followers">
                  {form.minFollowers && form.maxFollowers
                    ? `${compact(num(form.minFollowers))} – ${compact(
                        num(form.maxFollowers),
                      )}`
                    : "—"}
                </Row>
                <Row label="Min. engagement">
                  {form.minEngagement ? `${form.minEngagement}%` : "—"}
                </Row>
                <Row label="Duration">
                  {durationDays
                    ? `${durationDays} ${durationDays === 1 ? "day" : "days"}`
                    : "—"}
                </Row>
                <Row label="Applications close">
                  {fmtDate(form.applicationDeadline)}
                </Row>
              </dl>
            </div>

            <div className="hidden xl:block">{budgetCheck}</div>
          </aside>
        </div>

        {/* ACTION BAR */}
        <div className="sticky bottom-2 z-20 mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0b0d0b]/95 p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur sm:bottom-3 sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-3 pl-1">
            <div
              className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08] sm:block"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Form completion"
            >
              <div
                className="h-full rounded-full bg-[#D0FF71] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-xs text-gray-400">
              <span className="sm:hidden">
                {doneCount}/{REQUIRED_SECTIONS.length} done
              </span>
              <span className="hidden sm:inline">
                {doneCount} of {REQUIRED_SECTIONS.length} sections complete
              </span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              aria-label="Save draft"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 px-3.5 text-sm font-medium text-gray-300 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/40 sm:px-4"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Save draft</span>
            </button>

            <button
              type="submit"
              disabled={isPublishing}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0FF71] px-4 text-sm font-semibold text-black transition hover:bg-[#c2f45f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d0b] disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
            >
              {isPublishing ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Publishing…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Publish
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* TOAST */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 top-4 z-50 flex justify-end"
      >
        {toast && (
          <div
            role="status"
            className={`pointer-events-auto flex w-full max-w-sm sm:w-auto items-start gap-2.5 rounded-xl border px-4 py-3 text-sm shadow-xl backdrop-blur ${
              toast.type === "success"
                ? "border-[#D0FF71]/30 bg-[#12170c]/95 text-[#D0FF71]"
                : toast.type === "error"
                  ? "border-red-500/30 bg-[#1a0d0d]/95 text-red-300"
                  : "border-white/15 bg-[#111311]/95 text-gray-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            ) : toast.type === "error" ? (
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
            ) : (
              <Info size={16} className="mt-0.5 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="ml-1 shrink-0 opacity-60 transition hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;