"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApply } from "@/context/ApplyContext";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import { clsx } from "@/lib/clsx";
import type { ApplyContent, ApplyStep } from "@/data/content";
import type { ApplyPayload } from "@/lib/apply-types";

type Phase = "intro" | "form" | "success";

interface DraftState {
  values: Record<string, string>;
  checks: Record<string, boolean>;
}

const EMPTY_DRAFT: DraftState = { values: {}, checks: {} };

/* Fallbacks for locales that predate the submit states. */
const DEFAULT_SUBMITTING = "…";
const DEFAULT_SUBMIT_ERROR =
  "Arizani yuborib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.";

/* ---- formatters ---- */

/** Format as +998 90 123 45 67. Works whether or not the user types 998. */
function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  // Drop the 998 country prefix if present, then treat the rest as local.
  if (digits.startsWith("998")) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  const parts = ["+998"];
  if (digits.length) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 5));
  if (digits.length > 5) parts.push(digits.slice(5, 7));
  if (digits.length > 7) parts.push(digits.slice(7, 9));
  return parts.join(" ");
}

/** Keep a single leading @ and strip whitespace, but let the user type @ freely. */
function formatTelegram(raw: string): string {
  const v = raw.replace(/\s+/g, "");
  if (v === "") return "";
  return "@" + v.replace(/^@+/, "");
}

/* ---- validators ---- */

