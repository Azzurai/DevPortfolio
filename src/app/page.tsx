"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  FileDown,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Terminal as TerminalIcon,
  Code2,
  Layers,
  Globe,
  Wifi,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Zap,
  Cpu,
  Sparkles,
} from "lucide-react";

const prefix = process.env.NODE_ENV === "production" ? "/DevPortfolio" : "";

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════════════
   COLOR UTILITIES
   ═══════════════════════════════════════════════════ */
const categoryColors: Record<
  string,
  { accent: string; bg: string; border: string; gradient: string; icon: string }
> = {
  web: {
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    gradient: "from-blue-500 to-cyan-500",
    icon: "text-blue-500",
  },
  automation: {
    accent: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    gradient: "from-purple-500 to-pink-500",
    icon: "text-purple-500",
  },
  electronics: {
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    gradient: "from-emerald-500 to-teal-500",
    icon: "text-emerald-500",
  },
  software: {
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    gradient: "from-amber-500 to-orange-500",
    icon: "text-amber-500",
  },
  ai: {
    accent: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    gradient: "from-rose-500 to-red-500",
    icon: "text-rose-500",
  },
};

const getCategoryStyle = (tags: string[]) => {
  for (const tag of tags) {
    if (categoryColors[tag]) return categoryColors[tag];
  }
  return categoryColors.web;
};

const skillColorMap: Record<
  string,
  { text: string; bg: string; border: string; icon: string }
