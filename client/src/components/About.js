import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const About = () => {
  const team = [
    { name: "Ashish", role: "Founder & CEO", emoji: "👨‍💼", bio: "Passionate about connecting talent with opportunity in Hyderabad." },
{ name: "Manikanta Reddy", role: "Co-Founder & CTO", emoji: "👨‍💻", bio: "Building the tech backbone that powers every gig on the platform." },
{ name: "Harshavardhan", role: "Head of Design", emoji: "👨‍🎨", bio: "Creates beautiful experiences that delight users every day." },
{ name: "Harish", role: "Head of Operations", emoji: "👨‍🔧", bio: "Ensures every client and gigconnect gets the best experience." },
  ];

  const stats = [
    { num: "500+", label: "gigconnects" },
    { num: "1200+", label: "Jobs Completed" },
    { num: "300+", label: "Happy Clients" },
    { num: "4.9★", label: "Average Rating" },
  ];

  return (
    <>
      <div className="about-page">

        <section className="about-hero">
          <div className="ab-badge">🏢 About Us</div>
          <h1>We're Building Hyderabad's<br /><span className="gradient-text">gigconnect Future</span></h1>
          <p>gigconnectHub was founded with a simple mission — make it easy for businesses to find great talent and for gigconnects to find great work, right here in Hyderabad.</p>
        </section>

        <section className="about-stats">
          {stats.map((s, i) => (
            <div key={i} className="ab-stat">
              <div className="ab-stat-num">{s.num}</div>
              <div className="ab-stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="about-mission">
          <div className="mission-card">
            <div className="mission-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>To create a thriving gigconnect economy in Hyderabad by connecting skilled professionals with businesses that need them — transparently, fairly and efficiently.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">👁️</div>
            <h2>Our Vision</h2>
            <p>A future where every professional in India can work on their own terms, and every business — big or small — can access world-class talent instantly.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">💎</div>
            <h2>Our Values</h2>
            <p>Trust, transparency and quality. We verify every gigconnect, protect every payment, and stand behind every project completed on our platform.</p>
          </div>
        </section>

        <section className="about-story">
          <h2 className="section-title">Our Story</h2>
          <div className="story-content">
            <p>gigconnectHub started in 2024 when our founder noticed how difficult it was for small businesses in Hyderabad to find reliable gigconnects — and how hard it was for talented professionals to find quality clients.</p>
            <p>We built a platform that solves both problems. Today we connect hundreds of gigconnects with businesses across Hyderabad, helping both sides grow and thrive.</p>
            <p>We're proud to be Hyderabad's #1 gigconnect marketplace and we're just getting started.</p>
          </div>
        </section>

        <section className="about-team">
          <h2 className="section-title">Meet the Team</h2>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-emoji">{member.emoji}</div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <h2>Join Our Community</h2>
          <p>Be part of Hyderabad's fastest growing gigconnect platform</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signup" className="btn-primary">Join as Client</Link>
            <Link to="/signup" className="btn-secondary">Join as gigconnect</Link>
          </div>
        </section>

      </div>
      <Footer />

      <style>{`
        .about-page { background: #0a0a14; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; min-height: 100vh; }
        .gradient-text { background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-primary { background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; }
        .btn-primary:hover { opacity: 0.85; color: white; }
        .btn-secondary { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); color: #818cf8; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; }
        .btn-secondary:hover { background: rgba(99,102,241,0.2); color: #818cf8; }

        .about-hero { text-align: center; padding: 5rem 2rem 3rem; }
        .ab-badge { display: inline-block; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #818cf8; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .about-hero h1 { font-size: 2.8rem; font-weight: 900; color: #f1f5f9; margin-bottom: 1rem; line-height: 1.2; }
        .about-hero p { color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.7; }

        .about-stats { display: flex; justify-content: center; gap: 4rem; padding: 3rem 2rem; background: rgba(99,102,241,0.03); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; }
        .ab-stat { text-align: center; }
        .ab-stat-num { font-size: 2.5rem; font-weight: 900; color: #f1f5f9; }
        .ab-stat-label { color: #64748b; font-size: 0.9rem; margin-top: 4px; }

        .about-mission { max-width: 1100px; margin: 0 auto; padding: 4rem 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .mission-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; text-align: center; transition: all 0.3s; }
        .mission-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-4px); }
        .mission-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .mission-card h2 { color: #f1f5f9; font-size: 1.2rem; margin-bottom: 0.75rem; }
        .mission-card p { color: #64748b; font-size: 0.9rem; line-height: 1.7; }

        .about-story { max-width: 700px; margin: 0 auto; padding: 2rem 2rem 4rem; text-align: center; }
        .section-title { font-size: 2rem; font-weight: 800; color: #f1f5f9; margin-bottom: 2rem; text-align: center; }
        .story-content p { color: #94a3b8; font-size: 1rem; line-height: 1.8; margin-bottom: 1rem; }

        .about-team { padding: 2rem 2rem 4rem; max-width: 1100px; margin: 0 auto; }
        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .team-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; text-align: center; transition: all 0.3s; }
        .team-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-4px); }
        .team-emoji { font-size: 3rem; margin-bottom: 1rem; }
        .team-name { color: #f1f5f9; font-weight: 700; margin-bottom: 0.3rem; }
        .team-role { color: #6366f1; font-size: 0.85rem; margin-bottom: 0.75rem; }
        .team-bio { color: #64748b; font-size: 0.85rem; line-height: 1.6; }

        .about-cta { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.08)); border-top: 1px solid rgba(99,102,241,0.1); }
        .about-cta h2 { color: #f1f5f9; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .about-cta p { color: #64748b; margin-bottom: 2rem; }

        @media (max-width: 900px) { .about-mission, .team-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .about-mission, .team-grid { grid-template-columns: 1fr; } .about-hero h1 { font-size: 1.8rem; } .about-stats { gap: 2rem; } }
      `}</style>
    </>
  );
};

export default About;