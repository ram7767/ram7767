import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import GradientButton from "../ui/GradientButton";
import SectionTitle from "../ui/SectionTitle";
import { cn } from "../../lib/cn";
import { profile } from "../../data/profile";
import { downloadResume } from "../../lib/resume";
import {
  sendContact,
  validateContact,
  type ContactFormValues,
} from "../../lib/contact";

// ---------- Inline SVG icons (stroke 1.5, currentColor) ----------

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5L20 7" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="animate-spin">
    <path d="M12 3a9 9 0 1 0 9 9" />
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

// ---------- Form types ----------

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;
type Status = "idle" | "sending" | "success" | "error";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// ---------- Reusable Field shell ----------

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-mono uppercase tracking-widest text-ink-400 mb-2"
      >
        {label}
      </label>
      <div
        className={cn(
          "glass rounded-xl px-4 py-3 transition-colors duration-200",
          "focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:border-brand-500/40",
          error && "ring-1 ring-rose-400/40"
        )}
      >
        {children}
      </div>
      {error && (
        <p
          id={`${id}-err`}
          className="text-xs text-rose-300 mt-1.5 flex items-center gap-1"
          role="alert"
        >
          <AlertIcon />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

// ---------- Section component ----------

export default function Contact() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [toastVisible, setToastVisible] = useState(false);

  const successTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current !== null) window.clearTimeout(successTimerRef.current);
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const setField = <K extends keyof ContactFormValues>(key: K, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear inline error as user retypes.
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const validateField = (key: keyof ContactFormValues) => {
    const result = validateContact(values);
    if (!result.ok && result.field === key) {
      setErrors((prev) => ({ ...prev, [key]: result.message }));
    } else if (errors[key]) {
      // Field is now valid — clear any prior error.
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (status === "sending" || status === "success") return;

    // Client-side validation — collect ALL failing fields for inline display.
    const errs: FormErrors = {};
    const trimmed: ContactFormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };
    if (trimmed.name.length < 2) errs.name = "Please enter your name (2+ characters).";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed.email))
      errs.email = "Please enter a valid email address.";
    if (trimmed.subject.length < 3) errs.subject = "Subject must be at least 3 characters.";
    if (trimmed.message.length < 10) errs.message = "Message must be at least 10 characters.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setStatus("error");
      setErrorMsg("Please fix the highlighted fields and try again.");
      return;
    }

    setErrors({});
    setStatus("sending");
    setErrorMsg("");

    const result = await sendContact(trimmed);

    if (result.ok) {
      setStatus("success");
      setValues(INITIAL_VALUES);
      // Show toast for 3.5s.
      setToastVisible(true);
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToastVisible(false), 3500);
      // Revert button to idle after 2.5s.
      if (successTimerRef.current !== null) window.clearTimeout(successTimerRef.current);
      successTimerRef.current = window.setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
      setErrorMsg(result.message);
      if (result.reason === "validation") {
        // Surface as a general error; specific field errors were checked above.
        setErrors({});
      }
    }
  };

  const handleMessageKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter submits.
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void handleSubmit();
    }
  };

  const isSending = status === "sending";
  const isSuccess = status === "success";
  const submitDisabled = isSending || isSuccess;

  // ---------- Submit button label by state ----------
  let submitLabel: React.ReactNode;
  let submitIcon: React.ReactNode;
  if (isSending) {
    submitLabel = "Sending…";
    submitIcon = <SpinnerIcon />;
  } else if (isSuccess) {
    submitLabel = "Message sent";
    submitIcon = <CheckIcon />;
  } else {
    submitLabel = "Send message";
    submitIcon = <SendIcon />;
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "500px" }}
    >
      <Container>
        <SectionTitle
          eyebrow="Get in touch"
          title={
            <>
              Let&rsquo;s build something <span className="gradient-text">great</span>
            </>
          }
          center
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* LEFT — info card */}
          <GlassCard strong padded className="md:col-span-5">
            <p className="text-ink-200 leading-relaxed">
              Open to senior iOS &amp; mobile developer roles, contract work, and
              collaborations. Tell me a little about your project and I&rsquo;ll
              get back to you.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-300 shrink-0"><MailIcon /></span>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Email</div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm text-ink-100 hover:text-white transition-colors duration-200 break-all"
                  >
                    {profile.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-300 shrink-0"><PinIcon /></span>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Location</div>
                  <div className="text-sm text-ink-100">{profile.location}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-300 shrink-0"><ClockIcon /></span>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Response time</div>
                  <div className="text-sm text-ink-100">Typically replies within 24h</div>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-3">
                Other ways to reach me
              </div>
              <div className="flex flex-wrap gap-2">
                <GradientButton
                  size="sm"
                  variant="ghost"
                  href={`mailto:${profile.email}`}
                  leadingIcon={<MailIcon />}
                >
                  Email
                </GradientButton>
                <GradientButton
                  size="sm"
                  variant="ghost"
                  href={profile.github}
                  leadingIcon={<GithubIcon />}
                >
                  GitHub
                </GradientButton>
                <GradientButton
                  size="sm"
                  variant="ghost"
                  href={profile.linkedin}
                  leadingIcon={<LinkedinIcon />}
                >
                  LinkedIn
                </GradientButton>
                <GradientButton
                  size="sm"
                  variant="ghost"
                  onClick={downloadResume}
                  leadingIcon={<DownloadIcon />}
                >
                  Resume
                </GradientButton>
              </div>
            </div>
          </GlassCard>

          {/* RIGHT — form */}
          <GlassCard padded className="md:col-span-7">
            {status === "error" && errorMsg && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 flex items-start gap-2"
              >
                <span className="mt-0.5 text-rose-300 shrink-0"><AlertIcon /></span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className={cn("space-y-5", submitDisabled && "")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="c-name" label="Name" error={errors.name}>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => setField("name", e.target.value)}
                    onBlur={() => validateField("name")}
                    disabled={submitDisabled}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "c-name-err" : undefined}
                    placeholder="Your full name"
                    className={cn(
                      "w-full bg-transparent border-none outline-none",
                      "text-ink-100 placeholder:text-ink-400/60 text-sm",
                      submitDisabled && "opacity-60 cursor-not-allowed"
                    )}
                  />
                </Field>

                <Field id="c-email" label="Email" error={errors.email}>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => validateField("email")}
                    disabled={submitDisabled}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "c-email-err" : undefined}
                    placeholder="you@company.com"
                    className={cn(
                      "w-full bg-transparent border-none outline-none",
                      "text-ink-100 placeholder:text-ink-400/60 text-sm",
                      submitDisabled && "opacity-60 cursor-not-allowed"
                    )}
                  />
                </Field>
              </div>

              <Field id="c-subject" label="Subject" error={errors.subject}>
                <input
                  id="c-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                  onBlur={() => validateField("subject")}
                  disabled={submitDisabled}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "c-subject-err" : undefined}
                  placeholder="What's this about?"
                  className={cn(
                    "w-full bg-transparent border-none outline-none",
                    "text-ink-100 placeholder:text-ink-400/60 text-sm",
                    submitDisabled && "opacity-60 cursor-not-allowed"
                  )}
                />
              </Field>

              <Field id="c-message" label="Message" error={errors.message}>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => setField("message", e.target.value)}
                  onBlur={() => validateField("message")}
                  onKeyDown={handleMessageKeyDown}
                  disabled={submitDisabled}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "c-message-err" : undefined}
                  placeholder="A few details about your project, timeline, and what success looks like."
                  className={cn(
                    "w-full bg-transparent border-none outline-none resize-y",
                    "text-ink-100 placeholder:text-ink-400/60 text-sm leading-relaxed",
                    "min-h-[120px]",
                    submitDisabled && "opacity-60 cursor-not-allowed"
                  )}
                />
              </Field>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <p className="text-[11px] text-ink-400">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-ink-300 font-mono text-[10px]">{navigatorIsMac() ? "⌘" : "Ctrl"}</kbd>
                  {" "}+{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-ink-300 font-mono text-[10px]">Enter</kbd>
                  {" "}to send.
                </p>
                <div className="w-full sm:w-auto">
                  <GradientButton
                    size="lg"
                    onClick={() => void handleSubmit()}
                    leadingIcon={submitIcon}
                    className={cn(
                      "w-full sm:w-auto",
                      submitDisabled && "opacity-80 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    {submitLabel}
                  </GradientButton>
                </div>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </Container>

      {/* Ephemeral success toast (top-right). */}
      <div
        aria-live="polite"
        role="status"
        className={cn(
          "fixed top-6 right-6 z-[60] pointer-events-none",
          "transition-all duration-300 ease-out",
          toastVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        )}
      >
        <div className="glass-strong rounded-full px-4 py-2 text-sm text-ink-50 shadow-glow inline-flex items-center gap-2">
          <span className="text-emerald-300"><CheckIcon /></span>
          Message sent &mdash; I&rsquo;ll reply soon
        </div>
      </div>
    </section>
  );
}

// Tiny helper — used only for the shortcut hint label.
function navigatorIsMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "");
}
