"use client";
import { useState } from "react";
import StarRating from "./starRating.jsx";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    feedbackText: "",
    rating: 0,
  });
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.feedbackText || !form.rating) {
      setStatus("Feedback and rating are required.");
      return;
    }
    const res = await fetch("/api/users/feedback", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setStatus(res.ok ? "Thank you for your feedback!" : "Failed to submit.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <input
        name="name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="Name (optional)"
        className="input"
      />
      <input
        name="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="Email (optional)"
        className="input"
      />
      <textarea
        name="feedback"
        value={form.feedbackText}
        onChange={(e) =>
          setForm((f) => ({ ...f, feedbackText: e.target.value }))
        }
        placeholder="Your feedback"
        required
        className="input"
      />
      <StarRating
        value={form.rating}
        onChange={(rating) => setForm((f) => ({ ...f, rating }))}
      />
      <button type="submit" className="btn-primary">
        Submit
      </button>
      {status && <div>{status}</div>}
    </form>
  );
}
