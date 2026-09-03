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
  Database,
  ShieldCheck,
  Wrench,
  Cpu,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Zap,
  Award,
  Lock,
  ArrowRight,
  Workflow,
  Search,
  Target,
} from "lucide-react";

const prefix = process.env.NODE_ENV === "production" ? "/DevPortfolio" : "";

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ═══════════════════════════════════════════════════
   PROJECT DATA TYPES & DEFINITION
   ═══════════════════════════════════════════════════ */
interface Project {
  id: string;
  title: string;
  category: "featured" | "other";
  projectType: string;
  role: string;
  status: string;
  shortDescription: string;
  tech: string[];
  image?: string;
  screenshots?: string[];
  // Case study fields (for featured projects)
  overview?: string;
  capabilities?: string[];
  workflowSteps?: string[];
  architectureSummary?: string;
  challenges?: string;
  solutions?: string;
  outcome?: string;
  highlights?: string[];
  isPrivate?: boolean;
}

const featuredProjects: Project[] = [
  {
    id: "mimos-crm",
    title: "MIMOS Customer Relationship Management (CRM)",
    category: "featured",
    projectType: "Professional Project",
    role: "Full-Stack Development • Backend Development • Database • Automation",
    status: "Private Project",
    isPrivate: true,
    shortDescription:
      "A web-based Customer Relationship Management (CRM) system that centralises customer information, sales activities, quotations, and invoices.",
    tech: [
      "PHP",
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "AJAX",
      "Google Apps Script",
      "REST API",
    ],
    overview:
      "A web-based Customer Relationship Management (CRM) system that centralises customer information, sales activities, quotations, and invoices, built to support daily business operations at MIMOS Academy.",
    capabilities: [
      "Customer management repository with filtering and search",
      "Sales tracking and multi-stage Kanban pipeline",
      "Quotation generation and financial tracking",
      "Invoice management and document history",
      "Business document management",
      "Business card data processing via OCR scanning",
      "Automated participant registration sync",
    ],
    architectureSummary:
      "Browser frontend sends authenticated requests to a PHP backend with CSRF token verification and BCrypt credential hashing. The backend interfaces with a normalized MySQL database. Webhooks and Google Apps Script pipelines communicate via JSON REST API endpoints to ingest automated registration data.",
    challenges:
      "Disparate spreadsheet-based tracking caused data duplication and delays in issuing quotations and tracking participant statuses across training cohorts.",
    solutions:
      "Designed a centralized relational database schema in MySQL, built modular PHP backend controllers for customer CRUD and invoice handling, and introduced an automated synchronization endpoint for external registrations.",
    outcome:
      "Eliminated manual spreadsheet reconciliation, unified customer and financial records, and established an efficient operational pipeline for MIMOS Academy staff.",
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
    category: "featured",
    projectType: "Professional Project",
    role: "Web Application Development • Backend • Authentication • Database",
    status: "Private Project",
    isPrivate: true,
    shortDescription:
      "An official training portal that provides information about MIMOS Academy, training programmes, facilities, and events.",
    tech: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Google OAuth"],
    overview:
      "An official training portal that provides information about MIMOS Academy, training programmes, facilities, and events, equipped with participant account management and secure registration workflows.",
    capabilities: [
      "Training programme catalog with dynamic category browsing",
      "Multi-step participant registration",
      "User account management & profile maintenance",
      "Participant enquiries and contact handling",
      "Secure authentication with session management",
      "Google OAuth single sign-on integration",
      "Self-service password recovery workflows",
      "Website security features and sanitized inputs",
    ],
    architectureSummary:
      "Built with a responsive front-end interface connecting to PHP backend handlers. Authentication supports traditional credential-based access (with BCrypt hashing and token-based password reset links) alongside Google OAuth 2.0. MySQL stores course schedules, user profiles, and event records.",
    challenges:
      "Coordinating multi-cohort training intake while offering a frictionless, secure participant onboarding experience across various devices.",
    solutions:
      "Implemented streamlined self-service registration, Google OAuth sign-in, dynamic course catalogs, and administrative controls for participant management.",
    outcome:
      "Provided a secure, accessible web portal presenting MIMOS Academy's technology training programs to participants and industry partners.",
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
    title: "Google Forms Automation System",
    category: "featured",
    projectType: "Business Workflow Automation",
    role: "Backend Development • API Integration • Workflow Automation",
    status: "Internal Automation",
    isPrivate: true,
    shortDescription:
      "An automated registration workflow that transfers participant information from Google Forms into the CRM database, reducing manual data entry and improving registration efficiency.",
    tech: [
      "Google Apps Script",
      "PHP",
      "MySQL",
      "JSON REST API",
      "Google Forms",
      "Google Sheets",
    ],
    overview:
      "An automated registration workflow that transfers participant information from Google Forms into the CRM database, reducing manual data entry and improving registration efficiency.",
    workflowSteps: [
      "Participant",
      "Google Forms",
      "Google Sheets",
      "Google Apps Script",
      "PHP / API",
      "MySQL",
      "MIMOS CRM",
    ],
    capabilities: [
      "Zero-touch data capture upon form submission",
      "Automated payload validation and sanitization in Apps Script",
      "Custom JSON REST API endpoint on the server to ingest records",
      "Direct insertion and schema mapping into MySQL CRM tables",
      "Error logging and retry mechanisms for failed requests",
      "Complete elimination of repetitive manual copying",
    ],
    architectureSummary:
      "Google Forms event trigger triggers a Google Apps Script function upon form submission. Apps Script extracts the response fields, packages them into a JSON payload, and issues an authenticated HTTP POST request to a dedicated PHP REST endpoint. The PHP script validates the API key, sanitizes inputs, and executes parameterized SQL queries against MySQL.",
    challenges:
      "Staff previously spent 3–5 hours per week manually re-typing participant details from spreadsheet export sheets into the CRM, leading to occasional typos and delays.",
    solutions:
      "Constructed an event-driven automation bridge linking Google Forms submissions directly to the relational database through an authenticated API layer.",
    outcome:
      "Achieved instant, error-free participant registration in the CRM database immediately upon form submission, freeing administrative staff for high-value tasks.",
    image: "/previews/forms-automation.png",
    screenshots: ["/previews/forms-automation.png"],
  },
];

