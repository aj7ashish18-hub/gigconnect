import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { ReviewsList, ReviewStyles } from "./Reviews";

const Home = () => {
  return (
    <>
      <div className="home-page">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">📍 Hyderabad's #1 gigconnect Platform</div>
            <h1 className="hero-title">
              Find Top gigconnects<br />
              <span className="gradient-text">Grow Your Business</span>
            </h1>
            <p className="hero-subtitle">
              Connect with skilled professionals in Hyderabad and across India.
              Post jobs, get bids, hire the best talent — all in one place.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn-primary-hero">Get Started Free →</Link>
              <Link to="/services" className="btn-secondary-hero">Explore Services</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">500+</span><span className="stat-label">gigconnects</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><span className="stat-num">1200+</span><span className="stat-label">Jobs Posted</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><span className="stat-num">4.9★</span><span className="stat-label">Avg Rating</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1"><span>🎨</span> UI/UX Design<div className="card-badge">₹2500/hr</div></div>
            <div className="floating-card card-2"><span>💻</span> Web Development<div className="card-badge">₹3000/hr</div></div>
            <div className="floating-card card-3"><span>📱</span> App Development<div className="card-badge">₹3500/hr</div></div>
            <div className="floating-card card-4"><span>✍️</span> Content Writing<div className="card-badge">₹800/hr</div></div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-section">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in 3 simple steps</p>
          <div className="steps-grid">
            {[
              { num: "01", icon: "📝", title: "Post a Job", desc: "Describe your project, set your budget, and post it for free." },
              { num: "02", icon: "🤝", title: "Receive Bids", desc: "Get proposals from skilled gigconnects within hours." },
              { num: "03", icon: "🚀", title: "Hire & Grow", desc: "Choose the best fit, collaborate, and get results." },
            ].map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-num">{step.num}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="categories-section">
          <h2 className="section-title">Popular Services</h2>
          <div className="categories-grid">
            {[
              { icon: "💻", title: "Web Development", count: "120+ gigconnects" },
              { icon: "🎨", title: "Graphic Design", count: "85+ gigconnects" },
              { icon: "📱", title: "Mobile Apps", count: "60+ gigconnects" },
              { icon: "✍️", title: "Content Writing", count: "95+ gigconnects" },
              { icon: "📊", title: "Data Analysis", count: "45+ gigconnects" },
              { icon: "🎥", title: "Video Editing", count: "70+ gigconnects" },
            ].map((cat) => (
              <Link to="/services" key={cat.title} className="category-card">
                <div className="cat-icon">{cat.icon}</div>
                <h4>{cat.title}</h4>
                <p>{cat.count}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="how-section">
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">Real feedback from our community</p>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <ReviewsList reviews={[]} />
          </div>
        </section>
        <ReviewStyles />

        {/* CTA */}
        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of businesses and gigconnects in Hyderabad</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn-primary-hero">Join as Client</Link>
            <Link to="/signup" className="btn-secondary-hero">Join as gigconnect</Link>
          </div>
        </section>

      </div>
      <Footer />

      <style>{`
        .home-page { background: #0a0a14; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; }
        .gradient-text { background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .hero-section { max-width: 1200px; margin: 0 auto; padding: 5rem 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .hero-badge { display: inline-block; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #818cf8; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .hero-title { font-size: 3rem; font-weight: 900; line-height: 1.2; margin-bottom: 1.2rem; color: #f1f5f9; }
        .hero-subtitle { color: #94a3b8; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; }
        .hero-buttons { display: flex; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .btn-primary-hero { background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.2s; }
        .btn-primary-hero:hover { opacity: 0.85; color: white; }
        .btn-secondary-hero { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); color: #818cf8; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.2s; }
        .btn-secondary-hero:hover { background: rgba(99,102,241,0.2); color: #818cf8; }
        .hero-stats { display: flex; gap: 2rem; align-items: center; }
        .stat { display: flex; flex-direction: column; }
        .stat-num { font-size: 1.5rem; font-weight: 800; color: #f1f5f9; }
        .stat-label { font-size: 0.8rem; color: #64748b; }
        .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }

        .hero-visual { position: relative; height: 400px; }
        .floating-card { position: absolute; background: rgba(255,255,255,0.05); border: 1px solid rgba(99,102,241,0.2); border-radius: 14px; padding: 16px 20px; font-size: 0.95rem; color: #e2e8f0; font-weight: 600; backdrop-filter: blur(10px); display: flex; align-items: center; gap: 10px; animation: float 4s ease-in-out infinite; }
        .card-badge { background: rgba(99,102,241,0.2); color: #818cf8; padding: 2px 8px; border-radius: 6px; font-size: 0.8rem; margin-left: auto; }
        .card-1 { top: 20px; left: 10%; animation-delay: 0s; width: 220px; }
        .card-2 { top: 130px; right: 5%; animation-delay: 1s; width: 240px; }
        .card-3 { bottom: 130px; left: 5%; animation-delay: 2s; width: 230px; }
        .card-4 { bottom: 20px; right: 10%; animation-delay: 1.5s; width: 210px; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }

        .how-section { padding: 5rem 2rem; background: rgba(99,102,241,0.03); text-align: center; }
        .section-title { font-size: 2.2rem; font-weight: 800; color: #f1f5f9; margin-bottom: 0.5rem; }
        .section-subtitle { color: #64748b; margin-bottom: 3rem; }
        .steps-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .step-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; transition: transform 0.3s; }
        .step-card:hover { transform: translateY(-5px); }
        .step-num { font-size: 3rem; font-weight: 900; color: rgba(99,102,241,0.2); line-height: 1; }
        .step-icon { font-size: 2rem; margin: 0.5rem 0; }
        .step-card h3 { color: #f1f5f9; font-size: 1.1rem; margin-bottom: 0.5rem; }
        .step-card p { color: #64748b; font-size: 0.9rem; line-height: 1.6; }

        .categories-section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; text-align: center; }
        .categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem; }
        .category-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; text-decoration: none; transition: all 0.3s; text-align: center; }
        .category-card:hover { border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.05); transform: translateY(-4px); }
        .cat-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
        .category-card h4 { color: #f1f5f9; margin-bottom: 0.3rem; }
        .category-card p { color: #64748b; font-size: 0.85rem; }

        .cta-section { text-align: center; padding: 5rem 2rem; background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.1)); border-top: 1px solid rgba(99,102,241,0.1); }
        .cta-section h2 { font-size: 2.5rem; font-weight: 800; color: #f1f5f9; margin-bottom: 0.5rem; }
        .cta-section p { color: #94a3b8; margin-bottom: 2rem; }
        .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
          .hero-title { font-size: 2rem; }
          .steps-grid, .categories-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default Home;