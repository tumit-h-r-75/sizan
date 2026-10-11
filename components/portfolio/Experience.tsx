"use client";

import { type CSSProperties } from "react";
import { motion } from "motion/react";
import { ChevronDown, MapPin } from "lucide-react";
import { DATA, type ExperienceRole } from "@/data/profile";
import { EASE, Reveal, SectionLabel, SplitHeading } from "./Chrome";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const now = new Date();
const currentMonth = now.getFullYear() * 12 + now.getMonth();

// "Feb 2021" -> months since year 0; "Present" -> this month.
function toMonth(label: string) {
  if (label === "Present") return currentMonth;
  const [month, year] = label.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(month);
}

// Inclusive of both months, the way LinkedIn counts a role.
function duration(start: string, end: string) {
  const months = toMonth(end) - toMonth(start) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years} yr`, rest && `${rest} mo`].filter(Boolean).join(" ");
}

const firstYear = Math.min(
  ...DATA.experience.flatMap((entry) => entry.roles.map((role) => Math.floor(toMonth(role.start) / 12))),
);
const lastYear = now.getFullYear();
const domainStart = firstYear * 12;
const domainEnd = (lastYear + 1) * 12;
const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index);
const position = (month: number) => `${((month - domainStart) / (domainEnd - domainStart)) * 100}%`;
const span = (role: ExperienceRole) =>
  `${((toMonth(role.end) - toMonth(role.start) + 1) / (domainEnd - domainStart)) * 100}%`;

function Track({ roles, index }: { roles: ExperienceRole[]; index: number }) {
  // Roles are stored newest first; draw them left to right.
  const ordered = [...roles].reverse();
  return (
    <div className="career-track" aria-hidden="true">
      {years.map((year) => (
        <span key={year} className="career-gridline" style={{ left: position(year * 12) }} />
      ))}
      <span className="career-today" style={{ left: position(currentMonth + 1) }} />
      {ordered.map((role, roleIndex) => (
        <motion.span
          key={role.title}
          className={`career-bar${role.end === "Present" ? " is-current" : ""}${
            toMonth(role.start) - domainStart > (domainEnd - domainStart) / 2 ? " tip-end" : ""
          }`}
          style={{ left: position(toMonth(role.start)), width: `calc(${span(role)} - 2px)` } as CSSProperties}
          data-tip={`${role.title} · ${duration(role.start, role.end)}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.08 + roleIndex * 0.12 }}
        />
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="shell">
        <SectionLabel number="03">Experience</SectionLabel>
        <div className="section-head">
          <SplitHeading lead="Different chapters." dim="One human thread." />
          <Reveal delay={0.1}>
            <p>
              From community work to client relationships. Each role has shaped
              how I listen, communicate, and approach a business challenge.
            </p>
          </Reveal>
        </div>
        <Reveal className="career">
          <div className="career-axis" aria-hidden="true">
            <div className="career-legend">
              <span>
                <i className="career-key is-current" /> Current role
              </span>
              <span>
                <i className="career-key" /> Earlier roles
              </span>
              <span>
                <i className="career-key is-today" /> Today
              </span>
            </div>
            <div className="career-years">
              {years.map((year) => (
                <span key={year} style={{ left: position(year * 12) }}>
                  {year}
                </span>
              ))}
            </div>
          </div>
          {DATA.experience.map((entry, index) => {
            const first = entry.roles[entry.roles.length - 1];
            const latest = entry.roles[0];
            const current = latest.end === "Present";
            return (
              <details
                key={entry.company}
                className="career-row"
                open={index === 0 ? true : undefined}
              >
                <summary>
                  <div className="career-info">
                    <div className="experience-company-row">
                      <h3>{entry.company}</h3>
                      {current && (
                        <span className="current-badge">
                          <span className="pulse-dot" aria-hidden="true" />
                          Current
                        </span>
                      )}
                    </div>
                    <span className="experience-role-title">{latest.title}</span>
                    <span className="experience-meta">
                      {first.start} – {latest.end} <span aria-hidden="true">·</span>{" "}
                      {duration(first.start, latest.end)}{" "}
                      <span aria-hidden="true">·</span> {entry.type}
                    </span>
                  </div>
                  <Track roles={entry.roles} index={index} />
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
                          {role.start} – {role.end} · {duration(role.start, role.end)}
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
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
