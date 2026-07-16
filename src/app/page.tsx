"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Cpu, 
  Code, 
  Database, 
  Workflow, 
  Brain, 
  Terminal, 
  FileDown, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  Layers,
  Briefcase 
} from "lucide-react";

const prefix = process.env.NODE_ENV === "production" ? "/DevPortfolio" : "";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  const projects = [
    {
      id: "mimos-crm",
      title: "MIMOS CRM System",
      category: "web",
      description: "A web-based Customer Relationship Management system centralizing customer records, quotations, invoices, sales pipelines, and OCR card readers.",
      longDescription: "Developed during industrial training at MIMOS Academy. This CRM centralizes operations by managing lead pipelines, business workflows, customer CRUD repositories, financial documentation tracking, and Google Apps Script integrations. Features a card OCR scanner to import physical contacts into the database automatically.",
      tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "cPanel", "WinSCP"],
      tags: ["web", "automation"],
      badge: "Enterprise Web App",
      image: "/previews/crm/CRM Dashboard.png",
      screenshots: [
        "/previews/crm/CRM Dashboard.png",
        "/previews/crm/CRM CustList.png",
        "/previews/crm/CRM Sales Kanban.png",
        "/previews/crm/CRM Rec Opport.png",
        "/previews/crm/CRM Invoice Tracker.png",
        "/previews/crm/Quotation Tracker.png"
      ]
    },
    {
      id: "mimos-portal",
      title: "MIMOS Academy Portal",
      category: "web",
      description: "A modern training portal featuring secure client logins, Google OAuth integration, training program catalogs, and registration systems.",
      longDescription: "An official training and talent development platform built to promote semiconductors, AI, cybersecurity, and project management paths. Implemented secure participant registration, password recovery, session encryption, and a responsive portal interface.",
      tech: ["PHP", "MySQL", "JavaScript", "Google OAuth", "HTML5", "CSS3"],
      tags: ["web", "security"],
      badge: "Production Portal",
      image: "/previews/mimosacademy/home.png",
      screenshots: [
        "/previews/mimosacademy/home.png",
        "/previews/mimosacademy/about.png",
        "/previews/mimosacademy/programs.png",
        "/previews/mimosacademy/facilities.png",
        "/previews/mimosacademy/news.png",
        "/previews/mimosacademy/contact.png"
      ]
    },
    {
      id: "forms-automation",
      title: "Google Forms Automation",
      category: "automation",
      description: "Automated pipeline transferring registration records from Google Forms into CRM databases.",
      longDescription: "Eliminated manual admin entry by building an automated synchronization script. When a registration is submitted via Google Forms, a Google Apps Script trigger parses the data and writes it securely to the MySQL host.",
      tech: ["Google Apps Script", "MySQL", "JSON REST API", "Workflow Automation"],
      tags: ["automation"],
      badge: "Workflow Automation",
      image: "/previews/forms-automation.png",
      screenshots: [
        "/previews/forms-automation.png"
      ]
    },
    {
      id: "smart-combat",
      title: "Smart Combat System",
      category: "electronics",
      description: "EEG-based mental health and stress monitoring platform analyzing brainwave signals.",
      longDescription: "An advanced system designed to measure and monitor stress levels in real-time during physical activities. Collects brainwave metrics via EEG sensors and maps data onto user dashboards to evaluate mental wellness.",
      tech: ["EEG Sensors", "Signal Processing", "System Integration", "Data Analysis"],
      tags: ["electronics", "ai"],
      badge: "Academic FYP",
      image: "/previews/smartcombat/SmartCombat_Super_Analytics.png",
      screenshots: [
        "/previews/smartcombat/SmartCombat_Super_Analytics.png",
        "/previews/smartcombat/SmartCombat_Index.png",
        "/previews/smartcombat/SmartCombat_Suuper_SD.png",
        "/previews/smartcombat/SmartCombat_Doc_Status.png",
        "/previews/smartcombat/SmartCombat_SD_Status.png",
        "/previews/smartcombat/SmartCombat_Super_AuditLog.png",
        "/previews/smartcombat/SmartCombat_Register.png",
        "/previews/smartcombat/SmartCombat_FP.png"
      ]
    },
    {
      id: "water-meter",
      title: "IoT Smart Water Meter",
      category: "electronics",
      description: "ESP32 water flow monitoring system presenting real-time telemetry and bill alerts.",
      longDescription: "An IoT application built on the ESP32 platform to measure household water consumption. Provides instant usage rates, anomaly/leak notifications, and remote index readouts to reduce manual labor.",
      tech: ["ESP32", "IoT Flow Sensors", "C++", "Firebase", "Real-time Telemetry"],
      tags: ["electronics"],
      badge: "IoT Prototype",
      image: "/previews/water-meter.png",
      screenshots: [
        "/previews/water-meter.png"
      ]
    },
    {
      id: "hotel-booking",
      title: "Hotel Reservation Controller",
      category: "software",
      description: "Database-driven guest booking and reservation manager developed in Java.",
      longDescription: "A desktop booking controller built using Java and backed by MySQL. Streamlines room assignments, reservation states, guest profiles, check-in schedules, and room servicing queues.",
      tech: ["Java", "MySQL", "SQL Queries", "Desktop GUI"],
      tags: ["software"],
      badge: "Desktop Software",
      image: "/previews/hotel-booking.png",
      screenshots: [
        "/previews/hotel-booking.png"
      ]
    }
  ];

  const experience = [
    {
      period: "Feb 2026 – Jul 2026",
      role: "Software & Business Systems Intern",
      company: "MIMOS Academy (MIMOS Services Sdn. Bhd.)",
      description: "Refactored the primary MIMOS CRM and training portals. Designed Google Apps Script background automation triggers, established secure login verification schemas, and updated system documentations.",
      skills: ["PHP", "MySQL", "JavaScript", "Google Apps Script", "Workflow Automation", "Google OAuth"]
    },
    {
      period: "Jan 2022 – Apr 2022",
      role: "Multimedia & Technology Intern",
      company: "MASDAR Technologies",
      description: "Assisted in website development using HTML and Java, supported telecommunication infrastructure inspections, and prepared detailed technical documentation.",
      skills: ["Web Development", "HTML", "Java", "Drone Inspections", "Technical Documentation"]
    }
  ];

  const skillGroups = [
    {
      title: "Programming & Web Core",
      icon: <Code className="w-4 h-4 text-blue-400" />,
      skills: ["PHP", "JavaScript", "HTML5 & CSS3", "REST APIs", "C++", "Java"]
    },
    {
      title: "Backend, Database & Security",
      icon: <Database className="w-4 h-4 text-purple-400" />,
      skills: ["MySQL Database Design", "SQL Optimization", "Firebase", "BCrypt Hashing", "CSRF Protection", "Google OAuth"]
    },
    {
      title: "Workflow Automation & AI",
      icon: <Workflow className="w-4 h-4 text-emerald-400" />,
      skills: ["Google Apps Script", "Process Automation", "Gemini AI", "ChatGPT", "NotebookLM"]
    },
    {
      title: "Hardware, Network & Tools",
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      skills: ["Cisco Packet Tracer", "Wireshark Network Scan", "TCP/IP protocols", "ESP32 IoT", "Git / GitHub", "cPanel"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Electronic Engineering Technology (Electronic Network Design)",
      school: "University Malaysia Perlis (UniMAP)",
      period: "2022 - 2026",
      details: "CGPA: 3.16. Focuses on networking, telecom protocols, system integration, and advanced software/hardware design."
    },
    {
      degree: "Diploma In Computer Engineering",
      school: "University Malaysia Perlis (UniMAP)",
      period: "2019 - 2022",
      details: "CGPA: 3.10. Solid foundation in digital logic, programming systems, database frameworks, and local area network setups."
    }
  ];

  const certifications = [
    {
      title: "CCNA: Enterprise Networking, Security, and Automation",
      issuer: "Cisco",
      image: "https://images.credly.com/images/0a6d331e-8abf-4272-a949-33f754569a76/linkedin_thumb_CCNAENSA__1_.png",
      url: "https://www.credly.com/badges/71340aa6-c71a-4549-bc36-7967308bda93/public_url"
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      image: "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/linkedin_thumb_CCNAITN__1_.png",
      url: "https://www.credly.com/badges/9365b679-3c92-4015-b2ef-e67d52a0223e/public_url"
    },
    {
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco",
      image: "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/linkedin_thumb_CCNASRWE__1_.png",
      url: "https://www.credly.com/badges/8117e7a7-03e2-45e3-bea9-d9286ef35ed4/public_url"
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/linkedin_thumb_I2CS__1_.png",
      url: "https://www.credly.com/badges/404cc881-1efc-4035-933a-c2e4ab832d86/public_url"
    },
    {
      title: "Introduction to Modern AI",
      issuer: "Cisco",
      image: "https://images.credly.com/images/e2d12302-10f9-40d4-8ff1-066a7008b61d/linkedin_thumb_blob",
      url: "https://www.credly.com/badges/da189dd3-31bf-4e4a-a80e-80b3b8c0040f/public_url"
    },
    {
      title: "Junior Cybersecurity Analyst Career Path",
      issuer: "Cisco",
      image: "https://images.credly.com/images/441578ec-c0f3-46cc-95fc-86b27e90cf4f/linkedin_thumb_image.png",
      url: "https://www.credly.com/badges/01d73e02-2f68-4921-94c3-51c2edb57c4e/public_url"
    },
    {
      title: "Intel Altera FPGA AI Courses",
      issuer: "Intel / Altera",
      image: null,
      url: null
    },
    {
      title: "AI Integrated Circuit Design and Fabrication",
      issuer: "Asia Pacific University (APU)",
      image: null,
      url: null
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.tags.includes(activeFilter));

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("Muhdharizfahmi12@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Type 'help' to see available commands or click the buttons below.",
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalInputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput);
      setTerminalInput("");
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = "";
    if (trimmed === "help") {
      response = "Available commands: 'about', 'skills', 'projects', 'contact', 'clear'";
    } else if (trimmed === "about") {
      response = "Muhammad Hariz Fahmi | Electronic Network Design graduate from UniMAP. Focuses on full-stack web architectures, cybersecurity, and IoT telemetry.";
    } else if (trimmed === "skills") {
      response = "Languages: PHP, JS, C++, Java, HTML5/CSS3. Backends: MySQL, Firebase, Google Apps Script. Cisco Network routing & switching certified.";
    } else if (trimmed === "projects") {
      response = "MIMOS CRM System, MIMOS Academy Portal, Smart Combat System, Google Forms Automation, IoT Smart Water Meter, Hotel Reservation Controller.";
    } else if (trimmed === "contact") {
      response = "Email: Muhdharizfahmi12@gmail.com | Phone: +6011-25409543 | Location: Perlis/Kuala Lumpur, Malaysia";
    } else if (trimmed === "clear") {
      setTerminalHistory([]);
      return;
    } else if (trimmed === "") {
      return;
    } else {
      response = `Command not found: '${cmd}'. Type 'help' for suggestions.`;
    }
    setTerminalHistory((prev) => [...prev, `guest@hariz-desktop:~$ ${cmd}`, response]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  React.useEffect(() => {
    const el = document.getElementById("terminal-bottom");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

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
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
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
        alert("Failed to send message: " + (result.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error sending message. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-300 font-sans antialiased overflow-x-hidden">
      {/* VERCEL GRID SYSTEM */}
      <div className="fixed inset-0 grid-overlay opacity-[0.2] pointer-events-none z-0"></div>

      {/* STRIPE-LIKE AMBIENT SPOTLIGHT GLOW */}
      <div className="fixed top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0"></div>

      {/* FLOATING NAVBAR */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 rounded-full border border-white/5 bg-black/60 backdrop-blur-xl px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <a href="#hero" className="font-display font-extrabold text-lg text-white hover:text-blue-400 transition tracking-tight">
            HARIZ<span className="text-blue-500">.</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 md:gap-8">
            <a href="#projects" className="text-xs font-semibold text-zinc-400 hover:text-white transition">Projects</a>
            <a href="#about" className="text-xs font-semibold text-zinc-400 hover:text-white transition">About</a>
            <a href="#experience" className="text-xs font-semibold text-zinc-400 hover:text-white transition">Experience</a>
            <a href="#skills" className="text-xs font-semibold text-zinc-400 hover:text-white transition">Skills</a>
            <a href="#education" className="text-xs font-semibold text-zinc-400 hover:text-white transition">Education</a>
          </nav>
          <a 
            href="#contact" 
            className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition shadow-lg shadow-blue-500/20"
          >
            Contact
          </a>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 sm:pt-40">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[60vh] flex items-center py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left: Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-display font-extrabold text-4xl sm:text-6xl leading-tight text-white tracking-tight"
                >
                  Muhammad Hariz Fahmi <br />
                  <span className="text-gradient-primary font-bold">Software &amp; Network Engineer</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light"
                >
                  Electronic Network Design graduate with internship engineering experience at <strong>MIMOS Academy</strong>. Focus on web application development, workflow automation, and hardware-software system integration.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a href="#projects" className="px-5 py-2.5 text-xs font-bold text-black bg-white hover:bg-zinc-200 rounded-lg transition flex items-center gap-1.5 shadow-xl shadow-white/5">
                  View Featured Projects <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <button 
                  onClick={() => setShowResumeModal(true)} 
                  className="px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 rounded-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" /> View Resume
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive Terminal Widget */}
            <div className="lg:col-span-5 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => terminalInputRef.current?.focus()}
                className="w-full rounded-xl border border-white/5 bg-[#08080a]/90 shadow-2xl overflow-hidden font-mono text-[11px] h-64 flex flex-col cursor-text"
              >
                {/* Terminal Title Bar */}
                <div className="bg-[#121216] px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="text-[10px] text-zinc-500">guest@hariz-desktop:~</span>
                  <span className="w-4"></span>
                </div>
                
                {/* Terminal Body */}
                <div className="p-4 flex-1 overflow-y-auto space-y-2 text-zinc-400">
                  {terminalHistory.map((line, i) => (
                    <p key={i} className={line.startsWith("guest@") ? "text-blue-400 font-semibold" : "text-zinc-300 font-light"}>
                      {line}
                    </p>
                  ))}
                  
                  {/* Dynamic Active Prompt Field */}
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <span className="text-blue-400 font-semibold shrink-0">guest@hariz-desktop:~$</span>
                    <input 
                      ref={terminalInputRef}
                      type="text" 
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none outline-none flex-1 font-mono text-[11px] p-0 text-white focus:ring-0 focus:outline-none"
                      placeholder="type a command..."
                      autoFocus
                    />
                  </div>
                  
                  {/* Auto Scroll Anchor */}
                  <div id="terminal-bottom" />
                </div>
                
                {/* Clickable Quick Command Chips */}
                <div className="bg-[#0b0b0f] px-4 py-2 border-t border-white/5 flex flex-wrap gap-1.5 shrink-0">
                  {["help", "about", "skills", "projects", "contact", "clear"].map((cmd) => (
                    <button 
                      key={cmd}
                      onClick={() => executeCommand(cmd)}
                      className="px-2 py-0.5 rounded border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-zinc-500 hover:text-white transition cursor-pointer text-[10px]"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION (IMMEDIATELY UNDER HERO) */}
        <section id="projects" className="py-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">Engineering Portfolio</span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">Featured Projects</h2>
            </div>
            <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-[#0a0a0c] border border-white/5">
              {[
                { label: "All Projects", value: "all" },
                { label: "Web Applications", value: "web" },
                { label: "Workflow Automation", value: "automation" },
                { label: "Electronics & IoT", value: "electronics" }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    activeFilter === filter.value 
                      ? "bg-zinc-800 text-white shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.article 
                layout
                key={project.id}
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                className="group cursor-pointer glass-panel p-5 rounded-xl flex flex-col justify-between min-h-[420px] border border-white/5 hover:border-blue-500/30 transition-all duration-300 spotlight-card overflow-hidden"
              >
                <div className="space-y-4 relative z-10">
                  {project.image && (
                    <div className="w-full h-36 rounded-lg overflow-hidden border border-white/5 bg-zinc-950 relative">
                      <img 
                        src={`${prefix}${project.image}`} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[9px] font-bold text-zinc-400 border border-white/5 rounded bg-black uppercase tracking-wider">
                      {project.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-400 transition tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 relative z-10">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-black border border-white/5 text-[10px] text-zinc-400 font-mono">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] text-zinc-500 font-mono self-center">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ABOUT ME & BIO */}
        <section id="about" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-2">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">About Hariz</span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">Engineering Bio</h2>
            </div>
            <div className="lg:col-span-2 space-y-6 text-zinc-400 leading-relaxed font-light text-base">
              <p>
                I hold a <strong>Bachelor's Degree in Electronic Engineering Technology (Electronic Network Design)</strong> and a <strong>Diploma in Computer Engineering</strong> from Universiti Malaysia Perlis (UniMAP).
              </p>
              <p>
                My background bridges full-stack software development with electronic systems. I specialize in designing responsive business portals (such as the **MIMOS CRM** and **MIMOS Academy training platform**), scripting workflow triggers, and deploying embedded IoT prototypes.
              </p>
              <p>
                I focus on writing structured, documentation-backed backend software while remaining comfortable configuring network interfaces, debugging routing issues, and building automation pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* PROFESSIONAL EXPERIENCE TIMELINE */}
        <section id="experience" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-2">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">Chronology</span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">Work Experience</h2>
            </div>
            
            <div className="lg:col-span-2 space-y-12 relative border-l border-white/10 pl-6">
              {experience.map((exp, idx) => (
                <div className="relative space-y-4" key={idx}>
                  {/* Pin Node */}
                  <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border border-black shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white">{exp.role}</h3>
                  <p className="text-sm font-semibold text-blue-400">{exp.company}</p>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#09090b] border border-white/5 text-zinc-400 text-[10px] font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS MATRIX */}
        <section id="skills" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-2">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">Capabilities</span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">Technical Toolkit</h2>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {skillGroups.map((group, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-white/5 bg-[#0a0a0c]/60 space-y-3">
                  <h3 className="font-display font-bold text-sm text-white">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-black border border-white/5 text-zinc-300 text-xs font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left: Education */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-2">
                <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">Credentials</span>
                <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">Education</h2>
              </div>

              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-6 rounded-xl border border-white/5 bg-[#0a0a0c]/60 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono text-blue-400">{edu.period}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white">{edu.degree}</h3>
                    <p className="text-xs font-semibold text-zinc-400">{edu.school}</p>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Certifications & Languages */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-2">
                <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">Certifications</span>
                <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">Certs</h2>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-[#0a0a0c]/60 space-y-3.5 max-h-[480px] overflow-y-auto">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-white/3 transition">
                    <div className="flex items-center gap-3">
                      {cert.image ? (
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-10 h-10 object-contain shrink-0" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4 text-purple-400" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-[11px] font-semibold text-white leading-tight line-clamp-2">{cert.title}</h4>
                        <p className="text-[9px] text-zinc-500 font-mono mt-0.5">{cert.issuer}</p>
                      </div>
                    </div>
                    {cert.url && (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-white transition shrink-0"
                        title="Verify Credential"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-sm text-white">Languages</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { lang: "Malay", level: "Native" },
                    { lang: "English", level: "Native (MUET 4.5+)" },
                    { lang: "Chinese", level: "Beginner" },
                    { lang: "Japanese", level: "Beginner" }
                  ].map((lan, i) => (
                    <div key={i} className="p-3 rounded-lg border border-white/5 bg-[#0a0a0c] text-[11px]">
                      <p className="font-semibold text-white">{lan.lang}</p>
                      <p className="text-zinc-500">{lan.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* REFERENCES SECTION */}
        <section id="references" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-2">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-wider font-semibold">Endorsements</span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">References</h2>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-white/5 bg-[#0a0a0c]/60 space-y-3">
                <h4 className="font-display font-bold text-base text-white">Saidatul Farrah Muhammad Johar</h4>
                <p className="text-[11px] text-zinc-500">Head of Business Development and Marketing, MIMOS Academy</p>
                <div className="pt-2 text-xs space-y-1">
                  <p className="text-zinc-400">Email: farrah.johar@mimos.my</p>
                  <p className="text-zinc-400">Phone: +60136376097</p>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-white/5 bg-[#0a0a0c]/60 space-y-3">
                <h4 className="font-display font-bold text-base text-white">MUHAMMAD NURUDDIN BIN MOHAMAD</h4>
                <p className="text-[11px] text-zinc-500">CEO of MASDAR Technologies</p>
                <div className="pt-2 text-xs space-y-1">
                  <p className="text-zinc-400">Email: masdartechnologies@gmail.com</p>
                  <p className="text-zinc-400">Phone: 019-4477512</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Info Cards */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-4">
                <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">Get in Touch</h2>
                <p className="text-zinc-400 font-light">Available for software engineering and network systems roles. Reach out directly.</p>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-white/10 bg-zinc-950/40 cursor-pointer transition"
                >
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Email Address</p>
                    <p className="text-sm font-semibold text-white">Muhdharizfahmi12@gmail.com</p>
                    {copiedEmail && <p className="text-[10px] text-emerald-400 mt-0.5">Email address copied!</p>}
                  </div>
                </div>

                <a 
                  href="tel:011-10721428"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-white/10 bg-zinc-950/40 cursor-pointer transition block"
                >
                  <Phone className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Phone Number</p>
                    <p className="text-sm font-semibold text-white">011-10721428</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-zinc-950/40">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Location</p>
                    <p className="text-sm font-semibold text-white">Bedong, Kedah, Malaysia</p>
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
            </div>

            {/* Message Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleFormSubmit} className="glass-panel p-8 rounded-xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 bg-black/60 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-lg text-white outline-none text-sm transition" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com" 
                      className="w-full px-4 py-3 bg-black/60 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-lg text-white outline-none text-sm transition" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-500">Your Message</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Message Sent Successfully!
                    </>
                  ) : isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-white/5 mt-20 text-center text-[11px] text-zinc-600">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <p>© {new Date().getFullYear()} Muhammad Hariz Fahmi. All rights reserved.</p>
          <p className="font-light">
            Engineered with Next.js 15, React 19, Tailwind CSS, and Framer Motion. 100% Free Hosting compliant.
          </p>
        </div>
      </footer>

      {/* PROJECT DRAWER / MODAL DETAILS OVERLAY */}
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
                className="absolute top-4 right-4 p-2 rounded-lg border border-white/5 hover:border-white/10 bg-zinc-900 transition text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider">
                  {selectedProject.badge}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-zinc-400 font-light leading-relaxed">
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                  <div className="space-y-2">
                    <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-white/5 bg-zinc-950 relative group/slider">
                      <img 
                        src={`${prefix}${selectedProject.screenshots[currentImageIndex]}`} 
                        alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                      {selectedProject.screenshots.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1));
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/5 text-white hover:bg-black/80 transition opacity-0 group-hover/slider:opacity-100 cursor-pointer text-xs"
                          >
                            ←
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) => (prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1));
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/5 text-white hover:bg-black/80 transition opacity-0 group-hover/slider:opacity-100 cursor-pointer text-xs"
                          >
                            →
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/55 px-3 py-1 rounded-full border border-white/5">
                            {selectedProject.screenshots.map((_: any, idx: number) => (
                              <span 
                                key={idx} 
                                className={`w-1 h-1 rounded-full transition-all ${
                                  idx === currentImageIndex ? "bg-blue-500 scale-125" : "bg-zinc-600"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : selectedProject.image && (
                  <div className="w-full h-48 rounded-xl overflow-hidden border border-white/5 bg-zinc-950 relative">
                    <img 
                      src={`${prefix}${selectedProject.image}`} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-display font-bold text-white mb-2 text-base">Project Overview</h4>
                  <p>{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-white mb-2 text-base">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-black border border-white/5 text-xs text-zinc-300 font-mono">
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

      {/* RESUME PREVIEW MODAL */}
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
                  <p className="text-xs text-zinc-500 font-light">Muhammad Hariz Fahmi Bin Mohamad Shahidi</p>
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
