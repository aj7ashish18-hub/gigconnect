import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

const STEPS = [
  { id: 1, label: "Domain" },
  { id: 2, label: "Rate & Location" },
  { id: 3, label: "Experience" },
  { id: 4, label: "Profile Review" },
];

const DOMAINS = [
  { label: "Web Development",  emoji: "💻" },
  { label: "Graphic Design",   emoji: "🎨" },
  { label: "Game Development", emoji: "🎮" },
  { label: "Mobile Apps",      emoji: "📱" },
  { label: "Music & Piano",    emoji: "🎹" },
  { label: "Painting & Art",   emoji: "✏️" },
  { label: "Content Writing",  emoji: "✍️" },
  { label: "Data Analysis",    emoji: "📊" },
  { label: "Video Editing",    emoji: "🎬" },
  { label: "Digital Marketing",emoji: "📣" },
  { label: "Online Teaching",  emoji: "🎓" },
  { label: "Photography",      emoji: "📷" },
];

export default function FreelancerProfile() {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const photoRef = useRef();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [form, setForm] = useState({
    domain: "",
    hourlyRate: "",
    currency: "INR",
    city: "",
    country: "India",
    experience: "",
    bio: "",
    skills: "",
    portfolio: "",
    fullName: "",
    email: "",
    photo: null,
  });

  const dark = darkMode;

  const bg       = dark ? "#0d0d1a" : "#f0f4ff";
  const cardBg   = dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)";
  const border   = dark ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.15)";
  const text      = dark ? "#e2e8f0" : "#1e1b4b";
  const muted     = dark ? "#94a3b8" : "#6b7280";
  const accent    = "#6366f1";
  const accentCyan= "#06b6d4";
  const inputBg   = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.8)";
  const inputBdr  = dark ? "rgba(255,255,255,0.12)" : "rgba(99,102,241,0.2)";

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    background: inputBg, border: `1px solid ${inputBdr}`,
    borderRadius: "10px", color: text, fontSize: "15px",
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle = {
    display: "block", fontSize: "12px", fontWeight: 700,
    color: muted, marginBottom: "6px",
    textTransform: "uppercase", letterSpacing: "0.06em",
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) { set("photo", file); setPhotoPreview(URL.createObjectURL(file)); }
  };

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "480px", padding: "24px" }}>
        <div style={{ fontSize: "72px", marginBottom: "20px" }}>🎉</div>
        <h2 style={{ color: text, fontSize: "26px", fontWeight: 800, marginBottom: "12px" }}>Profile Submitted!</h2>
        <p style={{ color: muted, fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
          Your freelancer profile has been submitted for review.<br />We'll notify you within 24–48 hours once approved.
        </p>
        <button onClick={() => navigate("/client-dashboard")} style={{
          padding: "14px 36px", background: `linear-gradient(135deg, ${accent}, ${accentCyan})`,
          color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 700, cursor: "pointer",
        }}>Back to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: bg, padding: "32px 16px 80px", fontFamily: "sans-serif" }}>

      {/* Subtle bg radial */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0,
        background: dark
          ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 70%)"
          : "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.08) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Logo + subtitle */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: accent, marginBottom: "6px" }}>
            ⚡ GigConnect
          </div>
          <p style={{ color: muted, fontSize: "14px", margin: 0 }}>Complete your freelancer profile to get started</p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px", gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
              {/* Circle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", fontWeight: 700,
                  background: s.id === step
                    ? `linear-gradient(135deg, ${accent}, ${accentCyan})`
                    : s.id < step
                    ? "rgba(99,102,241,0.3)"
                    : dark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.08)",
                  border: s.id > step ? `2px solid ${border}` : "none",
                  color: s.id <= step ? "#fff" : muted,
                  boxShadow: s.id === step ? `0 0 16px rgba(99,102,241,0.5)` : "none",
                  transition: "all 0.3s",
                  cursor: s.id < step ? "pointer" : "default",
                }} onClick={() => s.id < step && setStep(s.id)}>
                  {s.id < step ? "✓" : s.id}
                </div>
                <span style={{
                  fontSize: "11px", marginTop: "5px", fontWeight: s.id === step ? 700 : 400,
                  color: s.id === step ? accent : muted, whiteSpace: "nowrap",
                }}>{s.label}</span>
              </div>
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div style={{
                  width: "60px", height: "2px", margin: "0 4px", marginBottom: "18px",
                  background: step > s.id
                    ? `linear-gradient(90deg, ${accent}, ${accentCyan})`
                    : border,
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: cardBg,
          border: `1px solid ${border}`,
          borderRadius: "24px",
          padding: "36px 32px",
          backdropFilter: "blur(12px)",
          boxShadow: dark ? "0 8px 40px rgba(0,0,0,0.4)" : "0 8px 40px rgba(99,102,241,0.08)",
          marginBottom: "28px",
        }}>

          {/* ── STEP 1: Choose Domain ── */}
          {step === 1 && (
            <div>
              <h2 style={{ color: text, fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>Choose Your Domain</h2>
              <p style={{ color: muted, fontSize: "14px", margin: "0 0 28px" }}>What type of work do you specialize in?</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                {DOMAINS.map(d => (
                  <button key={d.label} onClick={() => set("domain", d.label)} style={{
                    padding: "18px 8px", borderRadius: "14px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                    background: form.domain === d.label
                      ? `linear-gradient(135deg, rgba(99,102,241,0.25), rgba(6,182,212,0.15))`
                      : dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                    border: form.domain === d.label
                      ? `2px solid ${accent}`
                      : `1px solid ${border}`,
                    color: text,
                    transition: "all 0.2s",
                    boxShadow: form.domain === d.label ? `0 0 12px rgba(99,102,241,0.3)` : "none",
                  }}>
                    <span style={{ fontSize: "28px" }}>{d.emoji}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, textAlign: "center", lineHeight: 1.3, color: form.domain === d.label ? accent : text }}>
                      {d.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Rate & Location ── */}
          {step === 2 && (
            <div>
              <h2 style={{ color: text, fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>Rate & Location</h2>
              <p style={{ color: muted, fontSize: "14px", margin: "0 0 28px" }}>Set your hourly rate and tell us where you're based</p>

              <div style={{ marginBottom: "22px" }}>
                <label style={labelStyle}>Hourly Rate *</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <select style={{ ...inputStyle, width: "100px" }} value={form.currency} onChange={e => set("currency", e.target.value)}>
                    <option value="INR">₹ INR</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                  </select>
                  <input style={{ ...inputStyle, flex: 1 }} type="number" placeholder="e.g. 500"
                    value={form.hourlyRate} onChange={e => set("hourlyRate", e.target.value)} />
                </div>
                <p style={{ color: muted, fontSize: "12px", marginTop: "6px" }}>Per hour rate clients will see on your profile</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "22px" }}>
                <div>
                  <label style={labelStyle}>City *</label>
                  <input style={inputStyle} placeholder="e.g. Hyderabad"
                    value={form.city} onChange={e => set("city", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Country *</label>
                  <select style={inputStyle} value={form.country} onChange={e => set("country", e.target.value)}>
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "22px" }}>
                <label style={labelStyle}>Availability *</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["Full-time", "Part-time", "Weekends", "Flexible"].map(opt => (
                    <button key={opt} onClick={() => set("availability", opt)} style={{
                      padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                      background: form.availability === opt ? `linear-gradient(135deg,${accent},${accentCyan})` : inputBg,
                      border: form.availability === opt ? "none" : `1px solid ${inputBdr}`,
                      color: form.availability === opt ? "#fff" : muted,
                    }}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Experience ── */}
          {step === 3 && (
            <div>
              <h2 style={{ color: text, fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>Your Experience</h2>
              <p style={{ color: muted, fontSize: "14px", margin: "0 0 28px" }}>Help clients understand your background and expertise</p>

              <div style={{ marginBottom: "22px" }}>
                <label style={labelStyle}>Years of Experience *</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["< 1 year", "1–2 years", "3–5 years", "5–10 years", "10+ years"].map(opt => (
                    <button key={opt} onClick={() => set("experience", opt)} style={{
                      padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                      background: form.experience === opt ? `linear-gradient(135deg,${accent},${accentCyan})` : inputBg,
                      border: form.experience === opt ? "none" : `1px solid ${inputBdr}`,
                      color: form.experience === opt ? "#fff" : muted,
                    }}>{opt}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "22px" }}>
                <label style={labelStyle}>Top Skills (comma separated) *</label>
                <input style={inputStyle} placeholder="e.g. React, Node.js, Figma, MySQL"
                  value={form.skills} onChange={e => set("skills", e.target.value)} />
              </div>

              <div style={{ marginBottom: "22px" }}>
                <label style={labelStyle}>Bio — Tell clients about yourself *</label>
                <textarea style={{ ...inputStyle, minHeight: "110px", resize: "vertical" }}
                  placeholder="Describe your background, what you do best, and what makes you stand out..."
                  value={form.bio} onChange={e => set("bio", e.target.value)} />
              </div>

              <div style={{ marginBottom: "0" }}>
                <label style={labelStyle}>Portfolio Link (optional)</label>
                <input style={inputStyle} placeholder="https://github.com/yourname or https://behance.net/yourname"
                  value={form.portfolio} onChange={e => set("portfolio", e.target.value)} />
              </div>
            </div>
          )}

          {/* ── STEP 4: Profile Review ── */}
          {step === 4 && (
            <div>
              <h2 style={{ color: text, fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>Profile Review</h2>
              <p style={{ color: muted, fontSize: "14px", margin: "0 0 28px" }}>Add your photo and review your profile before submitting</p>

              {/* Photo upload */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
                <div onClick={() => photoRef.current.click()} style={{
                  width: "90px", height: "90px", borderRadius: "50%", flexShrink: 0,
                  background: photoPreview ? "transparent" : inputBg,
                  border: `2px dashed ${photoPreview ? accent : inputBdr}`,
                  cursor: "pointer", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {photoPreview
                    ? <img src={photoPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "28px" }}>📷</span>}
                </div>
                <div>
                  <div style={{ color: text, fontWeight: 700, marginBottom: "4px" }}>Profile Photo</div>
                  <div style={{ color: muted, fontSize: "13px", marginBottom: "10px" }}>JPG or PNG, max 5MB</div>
                  <button onClick={() => photoRef.current.click()} style={{
                    padding: "8px 16px", background: inputBg, border: `1px solid ${inputBdr}`,
                    borderRadius: "8px", color: text, fontSize: "13px", cursor: "pointer", fontWeight: 600,
                  }}>Upload Photo</button>
                </div>
                <input ref={photoRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
              </div>

              {/* Summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                {[
                  { label: "Domain", value: form.domain || "—", emoji: "🎯" },
                  { label: "Rate", value: form.hourlyRate ? `${form.currency === "INR" ? "₹" : form.currency === "USD" ? "$" : "€"}${form.hourlyRate}/hr` : "—", emoji: "💰" },
                  { label: "Location", value: form.city ? `${form.city}, ${form.country}` : "—", emoji: "📍" },
                  { label: "Experience", value: form.experience || "—", emoji: "⭐" },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: "14px 16px", borderRadius: "12px",
                    background: dark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.04)",
                    border: `1px solid ${border}`,
                  }}>
                    <div style={{ fontSize: "12px", color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                      {item.emoji} {item.label}
                    </div>
                    <div style={{ color: text, fontWeight: 700, fontSize: "15px" }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {form.bio && (
                <div style={{ padding: "14px 16px", borderRadius: "12px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.04)", border: `1px solid ${border}`, marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>📝 Bio</div>
                  <div style={{ color: text, fontSize: "14px", lineHeight: 1.6 }}>{form.bio}</div>
                </div>
              )}

              {/* Terms */}
              <div onClick={() => set("agreedToTerms", !form.agreedToTerms)}
                style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "5px", flexShrink: 0, marginTop: "1px",
                  background: form.agreedToTerms ? `linear-gradient(135deg,${accent},${accentCyan})` : inputBg,
                  border: `2px solid ${form.agreedToTerms ? "transparent" : inputBdr}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {form.agreedToTerms && <span style={{ color: "#fff", fontSize: "12px" }}>✓</span>}
                </div>
                <p style={{ color: muted, fontSize: "13px", margin: 0, lineHeight: 1.6 }}>
                  I confirm all information is accurate and agree to GigConnect's{" "}
                  <span style={{ color: accent }}>Terms of Service</span> and{" "}
                  <span style={{ color: accent }}>Privacy Policy</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => step === 1 ? navigate("/client-dashboard") : setStep(s => s - 1)} style={{
            padding: "13px 26px", borderRadius: "12px", fontSize: "14px", fontWeight: 600,
            cursor: "pointer", background: cardBg, border: `1px solid ${border}`, color: muted,
          }}>
            {step === 1 ? "← Cancel" : "← Back"}
          </button>

          <div style={{ display: "flex", gap: "6px" }}>
            {STEPS.map(s => (
              <div key={s.id} style={{
                width: step === s.id ? "20px" : "6px", height: "6px", borderRadius: "3px",
                background: step >= s.id ? accent : border,
                transition: "all 0.3s",
              }} />
            ))}
          </div>

          {step < 4 ? (
            <button onClick={() => setStep(s => s + 1)} style={{
              padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
              cursor: "pointer", background: `linear-gradient(135deg, ${accent}, ${accentCyan})`,
              border: "none", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
            }}>Continue →</button>
          ) : (
            <button onClick={() => setSubmitted(true)} disabled={!form.agreedToTerms} style={{
              padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
              cursor: form.agreedToTerms ? "pointer" : "not-allowed",
              background: form.agreedToTerms ? "linear-gradient(135deg,#10b981,#06b6d4)" : inputBg,
              border: "none", color: form.agreedToTerms ? "#fff" : muted,
              boxShadow: form.agreedToTerms ? "0 4px 20px rgba(16,185,129,0.3)" : "none",
            }}>🚀 Submit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
