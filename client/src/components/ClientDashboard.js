import React, { useEffect, useState } from "react";
import { getProtectedData } from '../api';
import { AddReview, ReviewStyles } from "./Reviews";
import { useNavigate } from "react-router-dom";
const API_BASE = "http://localhost:8000/api";

function ClientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token] = useState(localStorage.getItem("token"));
  const [gigconnects, setgigconnects] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedgigconnect, setSelectedgigconnect] = useState(null);
  const [activeTab, setActiveTab] = useState("find");

  // ✅ NEW: My Profile filter states
  const [filterByProfile, setFilterByProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const categories = ["All", "Web Development", "Graphic Design", "Mobile Apps", "Content Writing", "Data Analysis", "Video Editing"];

  const demogigconnects = [
    { id: 1, name: "Rahul Sharma", skill: "Web Development", rate: "₹3000/hr", rating: 4.9, reviews: 24, bio: "Full stack developer with 5 years experience in React, Node.js and PHP.", location: "Hyderabad" },
    { id: 2, name: "Priya Reddy", skill: "Graphic Design", rate: "₹2500/hr", rating: 4.8, reviews: 18, bio: "Creative designer specializing in logos, branding and UI/UX design.", location: "Hyderabad" },
    { id: 3, name: "Kiran Kumar", skill: "Mobile Apps", rate: "₹3500/hr", rating: 4.7, reviews: 15, bio: "Android and iOS developer. Built 20+ apps on Play Store.", location: "Hyderabad" },
    { id: 4, name: "Sneha Patel", skill: "Content Writing", rate: "₹800/hr", rating: 4.9, reviews: 32, bio: "SEO content writer with expertise in tech, finance and lifestyle niches.", location: "Hyderabad" },
    { id: 5, name: "Arjun Mehta", skill: "Data Analysis", rate: "₹2800/hr", rating: 4.6, reviews: 11, bio: "Data analyst skilled in Python, Excel, Power BI and SQL dashboards.", location: "Hyderabad" },
    { id: 6, name: "Meena Rao", skill: "Video Editing", rate: "₹1500/hr", rating: 4.8, reviews: 20, bio: "Video editor for YouTube, reels, ads and corporate presentations.", location: "Hyderabad" },
  ];

  useEffect(() => {
    getProtectedData(token)
      .then(data => {
        setUser(data.user);
        setJobs(data?.data?.userProjects || []);
      })
      .catch(err => console.error("Error fetching user data", err));

    fetch(`${API_BASE}/get_gigconnects.php`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setgigconnects(Array.isArray(data) ? data : []))
      .catch(() => setgigconnects(demogigconnects));

    // ✅ NEW: Fetch user profile domain
    fetch(`${API_BASE}/profile-domain/get.php`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserProfile(data))
      .catch(() => {});
  }, []);

  const displaygigconnects = gigconnects.length > 0 ? gigconnects : demogigconnects;

  // ✅ UPDATED: filteredgigconnects now includes My Profile filter
  const filteredgigconnects = displaygigconnects.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.skill?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === "All" || f.skill === filterCategory;

    // My Profile filter — matches by industry or skills from profile
    const matchProfile = !filterByProfile || !userProfile || (
      f.skill === userProfile.industry ||
      f.skill === userProfile.skills
    );

    return matchSearch && matchCategory && matchProfile;
  });

  // ✅ NEW: Filter jobs by profile for My Hired Jobs tab
  const filteredJobs = jobs.filter(job => {
    if (!filterByProfile || !userProfile) return true;
    return (
      job.category === userProfile.industry ||
      job.job_type === userProfile.job_type ||
      job.skills === userProfile.skills
    );
  });

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.round(rating) ? "#f59e0b" : "#334155" }}>★</span>
    ));
  }

  function getInitials(name) {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  }

  const avatarColors = ["#6366f1", "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  // ✅ NEW: My Profile filter button component (reused in both tabs)
  const ProfileFilterBar = () => (
    <div className="cd-profile-filter-bar">
      <button
        className={`cd-profile-filter-btn ${filterByProfile ? "active" : ""}`}
        onClick={() => navigate("/freelancer-profile")}
      >
        <span className="cd-profile-icon">👤</span>
        My Profile
        {filterByProfile && <span className="cd-profile-badge">ON</span>}
      </button>
      {filterByProfile && !userProfile && (
        <span className="cd-profile-warning">
          ⚠️ No profile set.{" "}
          <a href="/profile-setup" className="cd-profile-setup-link">Set up your domain →</a>
        </span>
      )}
      {filterByProfile && userProfile && (
        <span className="cd-profile-active-info">
          Filtering by: <strong>{userProfile.industry || userProfile.skills || "your profile"}</strong>
        </span>
      )}
    </div>
  );

  return (
    <div className="cd-wrap">

      {/* Header */}
      <div className="cd-header">
        <div className="cd-header-inner">
          <div className="cd-logo">⚡ gigconnectHub</div>
          <div className="cd-tabs">
            <button className={`cd-tab ${activeTab === "find" ? "active" : ""}`} onClick={() => setActiveTab("find")}>
              🔍 Find gigconnects
            </button>
            <button className={`cd-tab ${activeTab === "myjobs" ? "active" : ""}`} onClick={() => setActiveTab("myjobs")}>
              📋 My Hired Jobs
            </button>
          </div>
          <div className="cd-user-info">
            {user && <span className="cd-welcome">👋 {user.name}</span>}
            <button className="cd-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="cd-body">

        {/* FIND gigconnectS TAB */}
        {activeTab === "find" && (
          <>
            <div className="cd-page-title">
              <h2>Find gigconnects</h2>
              <p>Browse top talent in Hyderabad and across India</p>
            </div>
<div className="cd-tabs">
  <button className={`cd-tab ${activeTab === "find" ? "active" : ""}`} onClick={() => setActiveTab("find")}>
    🔍 Find gigconnects
  </button>
  <button className={`cd-tab ${activeTab === "myjobs" ? "active" : ""}`} onClick={() => setActiveTab("myjobs")}>
    📋 My Hired Jobs
  </button>
  <button className="cd-tab" onClick={() => window.location.href = "/freelancer-register"}>
    👤 My Profile
  </button>
</div>
            <input
              className="cd-search-input"
              placeholder="🔍 Search by name or skill..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            <div className="cd-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`cd-filter-btn ${filterCategory === cat ? "active" : ""}`}
                  onClick={() => navigate("/freelancer-profile")}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ✅ NEW: My Profile filter bar */}
            <ProfileFilterBar />

            <p className="cd-results-count">{filteredgigconnects.length} gigconnects found</p>

            <div className="cd-grid">
              {filteredgigconnects.map((f, index) => (
                <div key={f.id || index} className="cd-card">
                  <div className="cd-card-top">
                    <div className="cd-avatar" style={{ background: avatarColors[index % avatarColors.length] }}>
                      {getInitials(f.name)}
                    </div>
                    <div className="cd-card-info">
                      <div className="cd-name">{f.name}</div>
                      <div className="cd-skill">{f.skill}</div>
                      <div className="cd-location">📍 {f.location || "Hyderabad"}</div>
                    </div>
                    <div className="cd-rate">{f.rate || "₹2000/hr"}</div>
                  </div>
                  <p className="cd-bio">{f.bio}</p>
                  <div className="cd-card-bottom">
                    <div className="cd-rating">
                      {renderStars(f.rating || 4.5)}
                      <span className="cd-rating-num">{f.rating || "4.5"}</span>
                      <span className="cd-reviews-count">({f.reviews || 0} reviews)</span>
                    </div>
                    <button className="cd-hire-btn" onClick={() => setSelectedgigconnect(f)}>
                      Hire Now →
                    </button>
                  </div>
                </div>
              ))}

              {filteredgigconnects.length === 0 && filterByProfile && (
                <div className="cd-no-results">
                  <div style={{ fontSize: "2.5rem" }}>🔍</div>
                  <p>No gigconnects match your profile domain.</p>
                  <a href="/profile-setup" className="cd-profile-setup-link">Update your profile →</a>
                </div>
              )}
            </div>
          </>
        )}

        {/* MY JOBS TAB */}
        {activeTab === "myjobs" && (
          <div className="cd-myjobs">
            <div className="cd-page-title">
              <h2>My Hired Jobs</h2>
              <p>Track your ongoing and completed projects</p>
            </div>

            {/* ✅ NEW: My Profile filter bar in jobs tab too */}
            <ProfileFilterBar />

            {filteredJobs.length === 0 ? (
              <div className="cd-empty">
                <div style={{ fontSize: "3rem" }}>📋</div>
                <p>{filterByProfile ? "No jobs match your profile domain." : "No jobs yet. Hire a gigconnect to get started!"}</p>
                {!filterByProfile && (
                  <button className="cd-hire-btn" onClick={() => setActiveTab("find")}>
                    Find gigconnects
                  </button>
                )}
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className="cd-job-card">
                  <div className="cd-job-header">
                    <h4 className="cd-job-title">{job.title}</h4>
                    <span className={`cd-job-status ${job.status}`}>{job.status || "active"}</span>
                  </div>
                  <p className="cd-job-desc">{job.description}</p>
                  <p className="cd-job-budget">💰 Budget: ₹{job.budget}</p>
                  {job.bids && job.bids.length > 0 && (
                    <div className="cd-bids">
                      <strong>gigconnect:</strong>
                      {job.bids.map((bid, i) => (
                        <div key={i} className="cd-bid-item">👤 {bid.gigconnect_name} — ₹{bid.amount}</div>
                      ))}
                    </div>
                  )}
                  {job.status === "completed" && (
                    <div className="mt-3">
                      <AddReview
                        jobId={job.id}
                        gigconnectId={job.bids?.[0]?.gigconnect_id}
                        token={token}
                        onReviewAdded={() => alert("Review submitted! Thank you.")}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Hire Modal */}
      {selectedgigconnect && (
        <div className="cd-modal-overlay" onClick={() => setSelectedgigconnect(null)}>
          <div className="cd-modal" onClick={e => e.stopPropagation()}>
            <button className="cd-modal-close" onClick={() => setSelectedgigconnect(null)}>✕</button>
            <div className="cd-modal-avatar" style={{ background: avatarColors[0] }}>
              {getInitials(selectedgigconnect.name)}
            </div>
            <h3 className="cd-modal-name">{selectedgigconnect.name}</h3>
            <div className="cd-modal-skill">{selectedgigconnect.skill}</div>
            <div className="cd-modal-rating">
              {renderStars(selectedgigconnect.rating || 4.5)}
              <span>{selectedgigconnect.rating} ({selectedgigconnect.reviews} reviews)</span>
            </div>
            <p className="cd-modal-bio">{selectedgigconnect.bio}</p>
            <div className="cd-modal-rate">{selectedgigconnect.rate || "₹2000/hr"}</div>
            <button className="cd-modal-hire" onClick={() => {
              alert(`Message sent to ${selectedgigconnect.name}! They will contact you soon.`);
              setSelectedgigconnect(null);
            }}>
              📩 Contact gigconnect
            </button>
          </div> 
        </div>
      )}

      <ReviewStyles />

      <style>{`
        * { box-sizing: border-box; }
        .cd-wrap { background: #0a0a14; min-height: 100vh; font-family: 'Segoe UI', sans-serif; color: #e2e8f0; }

        .cd-header {
          background: rgba(10,10,20,0.95);
          border-bottom: 1px solid rgba(99,102,241,0.2);
          position: sticky; top: 0; z-index: 100;
          backdrop-filter: blur(12px);
        }
        .cd-header-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem;
          height: 64px; display: flex; align-items: center; gap: 2rem;
        }
        .cd-logo {
          font-size: 1.2rem; font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          white-space: nowrap;
        }
        .cd-tabs { display: flex; gap: 0.5rem; flex: 1; justify-content: center; }
        .cd-tab {
          background: none; border: 1px solid rgba(255,255,255,0.08);
          color: #64748b; padding: 7px 18px; border-radius: 8px;
          cursor: pointer; font-size: 0.88rem; font-weight: 600; transition: all 0.2s;
        }
        .cd-tab.active, .cd-tab:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4); color: #818cf8;
        }
        .cd-user-info { display: flex; align-items: center; gap: 1rem; }
        .cd-welcome { color: #94a3b8; font-size: 0.88rem; white-space: nowrap; }
        .cd-logout {
          background: none; border: 1px solid rgba(255,255,255,0.15);
          color: #94a3b8; padding: 6px 14px; border-radius: 7px;
          cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
        }
        .cd-logout:hover { border-color: #ef4444; color: #ef4444; }

        .cd-body { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .cd-page-title { margin-bottom: 1.5rem; }
        .cd-page-title h2 { color: #f1f5f9; font-size: 1.6rem; font-weight: 800; margin-bottom: 0.25rem; }
        .cd-page-title p { color: #64748b; font-size: 0.95rem; }

        .cd-search-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          padding: 14px 20px; color: #e2e8f0; font-size: 1rem;
          margin-bottom: 1.25rem; transition: border-color 0.2s;
        }
        .cd-search-input:focus { outline: none; border-color: rgba(99,102,241,0.5); }
        .cd-search-input::placeholder { color: #475569; }

        .cd-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .cd-filter-btn {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          color: #64748b; padding: 6px 16px; border-radius: 20px;
          cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
        }
        .cd-filter-btn.active, .cd-filter-btn:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4); color: #818cf8;
        }

        /* ✅ NEW: My Profile filter bar styles */
        .cd-profile-filter-bar {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.25rem; flex-wrap: wrap;
        }
        .cd-profile-filter-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.12);
          color: #64748b; padding: 8px 18px; border-radius: 20px;
          cursor: pointer; font-size: 0.88rem; font-weight: 600;
          transition: all 0.2s;
        }
        .cd-profile-filter-btn:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.3); color: #818cf8;
        }
        .cd-profile-filter-btn.active {
          background: rgba(99,102,241,0.2);
          border-color: rgba(99,102,241,0.6); color: #a5b4fc;
          box-shadow: 0 0 12px rgba(99,102,241,0.2);
        }
        .cd-profile-icon { font-size: 0.95rem; }
        .cd-profile-badge {
          background: #6366f1; color: white;
          font-size: 0.65rem; font-weight: 800;
          padding: 2px 6px; border-radius: 8px; letter-spacing: 0.05em;
        }
        .cd-profile-warning { color: #f59e0b; font-size: 0.82rem; }
        .cd-profile-setup-link { color: #6366f1; text-decoration: none; font-weight: 600; }
        .cd-profile-setup-link:hover { color: #818cf8; text-decoration: underline; }
        .cd-profile-active-info { color: #475569; font-size: 0.82rem; }
        .cd-profile-active-info strong { color: #818cf8; }

        .cd-results-count { color: #475569; font-size: 0.85rem; margin-bottom: 1.5rem; }

        .cd-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .cd-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.5rem; transition: all 0.3s;
        }
        .cd-card:hover {
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
        .cd-card-top { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 0.8rem; }
        .cd-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 1rem; color: white; flex-shrink: 0;
        }
        .cd-card-info { flex: 1; }
        .cd-name { font-weight: 700; color: #f1f5f9; font-size: 1rem; }
        .cd-skill { color: #6366f1; font-size: 0.82rem; margin-top: 2px; }
        .cd-location { color: #475569; font-size: 0.78rem; margin-top: 2px; }
        .cd-rate { color: #10b981; font-weight: 700; font-size: 0.88rem; white-space: nowrap; }
        .cd-bio { color: #64748b; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; }
        .cd-card-bottom { display: flex; justify-content: space-between; align-items: center; }
        .cd-rating { display: flex; align-items: center; gap: 4px; }
        .cd-rating-num { color: #f1f5f9; font-weight: 700; font-size: 0.85rem; }
        .cd-reviews-count { color: #475569; font-size: 0.78rem; }
        .cd-hire-btn {
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          color: white; border: none; border-radius: 8px;
          padding: 8px 16px; font-size: 0.85rem; font-weight: 700;
          cursor: pointer; transition: opacity 0.2s;
        }
        .cd-hire-btn:hover { opacity: 0.85; }

        .cd-no-results {
          grid-column: 1 / -1; text-align: center;
          padding: 3rem; color: #475569;
        }
        .cd-no-results p { margin: 0.75rem 0; font-size: 0.95rem; }

        .cd-empty { text-align: center; padding: 4rem 2rem; color: #475569; }
        .cd-empty p { margin: 1rem 0 1.5rem; font-size: 1rem; }
        .cd-job-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.5rem; margin-bottom: 1rem;
        }
        .cd-job-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .cd-job-title { color: #f1f5f9; font-weight: 700; }
        .cd-job-status {
          padding: 3px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;
          background: rgba(99,102,241,0.15); color: #818cf8;
        }
        .cd-job-status.completed { background: rgba(16,185,129,0.15); color: #10b981; }
        .cd-job-desc { color: #64748b; font-size: 0.88rem; margin-bottom: 0.5rem; }
        .cd-job-budget { color: #10b981; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.75rem; }
        .cd-bids { color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.75rem; }
        .cd-bid-item { padding: 4px 0; color: #64748b; }

        .cd-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; backdrop-filter: blur(4px);
        }
        .cd-modal {
          background: #13131f; border: 1px solid rgba(99,102,241,0.25);
          border-radius: 20px; padding: 2.5rem; max-width: 420px;
          width: 90%; text-align: center; position: relative;
        }
        .cd-modal-close {
          position: absolute; top: 1rem; right: 1rem;
          background: none; border: none; color: #475569; font-size: 1.2rem; cursor: pointer;
        }
        .cd-modal-close:hover { color: #e2e8f0; }
        .cd-modal-avatar {
          width: 72px; height: 72px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; font-weight: 800; color: white; margin: 0 auto 1rem;
        }
        .cd-modal-name { color: #f1f5f9; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.3rem; }
        .cd-modal-skill { color: #6366f1; font-size: 0.9rem; margin-bottom: 0.75rem; }
        .cd-modal-rating { display: flex; align-items: center; justify-content: center; gap: 6px; color: #94a3b8; margin-bottom: 1rem; }
        .cd-modal-bio { color: #64748b; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .cd-modal-rate { color: #10b981; font-weight: 800; font-size: 1.1rem; margin-bottom: 1.5rem; }
        .cd-modal-hire {
          width: 100%; background: linear-gradient(135deg, #6366f1, #06b6d4);
          color: white; border: none; border-radius: 10px;
          padding: 13px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s;
        }
        .cd-modal-hire:hover { opacity: 0.85; }

        @media (max-width: 900px) { .cd-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .cd-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default ClientDashboard;