const otherProjects: Project[] = [
  {
    id: "smart-combat",
    title: "Smart Combat – Mental Health Monitoring System",
    category: "other",
    projectType: "Academic Project (FYP)",
    role: "System Integration • Data Analysis • Interface Development",
    status: "Academic Final Year Project",
    shortDescription:
      "A system that monitors students' stress levels by analysing EEG brainwave signals during physical activities.",
    tech: [
      "EEG Sensors",
      "Signal Processing",
      "System Integration",
      "Data Analysis",
    ],
    overview:
      "A system that monitors students' stress levels by analysing EEG brainwave signals during physical activities, mapping mental state indicators to a web-based dashboard.",
    capabilities: [
      "EEG data collection during physical sessions",
      "Real-time stress signal monitoring",
      "Brainwave data analysis and frequency ratio processing",
      "Visual dashboard with historical session trends",
      "User status and documentation tracking",
    ],
    image: "/previews/smartcombat/SmartCombat_Super_Analytics.png",
    screenshots: [
      "/previews/smartcombat/SmartCombat_Super_Analytics.png",
      "/previews/smartcombat/SmartCombat_Index.png",
      "/previews/smartcombat/SmartCombat_Doc_Status.png",
      "/previews/smartcombat/SmartCombat_Register.png",
    ],
  },
  {
    id: "water-meter",
    title: "IoT Smart Water Meter Reader",
    category: "other",
    projectType: "IoT Prototype",
    role: "Embedded Firmware • IoT Telemetry • Cloud Integration",
    status: "Hardware & Cloud Prototype",
    shortDescription:
      "A smart water monitoring system that records water usage using sensors and provides real-time consumption data.",
    tech: ["ESP32", "Flow Sensors", "C++", "Firebase", "Real-time Telemetry"],
    overview:
      "A smart water monitoring system that records water usage using precision flow sensors and provides real-time consumption data transmitted wirelessly.",
    capabilities: [
      "Sensor-based water flow monitoring",
      "ESP32 microcontroller firmware in C++",
      "Wireless telemetry sync to Firebase Realtime Database",
      "Water consumption tracking and abnormal flow detection",
    ],
    image: "/previews/water-meter.png",
    screenshots: ["/previews/water-meter.png"],
  },
  {
    id: "hotel-booking",
    title: "Hotel Booking Management System",
    category: "other",
    projectType: "Desktop Software",
    role: "Desktop GUI • Database Design • SQL Queries",
    status: "Academic Coursework",
    shortDescription:
      "A database-driven hotel booking and guest management system.",
    tech: ["Java", "MySQL", "SQL Queries", "Desktop GUI"],
    overview:
      "A database-driven hotel booking and guest management system providing reservation management, room assignments, and guest records.",
    capabilities: [
      "Room reservation booking and status lifecycle",
      "Check-in and check-out scheduling",
      "Customer and guest profile records",
      "Relational MySQL database management with structured queries",
    ],
    image: "/previews/hotel-booking.png",
    screenshots: ["/previews/hotel-booking.png"],
  },
];

