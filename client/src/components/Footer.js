import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer-custom">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-text">⚡ gigconnectHub</span>
            <p className="brand-tagline">Connecting talent with opportunity<br />📍 Based in Hyderabad, India</p>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-links-group">
            <h4>Support</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>

          <div className="footer-links-group">
            <h4>Get Started</h4>
            <Link to="/signup">Sign Up Free</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 gigconnectHub Hyderabad. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .footer-custom {
          background: #0a0a14;
          border-top: 1px solid rgba(99,102,241,0.2);
          font-family: 'Segoe UI', sans-serif;
          padding: 3rem 2rem 1rem;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .footer-brand .brand-text {
          font-size: 1.3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-tagline {
          color: #64748b;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          line-height: 1.6;
        }
        .footer-links-group h4 {
          color: #e2e8f0;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }
        .footer-links-group a {
          display: block;
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }
        .footer-links-group a:hover { color: #6366f1; }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }
        .footer-bottom p { color: #475569; font-size: 0.85rem; }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .footer-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default Footer;
