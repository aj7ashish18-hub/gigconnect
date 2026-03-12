import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import FreelancerRegister from "./components/FreelancerRegister";
import FreelancerProfile from "./components/FreelancerProfile";
import Dashboard from "./components/Dashboard";
import ClientDashboard from "./components/ClientDashboard";
import Login from "./components/Login";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Signup from "./components/SignUp";
import Home from "./components/Home";
import About from "./components/About";
import FAQ from "./components/FAQ";

const HIDE_NAVBAR = ["/freelancer-register"];

export const ThemeContext = React.createContext();

function Layout({ darkMode, setDarkMode }) {
  const location = useLocation();
  const showNavbar = !HIDE_NAVBAR.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/freelancer-register" element={<FreelancerRegister />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
      </Routes>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? "theme-dark" : "theme-light"}>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; transition: background 0.3s, color 0.2s, border-color 0.2s; }
        body { margin: 0; }

        /* ── DARK THEME ── */
        .theme-dark {
          min-height: 100vh;
          background: #0a0a14;
          color: #e2e8f0;
        }

        /* ── LIGHT THEME ── */
        .theme-light {
          min-height: 100vh;
          background: #f8fafc;
          color: #0f172a;
        }

        /* ── FORCE ALL CHILDREN TO INHERIT THEME ── */
        .theme-light > * { background: transparent; }

        .theme-light section,
        .theme-light div,
        .theme-light main,
        .theme-light form,
        .theme-light header,
        .theme-light footer { color: inherit; }

        /* ── OVERRIDE ALL HARDCODED DARK BACKGROUNDS ── */
        .theme-light .home-page,
        .theme-light .about-page,
        .theme-light .faq-page,
        .theme-light .services-page,
        .theme-light .contact-page,
        .theme-light .login-page,
        .theme-light .signup-page,
        .theme-light .dashboard-page,
        .theme-light .client-dashboard-page { 
          background: #f8fafc !important; 
          color: #0f172a !important; 
        }

        .theme-dark .home-page,
        .theme-dark .about-page,
        .theme-dark .faq-page,
        .theme-dark .services-page,
        .theme-dark .contact-page,
        .theme-dark .login-page,
        .theme-dark .signup-page,
        .theme-dark .dashboard-page,
        .theme-dark .client-dashboard-page { 
          background: #0a0a14 !important; 
          color: #e2e8f0 !important; 
        }

        /* ── AUTH CARDS (Login/Signup) ── */
        .theme-light .auth-card,
        .theme-light .login-card,
        .theme-light .signup-card,
        .theme-light .auth-box,
        .theme-light .form-card {
          background: #ffffff !important;
          color: #0f172a !important;
          border-color: rgba(0,0,0,0.08) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06) !important;
        }

        /* ── INPUTS ── */
        .theme-light input,
        .theme-light textarea,
        .theme-light select {
          background: #ffffff !important;
          color: #0f172a !important;
          border-color: rgba(0,0,0,0.12) !important;
        }
        .theme-light input::placeholder,
        .theme-light textarea::placeholder { color: #94a3b8 !important; }
        .theme-light input:focus,
        .theme-light textarea:focus {
          border-color: rgba(99,102,241,0.5) !important;
          background: #ffffff !important;
        }

        /* ── LABELS & FORM TEXT ── */
        .theme-light label { color: #475569 !important; }
        .theme-light h1, .theme-light h2, .theme-light h3,
        .theme-light h4, .theme-light h5, .theme-light h6 { color: #0f172a !important; }
        .theme-light p { color: #475569 !important; }

        /* ── SECTION BACKGROUNDS ── */
        .theme-light .how-section { background: rgba(99,102,241,0.04) !important; }
        .theme-light .about-stats { background: rgba(99,102,241,0.03) !important; }
        .theme-light .cta-section,
        .theme-light .about-cta,
        .theme-light .faq-contact {
          background: linear-gradient(135deg, rgba(99,102,241,0.06), rgba(6,182,212,0.06)) !important;
        }

        /* ── CARDS ── */
        .theme-light .step-card,
        .theme-light .category-card,
        .theme-light .mission-card,
        .theme-light .team-card,
        .theme-light .faq-item,
        .theme-light .review-card,
        .theme-light .service-card,
        .theme-light .dashboard-card {
          background: rgba(0,0,0,0.03) !important;
          border-color: rgba(0,0,0,0.08) !important;
          color: #0f172a !important;
        }
        .theme-light .step-card:hover,
        .theme-light .category-card:hover,
        .theme-light .mission-card:hover,
        .theme-light .team-card:hover,
        .theme-light .service-card:hover {
          background: rgba(99,102,241,0.05) !important;
          border-color: rgba(99,102,241,0.25) !important;
        }

        /* ── HEADINGS ── */
        .theme-light .hero-title,
        .theme-light .section-title,
        .theme-light .step-card h3,
        .theme-light .faq-hero h1,
        .theme-light .about-hero h1,
        .theme-light .team-name,
        .theme-light .mission-card h2,
        .theme-light .cta-section h2,
        .theme-light .about-cta h2,
        .theme-light .faq-contact h2,
        .theme-light .ab-stat-num,
        .theme-light .category-card h4 { color: #0f172a !important; }

        /* ── BODY TEXT ── */
        .theme-light .hero-subtitle,
        .theme-light .section-subtitle,
        .theme-light .step-card p,
        .theme-light .category-card p,
        .theme-light .faq-answer,
        .theme-light .story-content p,
        .theme-light .team-bio,
        .theme-light .mission-card p,
        .theme-light .ab-stat-label,
        .theme-light .cta-section p,
        .theme-light .about-cta p,
        .theme-light .faq-contact p { color: #475569 !important; }

        /* ── BADGES ── */
        .theme-light .hero-badge,
        .theme-light .faq-badge,
        .theme-light .ab-badge {
          background: rgba(99,102,241,0.08) !important;
          color: #4f46e5 !important;
          border-color: rgba(99,102,241,0.2) !important;
        }

        /* ── FLOATING CARDS ── */
        .theme-light .floating-card {
          background: rgba(255,255,255,0.95) !important;
          border-color: rgba(99,102,241,0.2) !important;
          color: #0f172a !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        /* ── FAQ ── */
        .theme-light .faq-question {
          background: rgba(0,0,0,0.02) !important;
          color: #0f172a !important;
        }
        .theme-light .faq-question:hover { background: rgba(99,102,241,0.05) !important; }
        .theme-light .faq-cat-btn {
          background: rgba(0,0,0,0.03) !important;
          border-color: rgba(0,0,0,0.08) !important;
          color: #475569 !important;
        }
        .theme-light .faq-cat-btn.active,
        .theme-light .faq-cat-btn:hover {
          background: rgba(99,102,241,0.1) !important;
          color: #4f46e5 !important;
        }

        /* ── STEP NUMBERS ── */
        .theme-light .step-num { color: rgba(99,102,241,0.25) !important; }

        /* ── FOOTER ── */
        .theme-light footer,
        .theme-light .footer { 
          background: #f1f5f9 !important; 
          color: #475569 !important;
          border-top-color: rgba(0,0,0,0.08) !important;
        }

        /* ── DASHBOARD ── */
        .theme-light .sidebar,
        .theme-light .nav-sidebar { 
          background: #ffffff !important; 
          border-color: rgba(0,0,0,0.08) !important;
        }
        .theme-light .sidebar-link,
        .theme-light .nav-sidebar-link { color: #475569 !important; }
        .theme-light .sidebar-link:hover,
        .theme-light .sidebar-link.active { 
          background: rgba(99,102,241,0.08) !important; 
          color: #4f46e5 !important; 
        }
      `}</style>
    </ThemeContext.Provider>
  );
}

export default App;