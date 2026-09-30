import React, { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";

/* =========================
   NAVBAR
========================= */

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <span className="brand">Rohan.dev</span>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
}


/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Rohan S — Built with React Router
      </p>
    </footer>
  );
}


/* =========================
   HOME
========================= */

function Home() {
  return (
    <section className="hero">

      <div className="hero-text">

        <p className="eyebrow">
          Hey, I'm
        </p>

        <h1>Rohan S</h1>

        <h2>
          Frontend Developer & UI Enthusiast
        </h2>

        <p className="intro">
          I build fast, accessible, and visually engaging web applications.
          This portfolio is itself a small React Router single-page app —
          every section you can reach from the navigation bar is a separate
          route rendered without a full page reload.
        </p>

        <div className="hero-actions">

          <Link
            to="/projects"
            className="btn primary"
          >
            View Projects
          </Link>

          <Link
            to="/contact"
            className="btn ghost"
          >
            Get in Touch
          </Link>

        </div>

      </div>

      <div className="hero-orb"></div>

    </section>
  );
}


/* =========================
   ABOUT
========================= */

function About() {

  const facts = [
    {
      label: "Based in",
      value: "Puducherry, India",
    },
    {
      label: "Focus",
      value: "React & Web Apps",
    },
    {
      label: "Experience",
      value: "2+ years",
    },
    {
      label: "Currently",
      value: "Building side projects",
    },
  ];

  return (
    <section className="section">

      <h2 className="section-title">
        About Me
      </h2>

      <p className="section-text">
        I'm a developer who enjoys turning ideas into clean, functional
        interfaces. I like working across the stack, but I'm happiest
        fine-tuning UI details, component structure, and interactions
        on the frontend.
      </p>

      <div className="facts-grid">

        {facts.map((f) => (
          <div
            className="fact-card"
            key={f.label}
          >
            <span className="fact-label">
              {f.label}
            </span>

            <span className="fact-value">
              {f.value}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}


/* =========================
   SKILLS
========================= */

function Skills() {

  const skillGroups = [
    {
      category: "Frontend",
      items: [
        "React",
        "JavaScript (ES6+)",
        "HTML5 & CSS3",
        "Tailwind CSS",
        "React Router",
      ],
    },

    {
      category: "Tools",
      items: [
        "Git & GitHub",
        "Vite",
        "npm",
        "Figma",
        "Chrome DevTools",
      ],
    },

    {
      category: "Backend Basics",
      items: [
        "Node.js",
        "Express",
        "REST APIs",
        "MongoDB",
      ],
    },
  ];

  return (
    <section className="section">

      <h2 className="section-title">
        Skills
      </h2>

      <div className="skills-groups">

        {skillGroups.map((group) => (

          <div
            className="skill-group"
            key={group.category}
          >

            <h3>
              {group.category}
            </h3>

            <div className="chip-row">

              {group.items.map((item) => (

                <span
                  className="chip"
                  key={item}
                >
                  {item}
                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}


/* =========================
   PROJECTS
========================= */

function Projects() {

  const projects = [
    {
      title: "Attendance Tracker",
      desc:
        "A lightweight app to mark and track student attendance with live stats.",
      tags: ["JavaScript", "CSS"],
    },

    {
      title: "Calculator",
      desc:
        "A React calculator built with useState, supporting basic arithmetic.",
      tags: ["React", "useState"],
    },

    {
      title: "Form Validation App",
      desc:
        "A registration form with real-time client-side validation rules.",
      tags: ["JavaScript", "Forms"],
    },

    {
      title: "This Portfolio",
      desc:
        "A multi-page portfolio site built as an SPA with React Router.",
      tags: ["React", "React Router"],
    },
  ];

  return (
    <section className="section">

      <h2 className="section-title">
        Projects
      </h2>

      <div className="projects-grid">

        {projects.map((p) => (

          <div
            className="project-card"
            key={p.title}
          >

            <h3>
              {p.title}
            </h3>

            <p>
              {p.desc}
            </p>

            <div className="chip-row">

              {p.tags.map((t) => (

                <span
                  className="chip small"
                  key={t}
                >
                  {t}
                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}


/* =========================
   TESTIMONIALS
========================= */

function Testimonials() {

  const testimonials = [
    {
      quote:
        "Rohan picks up new tools quickly and always ships clean, working UI.",
      name: "Project Mentor",
    },

    {
      quote:
        "Great attention to detail — the small interactions really stood out.",
      name: "Team Lead, College Project",
    },

    {
      quote:
        "Reliable and easy to collaborate with on frontend tasks.",
      name: "Peer Reviewer",
    },
  ];

  return (
    <section className="section">

      <h2 className="section-title">
        Testimonials
      </h2>

      <div className="testimonials-grid">

        {testimonials.map((t, i) => (

          <blockquote
            className="testimonial-card"
            key={i}
          >

            <p>
              &ldquo;{t.quote}&rdquo;
            </p>

            <footer>
              — {t.name}
            </footer>

          </blockquote>

        ))}

      </div>

    </section>
  );
}


/* =========================
   CONTACT
========================= */

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.message
    ) {
      return;
    }

    setSent(true);
  };

  return (
    <section className="section">

      <h2 className="section-title">
        Contact
      </h2>

      <p className="section-text">
        Have a project in mind or just want to say hi?
        Fill out the form below.
      </p>

      {sent ? (

        <div className="success-box">
          Thanks {form.name}, your message has been noted!
        </div>

      ) : (

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn primary"
          >
            Send Message
          </button>

        </form>

      )}

    </section>
  );
}


/* =========================
   404 PAGE
========================= */

function NotFound() {

  return (
    <section
      className="section"
      style={{ textAlign: "center" }}
    >

      <h2 className="section-title">
        404 — Page Not Found
      </h2>

      <p className="section-text">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="btn primary"
      >
        Back to Home
      </Link>

    </section>
  );
}


/* =========================
   MAIN APP
========================= */

export default function App() {

  return (
    <div className="app">

      <Navbar />

      <main className="page-content">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/skills"
            element={<Skills />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/testimonials"
            element={<Testimonials />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}
