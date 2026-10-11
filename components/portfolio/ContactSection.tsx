"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Linkedin,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { DATA } from "@/data/profile";
import BlurText from "@/components/react-bits/BlurText";
import Counter from "@/components/react-bits/Counter";
import GlareHover from "@/components/react-bits/GlareHover";
import GradientText from "@/components/react-bits/GradientText";
import Particles from "@/components/react-bits/Particles";
import StarBorder from "@/components/react-bits/StarBorder";
import { ExternalLink, Reveal, SectionLabel, whatsappUrl } from "./Chrome";


const channels = [
  {
    name: "WhatsApp",
    detail: DATA.whatsapp,
    href: whatsappUrl(),
    icon: MessageCircle,
  },
  {
    name: "LinkedIn",
    detail: "Connect and send a message",
    href: DATA.social.linkedin,
    icon: Linkedin,
  },
];

// Minutes ahead of UTC for a time zone at a given moment.
function zoneOffset(date: Date, timeZone: string) {
  const inZone = new Date(date.toLocaleString("en-US", { timeZone }));
  const inUtc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  return Math.round((inZone.getTime() - inUtc.getTime()) / 60000);
}

function formatGap(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return [hours && `${hours} ${hours === 1 ? "hour" : "hours"}`, rest && `${rest} min`]
    .filter(Boolean)
    .join(" ");
}

// The person's local time on a rolling clock, next to the visitor's own time.
function TimeZoneCard() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(interval);
  }, []);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: DATA.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const theirs = zoneOffset(now, DATA.timeZone);
  const visitors = -now.getTimezoneOffset();
  const gap = theirs - visitors;
  const city = DATA.location.split(",")[0];
  const offsetMinutes = Math.abs(theirs) % 60;
  const utc = `UTC${theirs >= 0 ? "+" : "−"}${Math.floor(Math.abs(theirs) / 60)}${
    offsetMinutes ? `:${String(offsetMinutes).padStart(2, "0")}` : ""
  }`;
  const yourTime = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(now);
  const counter = {
    fontSize: 40,
    padding: 4,
    gap: 0,
    horizontalPadding: 0,
    places: [10, 1],
    textColor: "var(--text)",
    fontWeight: 500,
    gradientHeight: 8,
    gradientFrom: "var(--surface)",
    gradientTo: "transparent",
  } as const;
  return (
    <div className="tz-card">
      <div className="tz-head">
        <span className="pulse-dot" aria-hidden="true" />
        Local time in {DATA.location}
        <span className="tz-zone">{utc}</span>
      </div>
      <div className="tz-clock">
        <span className="sr-only">
          {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
        </span>
        <span className="tz-digits" aria-hidden="true">
          <Counter value={hour} {...counter} places={[10, 1]} />
          <span className="tz-colon">:</span>
          <Counter value={minute} {...counter} places={[10, 1]} />
        </span>
      </div>
      <p className="tz-note">
        Your time: {yourTime}.{" "}
        {gap === 0
          ? "You're in the same time zone."
          : `${city} is ${formatGap(Math.abs(gap))} ${gap > 0 ? "ahead of" : "behind"} you.`}
      </p>
    </div>
  );
}

