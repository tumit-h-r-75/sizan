export interface ExperienceRole {
  title: string;
  start: string;
  end: string;
  description?: string;
}

export interface ExperienceEntry {
  company: string;
  type: string;
  workplace?: string;
  location?: string;
  roles: ExperienceRole[];
}

export interface CompanyStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  text: string;
  tags: string[];
  icon: "Code2" | "Database" | "Globe" | "Cloud" | "Cpu";
}

export interface EngagementStep {
  step: string;
  text: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  years: string;
}

export interface OrganizationItem {
  name: string;
  role: string;
  association: string;
}

export interface ProfileData {
  name: string;
  alternateName: string;
  role: string;
  company: string;
  location: string;
  avatarUrl: string;
  avatarThumbUrl: string;
  intro: string;
  skills: string[];
  services: ServiceItem[];
  experience: ExperienceEntry[];
  exprovia: {
    summary: string;
    stats: CompanyStat[];
  };
  engagementSteps: EngagementStep[];
  education: EducationItem[];
  organizations: OrganizationItem[];
  whatsapp: string;
  social: {
    linkedin: string;
    facebook: string;
    instagram: string;
  };
}

export const DATA: ProfileData = {
  name: "Md. Soykat Hasan Sizan",
  alternateName: "Sizan",
  role: "Business Development Executive",
  company: "Exprovia",
  location: "Rajshahi, Bangladesh",
  avatarUrl: "/images/sizan-portrait.webp",
  avatarThumbUrl: "/images/sizan-avatar.webp",
  intro:
    "I help businesses find the right technical solution, scope it clearly, and connect them with an engineering team that delivers. Every role so far has come back to the same thing: listening to people and finding a practical next step.",
  skills: [
    "Business Development",
    "New Business Development",
    "Analytical Skills",
    "Business Analysis",
  ],
  services: [
    {
      title: "Web Applications",
      text: "From a first idea to a custom web application, matched with the right development team.",
      tags: ["Next.js", "React", "Custom platforms"],
      icon: "Code2",
    },
    {
      title: "Backend and APIs",
      text: "Reliable backends, APIs, and integrations that connect the systems behind your business.",
      tags: ["Node.js", "PostgreSQL", "Integrations"],
      icon: "Database",
    },
    {
      title: "WordPress Websites",
      text: "A website that works for your business, from a company presence to an online store.",
      tags: ["WordPress", "E-commerce", "Custom builds"],
      icon: "Globe",
    },
    {
      title: "Cloud and DevOps",
      text: "A clear plan for hosting, deployment, and stable releases.",
      tags: ["AWS", "Deployment", "Infrastructure"],
      icon: "Cloud",
    },
    {
      title: "AI and Automation",
      text: "AI agents and workflow automation that cut repetitive, manual work.",
      tags: ["AI agents", "Workflows", "Integrations"],
      icon: "Cpu",
    },
  ],
  experience: [
    {
      company: "Exprovia",
      type: "Full-time",
      workplace: "On-site",
      location: "Rajshahi, Bangladesh",
      roles: [
        {
          title: "Business Development Executive",
          start: "May 2026",
          end: "Present",
          description:
            "Leading client conversations and new business opportunities for Exprovia's web development services.",
        },
        {
          title: "Business Development Intern",
          start: "Jan 2026",
          end: "Apr 2026",
          description:
            "Started in the Marketing Department, supporting business development and outreach.",
        },
      ],
    },
    {
      company: "Parentliiink",
      type: "Full-time",
      workplace: "On-site",
      location: "Dhaka, Bangladesh",
      roles: [
        {
          title: "Co-Founder & CMO",
          start: "Oct 2024",
          end: "Jun 2025",
        },
      ],
    },
    {
      company: "NORTH END Coffee Roasters",
      type: "Part-time",
      roles: [
        {
          title: "Assistant Sales Manager",
          start: "Feb 2023",
          end: "Jul 2023",
        },
      ],
    },
    {
      company: "Kiki Charity",
      type: "Full-time",
      roles: [
        {
          title: "Representative",
          start: "Feb 2021",
          end: "Dec 2022",
        },
      ],
    },
  ],
  exprovia: {
    summary:
      "Exprovia is a web development agency from Rajshahi, building and running software for clients worldwide. I work on the business side, connecting your requirements with the team's engineering capabilities.",
    stats: [
      { value: 350, suffix: "+", label: "Projects delivered" },
      { value: 20, suffix: "+", label: "Countries served" },
      { value: 4.9, label: "Rating on Fiverr and Upwork" },
    ],
  },
  engagementSteps: [
    {
      step: "Discovery call",
      text: "We discuss your goals, timeline, and budget, so the project starts with a clear direction.",
    },
    {
      step: "Clear proposal",
      text: "You receive a written scope and estimate you can review before making a decision.",
    },
    {
      step: "Kickoff",
      text: "I introduce you to the Exprovia team assigned to your project.",
    },
    {
      step: "Ongoing contact",
      text: "I stay your point of contact through delivery.",
    },
  ],
  education: [
    {
      institution: "Daffodil International University (DIU)",
      degree: "", // TODO
      years: "2020 to 2025",
    },
    {
      institution: "New Govt. Degree College, Rajshahi",
      degree: "Higher Secondary",
      years: "2016 to 2018",
    },
    {
      institution: "Seroil Govt. High School, Rajshahi",
      degree: "Secondary",
      years: "", // TODO
    },
  ],
  organizations: [
    {
      name: "HRM",
      role: "Executive Member",
      association: "Daffodil International University",
    },
    {
      name: "Social Business Students' Forum",
      role: "Executive Member",
      association: "Daffodil International University",
    },
  ],
  whatsapp: "+880 1320-574316",
  social: {
    linkedin: "https://www.linkedin.com/in/sizan16447/",
    facebook: "https://www.facebook.com/sau.chan.509",
    instagram: "https://www.instagram.com/s_o_y_k_a_t_h_a_s_a_n/",
  },
};