> = {
  blue: {
    text: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
  },
  purple: {
    text: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: "text-purple-400",
  },
  emerald: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
  },
  amber: {
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
  },
};

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const projects = [
  {
    id: "mimos-crm",
    title: "MIMOS CRM System",
    category: "web",
    description:
      "A full-scale enterprise CRM centralizing customer records, quotations, invoices, Kanban sales pipelines, and an OCR-powered business card scanner — built for real-world operations at MIMOS Academy.",
    longDescription:
      "Developed during my industrial training at MIMOS Academy, this Customer Relationship Management platform was designed from the ground up to digitize and centralize the entire business operations workflow. The system features a comprehensive customer CRUD repository with advanced search and filtering, a drag-and-drop Kanban board for managing sales pipelines across multiple stages, a financial documentation module for generating and tracking quotations and invoices, and deep Google Apps Script integrations for automating data flows between services. One standout feature is the built-in OCR card scanner, which lets users snap a photo of a physical business card to automatically parse and import contact details into the CRM database — eliminating tedious manual data entry. The platform is hosted on cPanel with WinSCP for file management, secured with BCrypt password hashing and CSRF protection.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "cPanel", "WinSCP"],
    tags: ["web", "automation"],
    badge: "Enterprise Web App",
    impact: "Full enterprise CRM system",
    highlights: [
      "Centralized customer records, quotations, and invoices into one platform",
      "Drag-and-drop Kanban board for multi-stage sales pipeline management",
      "OCR-powered business card scanner for automatic contact import",
      "Google Apps Script integration for automated data flows",
      "BCrypt password hashing and CSRF protection for security",
    ],
    image: "/previews/crm/CRM Dashboard.png",
    screenshots: [
      "/previews/crm/CRM Dashboard.png",
      "/previews/crm/CRM CustList.png",
      "/previews/crm/CRM Sales Kanban.png",
      "/previews/crm/CRM Rec Opport.png",
      "/previews/crm/CRM Invoice Tracker.png",
      "/previews/crm/Quotation Tracker.png",
    ],
  },
  {
    id: "mimos-portal",
    title: "MIMOS Academy Portal",
    category: "web",
    description:
      "A production-grade training portal with secure participant logins, Google OAuth, password recovery, training program catalogs, and multi-step registration — deployed for MIMOS Academy's talent development programs.",
    longDescription:
      "An official training and talent development platform built to serve MIMOS Academy's mission of promoting skills in semiconductors, artificial intelligence, cybersecurity, and project management. The portal features a public-facing catalog of training programs with dynamic filtering by category, a responsive facilities showcase, and a news/announcements section. On the participant side, it implements full authentication flows including secure registration with email verification, Google OAuth single sign-on, and self-service password recovery with token-based reset links. All sessions are encrypted and protected against common web vulnerabilities. The platform was designed to scale across multiple concurrent training cohorts, with an admin backend for managing registrations, participant records, and program scheduling.",
    tech: ["PHP", "MySQL", "JavaScript", "Google OAuth", "HTML5", "CSS3"],
    tags: ["web", "security"],
    badge: "Production Portal",
    impact: "Live production deployment",
    highlights: [
      "Full authentication with email verification and Google OAuth SSO",
      "Self-service password recovery with token-based reset links",
      "Dynamic training program catalog with category filtering",
      "Admin backend for managing registrations and scheduling",
      "Encrypted sessions and web vulnerability protection",
    ],
    image: "/previews/mimosacademy/home.png",
    screenshots: [
      "/previews/mimosacademy/home.png",
      "/previews/mimosacademy/about.png",
      "/previews/mimosacademy/programs.png",
      "/previews/mimosacademy/facilities.png",
      "/previews/mimosacademy/news.png",
      "/previews/mimosacademy/contact.png",
    ],
  },
  {
    id: "forms-automation",
    title: "Google Forms Automation",
    category: "automation",
    description:
      "A zero-touch synchronization pipeline that automatically captures Google Forms registrations and writes them directly into the CRM's MySQL database — eliminating hours of manual admin data entry.",
    longDescription:
      "This automation project was born out of a real operational pain point: MIMOS Academy admins were manually copying registration data from Google Forms submissions into the CRM database, a repetitive and error-prone process. I built an end-to-end solution using Google Apps Script that triggers automatically whenever a new form submission is received. The script parses the structured form data, validates required fields, maps them to the corresponding database schema, and writes the records securely to the remote MySQL host via a custom JSON REST API endpoint. The pipeline includes error handling with retry logic, timestamp tracking for audit trails, and notification alerts for failed syncs. This single automation saved approximately 3–5 hours of manual work per week and ensured zero data-entry errors.",
    tech: [
      "Google Apps Script",
      "MySQL",
      "JSON REST API",
      "Workflow Automation",
    ],
    tags: ["automation"],
    badge: "Workflow Automation",
    impact: "Saved 3-5 hrs/week",
    highlights: [
      "Automated Google Forms → MySQL pipeline with zero manual intervention",
      "Custom JSON REST API endpoint for secure data writes",
      "Error handling with retry logic and notification alerts",
      "Timestamp tracking for complete audit trails",
      "Eliminated data-entry errors entirely",
    ],
    image: "/previews/forms-automation.png",
    screenshots: ["/previews/forms-automation.png"],
  },
  {
    id: "smart-combat",
    title: "Smart Combat System",
    category: "electronics",
    description:
      "A real-time EEG-based mental health and stress monitoring platform that analyzes brainwave signals during physical activities — featuring user dashboards, analytics, and document tracking.",
    longDescription:
      "Built as my Final Year Project, the Smart Combat System is an advanced health-tech platform designed to measure, visualize, and monitor stress levels in real-time during physical training activities such as martial arts or fitness exercises. The system captures raw brainwave data through EEG sensors worn by participants, processes the signals to extract key mental health indicators (alpha, beta, theta wave ratios), and maps the processed metrics onto interactive web dashboards. The platform includes a super-admin analytics panel with historical trend analysis, participant management with registration and profile systems, document status tracking for medical records, session audit logs for compliance, and a forgotten-password recovery flow. The project demonstrated the feasibility of using consumer-grade EEG hardware for practical wellness monitoring in training environments.",
    tech: [
      "EEG Sensors",
      "Signal Processing",
      "System Integration",
      "Data Analysis",
    ],
    tags: ["electronics", "ai"],
    badge: "Academic FYP",
    impact: "Final Year Project — Health Tech",
    highlights: [
      "Real-time EEG brainwave capture and signal processing",
      "Interactive web dashboards with historical trend analysis",
      "Super-admin analytics panel with participant management",
      "Document status tracking and session audit logs",
      "Demonstrated consumer-grade EEG for practical wellness monitoring",
    ],
    image: "/previews/smartcombat/SmartCombat_Super_Analytics.png",
    screenshots: [
      "/previews/smartcombat/SmartCombat_Super_Analytics.png",
      "/previews/smartcombat/SmartCombat_Index.png",
      "/previews/smartcombat/SmartCombat_Suuper_SD.png",
      "/previews/smartcombat/SmartCombat_Doc_Status.png",
      "/previews/smartcombat/SmartCombat_SD_Status.png",
      "/previews/smartcombat/SmartCombat_Super_AuditLog.png",
      "/previews/smartcombat/SmartCombat_Register.png",
      "/previews/smartcombat/SmartCombat_FP.png",
    ],
  },
  {
    id: "water-meter",
    title: "IoT Smart Water Meter",
    category: "electronics",
    description:
      "An ESP32-powered IoT system that monitors household water consumption in real-time, detects anomalies and leaks, and delivers remote telemetry data with usage alerts via Firebase.",
    longDescription:
      "This IoT prototype tackles the problem of manual water meter reading and undetected leaks in residential settings. Built on the ESP32 microcontroller platform, the system uses precision flow sensors to measure water consumption at the pipe level, sampling at high frequency for accurate readings. The captured telemetry data is transmitted wirelessly to a Firebase Realtime Database, where it is stored with timestamps for historical analysis. The companion dashboard displays real-time flow rates, cumulative daily/weekly/monthly usage, and projected billing estimates. The system implements anomaly detection logic that identifies unusual flow patterns (potential leaks or burst pipes) and triggers instant push notifications to the homeowner. Designed with low power consumption in mind, the device can operate for extended periods, making it practical for real-world deployment.",
    tech: [
      "ESP32",
      "IoT Flow Sensors",
      "C++",
      "Firebase",
      "Real-time Telemetry",
    ],
    tags: ["electronics"],
    badge: "IoT Prototype",
    impact: "Real-time anomaly detection",
    highlights: [
      "ESP32-based precision flow measurement at pipe level",
      "Firebase Realtime Database for telemetry storage and analysis",
      "Anomaly detection for leak and burst pipe identification",
      "Push notifications for real-time homeowner alerts",
      "Low-power design for extended real-world operation",
    ],
    image: "/previews/water-meter.png",
    screenshots: ["/previews/water-meter.png"],
  },
  {
    id: "hotel-booking",
    title: "Hotel Reservation Controller",
    category: "software",
    description:
      "A database-driven desktop application for managing hotel reservations, guest profiles, room assignments, check-in scheduling, and room servicing — built in Java with MySQL.",
    longDescription:
      "A comprehensive desktop booking management system developed using Java Swing for the graphical interface and MySQL for persistent data storage. The application streamlines the entire hotel front-desk workflow: receptionists can search room availability by date range, type, and floor; create and modify guest profiles with contact details and ID verification; manage reservations through their lifecycle (pending → confirmed → checked-in → checked-out); assign specific rooms based on guest preferences; and queue housekeeping and room servicing tasks. The system includes a visual room availability grid, printable booking confirmation receipts, and SQL-optimized queries for fast lookups even with large datasets. Built as an academic project, it demonstrates solid fundamentals in relational database design, CRUD operations, and desktop GUI development.",
    tech: ["Java", "MySQL", "SQL Queries", "Desktop GUI"],
    tags: ["software"],
    badge: "Desktop Software",
    impact: "Full CRUD lifecycle system",
    highlights: [
      "Complete reservation lifecycle management (pending → checked-out)",
      "Visual room availability grid with date-based search",
      "Guest profile management with ID verification",
      "Printable booking confirmation receipts",
      "SQL-optimized queries for fast lookups at scale",
    ],
    image: "/previews/hotel-booking.png",
    screenshots: ["/previews/hotel-booking.png"],
  },
];

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    color: "blue",
    skills: ["PHP", "JavaScript", "C++", "Java", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks & Tools",
    icon: Layers,
    color: "purple",
    skills: [
      "React",
      "Next.js",
      "MySQL",
      "Firebase",
      "Google Apps Script",
      "Framer Motion",
    ],
  },
  {
    title: "Infrastructure & DevOps",
    icon: Globe,
    color: "emerald",
    skills: [
      "cPanel",
      "WinSCP",
      "GitHub Pages",
      "ESP32",
      "IoT Sensors",
      "Git",
    ],
  },
  {
    title: "Networking",
    icon: Wifi,
    color: "amber",
    skills: [
      "Cisco Routing & Switching",
      "Network Design",
      "TCP/IP",
      "VLAN Configuration",
    ],
  },
];

