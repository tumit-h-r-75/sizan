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
import GlareHover from "@/components/react-bits/GlareHover";
import Particles from "@/components/react-bits/Particles";
import { ExternalLink, LocalTime, Reveal, SectionLabel } from "./Chrome";

const whatsappNumber = DATA.whatsapp.replace(/\D/g, "");
const whatsappUrl = (text?: string) =>
  `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

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
  const submitRef = useRef<HTMLButtonElement>(null);

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
    submitRef.current?.focus();
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-particles" aria-hidden="true">
        <Particles
          particleColors={["#3ee27a", "#ffffff", "#8d97a3"]}
          particleCount={260}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={110}
          sizeRandomness={1}
          alphaParticles
        />
      </div>
      <div className="shell">
        <SectionLabel number="05">Contact</SectionLabel>
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
              <BlurText
                className="accent"
                text="hello."
                delay={80}
                direction="bottom"
                initialDelay={0.3}
              />
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
              <LocalTime />
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
            <form onSubmit={createBrief}>
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
              <button
                ref={submitRef}
                type="submit"
                className="button button-primary form-submit"
              >
                Prepare my project brief{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
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