const isBlank = (v?: string) => !v || v.trim() === "";
const isValidPhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  return d.length === 9;
};
const isValidTelegram = (v: string) => /^@[A-Za-z0-9_]{4,}$/.test(v);
const isValidUrl = (v: string) => {
  const s = v.trim();
  if (!s) return false;
  try {
    const url = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

function validateStep(
  step: ApplyStep,
  stepIndex: number,
  draft: DraftState,
  err: ApplyContent["errors"],
): Record<string, string> {
  const e: Record<string, string> = {};

  if (step.kind === "fields") {
    for (const f of step.fields ?? []) {
      const val = draft.values[f.key] ?? "";
      if (isBlank(val)) {
        e[f.key] = err.required;
      } else if (f.type === "tel" && !isValidPhone(val)) {
        e[f.key] = err.phone;
      } else if (f.key === "telegram" && !isValidTelegram(val)) {
        e[f.key] = err.telegram;
      }
    }
  } else if (step.kind === "textarea") {
    if (!step.optional) {
      const key = `text_${stepIndex}`;
      if (isBlank(draft.values[key])) e[key] = err.required;
    }
  } else if (step.kind === "links") {
    // optional block — only validate what was actually filled in
    for (const f of step.fields ?? []) {
      const val = draft.values[f.key] ?? "";
      if (!isBlank(val) && !isValidUrl(val)) e[f.key] = err.url;
    }
  } else if (step.kind === "checklist") {
    const all = (step.options ?? []).every(
      (_, i) => draft.checks[`check_${stepIndex}_${i}`],
    );
    if (!all) e[`checklist_${stepIndex}`] = err.checklist;
  } else if (step.kind === "video") {
    const link = draft.values[`video_link_${stepIndex}`] ?? "";
    if (isBlank(link)) {
      e[`video_${stepIndex}`] = err.video;
    } else if (!isValidUrl(link)) {
      e[`video_${stepIndex}`] = err.url;
    }
  }

  return e;
}

/* Footer buttons: full-width and finger-sized on mobile, unchanged on desktop. */
const btnBase =
  "w-full px-6 py-4 font-sans text-[13px] font-bold uppercase tracking-[0.08em] transition-all duration-200 active:scale-[0.98] sm:px-8 sm:py-3.5 cursor-pointer select-none";
const primaryBtn = `${btnBase} bg-[#DE2A41] text-white hover:bg-[#B2333C] shadow-md hover:shadow-lg`;
const ghostBtn = `${btnBase} border border-brand-black text-brand-black hover:bg-brand-black hover:text-white`;

export function ApplyModal() {
  const { isOpen, closeApply } = useApply();
  const { t, locale } = useLanguage();
  const a = t.apply;

  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<DraftState>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  /** Honeypot: bots fill this in, humans never see it. */
  const hpRef = useRef<HTMLInputElement>(null);

  const total = a.steps.length;
  const current: ApplyStep | undefined = a.steps[step];

  /* ---- reset everything whenever the modal is closed ---- */
  useEffect(() => {
    if (isOpen) return;
    setPhase("intro");
    setStep(0);
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setSubmitting(false);
    setSubmitError(null);
  }, [isOpen]);

  /* ---- lock the page + escape to close while open ----
     `overflow: hidden` alone does not stop iOS Safari (or Android Chrome)
     from dragging the page behind the modal, so the body is pinned with
     `position: fixed` at its current offset and restored — scroll position
     included — when the modal closes. `left/right/width` keep the pinned
     body from collapsing or shifting sideways. */
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
      htmlOverscroll: html.style.overscrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    html.style.overscrollBehavior = "none";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeApply();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      body.style.overscrollBehavior = prev.overscrollBehavior;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeApply]);

  /* ---- swallow touch drags that start outside the scrollable body ----
     Without this the overlay itself rubber-bands on iOS, which reads as the
     page moving up/down (and sideways) under the user's finger. */
  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const onTouchMove = (e: TouchEvent) => {
      const scroller = bodyRef.current;
      // Multi-touch = pinch zoom; leave it alone.
      if (e.touches.length > 1) return;
      if (scroller && scroller.contains(e.target as Node)) return;
      e.preventDefault();
    };

    overlay.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => overlay.removeEventListener("touchmove", onTouchMove);
  }, [isOpen, phase, step]);

  const clearError = useCallback((key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const setValue = useCallback(
    (key: string, val: string) => {
      setDraft((d) => ({ ...d, values: { ...d.values, [key]: val } }));
      clearError(key);
    },
    [clearError],
  );

  const toggleCheck = useCallback(
    (key: string, stepIndex: number) => {
      setDraft((d) => ({
        ...d,
        checks: { ...d.checks, [key]: !d.checks[key] },
      }));
      clearError(`checklist_${stepIndex}`);
    },
    [clearError],
  );

  const goTo = useCallback((next: number) => {
    setStep(next);
    setErrors({});
    setSubmitError(null);
    bodyRef.current?.scrollTo({ top: 0 });
  }, []);

  /* ---- final submit ---- */

  const submitApplication = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const payload: ApplyPayload = {
      locale,
      values: draft.values,
      checks: draft.checks,
      hp: hpRef.current?.value ?? "",
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(String(res.status));
      setPhase("success");
    } catch {
      setSubmitError(a.errors.submit ?? DEFAULT_SUBMIT_ERROR);
    } finally {
      setSubmitting(false);
    }
  }, [a.errors.submit, draft, locale, submitting]);

  const handleNext = () => {
    if (!current || submitting) return;
    const stepErrors = validateStep(current, step, draft, a.errors);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    if (step < total - 1) goTo(step + 1);
    else void submitApplication();
  };

  const handleBack = () => {
    if (submitting) return;
    if (step > 0) goTo(step - 1);
    else setPhase("intro");
  };

  // Every hook is declared above this guard, so the hook order stays stable
  // whether the modal is open or closed (React requires a constant hook count).
  if (!isOpen) return null;

  const isLast = step === total - 1;

  return (
    // Mobile: starts under the sticky header and fills the rest of the screen.
    // sm+: the centred card it has always been.
    <div
      ref={overlayRef}
      className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[100] flex items-stretch justify-center overscroll-none sm:inset-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={a.modalTitle}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={closeApply}
        tabIndex={-1}
        className="absolute inset-0 hidden bg-brand-black/70 backdrop-blur-sm sm:block"
      />

      {/* Card */}
      <div className="relative flex h-full w-full min-w-0 max-w-none flex-col overflow-hidden border-brand-black bg-white shadow-2xl transition-all duration-300 sm:h-auto sm:max-h-[92vh] sm:max-w-2xl sm:border">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-brand-black px-5 py-4 sm:px-8">
          <span className="display text-sm tracking-tight text-brand-black sm:text-base">
            {a.modalTitle}
          </span>
          <button
            type="button"
            onClick={closeApply}
            aria-label="Close"
            className="p-1 text-brand-black/70 transition-colors hover:text-brand-black"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M5 5L17 17M17 5L5 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Honeypot — off-screen and hidden from assistive tech. A bot fills
            it in, a person cannot; a filled value is dropped server-side. */}
        <input
          ref={hpRef}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        {/* Body */}
        <div
          ref={bodyRef}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-6 [-webkit-overflow-scrolling:touch] sm:px-8 sm:py-9"
        >
          {phase === "intro" && <IntroBody a={a} />}

          {phase === "form" && current && (
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="min-w-0 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#DE2A41]">
                  {current.block}
                </span>
                <span className="shrink-0 font-sans text-xs font-medium tabular-nums text-brand-black/50">
                  {step + 1}/{total}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-6">
                <h3 className="display break-words text-xl text-brand-black sm:text-2xl">
                  {current.title}
                </h3>
                {current.optional && (
                  <span className="font-sans text-xs uppercase tracking-wider text-brand-black/40">
                    {current.optional}
                  </span>
                )}
              </div>

              {current.sublabel && (
                <p className="mt-3 max-w-xl font-sans text-[13px] leading-relaxed text-brand-black/60">
                  {current.sublabel}
                </p>
              )}

              <div className="mt-7">
                <StepFields
                  step={current}
                  stepIndex={step}
                  draft={draft}
                  errors={errors}
                  setValue={setValue}
                  toggleCheck={toggleCheck}
                />
              </div>
            </div>
          )}

          {phase === "success" && <SuccessBody a={a} />}
        </div>

        {/* Footer — full-width stacked buttons on mobile (primary on top,
            matching the design), side by side from sm up. */}
        <div className="shrink-0 border-t border-brand-black/10 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-4">
          {phase === "intro" && (
            <button
              type="button"
              onClick={() => {
                setPhase("form");
                goTo(0);
              }}
              className={primaryBtn}
            >
              {a.intro.start}
            </button>
          )}

          {phase === "form" && (
            <>
              {submitError && (
                <p className="mb-3 font-sans text-[13px] font-medium text-[#DE2A41]">
                  {submitError}
                </p>
              )}
              <div className="flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={submitting}
                  className={clsx(ghostBtn, submitting && "opacity-50")}
                >
                  {a.nav.back}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={submitting}
                  className={clsx(primaryBtn, submitting && "opacity-70")}
                >
                  {submitting
                    ? (a.nav.submitting ?? DEFAULT_SUBMITTING)
                    : isLast
                      ? a.nav.submit
                      : a.nav.next}
                </button>
              </div>
            </>
          )}

          {phase === "success" && (
            <button type="button" onClick={closeApply} className={primaryBtn}>
              {a.success.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-views                                                          */
/* ------------------------------------------------------------------ */

function IntroBody({ a }: { a: ApplyContent }) {
  return (
    <div>
      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#DE2A41]">
        {a.intro.badge}
      </span>
      <div className="mt-6 flex flex-col gap-4">
        {a.intro.body.map((p, i) => (
          <p
            key={i}
            className="max-w-xl font-sans text-[15px] leading-relaxed text-brand-black/80"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function SuccessBody({ a }: { a: ApplyContent }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <Logo variant="dark" size="lg" />
      <h3 className="display mt-8 text-2xl text-brand-black">
        {a.success.title}
      </h3>
      <p className="mt-4 max-w-md font-sans text-[14px] leading-relaxed text-brand-black/70">
        {a.success.body}
      </p>
    </div>
  );
}

/* 16px on mobile is deliberate: anything smaller makes iOS Safari zoom the
   viewport on focus, which drags the whole page around. */
const inputBase =
  "w-full border-0 border-b bg-transparent pb-2 font-sans text-[16px] text-brand-black outline-none transition-colors placeholder:text-brand-black/35 sm:text-[15px]";

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-2 font-sans text-[12px] font-medium text-[#DE2A41]">
      {msg}
    </p>
  );
}

const labelClass =
  "mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-black/50";

function StepFields({
  step,
  stepIndex,
  draft,
  errors,
  setValue,
  toggleCheck,
}: {
  step: ApplyStep;
  stepIndex: number;
  draft: DraftState;
  errors: Record<string, string>;
  setValue: (key: string, val: string) => void;
  toggleCheck: (key: string, stepIndex: number) => void;
}) {
  if (step.kind === "fields" || step.kind === "links") {
    return (
      <div className="flex flex-col gap-7">
        {step.fields?.map((f) => {
          const err = errors[f.key];
          return (
            <div key={f.key}>
              {f.label && (
                <label htmlFor={f.key} className={labelClass}>
                  {f.label}
                </label>
              )}
              <input
                id={f.key}
                type={f.type === "tel" ? "tel" : "text"}
                inputMode={f.type === "tel" ? "tel" : undefined}
                value={draft.values[f.key] ?? ""}
                placeholder={f.placeholder}
                aria-invalid={!!err}
                onChange={(e) => {
                  let v = e.target.value;
                  if (f.type === "tel") v = formatPhone(v);
                  else if (f.key === "telegram") v = formatTelegram(v);
                  setValue(f.key, v);
                }}
                className={clsx(
                  inputBase,
                  err
                    ? "border-[#DE2A41]"
                    : "border-brand-black/25 focus:border-[#DE2A41]",
                )}
              />
              <ErrorText msg={err} />
            </div>
          );
        })}
      </div>
    );
  }

  if (step.kind === "textarea") {
    const key = `text_${stepIndex}`;
    const err = errors[key];
    return (
      <div>
        <textarea
          value={draft.values[key] ?? ""}
          placeholder={step.placeholder}
          onChange={(e) => setValue(key, e.target.value)}
          rows={6}
          aria-invalid={!!err}
          className={clsx(
            "w-full resize-y border bg-transparent p-3 font-sans text-[16px] leading-relaxed text-brand-black outline-none transition-colors placeholder:text-brand-black/35 sm:text-[15px]",
            err
              ? "border-[#DE2A41]"
              : "border-brand-black/25 focus:border-[#DE2A41]",
          )}
        />
        <ErrorText msg={err} />
      </div>
    );
  }

  if (step.kind === "checklist") {
    const err = errors[`checklist_${stepIndex}`];
    return (
      <div>
        <div className="flex flex-col gap-4">
          {step.options?.map((opt, i) => {
            const key = `check_${stepIndex}_${i}`;
            const checked = !!draft.checks[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleCheck(key, stepIndex)}
                className="flex items-start gap-3 text-left"
              >
                <span
                  className={clsx(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors",
                    checked
                      ? "border-[#DE2A41] bg-[#DE2A41] text-white"
                      : err
                        ? "border-[#DE2A41] bg-white"
                        : "border-brand-black/40 bg-white",
                  )}
                >
                  {checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.2L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="font-sans text-[14px] leading-relaxed text-brand-black/85">
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
        <ErrorText msg={err} />
        {step.note && (
          <p className="mt-6 font-sans text-[12px] leading-relaxed text-brand-black/45">
            {step.note}
          </p>
        )}
      </div>
    );
  }

  if (step.kind === "video" && step.video) {
    const v = step.video;
    const linkKey = `video_link_${stepIndex}`;
    const err = errors[`video_${stepIndex}`];
    return (
      <div>
        <label htmlFor={linkKey} className={labelClass}>
          {v.linkLabel || v.label}
        </label>
        <input
          id={linkKey}
          type="url"
          value={draft.values[linkKey] ?? ""}
          placeholder={v.linkPlaceholder}
          aria-invalid={!!err}
          onChange={(e) => setValue(linkKey, e.target.value)}
          className={clsx(
            inputBase,
            err
              ? "border-[#DE2A41]"
              : "border-brand-black/25 focus:border-[#DE2A41]",
          )}
        />
        <ErrorText msg={err} />
      </div>
    );
  }

  return null;
}