const experienceData = [
  {
    type: "work" as const,
    title: "Engineering Intern",
    org: "MIMOS Academy",
    period: "Industrial Training",
    description:
      "Built and deployed enterprise-grade CRM and training portal systems used in daily operations.",
    achievements: [
      "Designed full-stack CRM with customer records, sales pipelines, and OCR card scanner",
      "Developed training portal with Google OAuth, email verification, and password recovery",
      "Automated Google Forms → MySQL pipeline, saving 3-5 hours/week of manual data entry",
    ],
  },
  {
    type: "education" as const,
    title: "Bachelor of Electronic Engineering Technology",
    org: "Universiti Malaysia Perlis (UniMAP)",
    period: "Electronic Network Design",
    description:
      "Specialized in electronic network design with focus on IoT, embedded systems, and signal processing.",
    achievements: null,
  },
  {
    type: "education" as const,
    title: "Diploma in Computer Engineering",
    org: "Universiti Malaysia Perlis (UniMAP)",
    period: "Computer Engineering",
    description:
      "Foundation in computer engineering, programming, digital systems, and network architecture.",
    achievements: null,
  },
];

const valueProps = [
  {
    icon: Layers,
    title: "Full-Stack Capable",
    description:
      "From MySQL schemas to responsive frontends — I own the entire stack.",
  },
  {
    icon: Briefcase,
    title: "Production Experience",
    description:
      "Systems I built are used in daily operations at MIMOS Academy.",
  },
  {
    icon: Cpu,
    title: "Hardware + Software",
    description:
      "Bridging embedded IoT sensors, microcontrollers, and web platforms.",
  },
  {
    icon: Zap,
    title: "Automation Mindset",
    description:
      "I find manual processes and eliminate them with code.",
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Home() {
  /* ─── State ─── */
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Type 'help' to see available commands or click the buttons below.",
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  /* ─── Refs ─── */
  const terminalInputRef = React.useRef<HTMLInputElement>(null);

  /* ─── Scroll Progress ─── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ─── Effects ─── */
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  React.useEffect(() => {
    const el = document.getElementById("terminal-bottom");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  /* ─── Derived ─── */
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  /* ─── Handlers ─── */
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("Muhdharizfahmi12@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = "";
    if (trimmed === "help") {
      response =
        "Available commands: 'about', 'skills', 'projects', 'contact', 'clear'";
    } else if (trimmed === "about") {
      response =
        "Muhammad Hariz Fahmi | Electronic Network Design graduate from UniMAP. Focuses on full-stack web architectures, cybersecurity, and IoT telemetry.";
    } else if (trimmed === "skills") {
      response =
        "Languages: PHP, JS, C++, Java, HTML5/CSS3. Backends: MySQL, Firebase, Google Apps Script. Cisco Network routing & switching certified.";
    } else if (trimmed === "projects") {
      response =
        "MIMOS CRM System, MIMOS Academy Portal, Smart Combat System, Google Forms Automation, IoT Smart Water Meter, Hotel Reservation Controller.";
    } else if (trimmed === "contact") {
      response =
        "Email: Muhdharizfahmi12@gmail.com | Phone: +6011-25409543 | Location: Perlis/Kuala Lumpur, Malaysia";
    } else if (trimmed === "clear") {
      setTerminalHistory([]);
      return;
    } else if (trimmed === "") {
      return;
    } else {
      response = `Command not found: '${cmd}'. Type 'help' for suggestions.`;
    }
    setTerminalHistory((prev) => [
      ...prev,
      `guest@hariz-desktop:~$ ${cmd}`,
      response,
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput);
      setTerminalInput("");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key:
            process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert(
          "Failed to send message: " + (result.message || "Unknown error")
        );
      }
    } catch {
      alert("Error sending message. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-300 font-sans antialiased overflow-x-hidden">
      {/* ─── SCROLL PROGRESS BAR ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        style={{ scaleX }}
      />

      {/* ─── BACKGROUND EFFECTS ─── */}
      <div className="fixed inset-0 grid-overlay opacity-[0.2] pointer-events-none z-0" />
      <div className="fixed top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0" />

      {/* ─── FLOATING NAVBAR ─── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 rounded-full border border-white/5 bg-black/60 backdrop-blur-xl px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            className="font-display font-extrabold text-lg text-white hover:text-blue-400 transition tracking-tight"
          >
            HARIZ<span className="text-blue-500">.</span>
          </a>
          <nav className="hidden sm:flex items-center gap-5 md:gap-7">
            <a
              href="#experience"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Skills
            </a>
            <a
              href="#about"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              About
            </a>
          </nav>
          <a
            href="#contact"
            className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition shadow-lg shadow-blue-500/20"
          >
            Contact
          </a>
        </div>
      </header>

      {/* ═════════════════════════════════════════════
          MAIN CONTENT
          ═════════════════════════════════════════════ */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 sm:pt-40">
        {/* ─────────────────────────────────────────
            HERO SECTION
            ───────────────────────────────────────── */}
        <section id="hero" className="min-h-[65vh] flex flex-col justify-center py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Open to Work Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="open-to-work-wrapper">
                  <span className="px-4 py-1.5 text-xs font-semibold text-emerald-400 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Open to Opportunities
                  </span>
                </div>
              </motion.div>

              {/* Name & Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tight"
              >
                Muhammad Hariz Fahmi
                <br />
                <span className="text-gradient-primary font-bold">
                  Software &amp; Network Engineer
                </span>
              </motion.h1>

              {/* Impact-focused tagline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light max-w-xl"
              >
                Built and deployed enterprise CRM systems, training portals,
                and IoT prototypes at{" "}
                <strong className="text-zinc-200">MIMOS Academy</strong>.
                Electronic Engineering graduate bridging software and hardware.
              </motion.p>

              {/* Social Proof Stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500"
              >
                {[
                  "6 Projects Built",
                  "Enterprise CRM",
                  "IoT Systems",
                  "Cisco Networking",
                ].map((stat) => (
                  <span
                    key={stat}
                    className="flex items-center gap-1.5 font-mono uppercase tracking-wider"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500" />
                    {stat}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a
                  href="#projects"
                  className="glow-button px-6 py-2.5 text-xs font-bold text-black bg-white hover:bg-zinc-200 rounded-lg transition flex items-center gap-1.5 shadow-xl shadow-white/5"
                >
                  View Featured Projects{" "}
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 rounded-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" /> View Resume
                </button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center gap-3 pt-1"
              >
                <a
                  href="https://www.linkedin.com/in/hariz-fahmi-87792722a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-white/5 hover:border-white/15 bg-white/3 transition text-zinc-500 hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Azzurai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-white/5 hover:border-white/15 bg-white/3 transition text-zinc-500 hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="mailto:Muhdharizfahmi12@gmail.com"
                  className="p-2.5 rounded-lg border border-white/5 hover:border-white/15 bg-white/3 transition text-zinc-500 hover:text-white"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <span className="w-px h-5 bg-white/10 mx-1" />
                <span className="text-[10px] text-zinc-600 font-mono">
                  Muhdharizfahmi12@gmail.com
                </span>
              </motion.div>
            </div>

            {/* Right: Avatar with floating badges (desktop only) */}
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-emerald-500/15 blur-3xl avatar-glow" />

                {/* Avatar Circle */}
                <div className="relative w-52 h-52 rounded-full bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-white/10 flex items-center justify-center shadow-2xl">
                  <span className="text-6xl font-display font-extrabold text-gradient-primary select-none">
                    HF
                  </span>
                </div>

                {/* Floating Tech Badges */}
                <div className="absolute -top-3 -right-4 float-badge px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-semibold shadow-lg backdrop-blur-sm">
                  PHP
                </div>
                <div className="absolute top-10 -right-12 float-badge-delayed px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono font-semibold shadow-lg backdrop-blur-sm">
                  MySQL
                </div>
                <div className="absolute -bottom-3 right-4 float-badge-delayed-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold shadow-lg backdrop-blur-sm">
                  IoT
                </div>
                <div className="absolute -bottom-4 -left-2 float-badge px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-semibold shadow-lg backdrop-blur-sm">
                  Cisco
                </div>
                <div className="absolute top-2 -left-10 float-badge-delayed px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-semibold shadow-lg backdrop-blur-sm">
                  React
                </div>
              </motion.div>
            </div>
          </div>

          {/* Collapsible Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-14"
          >
            <button
              onClick={() => {
                setShowTerminal(!showTerminal);
                if (!showTerminal)
                  setTimeout(() => terminalInputRef.current?.focus(), 100);
              }}
              className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition cursor-pointer group"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Interactive Terminal</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  showTerminal ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showTerminal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3"
                >
                  <div
                    onClick={() => terminalInputRef.current?.focus()}
                    className="w-full max-w-2xl rounded-xl border border-white/5 bg-[#08080a]/90 shadow-2xl overflow-hidden font-mono text-[11px] h-56 flex flex-col cursor-text"
                  >
                    {/* Terminal Title Bar */}
                    <div className="bg-[#121216] px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[10px] text-zinc-500">
                        guest@hariz-desktop:~
                      </span>
                      <span className="w-4" />
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 flex-1 overflow-y-auto space-y-2 text-zinc-400">
                      {terminalHistory.map((line, i) => (
                        <p
                          key={i}
                          className={
                            line.startsWith("guest@")
                              ? "text-blue-400 font-semibold"
                              : "text-zinc-300 font-light"
                          }
                        >
                          {line}
                        </p>
                      ))}
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <span className="text-blue-400 font-semibold shrink-0">
                          guest@hariz-desktop:~$
                        </span>
                        <input
                          ref={terminalInputRef}
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="bg-transparent border-none outline-none flex-1 font-mono text-[11px] p-0 text-white focus:ring-0 focus:outline-none"
                          placeholder="type a command..."
                        />
                      </div>
                      <div id="terminal-bottom" />
                    </div>

                    {/* Quick Command Chips */}
                    <div className="bg-[#0b0b0f] px-4 py-2 border-t border-white/5 flex flex-wrap gap-1.5 shrink-0">
                      {[
                        "help",
                        "about",
                        "skills",
                        "projects",
                        "contact",
                        "clear",
                      ].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => executeCommand(cmd)}
                          className="px-2 py-0.5 rounded border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-zinc-500 hover:text-white transition cursor-pointer text-[10px]"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ─────────────────────────────────────────
            EXPERIENCE & EDUCATION TIMELINE
            ───────────────────────────────────────── */}
        <motion.section
          id="experience"
          className="py-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2 mb-12" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Career &amp; Education
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              Experience
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[21px] top-2 bottom-8 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/30 to-transparent" />

            <div className="space-y-10">
              {experienceData.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="relative pl-14"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-[14px] top-2 w-[14px] h-[14px] rounded-full border-[3px] border-[#030303] ${
                      item.type === "work"
                        ? "bg-blue-500 timeline-dot"
                        : "bg-purple-500/60"
                    }`}
                  />

                  {/* Card */}
                  <div className="glass-panel p-6 rounded-xl">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {item.type === "work" ? (
                        <Briefcase className="w-4 h-4 text-blue-400" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-purple-400" />
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold ${
                          item.type === "work"
                            ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                            : "bg-purple-500/10 border border-purple-500/20 text-purple-400"
                        }`}
                      >
                        {item.period}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-0.5">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm font-semibold mb-2 ${
                        item.type === "work"
                          ? "text-blue-400"
                          : "text-purple-400"
                      }`}
                    >
                      {item.org}
                    </p>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">
                      {item.description}
                    </p>

                    {item.achievements && (
                      <ul className="mt-4 space-y-2">
                        {item.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-zinc-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="font-light">{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            PROJECTS SECTION
            ───────────────────────────────────────── */}
        <motion.section
          id="projects"
          className="py-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
            variants={fadeUp}
          >
            <div className="space-y-2">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
                Engineering Portfolio
              </span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                Featured Projects
              </h2>
            </div>
            <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-[#0a0a0c] border border-white/5">
              {[
                { label: "All Projects", value: "all" },
                { label: "Web Apps", value: "web" },
                { label: "Automation", value: "automation" },
                { label: "Electronics & IoT", value: "electronics" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === filter.value
                      ? "bg-zinc-800 text-white shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => {
              const catStyle = getCategoryStyle(project.tags);
              return (
                <motion.article
                  layout
                  key={project.id}
                  variants={fadeUp}
                  onClick={() => setSelectedProject(project)}
                  onMouseMove={handleMouseMove}
                  className="group cursor-pointer glass-panel rounded-xl flex flex-col justify-between min-h-[460px] border border-white/5 hover:border-blue-500/30 transition-all duration-300 spotlight-card overflow-hidden"
                >
                  {/* Category Stripe */}
                  <div
                    className={`card-stripe w-full bg-gradient-to-r ${catStyle.gradient}`}
                  />

                  <div className="p-5 space-y-4 relative z-10 flex-1 flex flex-col">
                    {/* Thumbnail */}
                    {project.image && (
                      <div className="w-full h-44 rounded-lg overflow-hidden border border-white/5 bg-zinc-950 relative">
                        <img
                          src={`${prefix}${project.image}`}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/60 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Badge & Arrow */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 text-[9px] font-bold border rounded uppercase tracking-wider ${catStyle.bg} ${catStyle.border} ${catStyle.accent}`}
                      >
                        {project.badge}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-400 transition tracking-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Impact Metric */}
                    {project.impact && (
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          {project.impact}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 px-5 pb-5 pt-0 border-t border-white/5 relative z-10 mt-auto">
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-black border border-white/5 text-[10px] text-zinc-400 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-[10px] text-zinc-500 font-mono self-center">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        {/* ─────────────────────────────────────────
            SKILLS & TECHNOLOGIES
            ───────────────────────────────────────── */}
        <motion.section
          id="skills"
          className="py-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2 mb-12" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Technical Proficiency
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              Skills &amp; Technologies
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat) => {
              const colors = skillColorMap[cat.color];
              const IconComponent = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  variants={fadeUp}
                  className="glass-panel skill-card p-6 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${colors.icon}`}
                      />
                    </div>
                    <h3 className="font-display font-bold text-white text-base">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border} ${colors.text} text-xs font-mono transition hover:scale-105`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            ABOUT SECTION
            ───────────────────────────────────────── */}
        <motion.section
          id="about"
          className="py-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* "What I Bring" Value Props */}
          <motion.div className="space-y-2 mb-10" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Why Work With Me
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              What I Bring
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {valueProps.map((prop, idx) => {
              const PropIcon = prop.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="value-card glass-panel p-6 rounded-xl text-center border border-white/5 hover:border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <PropIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm mb-1.5">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {prop.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bio Text */}
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-2">
                <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
                  About Hariz
                </span>
                <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                  Engineering Bio
                </h2>
              </div>
              <div className="lg:col-span-2 space-y-5 text-zinc-400 leading-relaxed font-light text-base">
                <p>
                  I hold a{" "}
                  <strong className="text-zinc-200">
                    Bachelor&apos;s Degree in Electronic Engineering Technology
                    (Electronic Network Design)
                  </strong>{" "}
                  and a{" "}
                  <strong className="text-zinc-200">
                    Diploma in Computer Engineering
                  </strong>{" "}
                  from Universiti Malaysia Perlis (UniMAP).
                </p>
                <p>
                  My background bridges full-stack software development with
                  electronic systems. I specialize in designing responsive
                  business portals (such as the{" "}
                  <strong className="text-zinc-200">MIMOS CRM</strong> and{" "}
                  <strong className="text-zinc-200">
                    MIMOS Academy training platform
                  </strong>
                  ), scripting workflow triggers, and deploying embedded IoT
                  prototypes.
                </p>
                <p>
                  I focus on writing structured, documentation-backed backend
                  software while remaining comfortable configuring network
                  interfaces, debugging routing issues, and building automation
                  pipelines.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─────────────────────────────────────────
            CONTACT SECTION
            ───────────────────────────────────────── */}
        <motion.section
          id="contact"
          className="py-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info Cards */}
            <motion.div className="lg:col-span-1 space-y-8" variants={fadeUp}>
              <div className="space-y-4">
                <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-zinc-400 font-light">
                  Available for software engineering and network systems roles.
                  Reach out directly.
                </p>
              </div>

              <div className="space-y-4">
                <div
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-white/10 bg-zinc-950/40 cursor-pointer transition"
                >
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold text-white">
                      Muhdharizfahmi12@gmail.com
                    </p>
                    {copiedEmail && (
                      <p className="text-[10px] text-emerald-400 mt-0.5">
                        Email address copied!
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href="tel:011-10721428"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-white/10 bg-zinc-950/40 cursor-pointer transition block"
                >
                  <Phone className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      Phone Number
                    </p>
                    <p className="text-sm font-semibold text-white">
                      011-10721428
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-zinc-950/40">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-white">
                      Bedong, Kedah, Malaysia
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/hariz-fahmi-87792722a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-white/5 hover:border-white/10 bg-[#0a0a0c] transition text-zinc-400 hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Azzurai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-white/5 hover:border-white/10 bg-[#0a0a0c] transition text-zinc-400 hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Message Form */}
            <motion.div className="lg:col-span-2" variants={fadeUp}>
              <form
                onSubmit={handleFormSubmit}
                className="glass-panel p-8 rounded-xl space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-black/60 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-lg text-white outline-none text-sm transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-black/60 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-lg text-white outline-none text-sm transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Hello Hariz, I would love to discuss a software engineering opportunity..."
                    className="w-full px-4 py-3 bg-black/60 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-lg text-white outline-none text-sm transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || formSubmitted}
                  className="w-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {formSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />{" "}
                      Message Sent Successfully!
                    </>
                  ) : isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* ═════════════════════════════════════════════
          FOOTER
          ═════════════════════════════════════════════ */}
      <footer className="relative z-10 py-12 border-t border-white/5 mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Branding & Copyright */}
            <div className="text-center md:text-left space-y-1">
              <a
                href="#hero"
                className="font-display font-extrabold text-base text-white hover:text-blue-400 transition tracking-tight"
              >
                HARIZ<span className="text-blue-500">.</span>
              </a>
              <p className="text-[11px] text-zinc-600">
                © {new Date().getFullYear()} Muhammad Hariz Fahmi. All rights
                reserved.
              </p>
            </div>

            {/* Center: Tech Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Next.js", "React", "Tailwind CSS", "Framer Motion"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/3 border border-white/5 text-[10px] text-zinc-500 font-mono"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Right: Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/hariz-fahmi-87792722a"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/3 transition text-zinc-500 hover:text-white"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Azzurai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/3 transition text-zinc-500 hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:Muhdharizfahmi12@gmail.com"
                className="p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/3 transition text-zinc-500 hover:text-white"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═════════════════════════════════════════════
          PROJECT DETAIL MODAL
          ═════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0c] border border-white/5 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg border border-white/5 hover:border-white/10 bg-zinc-900 transition text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-mono uppercase tracking-wider ${
                    getCategoryStyle(selectedProject.tags).bg
                  } border ${getCategoryStyle(selectedProject.tags).border} ${
                    getCategoryStyle(selectedProject.tags).accent
                  }`}
                >
                  {selectedProject.badge}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {selectedProject.title}
                </h3>
                {selectedProject.impact && (
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-sm text-emerald-400 font-semibold">
                      {selectedProject.impact}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4 text-sm text-zinc-400 font-light leading-relaxed">
                {/* Screenshot Carousel */}
                {selectedProject.screenshots &&
                selectedProject.screenshots.length > 0 ? (
                  <div className="space-y-2">
                    <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-white/5 bg-zinc-950 relative group/slider">
                      <img
                        src={`${prefix}${selectedProject.screenshots[currentImageIndex]}`}
                        alt={`${selectedProject.title} screenshot ${
                          currentImageIndex + 1
                        }`}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                      {selectedProject.screenshots.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev: number) =>
                                prev === 0
                                  ? selectedProject.screenshots.length - 1
                                  : prev - 1
                              );
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/5 text-white hover:bg-black/80 transition opacity-0 group-hover/slider:opacity-100 cursor-pointer text-xs"
                          >
                            ←
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev: number) =>
                                prev ===
                                selectedProject.screenshots.length - 1
                                  ? 0
                                  : prev + 1
                              );
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/5 text-white hover:bg-black/80 transition opacity-0 group-hover/slider:opacity-100 cursor-pointer text-xs"
                          >
                            →
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/55 px-3 py-1 rounded-full border border-white/5">
                            {selectedProject.screenshots.map(
                              (_: any, idx: number) => (
                                <span
                                  key={idx}
                                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    idx === currentImageIndex
                                      ? "bg-blue-500 scale-125"
                                      : "bg-zinc-600"
                                  }`}
                                />
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  selectedProject.image && (
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-white/5 bg-zinc-950 relative">
                      <img
                        src={`${prefix}${selectedProject.image}`}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}

                {/* Project Overview */}
                <div>
                  <h4 className="font-display font-bold text-white mb-2 text-base">
                    Project Overview
                  </h4>
                  <p>{selectedProject.longDescription}</p>
                </div>

                {/* Key Achievements */}
                {selectedProject.highlights && (
                  <div>
                    <h4 className="font-display font-bold text-white mb-3 text-base">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map(
                        (h: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="font-display font-bold text-white mb-2 text-base">
                    Technologies &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-black border border-white/5 text-xs text-zinc-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════
          RESUME PREVIEW MODAL
          ═════════════════════════════════════════════ */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResumeModal(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0c] border border-white/5 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden p-6 shadow-2xl relative flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-xl text-white">
                    Curriculum Vitae Preview
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    Muhammad Hariz Fahmi Bin Mohamad Shahidi
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={`${prefix}/resume.pdf`}
                    download="Muhammad_Hariz_Fahmi_Resume.pdf"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center gap-1.5 shadow-lg shadow-blue-500/15"
                  >
                    <FileDown className="w-3.5 h-3.5" /> Download PDF
                  </a>
                  <button
                    onClick={() => setShowResumeModal(false)}
                    className="p-2 rounded-lg border border-white/5 hover:border-white/10 bg-zinc-900 transition text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full bg-zinc-950 rounded-xl overflow-hidden relative">
                <iframe
                  src={`${prefix}/resume.pdf#toolbar=0`}
                  className="w-full h-[65vh] border-0"
                  title="Resume Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
