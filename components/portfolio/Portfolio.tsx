"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe2,
  GraduationCap,
  Handshake,
  MessagesSquare,
  Route,
  Sparkles,
  Star,
  User,
  Users,
} from "lucide-react";
import { DATA, type Party } from "@/data/profile";
import BlurText from "@/components/react-bits/BlurText";
import CircularText from "@/components/react-bits/CircularText";
import CountUp from "@/components/react-bits/CountUp";
import LightRays from "@/components/react-bits/LightRays";
import MagicBento from "@/components/react-bits/MagicBento";
import Noise from "@/components/react-bits/Noise";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";
import StarBorder from "@/components/react-bits/StarBorder";
import Stepper, { Step } from "@/components/react-bits/Stepper";
import Threads from "@/components/react-bits/Threads";
import TiltedCard from "@/components/react-bits/TiltedCard";
import Waves from "@/components/react-bits/Waves";
import { ContactSection } from "./ContactSection";
import { Experience } from "./Experience";
import {
  EASE,
  ExternalLink,
  Header,
  Magnetic,
  Reveal,
  SectionLabel,
  SplitHeading,
  useMediaQuery,
} from "./Chrome";

const serviceIcons = { Code2, Database, Globe: Globe2, Cloud, Cpu };
const processIcons = [MessagesSquare, Route, Handshake, Users];
const parties: Record<Party, { label: string; icon: React.ReactNode }> = {
  you: { label: "You", icon: <User size={14} strokeWidth={1.8} /> },
  me: {
    label: DATA.alternateName,
    icon: <img src={DATA.avatarThumbUrl} alt="" width={22} height={22} />,
  },
  team: { label: `${DATA.company} team`, icon: <Users size={14} strokeWidth={1.8} /> },
};

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

// On desktop the hero stays pinned while the About card slides over it: the copy fades and
// lifts, the portrait drifts, and a shade darkens the hero behind the card.
function Hero({ coverRef }: { coverRef: RefObject<HTMLElement | null> }) {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 901px)");
  const layered = desktop && !reducedMotion;
  const [revealed, setRevealed] = useState(false);
  const [raysOn, setRaysOn] = useState(true);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "start start"],
  });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.75]);

  // Stop the light rays once the card covers the hero.
  useMotionValueEvent(scrollYProgress, "change", (latest) => setRaysOn(latest < 0.98));

  // A hero taller than the window sticks where its bottom edge is still visible.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const place = () =>
      hero.style.setProperty(
        "--hero-stick",
        `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`,
      );
    place();
    const observer = new ResizeObserver(place);
    observer.observe(hero);
    window.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  return (
    <section id="top" className="hero" ref={heroRef}>
      <div className="hero-rays" aria-hidden="true">
        {raysOn && (
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
        )}
      </div>
      <div className="shell hero-grid">
        <motion.div
          className="hero-copy"
          style={layered ? { opacity: copyOpacity, y: copyY } : undefined}
        >
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
              <StarBorder
                as="a"
                href="#contact"
                className="button button-primary"
                color="#ffffff"
                trailColor="#c9ffdc"
                radius={999}
                duration={5}
                glow={0.8}
                backgroundColor="var(--accent)"
                textColor="var(--accent-ink)"
                borderColor="rgba(4, 20, 10, 0.18)"
              >
                Let's discuss your project{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </StarBorder>
            </Magnetic>
            <a href="#experience" className="button button-ghost">
              My journey <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </motion.div>
        <motion.div
          className="hero-visual"
          style={layered ? { y: visualY, scale: visualScale } : undefined}
        >
          <div className="portrait">
            <span className="portrait-glow" aria-hidden="true" />
            <motion.div
              className={`portrait-reveal${revealed ? " is-revealed" : ""}`}
              initial={
                reducedMotion
                  ? false
                  : { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.12 }
              }
              animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              onAnimationComplete={() => setRevealed(true)}
            >
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
            </motion.div>
            <a className="portrait-badge" href="#contact" aria-label="Let's talk">
              <CircularText
                text="LET'S TALK • START A PROJECT • "
                spinDuration={22}
                onHover="speedUp"
                className="portrait-badge-text"
              />
              <span className="portrait-badge-core" aria-hidden="true">
                <ArrowUpRight size={20} strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </motion.div>
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
      {layered && (
        <motion.div className="hero-shade" style={{ opacity: shade }} aria-hidden="true" />
      )}
    </section>
  );
}

