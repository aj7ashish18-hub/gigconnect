import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { ThemeContext } from "../App";

export default function SignUp() {
  const [role, setRole] = useState("gigconnect");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirmPassword)
      return setError("All fields are required.");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      await registerUser({ ...form, role });
      // After signup, go to login
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const C = darkMode ? {
    bg: "#0a0a0f", surface: "#13131a", border: "#1e1e2e",
    text: "#f0f0f5", muted: "#7070a0", inputBg: "#0a0a0f",
  } : {
    bg: "#f8fafc", surface: "#ffffff", border: "#e2e8f0",
    text: "#0f172a", muted: "#64748b", inputBg: "#f1f5f9",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "40px 16px", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500;600;700&display=swap');
        .su-input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); outline: none; }
        .su-input::placeholder { color: ${C.muted}; }
        .su-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .su-spinner { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .role-card:hover { transform: translateY(-2px); }
      `}</style>

      <div style={{ width: "100%", maxWidth: "480px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "40px 36px", boxShadow: darkMode ? "0 24px 80px rgba(0,0,0,0.6)" : "0 4px 40px rgba(0,0,0,0.08)", transition: "background 0.3s" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ fontSize: "22px" }}>⚡</span>
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#f5c542", fontFamily: "'DM Mono', monospace" }}>GigConnect</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: C.text, margin: "0 0 6px" }}>Create your account</h1>
          <p style={{ fontSize: "14px", color: C.muted, margin: 0 }}>Join thousands of professionals on GigConnect</p>
        </div>

        {/* Role Selection */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {[
            { key: "client", icon: "👔", title: "Client", desc: "Post jobs & hire talent", sub: "Find skilled workers for your projects" },
            { key: "gigconnect", icon: "🔧", title: "Worker", desc: "Find gigs & get paid", sub: "Browse jobs and grow your freelance career" },
          ].map((r) => (
            <div key={r.key} className="role-card" onClick={() => setRole(r.key)}
              style={{ background: role === r.key ? "rgba(99,102,241,0.12)" : darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1.5px solid ${role === r.key ? "rgba(99,102,241,0.6)" : C.border}`, borderRadius: "12px", padding: "16px", cursor: "pointer", transition: "all 0.2s", position: "relative" }}>
              {role === r.key && (
                <div style={{ position: "absolute", top: "8px", right: "8px", width: "18px", height: "18px", background: "#6366f1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "white" }}>✓</div>
              )}
              <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{r.icon}</div>
              <div style={{ fontWeight: 700, color: role === r.key ? "#818cf8" : C.text, fontSize: "0.95rem" }}>{r.title}</div>
              <div style={{ color: role === r.key ? "#6366f1" : C.muted, fontSize: "0.78rem", fontWeight: 600, marginTop: "2px" }}>{r.desc}</div>
              <div style={{ color: C.muted, fontSize: "0.72rem", marginTop: "4px", lineHeight: 1.4 }}>{r.sub}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }} noValidate>
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
            { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
            { name: "password", label: "Password", type: "password", placeholder: "At least 6 characters" },
            { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Repeat your password" },
          ].map((field) => (
            <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{field.label}</label>
              <input
                name={field.name} type={field.type} placeholder={field.placeholder}
                value={form[field.name]} onChange={handleChange} required className="su-input"
                style={{ background: C.inputBg, border: `1.5px solid ${C.border}`, borderRadius: "8px", color: C.text, fontSize: "14px", padding: "11px 14px", fontFamily: "inherit", width: "100%", boxSizing: "border-box", transition: "border-color 0.15s" }}
              />
            </div>
          ))}

          {error && (
            <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", color: "#ff6b6b", borderRadius: "8px", padding: "10px 14px", fontSize: "13px" }}>
              ⚠ {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="su-submit"
            style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", border: "none", borderRadius: "10px", padding: "13px", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.18s", fontFamily: "inherit", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "48px" }}>
            {loading
              ? <span style={{ width: "18px", height: "18px", border: "2.5px solid rgba(255,255,255,0.3)", borderTop: "2.5px solid white", borderRadius: "50%", display: "inline-block" }} className="su-spinner" />
              : `Create Account as ${role === "client" ? "Client" : "Worker"} →`}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: C.muted, margin: "4px 0 0" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}