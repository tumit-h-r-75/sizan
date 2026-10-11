"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import BlurText from "@/components/react-bits/BlurText";
import DecryptedText from "@/components/react-bits/DecryptedText";
import Magnet from "@/components/react-bits/Magnet";
import { DATA } from "@/data/profile";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const whatsappNumber = DATA.whatsapp.replace(/\D/g, "");

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// The page's standard scroll entrance, using React Bits AnimatedContent.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <AnimatedContent
      className={className}
      distance={56}
      duration={1}
      ease="power3.out"
      threshold={0.12}
      delay={delay}
    >
      {children}
    </AnimatedContent>
  );
}

export function SplitHeading({
  lead,
  dim,
  id,
  className = "",
}: {
  lead: string;
  dim: string;
  id?: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={`split-heading ${className}`}>
      <BlurText text={lead} delay={70} direction="bottom" stepDuration={0.3} />{" "}
      <BlurText
        className="dim"
        text={dim}
        delay={70}
        direction="bottom"
        stepDuration={0.3}
        initialDelay={0.18}
      />
    </h2>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: string;
}) {
  return (
    <p className="section-label">
      <span className="section-label-number">{number}</span>
      <span className="section-label-line" aria-hidden="true" />
      <DecryptedText
        text={children}
        animateOn="view"
        sequential
        speed={45}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        encryptedClassName="section-label-scramble"
      />
    </p>
  );
}

export function Magnetic({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <Magnet
      padding={24}
      magnetStrength={10}
      disabled={Boolean(reducedMotion) || !finePointer}
    >
      {children}
    </Magnet>
  );
}

function Avatar({ size }: { size: number }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span
        className="avatar avatar-fallback"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        S
      </span>
    );
  return (
    <img
      className="avatar"
      src={DATA.avatarThumbUrl}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
    />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Hide while scrolling down, show again on the way up. A jump of more than a screen comes from
  // an anchor link, so the header stays as it is.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - (scrollY.getPrevious() ?? 0);
    setScrolled(latest > 24);
    if (Math.abs(delta) > window.innerHeight) return;
    if (latest < 160 || delta < -4) setHidden(false);
    else if (delta > 4) setHidden(true);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 24);
    const clearAtTop = () => {
      const about = document.getElementById("about");
      if (about && window.scrollY < about.offsetTop - 200) setActive("");
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", dismiss);
    media.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", dismiss);
      media.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <motion.header
      className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
      initial={reducedMotion ? false : { y: "-100%", opacity: 0 }}
      animate={{ y: hidden && !open ? "-105%" : "0%", opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="shell header-inner">
        <a
          className="wordmark"
          href="#top"
          aria-label="Sizan, back to top"
          onClick={() => setOpen(false)}
        >
          <Avatar size={34} />
          <span>
            Sizan<span className="accent">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="nav-text">{label}</span>
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="button button-light button-small header-cta" href="#contact">
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {NAV_ITEMS.map(({ id, label }, index) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 + index * 0.04 }}
              >
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight className="link-arrow" size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
