import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsOfService = () => {
  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing or using gigconnectHub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting." },
    { title: "2. User Accounts", content: "You must create an account to use most features of our platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to update your information to keep it accurate." },
    { title: "3. Client Responsibilities", content: "As a client, you agree to provide clear project descriptions and requirements, pay agreed amounts promptly upon satisfactory completion, communicate professionally with gigconnects, and not attempt to take transactions off-platform to avoid fees. You also agree not to post misleading or fraudulent job listings." },
    { title: "4. gigconnect Responsibilities", content: "As a gigconnect, you agree to complete work to the standard described in your proposals, communicate proactively about project progress, deliver work on time or notify clients of delays in advance, and maintain professional conduct at all times. You are responsible for the quality of work you deliver." },
    { title: "5. Payments and Fees", content: "gigconnectHub charges a service fee on completed transactions. The current fee structure is displayed on our pricing page. All payments are processed securely through our platform. We do not allow off-platform transactions as this violates our terms and removes buyer/seller protections." },
    { title: "6. Prohibited Activities", content: "You may not use our platform for any illegal or unauthorized purpose, to transmit spam or unsolicited messages, to attempt to gain unauthorized access to our systems, to post false or misleading information, to harass or intimidate other users, or to engage in any activity that disrupts or interferes with our services." },
    { title: "7. Intellectual Property", content: "Upon full payment, clients own all rights to the work product created for them, unless otherwise agreed in writing. gigconnects retain the right to display completed work in their portfolios unless the client requests confidentiality. gigconnectHub retains ownership of all platform content and technology." },
    { title: "8. Dispute Resolution", content: "In the event of a dispute between a client and gigconnect, both parties agree to first attempt to resolve the matter directly. If resolution cannot be reached, either party may escalate to gigconnectHub's dispute resolution team. Our decision in such matters is final and binding." },
    { title: "9. Limitation of Liability", content: "gigconnectHub is not liable for the quality of work delivered by gigconnects, for disputes between clients and gigconnects, for any indirect or consequential damages arising from use of our platform, or for any losses resulting from unauthorized access to your account." },
    { title: "10. Contact", content: "If you have any questions about these Terms of Service, please contact us at legal@gigconnecthub.in or write to gigconnectHub, Hyderabad, Telangana, India — 500001." },
  ];

  return (
    <>
      <Navbar />
      <div className="terms-page">
        <div className="terms-hero">
          <h1>Terms of <span className="gradient-text">Service</span></h1>
          <p>Last updated: March 2026</p>
        </div>
        <div className="terms-content">
          <p className="terms-intro">Please read these Terms of Service carefully before using gigconnectHub. By using our platform, you agree to be bound by these terms.</p>
          {sections.map((s, i) => (
            <div key={i} className="terms-section">
              <h2>{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      <style>{`
        .terms-page { background: #0a0a14; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; min-height: 100vh; }
        .gradient-text { background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .terms-hero { text-align: center; padding: 5rem 2rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .terms-hero h1 { font-size: 2.8rem; font-weight: 900; color: #f1f5f9; margin-bottom: 0.5rem; }
        .terms-hero p { color: #475569; font-size: 0.9rem; }
        .terms-content { max-width: 780px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .terms-intro { color: #94a3b8; font-size: 1rem; line-height: 1.8; margin-bottom: 2.5rem; background: rgba(6,182,212,0.05); border-left: 3px solid #06b6d4; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; }
        .terms-section { margin-bottom: 2rem; }
        .terms-section h2 { color: #f1f5f9; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .terms-section p { color: #94a3b8; font-size: 0.92rem; line-height: 1.8; }
      `}</style>
    </>
  );
};

export default TermsOfService;
