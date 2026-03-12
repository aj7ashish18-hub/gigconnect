import React, { useState } from "react";
import { addReview } from "../api";

// Component for CLIENT to leave a review on a gigconnect
export const AddReview = ({ jobId, gigconnectId, token, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) { setError("Please select a star rating"); return; }
    if (!comment.trim()) { setError("Please write a comment"); return; }
    try {
      await addReview({ gigconnect_id: gigconnectId, job_id: jobId, rating, comment }, token);
      setSubmitted(true);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  if (submitted) return (
    <div className="review-success">✅ Review submitted successfully! Thank you.</div>
  );

  return (
    <div className="add-review-card">
      <h4 className="review-title">⭐ Leave a Review</h4>
      <div className="stars-row">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hover || rating) ? "filled" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >★</span>
        ))}
        <span className="rating-label">
          {rating === 1 ? "Poor" : rating === 2 ? "Fair" : rating === 3 ? "Good" : rating === 4 ? "Very Good" : rating === 5 ? "Excellent" : "Select rating"}
        </span>
      </div>
      <textarea
        className="review-textarea"
        placeholder="Share your experience with this gigconnect..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        rows={3}
      />
      {error && <p className="review-error">{error}</p>}
      <button className="review-submit-btn" onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

// Component to DISPLAY reviews for a gigconnect
export const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return (
    <div className="no-reviews">No reviews yet.</div>
  );

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="reviews-list">
      <div className="reviews-summary">
        <div className="avg-rating">{avgRating}</div>
        <div>
          <div className="avg-stars">{"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}</div>
          <div className="review-count">{reviews.length} review{reviews.length > 1 ? "s" : ""}</div>
        </div>
      </div>
      {reviews.map((review, i) => (
        <div key={i} className="review-card">
          <div className="review-header">
            <div className="reviewer-name">👤 {review.client_name}</div>
            <div className="review-stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
          </div>
          <p className="review-comment">{review.comment}</p>
          <div className="review-date">{new Date(review.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
        </div>
      ))}

      <style>{`
        .reviews-list { margin-top: 1rem; }
        .reviews-summary {
          display: flex; align-items: center; gap: 1rem;
          background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2);
          border-radius: 12px; padding: 1rem 1.5rem; margin-bottom: 1rem;
        }
        .avg-rating { font-size: 3rem; font-weight: 900; color: #6366f1; line-height: 1; }
        .avg-stars { color: #fbbf24; font-size: 1.2rem; }
        .review-count { color: #64748b; font-size: 0.85rem; }
        .review-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 1rem 1.2rem; margin-bottom: 0.8rem;
        }
        .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .reviewer-name { color: #e2e8f0; font-weight: 600; font-size: 0.9rem; }
        .review-stars { color: #fbbf24; font-size: 1rem; }
        .review-comment { color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin: 0 0 0.5rem; }
        .review-date { color: #475569; font-size: 0.8rem; }
        .no-reviews { color: #475569; font-size: 0.9rem; padding: 1rem 0; }
      `}</style>
    </div>
  );
};

export const ReviewStyles = () => (
  <style>{`
    .add-review-card {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(99,102,241,0.2);
      border-radius: 14px; padding: 1.5rem; margin-top: 1rem;
    }
    .review-title { color: #f1f5f9; margin-bottom: 1rem; font-size: 1rem; }
    .stars-row { display: flex; align-items: center; gap: 4px; margin-bottom: 1rem; }
    .star {
      font-size: 2rem; cursor: pointer; color: #334155; transition: color 0.15s;
      line-height: 1;
    }
    .star.filled { color: #fbbf24; }
    .rating-label { color: #64748b; font-size: 0.85rem; margin-left: 8px; }
    .review-textarea {
      width: 100%; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
      padding: 10px 14px; color: #e2e8f0; font-size: 0.9rem;
      resize: none; margin-bottom: 0.8rem; display: block;
      box-sizing: border-box; font-family: 'Segoe UI', sans-serif;
    }
    .review-textarea:focus { outline: none; border-color: #6366f1; }
    .review-textarea::placeholder { color: #475569; }
    .review-error { color: #f87171; font-size: 0.85rem; margin-bottom: 0.5rem; }
    .review-submit-btn {
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      color: white; border: none; border-radius: 8px;
      padding: 8px 20px; font-size: 0.9rem; font-weight: 600;
      cursor: pointer; transition: opacity 0.2s;
    }
    .review-submit-btn:hover { opacity: 0.85; }
    .review-success {
      color: #4ade80; background: rgba(74,222,128,0.1);
      border: 1px solid rgba(74,222,128,0.2); border-radius: 10px;
      padding: 0.8rem 1rem; font-size: 0.9rem; margin-top: 1rem;
    }
  `}</style>
);
