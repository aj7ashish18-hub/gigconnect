import React, { useEffect, useState } from "react";
import { getProtectedData, submitBid } from "../api";

function FreelancerDashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("browse");
  const [applyingJob, setApplyingJob] = useState(null);
  const [myApplications, setMyApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("All");

  const [form, setForm] = useState({
    amount: "",
    durationType: "hourly",
    durationValue: "",
    description: "",
    certificate: null,
    certificateName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const skillCategories = ["All", "Web Development", "Graphic Design", "Mobile Apps", "Content Writing", "Data Analysis", "Video Editing"];

  const demoJobs = [
    { id: 1, title: "Build a React E-Commerce Website", description: "Need a full stack developer to build a modern e-commerce site with cart, payments and admin panel.", budget: 25000, skill: "Web Development", client_name: "TechCorp Hyd", posted: "2 hours ago" },
    { id: 2, title: "Design Logo & Brand Identity", description: "Looking for a creative designer to create a logo, color palette and brand guidelines for our startup.", budget: 5000, skill: "Graphic Design", client_name: "StartupX", posted: "5 hours ago" },
    { id: 3, title: "Android App for Food Delivery", description: "Build a food delivery app with real-time tracking, payment integration and restaurant dashboard.", budget: 40000, skill: "Mobile Apps", client_name: "FoodHub", posted: "1 day ago" },
    { id: 4, title: "Write 20 SEO Blog Posts", description: "Need an experienced content writer to write 20 SEO-optimized blog posts on technology topics, 1000 words each.", budget: 8080, skill: "Content Writing", client_name: "BlogMedia", posted: "1 day ago" },
    { id: 5, title: "Sales Dashboard in Power BI", description: "Create an interactive sales dashboard with charts, KPIs and monthly reports using Power BI.", budget: 12000, skill: "Data Analysis", client_name: "RetailCo", posted: "2 days ago" },
    { id: 6, title: "YouTube Channel Video Editing", description: "Edit 10 YouTube videos per month. Must know transitions, color grading, subtitles and thumbnails.", budget: 6000, skill: "Video Editing", client_name: "CreatorHub", posted: "2 days ago" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // ✅ FIX 1: Always load user from localStorage first (no blank screen)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch {}
    }

    if (!token) { setLoading(false); return; }

    getProtectedData(token)
      .then((res) => {
        if (res.user) {
          setUser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
        }
        if (res.data?.jobs) setJobs(res.data.jobs);
        setLoading(false);
      })
      .catch(() => {
        // ✅ FIX 2: Don't blank out on API error — keep localStorage user
        setLoading(false);
      });
  }, []);

  const displayJobs = jobs.length > 0 ? jobs : demoJobs;

  const filteredJobs = displayJobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSkill = filterSkill === "All" || job.skill === filterSkill;
    return matchSearch && matchSkill;
  });

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) setForm({ ...form, certificate: file, certificateName: file.name });
  }

  async function handleApplySubmit() {
    if (!form.amount) return alert("Please enter your bid amount.");
    if (!form.durationValue) return alert("Please enter the duration.");
    if (!form.description) return alert("Please write a cover letter.");

    setSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      await submitBid({
        job_id: applyingJob.id,
        amount: form.amount,
        duration_type: form.durationType,
        duration_value: form.durationValue,
        description: form.description,
      }, token);

      setMyApplications([...myApplications, {
        ...applyingJob,
        status: "pending",
        appliedAt: new Date().toLocaleDateString("en-IN"),
        bidAmount: form.amount,
        durationType: form.durationType,
        durationValue: form.durationValue,
      }]);

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setApplyingJob(null);
        setForm({ amount: "", durationType: "hourly", durationValue: "", description: "", certificate: null, certificateName: "" });
        setActiveTab("browse");
      }, 2000);
    } catch (err) {
      alert("Failed to submit application: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const statusColor = { pending: "#f59e0b", accepted: "#10b981", rejected: "#ef4444" };

  return (
    <div className="gc-wrap">

      {/* Header */}
      <div className="gc-header">
        <div className="gc-header-inner">
          <div className="gc-logo">
            <span className="gc-logo-icon">⚡</span>
            <span className="gc-logo-text">GigConnect</span>
          </div>
          <div className="gc-tabs">
            <button className={`gc-tab ${activeTab === "browse" ? "active" : ""}`} onClick={() => setActiveTab("browse")}>
              🔍 Browse Jobs
            </button>
            <button className={`gc-tab ${activeTab === "applications" ? "active" : ""}`} onClick={() => setActiveTab("applications")}>
              📋 My Applications
              {myApplications.length > 0 && <span className="gc-badge">{myApplications.length}</span>}
            </button>
            <button className={`gc-tab ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
              👤 My Profile
            </button>
          </div>
          {/* ✅ FIX 3: Show user name in header */}
          {user && <span className="gc-username">👋 {user.name?.split(" ")[0]}</span>}
          <button className="gc-logout" onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="gc-loading">
          <div className="gc-spinner" />
          <p>Loading GigConnect...</p>
        </div>
      ) : (
        <div className="gc-body">

          {/* BROWSE JOBS */}
          {activeTab === "browse" && (
            <>
              <div className="gc-page-header">
                <div>
                  <h2>Find Your Next Gig 🚀</h2>
                  <p>Browse jobs that match your skills and apply instantly</p>
                </div>
              </div>

              <input
                className="gc-search"
                placeholder="🔍 Search jobs by title or keyword..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />

              <div className="gc-filters">
                {skillCategories.map(cat => (
                  <button key={cat} className={`gc-filter-btn ${filterSkill === cat ? "active" : ""}`} onClick={() => setFilterSkill(cat)}>
                    {cat}
                  </button>
                ))}
              </div>

              <p className="gc-count">{filteredJobs.length} jobs available</p>

              <div className="gc-jobs-grid">
                {filteredJobs.map((job, i) => (
                  <div key={job.id || i} className="gc-job-card">
                    <div className="gc-job-top">
                      <div className="gc-job-info">
                        <h3 className="gc-job-title">{job.title}</h3>
                        <div className="gc-job-meta">
                          <span className="gc-skill-tag">{job.skill || "General"}</span>
                          <span className="gc-posted">🕐 {job.posted || "Recently"}</span>
                        </div>
                      </div>
                      <div className="gc-job-budget">₹{Number(job.budget).toLocaleString("en-IN")}</div>
                    </div>
                    <p className="gc-job-desc">{job.description}</p>
                    <div className="gc-job-footer">
                      <span className="gc-client">👤 {job.client_name || "Client"}</span>
                      <button className="gc-apply-btn" onClick={() => { setApplyingJob(job); setActiveTab("apply"); }}>
                        Apply Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* APPLY FORM */}
          {activeTab === "apply" && applyingJob && (
            <>
              <button className="gc-back-btn" onClick={() => setActiveTab("browse")}>← Back to Jobs</button>
              <div className="gc-apply-wrap">
                <div className="gc-job-summary">
                  <h3>📋 Job Details</h3>
                  <h2>{applyingJob.title}</h2>
                  <p>{applyingJob.description}</p>
                  <div className="gc-summary-meta">
                    <span>💰 Budget: ₹{Number(applyingJob.budget).toLocaleString("en-IN")}</span>
                    <span>👤 {applyingJob.client_name || "Client"}</span>
                    <span className="gc-skill-tag">{applyingJob.skill || "General"}</span>
                  </div>
                </div>

                <div className="gc-apply-form">
                  {submitSuccess ? (
                    <div className="gc-apply-success">
                      <div style={{ fontSize: "3rem" }}>🎉</div>
                      <h3>Application Submitted!</h3>
                      <p>The client will review your application and get back to you.</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="gc-form-title">Your Application</h3>

                      <div className="gc-field">
                        <label>💰 Your Bid Amount (₹) *</label>
                        <input type="number" placeholder="e.g. 5000" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
                      </div>

                      <div className="gc-field">
                        <label>⏱️ Project Duration *</label>
                        <div className="gc-duration-row">
                          <input type="number" placeholder="e.g. 2" value={form.durationValue} onChange={e => setForm({ ...form, durationValue: e.target.value })} className="gc-duration-num" />
                          <select value={form.durationType} onChange={e => setForm({ ...form, durationType: e.target.value })} className="gc-duration-select">
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                          </select>
                        </div>
                        <span className="gc-field-hint">e.g. "3 weeks" or "2 months"</span>
                      </div>

                      <div className="gc-field">
                        <label>✍️ Cover Letter *</label>
                        <textarea rows={5} placeholder="Describe your experience, why you're the best fit, and how you'll approach this project..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} maxLength={1000} />
                        <span className="gc-field-hint">{form.description.length}/1000 characters</span>
                      </div>

                      <div className="gc-field">
                        <label>📄 Portfolio / Certificate (Optional)</label>
                        <div className="gc-upload-area" onClick={() => document.getElementById("cert-upload").click()}>
                          {form.certificateName ? (
                            <div className="gc-file-selected">
                              <span>📎 {form.certificateName}</span>
                              <button onClick={e => { e.stopPropagation(); setForm({ ...form, certificate: null, certificateName: "" }); }}>✕</button>
                            </div>
                          ) : (
                            <>
                              <div style={{ fontSize: "2rem" }}>📁</div>
                              <p>Click to upload certificate or portfolio</p>
                              <span>PDF, JPG, PNG up to 5MB</span>
                            </>
                          )}
                        </div>
                        <input id="cert-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={handleFileUpload} />
                      </div>

                      {user && (
                        <div className="gc-email-note">
                          📧 Your application will be sent to the client. They'll contact you at <strong>{user.email}</strong>
                        </div>
                      )}

                      <div className="gc-form-buttons">
                        <button className="gc-cancel-btn" onClick={() => setActiveTab("browse")}>Cancel</button>
                        <button className="gc-submit-btn" onClick={handleApplySubmit} disabled={submitting}>
                          {submitting ? "Submitting..." : "Submit Application →"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* MY APPLICATIONS */}
          {activeTab === "applications" && (
            <>
              <div className="gc-page-header">
                <div>
                  <h2>My Applications</h2>
                  <p>Track all your job applications</p>
                </div>
              </div>
              {myApplications.length === 0 ? (
                <div className="gc-empty">
                  <div style={{ fontSize: "3rem" }}>📋</div>
                  <h3>No Applications Yet</h3>
                  <p>Browse jobs and apply to get started!</p>
                  <button className="gc-apply-btn" onClick={() => setActiveTab("browse")}>Browse Jobs</button>
                </div>
              ) : (
                <div className="gc-applications-list">
                  {myApplications.map((app, i) => (
                    <div key={i} className="gc-app-card">
                      <div className="gc-app-header">
                        <div>
                          <h3 className="gc-app-title">{app.title}</h3>
                          <span className="gc-skill-tag">{app.skill || "General"}</span>
                        </div>
                        <span className="gc-status-badge" style={{ background: `${statusColor[app.status]}22`, color: statusColor[app.status], border: `1px solid ${statusColor[app.status]}44` }}>
                          {app.status === "pending" ? "⏳ Pending" : app.status === "accepted" ? "✅ Accepted" : "❌ Rejected"}
                        </span>
                      </div>
                      <div className="gc-app-details">
                        <span>💰 Bid: ₹{Number(app.bidAmount).toLocaleString("en-IN")}</span>
                        <span>⏱️ Duration: {app.durationValue} {app.durationType}</span>
                        <span>📅 Applied: {app.appliedAt}</span>
                        <span>👤 {app.client_name || "Client"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ✅ FIX 4: Profile tab shows even without API — uses localStorage user */}
          {activeTab === "profile" && (
            <>
              <div className="gc-page-header">
                <div>
                  <h2>My Profile</h2>
                  <p>Your GigConnect profile</p>
                </div>
              </div>
              {user ? (
                <div className="gc-profile-card">
                  <div className="gc-profile-avatar">
                    {user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <h2 className="gc-profile-name">{user.name}</h2>
                  <div className="gc-profile-role">🔧 Freelancer / Worker</div>
                  <div className="gc-profile-details">
                    <div className="gc-profile-item"><span>📧</span> {user.email}</div>
                    <div className="gc-profile-item"><span>📍</span> Hyderabad, India</div>
                    <div className="gc-profile-item"><span>📋</span> {myApplications.length} Applications Submitted</div>
                  </div>
                  <button className="gc-apply-btn" style={{ marginTop: "1.5rem", width: "100%" }} onClick={() => window.location.href = "/freelancer-register"}>
                    ✏️ Edit Freelancer Profile
                  </button>
                </div>
              ) : (
                <div className="gc-empty">
                  <div style={{ fontSize: "3rem" }}>👤</div>
                  <h3>Not logged in</h3>
                  <p>Please log in to view your profile.</p>
                  <button className="gc-apply-btn" onClick={() => window.location.href = "/login"}>Go to Login</button>
                </div>
              )}
            </>
          )}

        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gc-wrap { background: #080812; min-height: 100vh; font-family: 'Segoe UI', sans-serif; color: #e2e8f0; }
        .gc-header { background: rgba(8,8,18,0.97); border-bottom: 1px solid rgba(99,102,241,0.2); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px); }
        .gc-header-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 64px; display: flex; align-items: center; gap: 1.5rem; }
        .gc-logo { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .gc-logo-icon { font-size: 1.4rem; }
        .gc-logo-text { font-size: 1.3rem; font-weight: 900; letter-spacing: -0.5px; background: linear-gradient(135deg, #a78bfa, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .gc-tabs { display: flex; gap: 0.4rem; flex: 1; justify-content: center; }
        .gc-tab { background: none; border: 1px solid rgba(255,255,255,0.07); color: #475569; padding: 7px 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 6px; position: relative; }
        .gc-tab.active, .gc-tab:hover { background: rgba(167,139,250,0.12); border-color: rgba(167,139,250,0.35); color: #a78bfa; }
        .gc-badge { background: #a78bfa; color: white; font-size: 0.7rem; padding: 1px 6px; border-radius: 10px; font-weight: 700; }
        .gc-username { color: #64748b; font-size: 0.85rem; white-space: nowrap; }
        .gc-logout { background: none; border: 1px solid rgba(255,255,255,0.1); color: #64748b; padding: 6px 14px; border-radius: 7px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; flex-shrink: 0; }
        .gc-logout:hover { border-color: #ef4444; color: #ef4444; }
        .gc-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 1rem; color: #475569; }
        .gc-spinner { width: 40px; height: 40px; border: 3px solid rgba(167,139,250,0.2); border-top-color: #a78bfa; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .gc-body { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .gc-page-header { margin-bottom: 1.75rem; }
        .gc-page-header h2 { color: #f1f5f9; font-size: 1.6rem; font-weight: 800; margin-bottom: 0.25rem; }
        .gc-page-header p { color: #475569; font-size: 0.92rem; }
        .gc-search { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; padding: 14px 20px; color: #e2e8f0; font-size: 0.95rem; margin-bottom: 1.25rem; transition: border-color 0.2s; }
        .gc-search:focus { outline: none; border-color: rgba(167,139,250,0.5); }
        .gc-search::placeholder { color: #334155; }
        .gc-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
        .gc-filter-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); color: #475569; padding: 6px 14px; border-radius: 20px; cursor: pointer; font-size: 0.82rem; transition: all 0.2s; }
        .gc-filter-btn.active, .gc-filter-btn:hover { background: rgba(167,139,250,0.12); border-color: rgba(167,139,250,0.35); color: #a78bfa; }
        .gc-count { color: #334155; font-size: 0.82rem; margin-bottom: 1.5rem; }
        .gc-jobs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .gc-job-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.5rem; transition: all 0.3s; }
        .gc-job-card:hover { border-color: rgba(167,139,250,0.3); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .gc-job-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; gap: 1rem; }
        .gc-job-title { color: #f1f5f9; font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
        .gc-job-meta { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .gc-skill-tag { background: rgba(167,139,250,0.12); border: 1px solid rgba(167,139,250,0.25); color: #a78bfa; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
        .gc-posted { color: #334155; font-size: 0.78rem; }
        .gc-job-budget { color: #10b981; font-weight: 800; font-size: 1rem; white-space: nowrap; }
        .gc-job-desc { color: #475569; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1.25rem; }
        .gc-job-footer { display: flex; justify-content: space-between; align-items: center; }
        .gc-client { color: #334155; font-size: 0.82rem; }
        .gc-apply-btn { background: linear-gradient(135deg, #a78bfa, #38bdf8); color: white; border: none; border-radius: 8px; padding: 8px 18px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .gc-apply-btn:hover { opacity: 0.85; }
        .gc-back-btn { background: none; border: none; color: #a78bfa; font-size: 0.9rem; font-weight: 600; cursor: pointer; margin-bottom: 1.5rem; padding: 0; }
        .gc-back-btn:hover { color: #c4b5fd; }
        .gc-apply-wrap { display: grid; grid-template-columns: 1fr 1.4fr; gap: 2rem; align-items: start; }
        .gc-job-summary { background: rgba(167,139,250,0.05); border: 1px solid rgba(167,139,250,0.15); border-radius: 16px; padding: 1.75rem; position: sticky; top: 80px; }
        .gc-job-summary h3 { color: #a78bfa; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.75rem; }
        .gc-job-summary h2 { color: #f1f5f9; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem; }
        .gc-job-summary p { color: #64748b; font-size: 0.88rem; line-height: 1.7; margin-bottom: 1rem; }
        .gc-summary-meta { display: flex; flex-direction: column; gap: 0.5rem; }
        .gc-summary-meta span { color: #475569; font-size: 0.85rem; }
        .gc-apply-form { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; }
        .gc-form-title { color: #f1f5f9; font-size: 1.2rem; font-weight: 800; margin-bottom: 1.5rem; }
        .gc-field { margin-bottom: 1.25rem; }
        .gc-field label { display: block; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
        .gc-field input, .gc-field textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; padding: 11px 14px; color: #e2e8f0; font-size: 0.92rem; font-family: 'Segoe UI', sans-serif; transition: border-color 0.2s; resize: none; }
        .gc-field input:focus, .gc-field textarea:focus { outline: none; border-color: rgba(167,139,250,0.5); background: rgba(167,139,250,0.04); }
        .gc-field input::placeholder, .gc-field textarea::placeholder { color: #334155; }
        .gc-field-hint { color: #334155; font-size: 0.76rem; margin-top: 4px; display: block; }
        .gc-duration-row { display: flex; gap: 0.75rem; }
        .gc-duration-num { flex: 1; }
        .gc-duration-select { flex: 1.5; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; padding: 11px 14px; color: #e2e8f0; font-size: 0.92rem; cursor: pointer; }
        .gc-duration-select:focus { outline: none; border-color: rgba(167,139,250,0.5); }
        .gc-duration-select option { background: #13131f; }
        .gc-upload-area { border: 2px dashed rgba(255,255,255,0.1); border-radius: 12px; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.2s; color: #475569; font-size: 0.85rem; }
        .gc-upload-area:hover { border-color: rgba(167,139,250,0.4); background: rgba(167,139,250,0.04); }
        .gc-upload-area p { margin: 0.5rem 0 0.25rem; color: #64748b; }
        .gc-upload-area span { font-size: 0.75rem; color: #334155; }
        .gc-file-selected { display: flex; align-items: center; justify-content: space-between; color: #a78bfa; font-weight: 600; }
        .gc-file-selected button { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; }
        .gc-email-note { background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px; padding: 12px 16px; color: #7dd3fc; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .gc-form-buttons { display: flex; gap: 1rem; }
        .gc-cancel-btn { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); color: #64748b; border-radius: 10px; padding: 12px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .gc-cancel-btn:hover { border-color: rgba(255,255,255,0.2); color: #94a3b8; }
        .gc-submit-btn { flex: 2; background: linear-gradient(135deg, #a78bfa, #38bdf8); color: white; border: none; border-radius: 10px; padding: 12px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; font-family: 'Segoe UI', sans-serif; }
        .gc-submit-btn:hover:not(:disabled) { opacity: 0.85; }
        .gc-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .gc-apply-success { text-align: center; padding: 3rem 1rem; }
        .gc-apply-success h3 { color: #10b981; font-size: 1.3rem; margin: 1rem 0 0.5rem; }
        .gc-apply-success p { color: #64748b; }
        .gc-empty { text-align: center; padding: 4rem 2rem; color: #334155; }
        .gc-empty h3 { color: #475569; margin: 1rem 0 0.5rem; }
        .gc-empty p { margin-bottom: 1.5rem; font-size: 0.9rem; }
        .gc-applications-list { display: flex; flex-direction: column; gap: 1rem; }
        .gc-app-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 1.5rem; }
        .gc-app-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; gap: 1rem; }
        .gc-app-title { color: #f1f5f9; font-weight: 700; margin-bottom: 0.4rem; }
        .gc-status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; white-space: nowrap; }
        .gc-app-details { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .gc-app-details span { color: #475569; font-size: 0.85rem; }
        .gc-profile-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 3rem; text-align: center; max-width: 500px; margin: 0 auto; }
        .gc-profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #a78bfa, #38bdf8); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 900; color: white; margin: 0 auto 1rem; }
        .gc-profile-name { color: #f1f5f9; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.3rem; }
        .gc-profile-role { color: #a78bfa; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .gc-profile-details { display: flex; flex-direction: column; gap: 0.75rem; text-align: left; }
        .gc-profile-item { display: flex; align-items: center; gap: 0.75rem; color: #64748b; font-size: 0.9rem; background: rgba(255,255,255,0.03); border-radius: 10px; padding: 12px 16px; }
        @media (max-width: 900px) { .gc-jobs-grid { grid-template-columns: 1fr; } .gc-apply-wrap { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .gc-tabs { display: none; } }
      `}</style>
    </div>
  );
}

export default FreelancerDashboard;