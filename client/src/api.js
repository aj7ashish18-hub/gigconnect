const API_BASE = "http://192.168.1.XXX:8000/api";

// LOGIN
export const loginUser = async (emailOrForm, password) => {
  // Support both loginUser(form) and loginUser(email, password)
  const email = typeof emailOrForm === "object" ? emailOrForm.email : emailOrForm;
  const pass = typeof emailOrForm === "object" ? emailOrForm.password : password;

  const res = await fetch(`${API_BASE}/auth.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: pass }),
  });

  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Server returned invalid JSON");
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Login failed");
  }

  return data;
};

// REGISTER
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }

  if (!res.ok) throw new Error(data?.message || data?.error || "Registration failed");
  return data;
};

// GET USER DATA (Protected Route)
export const getProtectedData = async (token) => {
  const res = await fetch(`${API_BASE}/protected.php`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }

  if (!res.ok) throw new Error(data?.message || data?.error || "Unauthorized");
  return data;
};

// POST A JOB (Client)
export const postJob = async (jobData, token) => {
  const res = await fetch(`${API_BASE}/post_job.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }

  if (!res.ok) throw new Error(data?.message || data?.error || "Failed to post job");
  return data;
};

// GET ALL JOBS
export const getAllJobs = async () => {
  const res = await fetch(`${API_BASE}/get_all_jobs.php`);

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }

  if (!res.ok) throw new Error(data?.message || data?.error || "Failed to get jobs");
  return data;
};

// SUBMIT BID
export const submitBid = async (bidData, token) => {
  const res = await fetch(`${API_BASE}/submit_bid.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bidData),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }

  if (!res.ok) throw new Error(data?.message || data?.error || "Failed to submit bid");
  return data;
};

// ADD REVIEW (Client)
export const addReview = async (reviewData, token) => {
  const res = await fetch(`${API_BASE}/add_review.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }

  if (!res.ok) throw new Error(data?.message || data?.error || "Failed to add review");
  return data;
};

// GET REVIEWS (Public)
export const getReviews = async (gigconnectId) => {
  const res = await fetch(`${API_BASE}/get_reviews.php?gigconnect_id=${gigconnectId}`);

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }

  if (!res.ok) throw new Error(data?.message || data?.error || "Failed to get reviews");
  return data;
};
// ─── Auth Helpers ──────────────────────────────────────────────────────────────

export function getToken() {
  return localStorage.getItem("token");
}

export function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
}
