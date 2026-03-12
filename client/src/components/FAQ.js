import React, { useState } from "react";
import Footer from "./Footer";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const faqs = [
    { category: "General", q: "What is gigconnectHub?", a: "gigconnectHub is Hyderabad's #1 gigconnect marketplace. We connect skilled gigconnects with businesses and individuals who need professional services — from web development to content writing." },
    { category: "General", q: "Is gigconnectHub free to join?", a: "Yes! Signing up is completely free for both clients and gigconnects. We only charge a small service fee when a job is successfully completed." },
    { category: "General", q: "What kind of services can I find here?", a: "We offer 100+ services including web development, mobile apps, graphic design, content writing, digital marketing, data analysis, video editing and much more." },
    { category: "Clients", q: "How do I hire a gigconnect?", a: "Simply sign up as a client, browse gigconnects by skill or category, and click 'Hire Now' on any profile that interests you. The gigconnect will get in touch with you to discuss your project." },
    { category: "Clients", q: "How do I know the gigconnect is reliable?", a: "All gigconnects on our platform are verified and have ratings and reviews from previous clients. You can check their profile, reviews and past work before hiring." },
    { category: "Clients", q: "What if I'm not happy with the work?", a: "We have a dispute resolution system. If you're not satisfied, you can raise a dispute and our team will mediate to ensure a fair outcome for both parties." },
    { category: "gigconnects", q: "How do I start getting work on gigconnectHub?", a: "Sign up as a gigconnect, complete your profile with your skills, experience and portfolio. Then browse available jobs and submit your bids. Clients will review your proposal and contact you." },
    { category: "gigconnects", q: "When and how do I get paid?", a: "Payments are released once the client approves your completed work. You can withdraw to your bank account via UPI, NEFT or IMPS within 2-3 business days." },
    { category: "gigconnects", q: "Can I work with clients outside Hyderabad?", a: "Absolutely! While we're based in Hyderabad, our platform connects you with clients from all across India." },
    { category: "Payments", q: "What payment methods are accepted?", a: "We accept UPI, credit/debit cards, net banking, and all major Indian payment methods through our secure payment gateway." },
    { category: "Payments", q: "Is my payment information safe?", a: "Yes. We use industry-standard SSL encryption and never store your full payment details on our servers." },
  ];

  const categories = ["All", "General", "Clients", "gigconnects", "Payments"];
  const filtered = activeCategory === "All" ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <>
      <div className="faq-page">

        <section className="faq-hero">
          <div className="faq-badge">❓ FAQ</div>
          <h1>Frequently Asked <span className="gradient-text">Questions</span></h1>
          <p>Everything you need to know about gigconnectHub</p>
        </section>

        <div className="faq-categories">
          {categories.map(cat => (
            <button key={cat} className={`faq-cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>

        <div className="faq-list">
          {filtered.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{faq.q}</span>
                <span className="faq-icon">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        <section className="faq-contact">
          <h2>Still have questions?</h2>
          <p>Our support team is here to help</p>
          <a href="/contact" className="btn-primary">Contact Us →</a>
        </section>

      </div>
      <Footer />

      <style>{`
        .faq-page { background: #0a0a14; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; min-height: 100vh; }
        .gradient-text { background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-primary { background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; display: inline-block; }
        .btn-primary:hover { opacity: 0.85; color: white; }

        .faq-hero { text-align: center; padding: 5rem 2rem 2rem; }
        .faq-badge { display: inline-block; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #818cf8; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .faq-hero h1 { font-size: 2.8rem; font-weight: 900; color: #f1f5f9; margin-bottom: 0.75rem; }
        .faq-hero p { color: #64748b; font-size: 1.1rem; }

        .faq-categories { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; padding: 2rem; }
        .faq-cat-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #64748b; padding: 7px 18px; border-radius: 20px; cursor: pointer; font-size: 0.88rem; transition: all 0.2s; }
        .faq-cat-btn.active, .faq-cat-btn:hover { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #818cf8; }

        .faq-list { max-width: 780px; margin: 0 auto; padding: 0 2rem 4rem; }
        .faq-item { border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; margin-bottom: 0.75rem; overflow: hidden; transition: border-color 0.2s; }
        .faq-item.open { border-color: rgba(99,102,241,0.3); }
        .faq-question { width: 100%; background: rgba(255,255,255,0.03); border: none; color: #e2e8f0; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; font-weight: 600; text-align: left; gap: 1rem; transition: background 0.2s; }
        .faq-question:hover { background: rgba(99,102,241,0.06); }
        .faq-icon { color: #6366f1; font-size: 1.3rem; flex-shrink: 0; }
        .faq-answer { padding: 0 1.5rem 1.25rem; color: #94a3b8; font-size: 0.92rem; line-height: 1.7; background: rgba(255,255,255,0.02); }

        .faq-contact { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.08)); border-top: 1px solid rgba(99,102,241,0.1); }
        .faq-contact h2 { color: #f1f5f9; font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; }
        .faq-contact p { color: #64748b; margin-bottom: 1.5rem; }

        @media (max-width: 600px) { .faq-hero h1 { font-size: 1.8rem; } }
      `}</style>
    </>
  );
};

export default FAQ;