import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../App";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar-custom ${scrolled ? "scrolled" : ""} ${darkMode ? "dark" : "light"}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">⚡ gigconnectHub</Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-auth">
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
              {darkMode ? "☀️" : "🌙"}
            </button>
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/signup" className="btn-signup">Get Started</Link>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-link ${location.pathname === link.to ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-auth">
              <button className="theme-toggle-mobile" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
              <Link to="/login" className="btn-login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-signup" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .navbar-custom {
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(99,102,241,0.1);
          transition: all 0.3s ease;
          font-family: 'Segoe UI', sans-serif;
        }

        /* Dark mode styles */
        .navbar-custom.dark { background: rgba(10,10,20,0.85); }
        .navbar-custom.scrolled.dark {
          background: rgba(10,10,20,0.97);
          border-bottom-color: rgba(99,102,241,0.25);
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }

        /* Light mode styles */
        .navbar-custom.light { background: rgba(248,250,252,0.95); border-bottom-color: rgba(99,102,241,0.15); }
        .navbar-custom.scrolled.light {
          background: rgba(248,250,252,0.99);
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-logo {
          font-size: 1.25rem;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .dark .nav-link { color: #94a3b8; }
        .light .nav-link { color: #475569; }
        .dark .nav-link:hover { color: #e2e8f0; background: rgba(99,102,241,0.1); }
        .light .nav-link:hover { color: #1e293b; background: rgba(99,102,241,0.08); }
        .nav-link.active { color: #818cf8; background: rgba(99,102,241,0.12); }

        .nav-auth {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        /* Theme Toggle Button */
        .theme-toggle {
          background: none;
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 8px;
          padding: 6px 10px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.2s;
          line-height: 1;
        }
        .theme-toggle:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.5);
          transform: scale(1.1);
        }

        .btn-login {
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 7px 16px;
          border-radius: 8px;
          transition: all 0.2s;
          border: 1px solid;
        }
        .dark .btn-login { color: #94a3b8; border-color: rgba(99,102,241,0.2); }
        .light .btn-login { color: #475569; border-color: rgba(99,102,241,0.3); }
        .dark .btn-login:hover { color: #e2e8f0; border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.08); }
        .light .btn-login:hover { color: #1e293b; border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.06); }

        .btn-signup {
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 7px 18px;
          border-radius: 8px;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .btn-signup:hover { opacity: 0.85; color: white; }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-left: auto;
        }
        .bar {
          display: block;
          width: 22px;
          height: 2px;
          background: #94a3b8;
          border-radius: 2px;
          transition: all 0.3s;
        }

        /* Mobile Menu */
        .dark .mobile-menu { background: #0a0a14; border-top: 1px solid rgba(99,102,241,0.1); }
        .light .mobile-menu { background: #f8fafc; border-top: 1px solid rgba(99,102,241,0.15); }
        .mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 1rem 2rem 1.5rem;
          gap: 0.25rem;
        }

        .mobile-link {
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 10px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .dark .mobile-link { color: #94a3b8; }
        .light .mobile-link { color: #475569; }
        .mobile-link:hover, .mobile-link.active { color: #818cf8; background: rgba(99,102,241,0.1); }

        .mobile-auth {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
        }
        .mobile-auth .btn-login,
        .mobile-auth .btn-signup { flex: 1; text-align: center; }

        .theme-toggle-mobile {
          width: 100%;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: #818cf8;
          transition: all 0.2s;
          text-align: center;
        }
        .theme-toggle-mobile:hover { background: rgba(99,102,241,0.15); }

        @media (max-width: 768px) {
          .nav-links, .nav-auth { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Navbar;