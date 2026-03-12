import React, { useState, useContext } from "react";
import Footer from "./Footer";
import { ThemeContext } from "../App";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { darkMode } = useContext(ThemeContext);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const bg = darkMode ? "#0a0a14" : "#f8fafc";
  const text = darkMode ? "#e2e8f0" : "#0f172a";
  const subText = darkMode ? "#64748b" : "#475569";
  const cardBg = darkMode ? "rgba(255,255,255,0.03)" : "#ffffff";
  const cardBorder = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const headingColor = darkMode ? "#f1f5f9" : "#0f172a";
  const inputBg = darkMode ? "rgba(255,255,255,0.04)" : "#f8fafc";
  const inputBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)";
  const inputColor = darkMode ? "#e2e8f0" : "#0f172a";
  const labelColor = darkMode ? "#94a3b8" : "#64748b";

  return (
    <>
      <div style={{ background: bg, color: text, fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.2s" }}>

        {/* Hero */}
        <section style={{ textAlign: "center", padding: "5rem 2rem 3rem" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#818cf8", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", marginBottom: "1.5rem" }}>📬 Contact Us</div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: headingColor, marginBottom: "0.75rem" }}>
            Get in <span style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span>
          </h1>
          <p style={{ color: subText, fontSize: "1.1rem" }}>Have a question, feedback or need help? We're here for you.</p>
        </section>

        {/* Grid */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem 5rem", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start" }}>

          {/* Info Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "📍", title: "Our Location", text: "Hyderabad, Telangana\nIndia — 500001" },
              { icon: "📧", title: "Email Us", text: "support@gigconnecthub.in\nhello@gigconnecthub.in" },
              { icon: "🕐", title: "Working Hours", text: "Monday – Saturday\n9:00 AM – 6:00 PM IST" },
              { icon: "💬", title: "Live Chat", text: "Available on the platform\nfor registered users" },
            ].map((item, i) => (
              <div key={i} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "14px", padding: "1.5rem", transition: "all 0.3s" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h3 style={{ color: headingColor, fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{item.title}</h3>
                <p style={{ color: subText, fontSize: "0.88rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: cardBg, border: `1px solid rgba(99,102,241,0.2)`, borderRadius: "18px", padding: "2.5rem", transition: "background 0.3s" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "3rem" }}>🎉</div>
                <h3 style={{ color: "#10b981", fontSize: "1.4rem", margin: "1rem 0 0.5rem" }}>Message Sent!</h3>
                <p style={{ color: subText }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 style={{ color: headingColor, fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem" }}>Send us a Message</h2>
                {["name", "email", "subject"].map((field) => (
                  <div key={field} style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", color: labelColor, fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.5rem" }}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}{field !== "subject" ? " *" : ""}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder={field === "name" ? "Your full name" : field === "email" ? "your@email.com" : "What's this about?"}
                      value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      style={{ width: "100%", background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: "10px", padding: "12px 14px", color: inputColor, fontSize: "0.95rem", fontFamily: "'Segoe UI', sans-serif", transition: "all 0.2s", boxSizing: "border-box", outline: "none" }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", color: labelColor, fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.5rem" }}>Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: "10px", padding: "12px 14px", color: inputColor, fontSize: "0.95rem", fontFamily: "'Segoe UI', sans-serif", transition: "all 0.2s", boxSizing: "border-box", outline: "none", resize: "none" }}
                  />
                </div>
                {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", padding: "10px 14px", borderRadius: "8px", fontSize: "0.88rem", marginBottom: "1rem" }}>⚠️ {error}</div>}
                <button onClick={handleSubmit}
                  style={{ width: "100%", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", border: "none", borderRadius: "10px", padding: "13px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s", fontFamily: "'Segoe UI', sans-serif" }}>
                  Send Message →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;