function About({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  return (
    <section id="about" className="section about" ref={sectionRef}>
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
  const cards = [
    ...DATA.services.map((service, index) => {
      const Icon = serviceIcons[service.icon];
      return {
        key: service.title,
        className: "service-card",
        children: (
          <>
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
          </>
        ),
      };
    }),
    {
      key: "start",
      className: "service-card service-card-start",
      children: (
        <>
          <div className="service-top">
            <span className="service-icon" aria-hidden="true">
              <Sparkles size={20} strokeWidth={1.5} />
            </span>
          </div>
          <h3>Not sure where to start?</h3>
          <p>
            Tell me the business goal. I'll help you find the right route and
            the right team to build it.
          </p>
          <button
            className="service-cta"
            type="button"
            onClick={() => onDiscuss("")}
          >
            Start with a conversation
            <span className="service-cta-icon" aria-hidden="true">
              <ArrowUpRight size={17} strokeWidth={1.7} />
            </span>
          </button>
        </>
      ),
    },
  ];

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
        <Reveal>
          <MagicBento
            className="service-grid"
            cards={cards}
            glowColor="62, 226, 122"
            particleCount={10}
            spotlightRadius={320}
            enableMagnetism
            clickEffect
          />
        </Reveal>
      </div>
    </section>
  );
}

// Laid out like a feature card: labels in a narrow left column, the story and the company's
// figures on the right, light threads drifting behind.
function Exprovia() {
  return (
    <section id="exprovia" className="agency">
      <Reveal className="agency-panel">
        <div className="agency-threads" aria-hidden="true">
          <Threads
            color="#3ee27a"
            accentColor="#8df5b4"
            amplitude={1.5}
            distance={0.35}
            lineCount={70}
            thickness={0.5}
            speed={0.25}
            angle={-6}
            opacity={0.35}
            fade={0.4}
          />
        </div>
        <div className="shell agency-grid">
          <div className="agency-side">
            <span className="eyebrow">The team behind the conversation</span>
            <img
              className="agency-logo"
              src={DATA.exprovia.logoUrl}
              alt={`${DATA.company}, IT Solutions & Services`}
              width={500}
              height={147}
            />
          </div>
          <div className="agency-main">
            <SplitHeading
              className="agency-heading"
              lead="You talk to me."
              dim="A full team delivers."
            />
            <Reveal delay={0.1}>
              <p>{DATA.exprovia.summary}</p>
              <ExternalLink href={DATA.exprovia.teammate.url} className="text-link">
                {DATA.exprovia.teammate.label}
              </ExternalLink>
            </Reveal>
          </div>
          <span className="eyebrow agency-stats-label">{DATA.company}, as a company</span>
          <div className="agency-figures">
            <dl className="agency-stats">
              {DATA.exprovia.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>
                    <CountUp to={stat.value} duration={1.6} />
                    {stat.suffix}
                    {!stat.suffix && (
                      <Star className="rating-star" size={26} aria-hidden="true" />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ExternalLink className="agency-source" href={DATA.exprovia.source.url}>
              {DATA.exprovia.source.label}
            </ExternalLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Process() {
  const [step, setStep] = useState(1);
  const steps = DATA.engagementSteps;
  return (
    <section id="process" className="section process">
      <div className="process-waves" aria-hidden="true">
        <Waves
          lineColor="rgba(62, 226, 122, 0.12)"
          waveSpeedX={0.008}
          waveSpeedY={0.004}
          waveAmpX={28}
          waveAmpY={14}
          xGap={14}
          yGap={36}
          maxCursorMove={80}
        />
      </div>
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
                        <span className="process-step-name"> · {item.step}</span>
                      </span>
                      <p>{item.text}</p>
                      <div className="process-involved">
                        <span>Who's involved</span>
                        <ul>
                          {item.involved.map((party) => (
                            <li key={party}>
                              <span className="party-icon" aria-hidden="true">
                                {parties[party].icon}
                              </span>
                              {parties[party].label}
                            </li>
                          ))}
                        </ul>
                      </div>
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
  const aboutRef = useRef<HTMLElement>(null);

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
      <Noise fixed opacity={0.035} fps={16} contrast={0.5} zIndex={70} />
      <Header />
      <main id="main-content">
        <div className="hero-stack">
          <Hero coverRef={aboutRef} />
          <About sectionRef={aboutRef} />
        </div>
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