/* ═══════════════════════════════════════════════════
   SKILLS DATA (Exact 6 Categories as Specified)
   ═══════════════════════════════════════════════════ */
const technicalSkills = [
  {
    title: "Full-Stack Web Development",
    icon: Code2,
    color: "blue",
    skills: [
      "PHP",
      "HTML5",
      "CSS3",
      "JavaScript",
      "AJAX",
      "REST API Integration",
      "CRUD Application Development",
      "Responsive Web Development",
      "Website Deployment",
    ],
  },
  {
    title: "Backend & Automation",
    icon: Zap,
    color: "purple",
    skills: [
      "PHP Backend Development",
      "Google Apps Script",
      "Google Forms",
      "Google Sheets",
      "Business Workflow Automation",
      "OCR-Based Data Processing",
    ],
  },
  {
    title: "Database Management",
    icon: Database,
    color: "emerald",
    skills: ["MySQL", "SQL", "phpMyAdmin", "Firebase (Basic)"],
  },
  {
    title: "Cybersecurity & Authentication",
    icon: ShieldCheck,
    color: "amber",
    skills: [
      "Google OAuth",
      "BCrypt Password Hashing",
      "CSRF Protection",
      "Session Management",
      "Input Validation",
      "Password Recovery Workflows",
      "Cloudflare Turnstile",
    ],
  },
  {
    title: "Development Tools",
    icon: Wrench,
    color: "cyan",
    skills: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "cPanel",
      "WinSCP",
      "XAMPP",
    ],
  },
  {
    title: "Additional Technical Skills",
    icon: Cpu,
    color: "rose",
    skills: [
      "Java",
      "C++",
      "ESP32",
      "Cisco Packet Tracer",
      "Wireshark",
      "PuTTY",
      "TCP/IP",
      "Basic Network Troubleshooting",
    ],
  },
];

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
  cyan: {
    text: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: "text-cyan-400",
  },
  rose: {
    text: "text-rose-300",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: "text-rose-400",
  },
};

/* ═══════════════════════════════════════════════════
   CERTIFICATIONS DATA (from Resume)
   ═══════════════════════════════════════════════════ */
const certifications = [
  {
    name: "CCNAv7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
  },
  {
    name: "CCNAv7: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
  },
  {
    name: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
  },
  {
    name: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
  },
  {
    name: "Altera Advanced FPGA Curriculum (2.0)",
    issuer: "Intel / Altera",
  },
  {
    name: "AI Integrated Circuit Design and Fabrication",
    issuer: "Asia Pacific University (APU)",
  },
];

/* ═══════════════════════════════════════════════════
   EXPERIENCE DATA (MIMOS + MASDAR + Education)
   ═══════════════════════════════════════════════════ */
const workExperience = [
  {
    isPrimary: true,
    title: "Software & Business Systems Intern",
    company: "MIMOS Academy (SBU under MIMOS Services Sdn. Bhd.)",
    period: "February 2026 – July 2026",
    description:
      "Worked on web application development, business system automation, and daily operational support for MIMOS Academy.",
    bullets: [
      "Developed and enhanced the MIMOS Customer Relationship Management (CRM) System and MIMOS Academy Portal.",
      "Built and improved CRM modules for customer management, sales tracking, quotations, and invoices.",
      "Developed an automated participant registration workflow using Google Forms, Google Apps Script, PHP, and MySQL.",
      "Assisted in implementing secure authentication features, including Google OAuth and password recovery.",
      "Prepared quotations, cost sheets, invoice requests, and technical documentation for training programmes.",
      "Supported programme coordination, customer communication, and training sessions as an assistant trainer.",
      "Assisted in developing the \"AI System Thinking: Practical Applications Using Generative AI\" training module.",
    ],
  },
  {
    isPrimary: false,
    title: "Multimedia & Technology Intern",
    company: "MASDAR Technologies",
    period: "January 2022 – April 2022",
    description:
      "Supported multimedia production, website development, and drone inspection activities.",
    bullets: [
      "Assisted in website development using HTML and Java.",
      "Supported drone operations for telecommunication infrastructure inspections.",
      "Prepared reports and documentation for inspection activities.",
      "Assisted with multimedia editing and content preparation.",
    ],
  },
];

const educationData = [
  {
    degree: "Bachelor of Electronic Engineering Technology",
    specialization: "Electronic Network Design",
    institution: "Universiti Malaysia Perlis (UniMAP)",
  },
  {
    degree: "Diploma in Computer Engineering",
    specialization: "Computer Engineering",
    institution: "Universiti Malaysia Perlis (UniMAP)",
  },
];

/* ═══════════════════════════════════════════════════
   WHAT I BRING DATA
   ═══════════════════════════════════════════════════ */
