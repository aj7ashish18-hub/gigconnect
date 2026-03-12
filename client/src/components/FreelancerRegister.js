import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8000/api";

const domains = [
  { icon: "💻", label: "Web Development" },
  { icon: "🎨", label: "Graphic Design" },
  { icon: "🎮", label: "Game Development" },
  { icon: "📱", label: "Mobile Apps" },
  { icon: "🎹", label: "Music & Piano" },
  { icon: "🖌️", label: "Painting & Art" },
  { icon: "✍️", label: "Content Writing" },
  { icon: "📊", label: "Data Analysis" },
  { icon: "🎥", label: "Video Editing" },
  { icon: "📣", label: "Digital Marketing" },
  { icon: "🎓", label: "Online Teaching" },
  { icon: "📸", label: "Photography" },
];

const steps = ["Domain", "Rate & Location", "Experience", "Profile", "Review"];

function FreelancerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    domain: "",
    rateType: "hourly",
    rate: "",
    city: "",
    experienceYears: "",
    experienceDesc: "",
    portfolioLink: "",
    bio: "",
    photo: null,
    photoPreview: null,
  });

  const token = localStorage.getItem("token");

  // ✅ FIX: useEffect for redirect instead of during render
  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token, navigate]);

  if (!token) return null;

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, photo: file, photoPreview: reader.result });
    reader.readAsDataURL(file);
  }

  function validateStep() {
    const newErrors = {};
    if (step === 1 && !form.domain) newErrors.domain = "Please select a domain";
    if (step === 2) {
      if (!form.rate) newErrors.rate = "Please enter your rate";
      if (!form.city) newErrors.city = "Please enter your city";
    }
    if (step === 3) {
      if (!form.experienceYears) newErrors.experienceYears = "Please enter years of experience";
      if (!form.experienceDesc) newErrors.experienceDesc = "Please describe your experience";
    }
    if (step === 4 && !form.bio) newErrors.bio = "Please write a short bio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep()) setStep(step + 1);
  }

  function prevStep() {
    setStep(step - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/freelancer_register.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          domain: form.domain,
          rate_type: form.rateType,
          rate: form.rate,
          city: form.city,
          experience_years: form.experienceYears,
          experience_desc: form.experienceDesc,
          portfolio_link: form.portfolioLink,
          bio: form.bio,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="fr-wrap">
        <div className="fr-success-screen">
          <div className="fr-success-icon">🎉</div>
          <h2>Application Submitted!</h2>
          <p>Your profile has been sent to our admin team for approval.</p>
          <div className="fr-success-steps">
            <div className="fr-success-step">
              <div className="fss-icon">📧</div>
              <div>
                <strong>Email Sent to Admin</strong>
                <p>Our team will review your profile within 24-48 hours</p>
              </div>
            </div>
            <div className="fr-success-step">
              <div className="fss-icon">✅</div>
              <div>
                <strong>Approval Notification</strong>
                <p>You'll receive an email once your profile is approved</p>
              </div>
            </div>
            <div className="fr-success-step">
              <div className="fss-icon">🚀</div>
              <div>
                <strong>Start Getting Work</strong>
                <p>Once approved, you can browse and apply for jobs</p>
              </div>
            </div>
          </div>
          <button className="fr-btn-primary" onClick={() => navigate("/dashboard")}>
            Go to Dashboard →
          </button>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="fr-wrap">
      <style>{styles}</style>
      <div className="fr-container">

        {/* Header */}
        <div className="fr-header">
          <div className="fr-logo">⚡ GigConnect</div>
          <p className="fr-header-sub">Complete your gigconnect profile to get started</p>
        </div>

        {/* Progress Bar */}
        <div className="fr-progress-bar">
          {steps.map((s, i) => (
            <div key={i} className={`fr-progress-step ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`}>
              <div className="fr-progress-dot">
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className="fr-progress-label">{s}</span>
              {i < steps.length - 1 && <div className={`fr-progress-line ${step > i + 1 ? "done" : ""}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="fr-card">

          {/* STEP 1 — Domain */}
          {step === 1 && (
            <div className="fr-step">
              <h2 className="fr-step-title">Choose Your Domain</h2>
              <p className="fr-step-sub">What type of work do you specialize in?</p>
              <div className="fr-domain-grid">
                {domains.map((d) => (
                  <button
                    key={d.label}
                    className={`fr-domain-btn ${form.domain === d.label ? "active" : ""}`}
                    onClick={() => setForm({ ...form, domain: d.label })}
                  >
                    <span className="fr-domain-icon">{d.icon}</span>
                    <span className="fr-domain-label">{d.label}</span>
                  </button>
                ))}
              </div>
              {errors.domain && <div className="fr-error">⚠️ {errors.domain}</div>}
            </div>
          )}

          {/* STEP 2 — Rate & Location */}
          {step === 2 && (
            <div className="fr-step">
              <h2 className="fr-step-title">Rate & Location</h2>
              <p className="fr-step-sub">Set your pricing and where you're based</p>

              <div className="fr-field">
                <label>Rate Type</label>
                <div className="fr-rate-toggle">
                  {["hourly", "daily", "monthly"].map(type => (
                    <button
                      key={type}
                      className={`fr-rate-btn ${form.rateType === type ? "active" : ""}`}
                      onClick={() => setForm({ ...form, rateType: type })}
                    >
                      {type === "hourly" ? "⏱️ Per Hour" : type === "daily" ? "📅 Per Day" : "📆 Per Month"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="fr-field">
                <label>Your Rate (₹) *</label>
                <div className="fr-input-prefix">
                  <span>₹</span>
                  <input
                    type="number"
                    placeholder={form.rateType === "hourly" ? "e.g. 500" : form.rateType === "daily" ? "e.g. 2000" : "e.g. 30000"}
                    value={form.rate}
                    onChange={e => setForm({ ...form, rate: e.target.value })}
                  />
                  <span className="fr-rate-suffix">/ {form.rateType}</span>
                </div>
                {errors.rate && <div className="fr-error">⚠️ {errors.rate}</div>}
              </div>

              <div className="fr-field">
                <label>📍 City / Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad, Telangana"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                />
                {errors.city && <div className="fr-error">⚠️ {errors.city}</div>}
              </div>
            </div>
          )}

          {/* STEP 3 — Experience */}
          {step === 3 && (
            <div className="fr-step">
              <h2 className="fr-step-title">Work Experience</h2>
              <p className="fr-step-sub">Tell clients about your background</p>

              <div className="fr-field">
                <label>Years of Experience *</label>
                <div className="fr-years-grid">
                  {["Less than 1", "1-2", "3-5", "5-10", "10+"].map(y => (
                    <button
                      key={y}
                      className={`fr-year-btn ${form.experienceYears === y ? "active" : ""}`}
                      onClick={() => setForm({ ...form, experienceYears: y })}
                    >
                      {y} {y === "Less than 1" ? "year" : "years"}
                    </button>
                  ))}
                </div>
                {errors.experienceYears && <div className="fr-error">⚠️ {errors.experienceYears}</div>}
              </div>

              <div className="fr-field">
                <label>Describe Your Experience *</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your past projects, clients, achievements and skills..."
                  value={form.experienceDesc}
                  onChange={e => setForm({ ...form, experienceDesc: e.target.value })}
                  maxLength={600}
                />
                <span className="fr-hint">{form.experienceDesc.length}/600</span>
                {errors.experienceDesc && <div className="fr-error">⚠️ {errors.experienceDesc}</div>}
              </div>

              <div className="fr-field">
                <label>🔗 Portfolio / Website Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={form.portfolioLink}
                  onChange={e => setForm({ ...form, portfolioLink: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 4 — Profile */}
          {step === 4 && (
            <div className="fr-step">
              <h2 className="fr-step-title">Your Profile</h2>
              <p className="fr-step-sub">Add a photo and bio so clients can trust you</p>

              <div className="fr-field">
                <label>📸 Profile Photo</label>
                <div className="fr-photo-upload" onClick={() => document.getElementById("photo-input").click()}>
                  {form.photoPreview ? (
                    <img src={form.photoPreview} alt="Preview" className="fr-photo-preview" />
                  ) : (
                    <div className="fr-photo-placeholder">
                      <span style={{ fontSize: "2.5rem" }}>📷</span>
                      <p>Click to upload photo</p>
                      <span>JPG, PNG up to 2MB</span>
                    </div>
                  )}
                </div>
                <input id="photo-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
              </div>

              <div className="fr-field">
                <label>✍️ Bio / About Me *</label>
                <textarea
                  rows={4}
                  placeholder="Write a short intro about yourself — your skills, passion and what makes you stand out..."
                  value={form.bio}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  maxLength={300}
                />
                <span className="fr-hint">{form.bio.length}/300</span>
                {errors.bio && <div className="fr-error">⚠️ {errors.bio}</div>}
              </div>
            </div>
          )}

          {/* STEP 5 — Review */}
          {step === 5 && (
            <div className="fr-step">
              <h2 className="fr-step-title">Review & Submit</h2>
              <p className="fr-step-sub">Check your details before submitting for approval</p>

              <div className="fr-review-card">
                {form.photoPreview && <img src={form.photoPreview} alt="Profile" className="fr-review-photo" />}
                <div className="fr-review-grid">
                  <div className="fr-review-item"><span>🎯 Domain</span><strong>{form.domain}</strong></div>
                  <div className="fr-review-item"><span>💰 Rate</span><strong>₹{form.rate} / {form.rateType}</strong></div>
                  <div className="fr-review-item"><span>📍 Location</span><strong>{form.city}</strong></div>
                  <div className="fr-review-item"><span>🕐 Experience</span><strong>{form.experienceYears} years</strong></div>
                  {form.portfolioLink && <div className="fr-review-item"><span>🔗 Portfolio</span><strong>{form.portfolioLink}</strong></div>}
                </div>
                <div className="fr-review-bio">
                  <span>✍️ Bio</span>
                  <p>{form.bio}</p>
                </div>
                <div className="fr-review-bio">
                  <span>💼 Experience</span>
                  <p>{form.experienceDesc}</p>
                </div>
              </div>

              <div className="fr-approval-note">
                📧 After submission, an email will be sent to our admin team. You'll be notified once your profile is approved (within 24-48 hours).
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="fr-nav-buttons">
            {step > 1 && (
              <button className="fr-btn-back" onClick={prevStep}>← Back</button>
            )}
            {step < 5 ? (
              <button className="fr-btn-primary" onClick={nextStep}>
                Continue →
              </button>
            ) : (
              <button className="fr-btn-submit" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting..." : "🚀 Submit for Approval"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .fr-wrap {
    background: #080812;
    min-height: 100vh;
    font-family: 'Segoe UI', sans-serif;
    color: #e2e8f0;
    padding: 2rem 1rem;
  }
  .fr-container { max-width: 700px; margin: 0 auto; }

  .fr-header { text-align: center; margin-bottom: 2rem; }
  .fr-logo { font-size: 1.5rem; font-weight: 900; background: linear-gradient(135deg, #a78bfa, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
  .fr-header-sub { color: #475569; font-size: 0.95rem; }

  .fr-progress-bar { display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; gap: 0; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 0.5rem; }
  .fr-progress-step { display: flex; flex-direction: column; align-items: center; position: relative; }
  .fr-progress-dot { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; color: #475569; transition: all 0.3s; }
  .fr-progress-step.active .fr-progress-dot { background: rgba(167,139,250,0.2); border-color: #a78bfa; color: #a78bfa; }
  .fr-progress-step.done .fr-progress-dot { background: #a78bfa; border-color: #a78bfa; color: white; }
  .fr-progress-label { font-size: 0.72rem; color: #334155; margin-top: 6px; white-space: nowrap; }
  .fr-progress-step.active .fr-progress-label { color: #a78bfa; }
  .fr-progress-step.done .fr-progress-label { color: #64748b; }
  .fr-progress-line { width: 60px; height: 2px; background: rgba(255,255,255,0.07); position: absolute; top: 18px; left: 36px; transition: background 0.3s; }
  .fr-progress-line.done { background: #a78bfa; }

  .fr-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 2.5rem; }
  .fr-step-title { font-size: 1.5rem; font-weight: 800; color: #f1f5f9; margin-bottom: 0.4rem; }
  .fr-step-sub { color: #475569; font-size: 0.92rem; margin-bottom: 2rem; }

  .fr-domain-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 1rem; }
  .fr-domain-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem 0.5rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; transition: all 0.2s; color: #e2e8f0; }
  .fr-domain-btn:hover { border-color: rgba(167,139,250,0.4); background: rgba(167,139,250,0.06); }
  .fr-domain-btn.active { border-color: #a78bfa; background: rgba(167,139,250,0.15); }
  .fr-domain-icon { font-size: 1.8rem; }
  .fr-domain-label { font-size: 0.72rem; color: #94a3b8; text-align: center; line-height: 1.3; }
  .fr-domain-btn.active .fr-domain-label { color: #c4b5fd; }

  .fr-field { margin-bottom: 1.5rem; }
  .fr-field label { display: block; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.6rem; }
  .fr-field input, .fr-field textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; padding: 12px 14px; color: #e2e8f0; font-size: 0.92rem; font-family: 'Segoe UI', sans-serif; transition: border-color 0.2s; resize: none; }
  .fr-field input:focus, .fr-field textarea:focus { outline: none; border-color: rgba(167,139,250,0.5); background: rgba(167,139,250,0.04); }
  .fr-field input::placeholder, .fr-field textarea::placeholder { color: #334155; }
  .fr-hint { color: #334155; font-size: 0.75rem; margin-top: 4px; display: block; }

  .fr-rate-toggle { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  .fr-rate-btn { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #475569; padding: 10px; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: all 0.2s; }
  .fr-rate-btn.active { background: rgba(167,139,250,0.15); border-color: #a78bfa; color: #a78bfa; }

  .fr-input-prefix { display: flex; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; overflow: hidden; }
  .fr-input-prefix span { padding: 0 12px; color: #475569; font-size: 0.9rem; white-space: nowrap; }
  .fr-input-prefix input { background: transparent; border: none; flex: 1; padding: 12px 0; color: #e2e8f0; font-size: 0.92rem; }
  .fr-input-prefix input:focus { outline: none; }
  .fr-rate-suffix { padding-right: 14px; color: #475569; }

  .fr-years-grid { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .fr-year-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #475569; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
  .fr-year-btn.active { background: rgba(167,139,250,0.15); border-color: #a78bfa; color: #a78bfa; }

  .fr-photo-upload { border: 2px dashed rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 1rem; }
  .fr-photo-upload:hover { border-color: rgba(167,139,250,0.4); background: rgba(167,139,250,0.04); }
  .fr-photo-placeholder p { color: #475569; margin: 0.5rem 0 0.25rem; font-size: 0.9rem; }
  .fr-photo-placeholder span { color: #334155; font-size: 0.78rem; }
  .fr-photo-preview { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid #a78bfa; }

  .fr-review-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .fr-review-photo { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #a78bfa; margin-bottom: 1rem; }
  .fr-review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; }
  .fr-review-item { display: flex; flex-direction: column; gap: 2px; }
  .fr-review-item span { color: #475569; font-size: 0.78rem; }
  .fr-review-item strong { color: #f1f5f9; font-size: 0.9rem; }
  .fr-review-bio { margin-bottom: 0.75rem; }
  .fr-review-bio span { color: #475569; font-size: 0.78rem; display: block; margin-bottom: 4px; }
  .fr-review-bio p { color: #94a3b8; font-size: 0.88rem; line-height: 1.6; }

  .fr-approval-note { background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px; padding: 14px 16px; color: #7dd3fc; font-size: 0.88rem; line-height: 1.6; }

  .fr-error { color: #f87171; font-size: 0.82rem; margin-top: 6px; }

  .fr-nav-buttons { display: flex; gap: 1rem; margin-top: 2rem; }
  .fr-btn-back { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); color: #64748b; border-radius: 10px; padding: 12px 24px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .fr-btn-back:hover { color: #94a3b8; border-color: rgba(255,255,255,0.2); }
  .fr-btn-primary { margin-left: auto; background: linear-gradient(135deg, #a78bfa, #38bdf8); color: white; border: none; border-radius: 10px; padding: 12px 32px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; font-family: 'Segoe UI', sans-serif; }
  .fr-btn-primary:hover { opacity: 0.85; }
  .fr-btn-submit { margin-left: auto; background: linear-gradient(135deg, #10b981, #06b6d4); color: white; border: none; border-radius: 10px; padding: 12px 32px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; font-family: 'Segoe UI', sans-serif; }
  .fr-btn-submit:hover:not(:disabled) { opacity: 0.85; }
  .fr-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .fr-success-screen { max-width: 560px; margin: 4rem auto; text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 3rem 2rem; }
  .fr-success-icon { font-size: 4rem; margin-bottom: 1rem; }
  .fr-success-screen h2 { color: #f1f5f9; font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem; }
  .fr-success-screen > p { color: #64748b; margin-bottom: 2rem; }
  .fr-success-steps { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; text-align: left; }
  .fr-success-step { display: flex; align-items: flex-start; gap: 1rem; background: rgba(255,255,255,0.03); border-radius: 12px; padding: 1rem; }
  .fss-icon { font-size: 1.5rem; flex-shrink: 0; }
  .fr-success-step strong { color: #f1f5f9; font-size: 0.95rem; display: block; margin-bottom: 2px; }
  .fr-success-step p { color: #64748b; font-size: 0.85rem; }

  @media (max-width: 600px) {
    .fr-domain-grid { grid-template-columns: repeat(3, 1fr); }
    .fr-card { padding: 1.5rem; }
    .fr-review-grid { grid-template-columns: 1fr; }
  }
`;

export default FreelancerRegister;