export function ContactSection({
  service,
  onServiceChange,
}: {
  service: string;
  onServiceChange: (value: string) => void;
}) {
  const [brief, setBrief] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (brief && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [brief]);

  const createBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const business = String(form.get("business") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const messageInput = event.currentTarget.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    if (message.length < 10)
      messageInput.setCustomValidity(
        "Please add at least 10 characters about your project.",
      );
    if (!name || message.length < 10) {
      event.currentTarget.reportValidity();
      return;
    }
    setCopyStatus("idle");
    setBrief(
      [
        "Hi Sizan, I'd like to discuss a project.",
        "",
        `Name: ${name}`,
        ...(business ? [`Business / website: ${business}`] : []),
        ...(email ? [`Reply email: ${email}`] : []),
        `Interested in: ${service || "Let's explore the right solution"}`,
        `Timeline: ${String(form.get("timeline") || "Flexible")}`,
        "",
        "Project overview:",
        message,
        "",
        "Could we discuss the next steps?",
      ].join("\n"),
    );
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setBrief("");
    formRef.current?.querySelector<HTMLButtonElement>("button[type=submit]")?.focus();
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-particles" aria-hidden="true">
        <Particles
          particleColors={["#3ee27a", "#ffffff", "#8d97a3"]}
          particleCount={320}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={90}
          sizeRandomness={0.5}
          alphaParticles
        />
      </div>
      <div className="shell">
        <SectionLabel number="06">Contact</SectionLabel>
        <div className="contact-grid">
          <div className="contact-intro">
            <h2 className="contact-title">
              <BlurText text="Big things start" delay={80} direction="bottom" />{" "}
              <BlurText
                text="with a simple"
                delay={80}
                direction="bottom"
                initialDelay={0.15}
              />{" "}
              <span className="contact-hello">
                <GradientText
                  colors={["#3ee27a", "#b7f5cf", "#27ad5d"]}
                  animationSpeed={6}
                  glow={0.25}
                >
                  hello.
                </GradientText>
              </span>
            </h2>
            <Reveal delay={0.15}>
              <p>
                Have an idea, a business challenge, or a project in mind? Let's
                find the right way forward.
              </p>
            </Reveal>
            <Reveal className="channels" delay={0.2}>
              {channels.map(({ name, detail, href, icon: Icon }) => (
                <GlareHover
                  key={name}
                  className="channel-card"
                  width="100%"
                  background="var(--surface)"
                  borderColor="var(--line-strong)"
                  borderRadius="18px"
                  glareColor="#3ee27a"
                  glareOpacity={0.3}
                  glareSize={45}
                  variant="sheen"
                >
                  <a
                    className="channel"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="channel-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="channel-text">
                      <strong>{name}</strong>
                      <span>{detail}</span>
                    </span>
                    <ArrowUpRight
                      className="channel-arrow"
                      size={18}
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </GlareHover>
              ))}
            </Reveal>
            <Reveal delay={0.25}>
              <TimeZoneCard />
            </Reveal>
          </div>
          <Reveal className="brief-panel" delay={0.1}>
            <div className="brief-panel-heading">
              <span className="eyebrow">A little context goes a long way</span>
              <Send size={16} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <h3>Tell me what you're thinking.</h3>
            <p className="form-intro">
              Create a brief, then send it to me on WhatsApp or LinkedIn.
            </p>
            <form ref={formRef} onSubmit={createBrief}>
              <div className="form-row">
                <label>
                  Your name <span className="required">*</span>
                  <input
                    name="name"
                    placeholder="What should I call you?"
                    autoComplete="name"
                    required
                    maxLength={100}
                    pattern=".*\S.*"
                  />
                </label>
                <label>
                  Work email <span className="optional">optional</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Where can I reach you?"
                    autoComplete="email"
                    maxLength={200}
                  />
                </label>
              </div>
              <label>
                Business or website <span className="optional">optional</span>
                <input
                  name="business"
                  placeholder="A little about your business"
                  autoComplete="organization"
                  maxLength={200}
                />
              </label>
              <div className="form-row">
                <label>
                  What do you need?
                  <select
                    name="service"
                    value={service}
                    onChange={(event) => onServiceChange(event.target.value)}
                  >
                    <option value="">Let's explore</option>
                    {DATA.services.map(({ title }) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Your timeline
                  <select name="timeline" defaultValue="Flexible">
                    <option>Flexible</option>
                    <option>As soon as possible</option>
                    <option>Within a month</option>
                    <option>In the next 3 months</option>
                    <option>Just exploring</option>
                  </select>
                </label>
              </div>
              <label>
                Your project <span className="required">*</span>
                <textarea
                  name="message"
                  placeholder="What's the goal? What would a good outcome look like?"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                />
              </label>
              <StarBorder
                type="submit"
                className="button button-primary form-submit"
                color="#ffffff"
                trailColor="#c9ffdc"
                radius={999}
                duration={6}
                glow={0.7}
                backgroundColor="var(--accent)"
                textColor="var(--accent-ink)"
                borderColor="rgba(4, 20, 10, 0.18)"
              >
                Prepare my project brief{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </StarBorder>
              <span className="form-note">
                Your brief stays on your device until you send it.
              </span>
            </form>
          </Reveal>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="brief-dialog"
        aria-labelledby="brief-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => setBrief("")}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="dialog-content">
          <button
            type="button"
            className="dialog-close"
            onClick={closeDialog}
            aria-label="Close project brief"
          >
            <X size={19} />
          </button>
          <span className="eyebrow">The first conversation, made easier</span>
          <h2 id="brief-dialog-title">Your brief is ready.</h2>
          <p>
            Send it on WhatsApp in one tap, or copy it and paste it into a
            LinkedIn message.
          </p>
          <label className="sr-only" htmlFor="prepared-brief">
            Prepared project brief
          </label>
          <textarea
            id="prepared-brief"
            className="prepared-brief"
            value={brief}
            readOnly
            rows={11}
            onFocus={(event) => event.currentTarget.select()}
          />
          <div className="dialog-actions">
            <a
              className="button button-primary"
              href={whatsappUrl(brief)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Send on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              className="button button-ghost"
              onClick={copyBrief}
            >
              {copyStatus === "copied" ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
              {copyStatus === "copied" ? "Brief copied" : "Copy project brief"}
            </button>
            <ExternalLink
              className="button button-ghost"
              href={DATA.social.linkedin}
            >
              <Linkedin size={17} />
              Open Sizan's LinkedIn
            </ExternalLink>
          </div>
          <p className="copy-status" role="status">
            {copyStatus === "copied"
              ? "Copied. You can now paste your brief on LinkedIn."
              : copyStatus === "error"
                ? "Select the brief above and copy it with Ctrl+C or your device's copy menu."
                : "Your brief is prepared locally. Share it when you're ready."}
          </p>
        </div>
      </dialog>
    </section>
  );
}
