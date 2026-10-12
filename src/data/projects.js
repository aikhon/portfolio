export const projects = [
  {
    id: "miyaly-bus",
    title: "miyaly bus",
    subtitle: "Regional Intercity Ticketing Platform",
    domain: "fullstack",
    description:
      "A production B2C transit booking platform serving travelers across the Atyrau Region (Miyaly). Engineered with real-time seat reservation, dynamic route schedules, and Kaspi.kz payment integration.",
    tags: ["Next.js", "React", "Supabase", "PostgreSQL", "Kaspi Pay", "Tailwind CSS"],
    url: "https://miyaly-bus.kz/",
    metrics: "Production · Live in Atyrau Region",
    highlights: [
      "Real-time seat selection & booking state machine",
      "Seamless integration with Kaspi.kz payment gateway",
      "Automated ticket dispatch & booking confirmation",
    ],
  },
  {
    id: "thetochka-pos",
    title: "thetochka: hospitality pos & cms",
    subtitle: "Enterprise POS, QR Menu & Table Reservation Suite",
    domain: "fullstack",
    description:
      "A full-stack ecosystem for restaurants and hospitality venues: low-latency POS desktop client, guest QR menu with custom CMS, and automated table reservation management. Migrated legacy spreadsheet storage to resilient cloud databases.",
    tags: ["C#", ".NET", "React", "TypeScript", "Django DRF", "TursoDB", "Docker"],
    url: null,
    metrics: "Production · 3 Integrated Products",
    highlights: [
      "Zero-downtime database migration from legacy Google Sheets to TursoDB",
      "Built multi-tenant QR menu with live menu editor and kitchen dispatch",
      "Engineered automated reservation scheduling system with conflict detection",
    ],
  },
  {
    id: "swiss-site",
    title: "swiss site: student intake survey",
    subtitle: "Dual-Diploma Candidate Pipeline Platform",
    domain: "fullstack",
    description:
      "An automated survey and candidate intake platform designed for APEC Petrotechnic students pursuing international double-diploma programs in Switzerland. Features instant Telegram bot webhook notification for admissions staff.",
    tags: ["React", "Vite", "Telegram Bot API", "Aiogram", "Webhooks", "Vercel"],
    url: "https://site-app-steel.vercel.app/",
    metrics: "Deployed · APEC Campus",
    highlights: [
      "Real-time webhook synchronization with Telegram bot for admissions leads",
      "Accessible bilingual intake questionnaire for prospective scholars",
      "Zero-latency automated logging and respondent triage",
    ],
  },
  {
    id: "kms-portal",
    title: "kaspi montazh service web portal",
    subtitle: "Corporate Web App & Containerized Office Setups",
    domain: "systems",
    description:
      "Corporate web application for Kaspi Montazh Service (KMS) alongside hands-on engineering deploying ruggedized computer systems in container-based field offices for industrial operations.",
    tags: ["Next.js", "Payload CMS", "React", "SharePoint", "Field IT", "Vercel"],
    url: null,
    metrics: "Enterprise IT · Industrial Field Ops",
    highlights: [
      "Delivered modern corporate web presence with headlessly managed content",
      "Deployed and networked on-site container workstations for field operations",
    ],
  },
];
