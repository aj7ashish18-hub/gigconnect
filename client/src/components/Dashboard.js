import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("browse");
  const [myApplications, setMyApplications] = useState([]);
  const token = localStorage.getItem("token");

  const categories = ["All", "Web Development", "Graphic Design", "Mobile Apps", "Content Writing", "Data Analysis", "Video Editing"];

  const demoJobs = [
    { id: 1, title: "Build a React E-Commerce Website", category: "Web Development", budget: "₹25,000", company: "TechCorp Hyd", desc: "Need a full stack developer to build a modern e-commerce site with cart, payments and admin panel.", posted: "2 hours ago" },
    { id: 2, title: "Design Logo & Brand Identity", category: "Graphic Design", budget: "₹5,000", company: "StartupX", desc: "Looking for a creative designer to create a logo, color palette and brand guidelines for our startup.", posted: "5 hours ago" },
    { id: 3, title: "Android App for Food Delivery", category: "Mobile Apps", budget: "₹40,000", company: "FoodRush", desc: "Build a food delivery app with real-time tracking, payment integration and restaurant dashboard.", posted: "1 day ago" },
    { id: 4, title: "Write 20 SEO Blog Posts", category: "Content Writing", budget: "₹8,000", company: "BlogPro", desc: "Need an experienced content writer to write 20 SEO-optimized blog posts on technology topics.", posted: "1 day ago" },
    { id: 5, title: "Sales Dashboard in Power BI", category: "Data Analysis", budget: "₹12,000", company: "FinCorp", desc: "Create an interactive sales dashboard connecting to our MySQL database using Power BI.", posted: "2 days ago" },
    { id: 6, title: "YouTube Video Editing (10 videos)", category: "Video Editing", budget: "₹6,000", company: "CreatorHub", desc: "Edit 10 YouTube videos with transitions, captions, thumbnails and color grading.", posted: "2 days ago" },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    fetch(`${API_BASE}/get_all_jobs.php`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setJobs(Array.isArray(data) ? data : demoJobs))
      .catch(() => setJobs(demoJobs));
  }, []);

  const filtered = jobs.filter(j => {
    const matchSearch = j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.desc?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || j.category === activeCategory;
    return matchSearch && matchCat;
  });

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  function handleApply(job) {
    const already = myApplications.find(a => a.id === job.id);
    if (already) return alert("You already applied to this job!");
    setMyApplications(prev => [...prev, { ...job, status: "Pending", appliedAt: "Just now" }]);
    alert(`Applied to "${job.title}" successfully!`);
  }

  return (
    <div style={{ background: "#0a0a14", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", color: "#e2e8f0" }}>

      {/* Header */}
      <div style={{ background: "rgba(10,10,20,0.95)", borderBottom: "1px solid rgba(99,102,241,0.2)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, background: "linear-gradient(135deg, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap" }}>
            ⚡ GigConnect
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flex: 1, justifyContent: "center" }}>
            {[
              { key: "browse", label: "🔍 Browse Jobs" },
              { key: "applications", label: "📋 My Applications" },
              { key: "profile", label: "👤 My Profile" },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ background: activeTab === tab.key ? "rgba(99,102,241,0.15)" : "none", border: `1px solid ${activeTab === tab.key ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, color: activeTab === tab.key ? "#818cf8" : "#64748b", padding: "7px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, transition: "all 0.2s" }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {user && <span style={{ color: "#94a3b8", fontSize: "0.88rem" }}>👋 {user.name}</span>}
            <button onClick={handleLogout}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8", padding: "6px 14px", borderRadius: "7px", cursor: "pointer", fontSize: "0.85rem" }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

        {/* BROWSE JOBS TAB */}
        {activeTab === "browse" && (
          <>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ color: "#f1f5f9", fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.25rem" }}>Find Your Next Gig</h2>
              <p style={{ color: "#64748b" }}>Browse jobs that match your skills and apply instantly</p>
            </div>

            <input
              placeholder="🔍 Search jobs by title or keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "14px 20px", color: "#e2e8f0", fontSize: "1rem", marginBottom: "1.25rem", outline: "none" }}
            />

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  style={{ background: activeCategory === cat ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${activeCategory === cat ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, color: activeCategory === cat ? "#818cf8" : "#64748b", padding: "6px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s" }}>
                  {cat}
                </button>
              ))}
            </div>

            <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "1.5rem" }}>{filtered.length} jobs available</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
              {filtered.map((job, i) => (
                <div key={job.id || i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", transition: "all 0.3s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ color: "#f1f5f9", fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{job.title}</h3>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", padding: "3px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>{job.category}</span>
                        <span style={{ color: "#475569", fontSize: "0.78rem" }}>🕐 {job.posted}</span>
                      </div>
                    </div>
                    <span style={{ color: "#10b981", fontWeight: 800, fontSize: "1rem", whiteSpace: "nowrap" }}>{job.budget}</span>
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>{job.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#475569", fontSize: "0.82rem" }}>👤 {job.company}</span>
                    <button onClick={() => handleApply(job)}
                      style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", border: "none", borderRadius: "8px", padding: "8px 20px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer" }}>
                      Apply Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MY APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ color: "#f1f5f9", fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.25rem" }}>My Applications</h2>
              <p style={{ color: "#64748b" }}>Track all your job applications</p>
            </div>
            {myApplications.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#475569" }}>
                <div style={{ fontSize: "3rem" }}>📋</div>
                <p style={{ margin: "1rem 0" }}>No applications yet. Browse jobs and apply!</p>
                <button onClick={() => setActiveTab("browse")}
                  style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>
                  Browse Jobs
                </button>
              </div>
            ) : (
              myApplications.map((app, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h4 style={{ color: "#f1f5f9", fontWeight: 700 }}>{app.title}</h4>
                    <span style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", padding: "3px 12px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 600 }}>{app.status}</span>
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>👤 {app.company} • Applied {app.appliedAt}</p>
                  <p style={{ color: "#10b981", fontWeight: 700, fontSize: "0.88rem" }}>{app.budget}</p>
                </div>
              ))
            )}
          </>
        )}

        {/* MY PROFILE TAB */}
        {activeTab === "profile" && (
          <>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ color: "#f1f5f9", fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.25rem" }}>My Profile</h2>
              <p style={{ color: "#64748b" }}>Your gigconnect profile</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "2rem", maxWidth: "500px" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: "1.5rem" }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ color: "#f1f5f9", fontWeight: 800, marginBottom: "0.25rem" }}>{user?.name}</h3>
              <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>{user?.email}</p>
              <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "10px", padding: "10px 16px", color: "#818cf8", fontSize: "0.88rem", fontWeight: 600 }}>
                Role: Gigconnect / Worker
              </div>
              <button
                onClick={() => window.location.href = "/freelancer-register"}
                style={{ marginTop: "1.5rem", width: "100%", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "white", border: "none", borderRadius: "10px", padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: "0.95rem" }}>
                Complete Freelancer Profile →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;