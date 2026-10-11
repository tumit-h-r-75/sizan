"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { MotionConfig } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe2,
  GraduationCap,
  Handshake,
  MapPin,
  MessagesSquare,
  Route,
  Star,
  Users,
} from "lucide-react";
import { DATA } from "@/data/profile";
import BlurText from "@/components/react-bits/BlurText";
import CountUp from "@/components/react-bits/CountUp";
import LightRays from "@/components/react-bits/LightRays";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import Stepper, { Step } from "@/components/react-bits/Stepper";
import TiltedCard from "@/components/react-bits/TiltedCard";
import { ContactSection } from "./ContactSection";
import {
  ExternalLink,
  Header,
  Magnetic,
  Reveal,
  SectionLabel,
  SplitHeading,
} from "./Chrome";

const serviceIcons = { Code2, Database, Globe: Globe2, Cloud, Cpu };
const processIcons = [MessagesSquare, Route, Handshake, Users];

// Stepper theme variables, matched to the page palette.
const stepperTheme = {
  "--stepper-frame": "rgba(17, 22, 30, 0.82)",
  "--stepper-frame-edge": "rgba(255, 255, 255, 0.08)",
  "--stepper-frame-highlight": "rgba(255, 255, 255, 0.05)",
  "--stepper-tile": "linear-gradient(180deg, #1d2431 0%, #161c26 100%)",
  "--stepper-well": "rgba(255, 255, 255, 0.035)",
  "--stepper-ink": "#eef1f5",
  "--stepper-muted": "rgba(238, 241, 245, 0.55)",
  "--stepper-faint": "rgba(255, 255, 255, 0.2)",
} as CSSProperties;

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
  window.history.replaceState(null, "", "#contact");
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-rays" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3ee27a"
          raysSpeed={0.7}
          lightSpread={0.9}
          rayLength={1.5}
          fadeDistance={1.1}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.06}
          distortion={0.04}
        />
      </div>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <Reveal delay={0.1}>
            <span className="hero-pill">
              <span className="pulse-dot" aria-hidden="true" />
              <ShinyText
                text={`${DATA.role} at ${DATA.company}`}
                color="#c5ccd5"
                shineColor="#ffffff"
                speed={2.6}
                delay={2}
              />
            </span>
          </Reveal>
          <h1 className="hero-title">
            <BlurText
              text="Soykat Hasan"
              delay={110}
              direction="bottom"
              stepDuration={0.32}
              initialDelay={0.2}
            />{" "}
            <BlurText
              text="Sizan."
              delay={110}
              direction="bottom"
              stepDuration={0.32}
              initialDelay={0.42}
            />
          </h1>
          <Reveal delay={0.5}>
            <p className="hero-lead">
              Your business goals. The right technical team. I bring them
              together, one conversation at a time.
            </p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.6}>
            <Magnetic>
              <a href="#contact" className="button button-primary">
                Let's discuss your project{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#experience" className="button button-ghost">
              My journey <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
        <Reveal className="hero-visual" delay={0.25}>
          <div className="portrait">
            <span className="portrait-glow" aria-hidden="true" />
            <TiltedCard
              imageSrc={DATA.avatarUrl}
              altText={`${DATA.name}, ${DATA.role} at ${DATA.company}`}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.04}
              rotateAmplitude={9}
              showMobileWarning={false}
              showTooltip={false}
            />
          </div>
        </Reveal>
      </div>
      <div className="shell hero-foot">
        <a className="scroll-cue" href="#about">
          <span className="scroll-cue-line" aria-hidden="true">
            <span />
          </span>
          Scroll to explore
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="shell">
        <SectionLabel number="01">About</SectionLabel>
        <ScrollReveal
          containerClassName="about-statement"
          baseOpacity={0.14}
          baseRotation={1.5}
          blurStrength={6}
          rotationEnd="bottom 60%"
          wordAnimationEnd="bottom 60%"
        >
          Business is personal. So is my approach. I connect businesses with
          the people and technology that can move them forward.
        </ScrollReveal>
        <div className="about-body">
          <Reveal>
            <p className="about-intro">{DATA.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="column-label">Skills</h3>
            <ul className="chip-list">
              {DATA.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div id="education" className="background-grid">
          <Reveal>
            <h3 className="column-label">
              <GraduationCap size={16} strokeWidth={1.6} aria-hidden="true" />
              Education
            </h3>
            <ul>
              {DATA.education.map((item, index) => (
                <li className="list-row" key={item.institution}>
                  <span className="list-number">0{index + 1}</span>
                  <div>
                    <h4>{item.institution}</h4>
                    {item.degree && <p>{item.degree}</p>}
                  </div>
                  {item.years && <span className="list-meta">{item.years}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="column-label">
              <Users size={16} strokeWidth={1.6} aria-hidden="true" />
              Community & leadership
            </h3>
            <ul>
              {DATA.organizations.map((item, index) => (
                <li className="list-row" key={item.name}>
                  <span className="list-number">0{index + 1}</span>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.association}</p>
                  </div>
                  <span className="list-meta">{item.role}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services({ onDiscuss }: { onDiscuss: (service: string) => void }) {
  return (
    <section id="services" className="section services">
      <div className="shell">
        <SectionLabel number="02">Services</SectionLabel>
        <div className="section-head">
          <SplitHeading lead="Your next move." dim="The right solution." />
          <Reveal delay={0.1}>
            <p>
              You bring the business goal. I help shape the brief and find the
              right way to build it.
            </p>
          </Reveal>
        </div>
        <ul className="service-grid">
          {DATA.services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.title} className="service-item">
                <Reveal className="service-reveal" delay={(index % 3) * 0.08}>
                  <SpotlightCard
                    className="service-card"
                    spotlightColor="#3ee27a"
                    intensity={0.1}
                    borderGlow={0.55}
                    spotlightSize={340}
                    style={
                      {
                        "--spotlight-card-surface": "var(--surface)",
                        "--spotlight-card-border": "var(--line)",
                      } as CSSProperties
                    }
                  >
                    <div className="service-top">
                      <span className="service-icon" aria-hidden="true">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <span className="service-number">0{index + 1}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <div className="service-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      className="service-cta"
                      type="button"
                      onClick={() => onDiscuss(service.title)}
                      aria-label={`Discuss ${service.title}`}
                    >
                      Let's talk
                      <span className="service-cta-icon" aria-hidden="true">
                        <ArrowUpRight size={17} strokeWidth={1.7} />
                      </span>
                    </button>
                  </SpotlightCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="shell">
        <SectionLabel number="03">Experience</SectionLabel>
        <div className="experience-grid">
          <div className="experience-intro">
            <SplitHeading lead="Different chapters." dim="One human thread." />
            <Reveal delay={0.1}>
              <p>
                From community work to client relationships. Each role has
                shaped how I listen, communicate, and approach a business
                challenge.
              </p>
            </Reveal>
          </div>
          <div className="timeline">
            <span className="timeline-rail" aria-hidden="true" />
            {DATA.experience.map((entry, index) => (
              <Reveal key={entry.company} delay={index * 0.06}>
                <details
                  className="experience-entry"
                  open={index === 0 ? true : undefined}
                >
                  <summary>
                    <span
                      className={`timeline-dot${index === 0 ? " current" : ""}`}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="experience-company-row">
                        <h3>{entry.company}</h3>
                        {index === 0 && (
                          <span className="current-badge">
                            <span className="pulse-dot" aria-hidden="true" />
                            Current
                          </span>
                        )}
                      </div>
                      <span className="experience-role-title">
                        {entry.roles[0].title}
                      </span>
                      <span className="experience-meta">
                        {entry.roles[entry.roles.length - 1].start} –{" "}
                        {entry.roles[0].end} <span aria-hidden="true">·</span>{" "}
                        {entry.type}
                      </span>
                    </div>
                    <span className="experience-chevron" aria-hidden="true">
                      <ChevronDown size={18} strokeWidth={1.6} />
                    </span>
                  </summary>
                  <div className="experience-details">
                    {entry.roles.map((role) => (
                      <div className="role-detail" key={role.title}>
                        <div className="role-heading">
                          <strong>{role.title}</strong>
                          <span>
                            {role.start} – {role.end}
                          </span>
                        </div>
                        {role.description && <p>{role.description}</p>}
                      </div>
                    ))}
                    {entry.location && (
                      <span className="role-location">
                        <MapPin size={13} aria-hidden="true" />
                        {entry.location}
                        {entry.workplace ? ` · ${entry.workplace}` : ""}
                      </span>
                    )}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Exprovia() {
  return (
    <section id="exprovia" className="agency">
      <div className="shell">
        <Reveal className="agency-panel">
          <div className="agency-copy">
            <span className="eyebrow">The team behind the connection</span>
            <div className="agency-wordmark">
              <span>exprovia</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 2h11v11l-3.6-3.6L4.6 15.2 0.8 11.4l5.8-5.8z" />
              </svg>
            </div>
            <SplitHeading
              className="agency-heading"
              lead="A conversation with me."
              dim="A capable team behind it."
            />
            <p>{DATA.exprovia.summary}</p>
            <ExternalLink
              href="https://www.raselmridha.tech/"
              className="text-link"
            >
              Meet our Technical Project Manager
            </ExternalLink>
          </div>
          <div className="agency-proof">
            <span className="eyebrow">Exprovia, as a company</span>
            <dl className="agency-stats">
              {DATA.exprovia.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>
                    <CountUp to={stat.value} duration={1.6} />
                    {stat.suffix}
                    {!stat.suffix && (
                      <Star className="rating-star" size={22} aria-hidden="true" />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ExternalLink
              className="agency-source"
              href="https://www.rakib.xyz/#experience"
            >
              Company figures · background & context
            </ExternalLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const [step, setStep] = useState(1);
  const steps = DATA.engagementSteps;
  return (
    <section id="process" className="section process">
      <div className="shell">
        <SectionLabel number="04">Process</SectionLabel>
        <div className="section-head">
          <SplitHeading lead="Less guesswork." dim="More clarity." />
          <Reveal delay={0.1}>
            <p>
              A straightforward way to explore a project together, even if your
              idea is still taking shape.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <Stepper
            className="process-stepper"
            step={step}
            onStepChange={setStep}
            onFinalStepCompleted={scrollToContact}
            width="100%"
            radius={26}
            accentColor="#3ee27a"
            nextButtonText="Next step"
            completeButtonText="Start a conversation"
            style={stepperTheme}
          >
            {steps.map((item, index) => {
              const Icon = processIcons[index];
              return (
                <Step key={item.step} title={item.step}>
                  <div className="process-step">
                    <span className="process-step-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    <div>
                      <span className="process-step-count">
                        Step {index + 1} of {steps.length}
                      </span>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </Step>
              );
            })}
          </Stepper>
        </Reveal>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [selectedService, setSelectedService] = useState("");

  // The page renders on the client, so a shared #section link needs a nudge.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant" }));
  }, []);

  const discuss = (service: string) => {
    setSelectedService(service);
    scrollToContact();
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    alternateName: DATA.alternateName,
    jobTitle: DATA.role,
    image: DATA.avatarUrl,
    worksFor: { "@type": "Organization", name: DATA.company },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rajshahi",
      addressCountry: "BD",
    },
    sameAs: Object.values(DATA.social),
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services onDiscuss={discuss} />
        <Experience />
        <Exprovia />
        <Process />
        <ContactSection
          service={selectedService}
          onServiceChange={setSelectedService}
        />
      </main>
      <footer className="site-footer">
        <div className="shell footer-row">
          <a className="wordmark" href="#top">
            <span>
              Sizan<span className="accent">.</span>
            </span>
          </a>
          <span className="footer-copy">
            © {new Date().getFullYear()} {DATA.alternateName}
          </span>
          <div className="footer-links">
            <ExternalLink href={DATA.social.facebook}>Facebook</ExternalLink>
            <ExternalLink href={DATA.social.instagram}>Instagram</ExternalLink>
          </div>
          <a href="#top" className="back-top">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
    </MotionConfig>
  );
}
