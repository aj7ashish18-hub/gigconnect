import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { ThemeContext } from "../App";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("All fields are required.");
    setLoading(true);
    try {
      const data = await loginUser(form);
      // auth.php returns { token, user: { id, name, email, role } }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "client") navigate("/client-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const C = darkMode ? {
    bg: "#0a0a0f", surface: "#13131a", border: "#1e1e2e",
    text: "#f0f0f5", muted: "#7070a0", inputBg: "#0a0a0f",
    gridLine: "rgba(245,197,66,0.04)",
  } : {
    bg: "#f8fafc", surface: "#ffffff", border: "#e2e8f0",
    text: "#0f172a", muted: "#64748b", inputBg: "#f1f5f9",
    gridLine: "rgba(99,102,241,0.04)",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "40px 16px", position: "relative", overflow: "hidden", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500;600;700&display=swap');
        .gig-input:focus { border-color: #f5c542 !important; box-shadow: 0 0 0 3px rgba(245,197,66,0.12); outline: none; }
        .gig-input::placeholder { color: ${C.muted}; }
        .submit-btn:hover:not(:disabled) { background: #ffd966 !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(245,197,66,0.3); }
        .spinner { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`, backgroundSize: "48px 48px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ width: "100%", maxWidth: "440px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "44px 40px", position: "relative", zIndex: 1, boxShadow: darkMode ? "0 0 60px rgba(245,197,66,0.05), 0 24px 80px rgba(0,0,0,0.6)" : "0 4px 40px rgba(0,0,0,0.08)", transition: "background 0.3s, border-color 0.3s" }}>

        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
            <span style={{ fontSize: "22px" }}>⚡</span>
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#f5c542", fontFamily: "'DM Mono', monospace" }}>GigConnect</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Welcome back</h1>
          <p style={{ fontSize: "14px", color: C.muted, margin: 0 }}>Sign in to your account to continue.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }} noValidate>
          {[
            { name: "email", type: "email", label: "Email", placeholder: "jane@email.com" },
            { name: "password", type: "password", label: "Password", placeholder: "Your password" },
          ].map((field) => (
            <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{field.label}</label>
              <input name={field.name} type={field.type} value={form[field.name]} onChange={handleChange}
                placeholder={field.placeholder} required className="gig-input"
                style={{ background: C.inputBg, border: `1.5px solid ${C.border}`, borderRadius: "8px", color: C.text, fontSize: "14px", padding: "12px 14px", fontFamily: "inherit", width: "100%", boxSizing: "border-box", transition: "border-color 0.15s" }} />
            </div>
          ))}

          {error && <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", color: "#ff6b6b", borderRadius: "8px", padding: "10px 14px", fontSize: "13px" }}>⚠ {error}</div>}

          <button type="submit" disabled={loading} className="submit-btn"
            style={{ background: "#f5c542", color: "#000", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.18s ease", fontFamily: "inherit", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50px" }}>
            {loading ? <span style={{ width: "18px", height: "18px", border: "2.5px solid #00000040", borderTop: "2.5px solid #000", borderRadius: "50%", display: "inline-block" }} className="spinner" /> : "Sign In →"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: C.muted, margin: "4px 0 0" }}>
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "#f5c542", textDecoration: "none", fontWeight: 600 }}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}