import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { ThemeContext } from "../App";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { darkMode } = useContext(ThemeContext);

  const categories = ["All", "Development", "Design", "Writing", "Marketing", "Data", "Video"];

  const services = [
    { icon: "💻", title: "Web Development", category: "Development", desc: "Custom websites, e-commerce, React, PHP, WordPress and more.", price: "From ₹5,000", gigconnects: 120 },
    { icon: "📱", title: "Mobile App Development", category: "Development", desc: "Android and iOS apps built with Flutter, React Native or native code.", price: "From ₹15,000", gigconnects: 60 },
    { icon: "🛒", title: "E-Commerce Development", category: "Development", desc: "Shopify, WooCommerce and custom online store development.", price: "From ₹8,000", gigconnects: 45 },
    { icon: "🎨", title: "Logo & Branding", category: "Design", desc: "Professional logos, brand identity, color palettes and guidelines.", price: "From ₹1,500", gigconnects: 85 },
    { icon: "🖼️", title: "UI/UX Design", category: "Design", desc: "Figma designs, wireframes, prototypes and user research.", price: "From ₹3,000", gigconnects: 70 },
    { icon: "📊", title: "Presentation Design", category: "Design", desc: "Stunning PowerPoint and Google Slides decks for business.", price: "From ₹1,000", gigconnects: 40 },
    { icon: "✍️", title: "Content Writing", category: "Writing", desc: "Blog posts, articles, website copy and SEO content.", price: "From ₹500", gigconnects: 95 },
    { icon: "📝", title: "Copywriting", category: "Writing", desc: "Sales pages, ad copy, email sequences and product descriptions.", price: "From ₹800", gigconnects: 55 },
    { icon: "📣", title: "Social Media Marketing", category: "Marketing", desc: "Instagram, Facebook and LinkedIn management and growth.", price: "From ₹3,000/mo", gigconnects: 65 },
    { icon: "🔍", title: "SEO Services", category: "Marketing", desc: "On-page SEO, link building, keyword research and audits.", price: "From ₹2,500", gigconnects: 50 },
    { icon: "📈", title: "Data Analysis", category: "Data", desc: "Python, Excel, Power BI dashboards and business insights.", price: "From ₹4,000", gigconnects: 45 },
    { icon: "🎥", title: "Video Editing", category: "Video", desc: "YouTube videos, reels, ads, and corporate presentations.", price: "From ₹1,500", gigconnects: 70 },
  ];

  const filtered = activeCategory === "All" ? services : services.filter(s => s.category === activeCategory);

  const bg = darkMode ? "#0a0a14" : "#f8fafc";
  const text = darkMode ? "#e2e8f0" : "#0f172a";
  const subText = darkMode ? "#64748b" : "#475569";
  const cardBg = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const cardBorder = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const headingColor = darkMode ? "#f1f5f9" : "#0f172a";
  const catBg = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const catBorder = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const catColor = darkMode ? "#64748b" : "#475569";

  return (
    <>
      <div style={{ background: bg, color: text, fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.2s" }}>

        {/* Hero */}
        <section style={{ textAlign: "center", padding: "5rem 2rem 3rem" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#818cf8", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", marginBottom: "1.5rem" }}>🛠️ 100+ Services Available</div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: headingColor, marginBottom: "1rem", lineHeight: 1.2 }}>
            Find the Perfect Service<br />
            <span style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>For Your Business</span>
          </h1>
          <p style={{ color: subText, fontSize: "1.1rem", marginBottom: "2rem" }}>Hire skilled gigconnects in Hyderabad for any project, any budget.</p>
          <Link to="/signup" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", padding: "12px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>Get Started Free →</Link>
        </section>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", padding: "0 2rem 2rem" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? "rgba(99,102,241,0.15)" : catBg,
                border: `1px solid ${activeCategory === cat ? "rgba(99,102,241,0.4)" : catBorder}`,
                color: activeCategory === cat ? "#818cf8" : catColor,
                padding: "8px 20px", borderRadius: "20px", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s",
              }}>{cat}</button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {filtered.map((s, i) => (
            <Link to="/signup" key={i} style={{
              background: cardBg, border: `1px solid ${cardBorder}`,
              borderRadius: "16px", padding: "1.75rem", textDecoration: "none",
              transition: "all 0.3s", display: "block",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ color: headingColor, fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h3>
              <p style={{ color: subText, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>{s.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.9rem" }}>{s.price}</span>
                <span style={{ color: subText, fontSize: "0.8rem" }}>{s.gigconnects}+ gigconnects</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <section style={{ textAlign: "center", padding: "4rem 2rem", background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.08))", borderTop: "1px solid rgba(99,102,241,0.1)" }}>
          <h2 style={{ color: headingColor, fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Can't find what you need?</h2>
          <p style={{ color: subText, marginBottom: "2rem" }}>Post a custom job and let gigconnects come to you</p>
          <Link to="/signup" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", padding: "12px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>Post a Job Free</Link>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Services;