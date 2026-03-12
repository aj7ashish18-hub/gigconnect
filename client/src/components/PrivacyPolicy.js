import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  const sections = [
    { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, post a job, submit a bid, or contact us for support. This includes your name, email address, phone number, payment information, and any other information you choose to provide. We also automatically collect certain information about your device and how you interact with our platform." },
    { title: "2. How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and send you marketing communications (with your consent). We also use your information to monitor and analyze trends and usage, detect and prevent fraudulent transactions and other illegal activities." },
    { title: "3. Information Sharing", content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with gigconnects or clients as necessary to facilitate transactions on our platform. We may also share information with service providers who assist us in operating our platform, subject to confidentiality agreements." },
    { title: "4. Data Security", content: "We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. All data transmitted between your browser and our servers is encrypted using SSL technology. We store passwords in hashed form and never in plain text." },
    { title: "5. Cookies", content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
    { title: "6. Your Rights", content: "You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us directly. You also have the right to opt out of marketing communications at any time by clicking the unsubscribe link in any email we send." },
    { title: "7. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date. You are advised to review this Privacy Policy periodically for any changes." },
    { title: "8. Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at privacy@gigconnecthub.in or write to us at gigconnectHub, Hyderabad, Telangana, India — 500001." },
  ];

  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="policy-hero">
          <h1>Privacy <span className="gradient-text">Policy</span></h1>
          <p>Last updated: March 2026</p>
        </div>
        <div className="policy-content">
          <p className="policy-intro">At gigconnectHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
          {sections.map((s, i) => (
            <div key={i} className="policy-section">
              <h2>{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      <style>{`
        .policy-page { background: #0a0a14; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; min-height: 100vh; }
        .gradient-text { background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .policy-hero { text-align: center; padding: 5rem 2rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .policy-hero h1 { font-size: 2.8rem; font-weight: 900; color: #f1f5f9; margin-bottom: 0.5rem; }
        .policy-hero p { color: #475569; font-size: 0.9rem; }
        .policy-content { max-width: 780px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .policy-intro { color: #94a3b8; font-size: 1rem; line-height: 1.8; margin-bottom: 2.5rem; background: rgba(99,102,241,0.05); border-left: 3px solid #6366f1; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; }
        .policy-section { margin-bottom: 2rem; }
        .policy-section h2 { color: #f1f5f9; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .policy-section p { color: #94a3b8; font-size: 0.92rem; line-height: 1.8; }
      `}</style>
    </>
  );
};

export default PrivacyPolicy;