const whatIBring = [
  {
    icon: Code2,
    title: "FULL-STACK DEVELOPMENT",
    description:
      "Experience building responsive web applications across frontend, backend, database, and deployment.",
  },
  {
    icon: Zap,
    title: "BACKEND & AUTOMATION",
    description:
      "Experience with PHP backend development, MySQL, REST APIs, Google Apps Script, and workflow automation.",
  },
  {
    icon: Briefcase,
    title: "BUSINESS SYSTEMS",
    description:
      "Hands-on experience developing CRM and training systems that support real business operations.",
  },
  {
    icon: Target,
    title: "PROBLEM SOLVING",
    description:
      "Experience with system testing, debugging, database management, technical documentation, and process improvement.",
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
    "Type 'help' for available commands.",
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const terminalInputRef = React.useRef<HTMLInputElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  React.useEffect(() => {
    const el = document.getElementById("terminal-bottom");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

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
        "Available commands: 'about', 'skills', 'projects', 'experience', 'contact', 'clear'";
    } else if (trimmed === "about") {
      response =
        "Muhammad Hariz Fahmi | Full-Stack Developer with hands-on experience in business web applications, CRM systems, and backend automation at MIMOS Academy.";
    } else if (trimmed === "skills") {
      response =
        "PHP, MySQL, JavaScript, AJAX, REST APIs, Google Apps Script, Git, cPanel, HTML5, CSS3, SQL.";
    } else if (trimmed === "projects") {
      response =
        "1. MIMOS CRM (PHP/MySQL/Apps Script) | 2. MIMOS Academy Portal (PHP/OAuth) | 3. Google Forms Automation System.";
    } else if (trimmed === "experience") {
      response =
        "Software & Business Systems Intern @ MIMOS Academy (Feb 2026 - Jul 2026) | Multimedia & Tech Intern @ MASDAR Technologies (2022).";
    } else if (trimmed === "contact") {
      response =
        "Email: Muhdharizfahmi12@gmail.com | Phone: 011-10721428 | Location: Bedong, Kedah / Kuala Lumpur, Malaysia";
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
            process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "6917d69d-219e-4cc1-aeed-36a317f230da",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
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

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-300 font-sans antialiased overflow-x-hidden">
      {/* ─── SCROLL PROGRESS BAR ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        style={{ scaleX }}
      />

      {/* ─── BACKGROUND GLOWS ─── */}
      <div className="fixed inset-0 grid-overlay opacity-[0.2] pointer-events-none z-0" />
      <div className="fixed top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0" />

      {/* ─── FLOATING NAVBAR ─── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-50 rounded-full border border-white/5 bg-black/60 backdrop-blur-xl px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            className="font-display font-extrabold text-lg text-white hover:text-blue-400 transition tracking-tight"
          >
            HARIZ<span className="text-blue-500">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#projects"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Skills
            </a>
            <a
              href="#certifications"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Certifications
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
          MAIN CONTAINER
          ═════════════════════════════════════════════ */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 sm:pt-36">
        {/* ─────────────────────────────────────────
            1. HERO SECTION
            ───────────────────────────────────────── */}
        <section id="hero" className="min-h-[62vh] flex flex-col justify-center py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
            {/* Left Column: Core Positioning */}
            <div className="lg:col-span-8 space-y-6">
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

              {/* Title & Name */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
                >
                  Muhammad Hariz Fahmi
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="text-xl sm:text-2xl font-bold text-gradient-primary tracking-tight"
                >
                  Full-Stack Developer | Backend &amp; Automation
                </motion.p>
              </div>

              {/* Main Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light max-w-2xl"
              >
                Full-Stack Developer with hands-on experience building business
                web applications, CRM systems, backend automation, and secure user
                authentication at <strong>MIMOS Academy</strong>.
              </motion.p>

              {/* Supporting Tech Line */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 text-xs font-mono text-blue-300"
              >
                <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>PHP • MySQL • JavaScript • REST API • Google Apps Script • Git</span>
              </motion.div>

              {/* THREE HIGHLY VISIBLE CTA BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                {/* GitHub CTA */}
                <a
                  href="https://github.com/Azzurai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg font-bold text-xs bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 hover:border-white/30 transition shadow-lg flex items-center gap-2"
                >
                  <Github className="w-4 h-4 text-zinc-300" />
                  <span>GitHub</span>
                </a>

                {/* LinkedIn CTA */}
                <a
                  href="https://www.linkedin.com/in/hariz-fahmi-87792722a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg font-bold text-xs bg-[#0a66c2] hover:bg-[#084e96] text-white transition shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                  <span>LinkedIn</span>
                </a>

                {/* Resume Modal CTA */}
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="px-5 py-2.5 rounded-lg font-bold text-xs bg-white text-black hover:bg-zinc-200 transition shadow-lg shadow-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-black" />
                  <span>Resume</span>
                </button>

                {/* Direct Project Scroll */}
                <a
                  href="#projects"
                  className="px-4 py-2.5 rounded-lg font-semibold text-xs text-zinc-400 hover:text-white transition flex items-center gap-1.5"
                >
                  View Projects <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

            {/* Right Column: Clean Developer Visual (Software-first tags) */}
            <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                {/* Ambient Glow */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-emerald-500/15 blur-3xl avatar-glow" />

                {/* Avatar Badge Circle */}
                <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-[#0c1322] to-[#161329] border border-white/10 flex flex-col items-center justify-center shadow-2xl">
                  <span className="text-5xl font-display font-extrabold text-gradient-primary select-none">
                    HF
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-widest">
                    Developer
                  </span>
                </div>

                {/* Floating Software Tags */}
                <div className="absolute -top-2 -right-2 float-badge px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-mono font-bold shadow-lg backdrop-blur-sm">
                  PHP
                </div>
                <div className="absolute top-12 -right-8 float-badge-delayed px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-bold shadow-lg backdrop-blur-sm">
                  MySQL
                </div>
                <div className="absolute -bottom-2 right-4 float-badge-delayed-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold shadow-lg backdrop-blur-sm">
                  REST API
                </div>
                <div className="absolute -bottom-3 -left-3 float-badge px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold shadow-lg backdrop-blur-sm">
                  Apps Script
                </div>
                <div className="absolute top-4 -left-8 float-badge-delayed px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold shadow-lg backdrop-blur-sm">
                  JavaScript
                </div>
              </motion.div>
            </div>
          </div>

          {/* Interactive Terminal (Collapsible) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="mt-10"
          >
            <button
              onClick={() => {
                setShowTerminal(!showTerminal);
                if (!showTerminal)
                  setTimeout(() => terminalInputRef.current?.focus(), 100);
              }}
              className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Interactive Developer Terminal</span>
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
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-3"
                >
                  <div
                    onClick={() => terminalInputRef.current?.focus()}
                    className="w-full max-w-2xl rounded-xl border border-white/5 bg-[#08080a]/90 shadow-2xl overflow-hidden font-mono text-[11px] h-52 flex flex-col cursor-text"
                  >
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

                    <div className="p-3.5 flex-1 overflow-y-auto space-y-1.5 text-zinc-400">
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

                    <div className="bg-[#0b0b0f] px-4 py-1.5 border-t border-white/5 flex flex-wrap gap-1.5 shrink-0">
                      {[
                        "help",
                        "about",
                        "skills",
                        "projects",
                        "experience",
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
            2. FEATURED / PROFESSIONAL PROJECTS
            ───────────────────────────────────────── */}
        <motion.section
          id="projects"
          className="py-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2 mb-10" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Software Engineering Work
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              Featured / Professional Projects
            </h2>
            <p className="text-sm text-zinc-400 font-light max-w-xl">
              Business web applications, CRM systems, and workflow automations
              developed for operational environments at MIMOS Academy.
            </p>
          </motion.div>

          {/* Featured Projects Grid (High Prominence) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <motion.article
                key={project.id}
                variants={fadeUp}
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                className="group cursor-pointer glass-panel rounded-xl flex flex-col justify-between border border-white/10 hover:border-blue-500/40 transition-all duration-300 spotlight-card overflow-hidden"
              >
                {/* Accent Top Line */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                <div className="p-5 space-y-4 flex-1 flex flex-col">
                  {/* Image Preview */}
                  {project.image && (
                    <div className="w-full h-44 rounded-lg overflow-hidden border border-white/10 bg-zinc-950 relative">
                      <img
                        src={`${prefix}${project.image}`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Metadata Row: Project Type & Status */}
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold uppercase tracking-wider">
                      {project.projectType}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <Lock className="w-3 h-3 text-zinc-500" />
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-400 transition tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  {/* Role */}
                  <div className="text-[11px] font-mono text-zinc-400">
                    <span className="text-zinc-500">Role:</span> {project.role}
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed flex-1">
                    {project.shortDescription}
                  </p>

                  {/* Workflow preview for Google Forms Automation */}
                  {project.workflowSteps && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400 font-semibold">
                        <Workflow className="w-3 h-3" /> System Workflow
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono leading-tight">
                        Forms → Sheets → Apps Script → API → MySQL → CRM
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Stack Footer */}
                <div className="px-5 pb-4 pt-3 border-t border-white/5 mt-auto flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[10px] text-zinc-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] text-zinc-500 font-mono self-center">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ─────────────────────────────────────────
              OTHER PROJECTS (Secondary Visual Emphasis)
              ───────────────────────────────────────── */}
          <div className="mt-14 space-y-4">
            <h3 className="font-display font-bold text-xl text-white tracking-tight">
              Other Projects
            </h3>
            <p className="text-xs text-zinc-500 font-light">
              Academic, IoT, and software engineering coursework projects.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherProjects.map((project) => (
                <motion.article
                  key={project.id}
                  variants={fadeUp}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer glass-panel p-5 rounded-xl flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase tracking-wider">
                        {project.projectType}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition" />
                    </div>

                    <h4 className="font-display font-bold text-base text-white group-hover:text-blue-400 transition tracking-tight">
                      {project.title}
                    </h4>

                    <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[10px] text-zinc-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            3. EXPERIENCE & WORK HISTORY
            ───────────────────────────────────────── */}
        <motion.section
          id="experience"
          className="py-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2 mb-10" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Work History &amp; Education
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              Work Experience
            </h2>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative pl-4 sm:pl-6 space-y-8">
            <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-6 w-px bg-gradient-to-b from-blue-500 via-purple-500/40 to-transparent" />

            {/* MIMOS Experience (Primary Emphasis) */}
            {workExperience.map((job, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="relative pl-6 sm:pl-8"
              >
                {/* Timeline Node */}
                <div
                  className={`absolute left-[-13px] sm:left-[-17px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#030303] ${
                    job.isPrimary
                      ? "bg-blue-500 timeline-dot"
                      : "bg-zinc-600"
                  }`}
                />

                <div
                  className={`glass-panel p-6 sm:p-7 rounded-xl ${
                    job.isPrimary
                      ? "border-blue-500/30 shadow-lg shadow-blue-500/5 bg-gradient-to-br from-blue-500/[0.03] to-transparent"
                      : "border-white/5"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase
                        className={`w-4 h-4 ${
                          job.isPrimary ? "text-blue-400" : "text-zinc-500"
                        }`}
                      />
                      <span
                        className={`font-display font-bold text-lg text-white`}
                      >
                        {job.title}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                        job.isPrimary
                          ? "bg-blue-500/15 border border-blue-500/30 text-blue-300"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {job.period}
                    </span>
                  </div>

                  <p
                    className={`text-sm font-semibold mb-3 ${
                      job.isPrimary ? "text-blue-400" : "text-zinc-400"
                    }`}
                  >
                    {job.company}
                  </p>

                  <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <ul className="space-y-2">
                    {job.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            job.isPrimary
                              ? "text-blue-400"
                              : "text-zinc-500"
                          }`}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Education Sub-section */}
            <div className="pt-6 pl-6 sm:pl-8 space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Education</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {educationData.map((edu, i) => (
                  <div
                    key={i}
                    className="glass-panel p-5 rounded-xl border border-white/5 space-y-1"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                      {edu.specialization}
                    </span>
                    <h4 className="font-display font-bold text-sm text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-zinc-400 font-light">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            4. TECHNICAL SKILLS (Rebuilt into 6 exact categories)
            ───────────────────────────────────────── */}
        <motion.section
          id="skills"
          className="py-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2 mb-10" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Technical Capabilities
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              Technical Skills
            </h2>
            <p className="text-sm text-zinc-400 font-light max-w-xl">
              Core technologies and tools applied across business web applications,
              backend pipelines, databases, and systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {technicalSkills.map((category) => {
              const colors = skillColorMap[category.color];
              const IconComp = category.icon;
              return (
                <motion.div
                  key={category.title}
                  variants={fadeUp}
                  className="glass-panel skill-card p-5 rounded-xl border border-white/5 flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <IconComp className={`w-4 h-4 ${colors.icon}`} />
                      </div>
                      <h3 className="font-display font-bold text-white text-sm">
                        {category.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 rounded-md ${colors.bg} border ${colors.border} ${colors.text} text-[11px] font-mono`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            5. CERTIFICATIONS
            ───────────────────────────────────────── */}
        <motion.section
          id="certifications"
          className="py-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2 mb-8" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Verified Credentials
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              Certifications
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-panel p-4 rounded-xl border border-white/5 flex items-start gap-3 hover:border-white/15 transition"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-semibold text-white leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            6. "WHAT I BRING" VALUE PROPOSITION
            ───────────────────────────────────────── */}
        <motion.section
          className="py-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2 mb-8" variants={fadeUp}>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
              Core Competencies
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              What I Bring
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatIBring.map((prop, idx) => {
              const PropIcon = prop.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="value-card glass-panel p-6 rounded-xl border border-white/5 hover:border-white/15 space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <PropIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xs tracking-wider">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {prop.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            7. ABOUT SECTION
            ───────────────────────────────────────── */}
        <motion.section
          id="about"
          className="py-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div className="lg:col-span-4 space-y-2" variants={fadeUp}>
              <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">
                Background &amp; Focus
              </span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                About Hariz
              </h2>
            </motion.div>

            <motion.div
              className="lg:col-span-8 space-y-4 text-zinc-300 font-light text-sm sm:text-base leading-relaxed"
              variants={fadeUp}
            >
              <p>
                I am a Full-Stack Developer with a background in Electronic
                Engineering Technology and Computer Engineering.
              </p>
              <p>
                During my industrial training at MIMOS Academy, I worked on
                business web applications including a CRM system and training
                portal, while also developing backend automation using PHP, MySQL,
                Google Apps Script, and REST APIs.
              </p>
              <p>
                My experience covers full-stack web development, database
                management, authentication, workflow automation, system testing,
                debugging, and technical documentation.
              </p>
              <p className="text-zinc-400">
                I also have experience with IoT, embedded systems, and networking,
                giving me a broader engineering foundation that complements my
                software development skills.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            8. WHAT I'M LOOKING FOR (Career Direction)
            ───────────────────────────────────────── */}
        <motion.section
          className="py-14 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <div className="glass-panel p-8 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.04] to-purple-500/[0.02] space-y-3">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Career Direction
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white">
              What I&apos;m Looking For
            </h3>
            <p className="text-base text-zinc-200 font-normal">
              Open to opportunities in Software Engineering, Full-Stack
              Development, Backend Development, Automation Engineering, and Web
              Application Development.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Interested in building reliable business applications, backend
              systems, and automation solutions.
            </p>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────
            9. CONTACT SECTION
            ───────────────────────────────────────── */}
        <motion.section
          id="contact"
          className="py-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info Cards */}
            <motion.div className="lg:col-span-1 space-y-6" variants={fadeUp}>
              <div className="space-y-2">
                <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-light">
                  Available for full-time software engineering and backend roles.
                </p>
              </div>

              {/* Direct CTAs */}
              <div className="space-y-3">
                <div
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/5 hover:border-white/15 bg-zinc-950/60 cursor-pointer transition"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      Email
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Muhdharizfahmi12@gmail.com
                    </p>
                    {copiedEmail && (
                      <p className="text-[10px] text-emerald-400 mt-0.5">
                        Copied to clipboard!
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href="tel:011-10721428"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/5 hover:border-white/15 bg-zinc-950/60 transition block"
                >
                  <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      Phone
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      011-10721428
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/5 bg-zinc-950/60">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Bedong, Kedah / Kuala Lumpur, Malaysia
                    </p>
                  </div>
                </div>
              </div>

              {/* Social & Resume Links */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href="https://github.com/Azzurai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/20 bg-zinc-900 text-xs text-white transition flex items-center gap-2 font-mono"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/hariz-fahmi-87792722a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/20 bg-zinc-900 text-xs text-white transition flex items-center gap-2 font-mono"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/20 bg-zinc-900 text-xs text-white transition flex items-center gap-2 font-mono cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume</span>
                </button>
              </div>
            </motion.div>

            {/* Message Form */}
            <motion.div className="lg:col-span-2" variants={fadeUp}>
              <form
                onSubmit={handleFormSubmit}
                className="glass-panel p-7 sm:p-8 rounded-xl space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Recruiter / Engineer"
                      className="w-full px-4 py-2.5 bg-black/60 border border-white/10 hover:border-white/20 focus:border-blue-500 rounded-lg text-white outline-none text-xs sm:text-sm transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 bg-black/60 border border-white/10 hover:border-white/20 focus:border-blue-500 rounded-lg text-white outline-none text-xs sm:text-sm transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Hello Hariz, we have a software engineering opportunity that matches your background..."
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/10 hover:border-white/20 focus:border-blue-500 rounded-lg text-white outline-none text-xs sm:text-sm transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || formSubmitted}
                  className="w-full px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
          FOOTER (with exact React/Next.js disclaimer)
          ═════════════════════════════════════════════ */}
      <footer className="relative z-10 py-12 border-t border-white/5 mt-16">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left space-y-1">
              <a
                href="#hero"
                className="font-display font-extrabold text-base text-white hover:text-blue-400 transition tracking-tight"
              >
                HARIZ<span className="text-blue-500">.</span>
              </a>
              <p className="text-[11px] text-zinc-500">
                © {new Date().getFullYear()} Muhammad Hariz Fahmi. All rights
                reserved.
              </p>
            </div>

            {/* Clear separation of portfolio tools from project experience */}
            <div className="text-center md:text-right">
              <p className="text-[11px] text-zinc-400 font-mono">
                Portfolio built with:
              </p>
              <p className="text-[11px] text-zinc-500 font-mono">
                Next.js • React • Tailwind CSS • Framer Motion
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ═════════════════════════════════════════════
          PROJECT CASE STUDY MODAL (Deep Dive)
          ═════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0d] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg border border-white/10 hover:border-white/20 bg-zinc-900 transition text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold">
                    {selectedProject.projectType}
                  </span>
                  {selectedProject.isPrivate && (
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-white/5 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-zinc-500" /> Private Project — MIMOS Academy
                    </span>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Screenshots Carousel */}
              {selectedProject.screenshots &&
              selectedProject.screenshots.length > 0 ? (
                <div className="space-y-2">
                  <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 relative group/slider">
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
                            setCurrentImageIndex((prev) =>
                              prev === 0
                                ? selectedProject.screenshots!.length - 1
                                : prev - 1
                            );
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition opacity-0 group-hover/slider:opacity-100 cursor-pointer text-xs"
                        >
                          ←
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === selectedProject.screenshots!.length - 1
                                ? 0
                                : prev + 1
                            );
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition opacity-0 group-hover/slider:opacity-100 cursor-pointer text-xs"
                        >
                          →
                        </button>
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                          {selectedProject.screenshots.map((_, idx) => (
                            <span
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                idx === currentImageIndex
                                  ? "bg-blue-500 scale-125"
                                  : "bg-zinc-600"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 text-center font-mono">
                    Non-confidential interface overview
                  </p>
                </div>
              ) : null}

              {/* Case Study Details */}
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {/* Overview */}
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-white text-sm">
                    Overview
                  </h4>
                  <p className="text-zinc-400">
                    {selectedProject.overview || selectedProject.shortDescription}
                  </p>
                </div>

                {/* My Role */}
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-white text-sm">
                    My Role
                  </h4>
                  <p className="text-blue-300 font-mono text-xs">
                    {selectedProject.role}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-white text-sm">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-black/70 border border-white/10 text-[11px] text-zinc-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Capabilities / Features */}
                {selectedProject.capabilities && (
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-white text-sm">
                      Key Capabilities &amp; Features
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedProject.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Visual System Workflow (especially Google Forms Automation & MIMOS CRM) */}
                {selectedProject.workflowSteps && (
                  <div className="space-y-2.5 p-4 rounded-xl bg-black/40 border border-white/10">
                    <h4 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                      <Workflow className="w-4 h-4 text-purple-400" />
                      System Workflow
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                      {selectedProject.workflowSteps.map((step, i) => (
                        <React.Fragment key={i}>
                          <span className="px-2 py-1 rounded bg-zinc-900 border border-white/10 text-purple-300">
                            {step}
                          </span>
                          {i < selectedProject.workflowSteps!.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architecture Summary */}
                {selectedProject.architectureSummary && (
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-white text-sm">
                      Architecture
                    </h4>
                    <p className="text-zinc-400">
                      {selectedProject.architectureSummary}
                    </p>
                  </div>
                )}

                {/* Challenges & Solutions */}
                {selectedProject.challenges && selectedProject.solutions && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                        Challenge
                      </span>
                      <p className="text-xs text-zinc-400 font-light">
                        {selectedProject.challenges}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                        Solution
                      </span>
                      <p className="text-xs text-zinc-400 font-light">
                        {selectedProject.solutions}
                      </p>
                    </div>
                  </div>
                )}

                {/* Outcome */}
                {selectedProject.outcome && (
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-white text-sm">
                      Outcome
                    </h4>
                    <p className="text-zinc-400">{selectedProject.outcome}</p>
                  </div>
                )}

                {/* Confidentiality Notice */}
                <div className="pt-3 border-t border-white/5 text-[11px] text-zinc-500 font-mono">
                  Private Project — Developed during industrial training at MIMOS
                  Academy. System source code and proprietary operational data are
                  restricted.
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0d] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden p-5 sm:p-6 shadow-2xl relative flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white">
                    Curriculum Vitae Preview
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    Muhammad Hariz Fahmi Bin Mohamad Shahidi
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`${prefix}/resume.pdf`}
                    download="Muhammad_Hariz_Fahmi_Resume.pdf"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
                  >
                    <FileDown className="w-3.5 h-3.5" /> Download PDF
                  </a>
                  <button
                    onClick={() => setShowResumeModal(false)}
                    className="p-2 rounded-lg border border-white/10 hover:border-white/20 bg-zinc-900 transition text-zinc-400 hover:text-white cursor-pointer"
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
