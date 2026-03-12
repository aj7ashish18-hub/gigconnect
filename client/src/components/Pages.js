import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const Services = () => (
  <>
    <Navbar />
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Our <span className="g-text">Services</span></h1>
        <p>Everything you need to hire or get hired in Hyderabad</p>
      </div>
      <div className="services-grid">
        {[
          { icon: "💻", title: "Web Development", desc: "Full stack websites, React apps, PHP backends, and more.", price: "From ₹5,000" },
          { icon: "🎨", title: "Graphic Design", desc: "Logos, branding, UI/UX design, social media creatives.", price: "From ₹2,000" },
          { icon: "📱", title: "Mobile Apps", desc: "Android and iOS app development for your business.", price: "From ₹15,000" },
          { icon: "✍️", title: "Content Writing", desc: "SEO blogs, product descriptions, social media content.", price: "From ₹500" },
          { icon: "📊", title: "Data Analysis", desc: "Excel, Python, Power BI dashboards and reports.", price: "From ₹3,000" },
          { icon: "🎥", title: "Video Editing", desc: "YouTube videos, reels, corporate presentations.", price: "From ₹1,500" },
          { icon: "📈", title: "Digital Marketing", desc: "SEO, Google Ads, social media management.", price: "From ₹4,000" },
          { icon: "🔧", title: "IT Support", desc: "Network setup, troubleshooting, software installation.", price: "From ₹1,000" },
        ].map((s) => (
          <div key={s.title} className="service-card">
            <div className="s-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="s-price">{s.price}</div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    <PageStyles />
  </>
);

export const About = () => (
  <>
    <Navbar />
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>About <span className="g-text">gigconnectHub</span></h1>
        <p>Built in Hyderabad, for Hyderabad</p>
      </div>
      <div className="about-content">
        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>gigconnectHub was created to bridge the gap between talented gigconnects and businesses in Hyderabad. We believe every business deserves access to skilled professionals, and every gigconnect deserves fair opportunities.</p>
        </div>
        <div className="about-card">
          <h2>📍 Why Hyderabad?</h2>
          <p>Hyderabad is one of India's fastest growing tech hubs. With HITEC City, Gachibowli, and Madhapur becoming global tech centers, the demand for skilled gigconnects has never been higher. We are proud to be the city's home-grown gigconnect platform.</p>
        </div>
        <div className="about-card">
          <h2>🏆 Our Values</h2>
          <ul className="values-list">
            <li>✅ Transparency in every transaction</li>
            <li>✅ Fair pay for quality work</li>
            <li>✅ Trust through verified reviews</li>
            <li>✅ Support for local talent</li>
          </ul>
        </div>
        <div className="stats-row">
          {[
            { num: "500+", label: "Registered gigconnects" },
            { num: "1200+", label: "Jobs Completed" },
            { num: "300+", label: "Happy Clients" },
            { num: "4.9★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label} className="about-stat">
              <div className="a-num">{s.num}</div>
              <div className="a-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    <PageStyles />
  </>
);

export const FAQ = () => {
  const [open, setOpen] = React.useState(null);
  const faqs = [
    { q: "How do I post a job?", a: "Sign up as a Client, go to your dashboard, fill in the job title, description, and budget, then click Post. It's completely free!" },
    { q: "How do I get paid as a gigconnect?", a: "Once a client accepts your bid and the work is completed, payment is processed directly. We support UPI, bank transfer, and other popular Indian payment methods." },
    { q: "Is gigconnectHub free to use?", a: "Yes! Posting jobs and browsing gigconnects is completely free. We only charge a small service fee on successful project completions." },
    { q: "How are gigconnects verified?", a: "All gigconnects go through a profile review process. Clients can also see ratings and reviews from previous projects to make informed decisions." },
    { q: "Can I hire gigconnects outside Hyderabad?", a: "Absolutely! While we are based in Hyderabad, gigconnects from all across India are welcome to join and work with our clients." },
    { q: "What if I am not satisfied with the work?", a: "We have a dispute resolution process in place. Contact our support team and we will help mediate the situation fairly." },
    { q: "How do I leave a review?", a: "After a job is completed, clients can leave a star rating and written review for the gigconnect from their dashboard." },
    { q: "How do I contact support?", a: "Use the Contact page to reach us. We respond within 24 hours on business days." },
  ];
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="page-hero">
          <h1>Frequently Asked <span className="g-text">Questions</span></h1>
          <p>Everything you need to know about gigconnectHub</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? null : i)}>
              <div className="faq-q">
                <span>{faq.q}</span>
                <span className="faq-arrow">{open === i ? "▲" : "▼"}</span>
              </div>
              {open === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <PageStyles />
    </>
  );
};

export const Contact = () => {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [sent, setSent] = React.useState(false);
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="page-hero">
          <h1>Contact <span className="g-text">Us</span></h1>
          <p>We'd love to hear from you</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-item">📍 <div><strong>Address</strong><p>HITEC City, Hyderabad, Telangana 500081</p></div></div>
            <div className="contact-item">📧 <div><strong>Email</strong><p>support@gigconnecthub.in</p></div></div>
            <div className="contact-item">📞 <div><strong>Phone</strong><p>+91 98765 43210</p></div></div>
            <div className="contact-item">⏰ <div><strong>Hours</strong><p>Mon–Sat, 9AM–6PM IST</p></div></div>
          </div>
          <div className="contact-form-card">
            {sent ? (
              <div className="success-msg">✅ Message sent! We'll get back to you within 24 hours.</div>
            ) : (
              <>
                <h3>Send a Message</h3>
                <input className="form-inp" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input className="form-inp" placeholder="Your Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <textarea className="form-inp" rows="5" placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                <button className="submit-btn" onClick={() => setSent(true)}>Send Message →</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <PageStyles />
    </>
  );
};

export const PrivacyPolicy = () => (
  <>
    <Navbar />
    <div className="page-wrapper">
      <div className="page-hero">
        <h1><span className="g-text">Privacy</span> Policy</h1>
        <p>Last updated: March 2026</p>
      </div>
      <div className="legal-content">
        {[
          { title: "1. Information We Collect", body: "We collect information you provide when registering, such as your name, email address, and role. We also collect usage data to improve our platform." },
          { title: "2. How We Use Your Information", body: "Your information is used to provide our services, match clients with gigconnects, process payments, and send important notifications about your account." },
          { title: "3. Data Security", body: "We implement industry-standard security measures including encrypted passwords, HTTPS connections, and secure database storage to protect your personal data." },
          { title: "4. Sharing of Data", body: "We do not sell your personal data to third parties. We may share necessary information with payment processors and only as required by law." },
          { title: "5. Cookies", body: "We use cookies to maintain your login session and improve your experience. You can disable cookies in your browser settings, though this may affect functionality." },
          { title: "6. Your Rights", body: "You have the right to access, modify, or delete your personal data at any time by contacting us or through your account settings." },
          { title: "7. Contact", body: "For privacy-related concerns, contact us at privacy@gigconnecthub.in or visit our Contact page." },
        ].map((s) => (
          <div key={s.title} className="legal-section">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    <PageStyles />
  </>
);

export const Terms = () => (
  <>
    <Navbar />
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Terms of <span className="g-text">Service</span></h1>
        <p>Last updated: March 2026</p>
      </div>
      <div className="legal-content">
        {[
          { title: "1. Acceptance of Terms", body: "By using gigconnectHub, you agree to these terms. If you disagree, please do not use the platform." },
          { title: "2. User Accounts", body: "You are responsible for maintaining the security of your account. Do not share your password. You must provide accurate information during registration." },
          { title: "3. Client Responsibilities", body: "Clients must post accurate job descriptions and pay agreed amounts promptly upon satisfactory completion of work." },
          { title: "4. gigconnect Responsibilities", body: "gigconnects must complete agreed work to a professional standard, communicate promptly, and deliver on time." },
          { title: "5. Payments", body: "All payments must be processed through gigconnectHub. Off-platform payments void our protections and are not recommended." },
          { title: "6. Prohibited Activities", body: "Users may not post fake jobs, submit fraudulent bids, harass other users, or use the platform for any illegal activity." },
          { title: "7. Termination", body: "We reserve the right to suspend or terminate accounts that violate these terms without prior notice." },
          { title: "8. Governing Law", body: "These terms are governed by the laws of India. Disputes will be resolved in courts located in Hyderabad, Telangana." },
        ].map((s) => (
          <div key={s.title} className="legal-section">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    <PageStyles />
  </>
);

const PageStyles = () => (
  <style>{`
    .page-wrapper {
      background: #0a0a14;
      color: #e2e8f0;
      font-family: 'Segoe UI', sans-serif;
      min-height: 80vh;
    }
    .g-text {
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .page-hero {
      text-align: center;
      padding: 5rem 2rem 3rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .page-hero h1 { font-size: 2.8rem; font-weight: 900; margin-bottom: 0.5rem; }
    .page-hero p { color: #64748b; font-size: 1.1rem; }

    /* Services */
    .services-grid {
      max-width: 1200px; margin: 3rem auto; padding: 0 2rem;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
    }
    .service-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px; padding: 1.8rem;
      transition: all 0.3s;
    }
    .service-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-4px); }
    .s-icon { font-size: 2rem; margin-bottom: 0.8rem; }
    .service-card h3 { color: #f1f5f9; margin-bottom: 0.5rem; font-size: 1rem; }
    .service-card p { color: #64748b; font-size: 0.85rem; line-height: 1.6; margin-bottom: 0.8rem; }
    .s-price { color: #6366f1; font-weight: 700; font-size: 0.9rem; }

    /* About */
    .about-content { max-width: 900px; margin: 3rem auto; padding: 0 2rem; }
    .about-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem;
    }
    .about-card h2 { color: #f1f5f9; margin-bottom: 1rem; }
    .about-card p { color: #94a3b8; line-height: 1.8; }
    .values-list { color: #94a3b8; line-height: 2; padding-left: 0; list-style: none; }
    .stats-row {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1.5rem;
    }
    .about-stat {
      background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
      border-radius: 12px; padding: 1.5rem; text-align: center;
    }
    .a-num { font-size: 2rem; font-weight: 800; color: #818cf8; }
    .a-label { color: #64748b; font-size: 0.85rem; margin-top: 0.3rem; }

    /* FAQ */
    .faq-list { max-width: 800px; margin: 3rem auto; padding: 0 2rem; }
    .faq-item {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px; margin-bottom: 1rem;
      cursor: pointer; transition: border-color 0.2s; overflow: hidden;
    }
    .faq-item.open { border-color: rgba(99,102,241,0.4); }
    .faq-q {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.2rem 1.5rem; color: #f1f5f9; font-weight: 600;
    }
    .faq-arrow { color: #6366f1; }
    .faq-a { padding: 0 1.5rem 1.2rem; color: #94a3b8; line-height: 1.7; }

    /* Contact */
    .contact-grid {
      max-width: 1000px; margin: 3rem auto; padding: 0 2rem;
      display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem;
    }
    .contact-info h3 { color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.3rem; }
    .contact-item {
      display: flex; gap: 1rem; margin-bottom: 1.5rem;
      font-size: 1.3rem; align-items: flex-start;
    }
    .contact-item div strong { color: #f1f5f9; display: block; margin-bottom: 0.2rem; }
    .contact-item div p { color: #64748b; margin: 0; font-size: 0.9rem; }
    .contact-form-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px; padding: 2rem;
    }
    .contact-form-card h3 { color: #f1f5f9; margin-bottom: 1.5rem; }
    .form-inp {
      width: 100%; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
      padding: 12px 16px; color: #e2e8f0; font-size: 0.95rem;
      margin-bottom: 1rem; display: block; box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }
    .form-inp:focus { outline: none; border-color: #6366f1; }
    .form-inp::placeholder { color: #475569; }
    .submit-btn {
      width: 100%;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      color: white; border: none; border-radius: 10px;
      padding: 12px; font-size: 1rem; font-weight: 700; cursor: pointer;
      transition: opacity 0.2s;
    }
    .submit-btn:hover { opacity: 0.85; }
    .success-msg {
      color: #4ade80; background: rgba(74,222,128,0.1);
      border: 1px solid rgba(74,222,128,0.2); border-radius: 10px;
      padding: 1.5rem; text-align: center; font-size: 1rem;
    }

    /* Legal */
    .legal-content { max-width: 800px; margin: 3rem auto; padding: 0 2rem 3rem; }
    .legal-section { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .legal-section h3 { color: #f1f5f9; margin-bottom: 0.8rem; font-size: 1.1rem; }
    .legal-section p { color: #94a3b8; line-height: 1.8; }

    @media (max-width: 768px) {
      .services-grid { grid-template-columns: 1fr 1fr; }
      .contact-grid { grid-template-columns: 1fr; }
      .stats-row { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .services-grid { grid-template-columns: 1fr; }
      .page-hero h1 { font-size: 2rem; }
    }
  `}</style>
);
