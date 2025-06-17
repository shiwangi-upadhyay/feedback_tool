"use client";
import { useState } from "react";
import StarRating from "./starRating.jsx";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "",
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
    if (res.ok) {
      setForm({
        name: "",
        email: "",
        product: "",
        feedbackText: "",
        rating: 0,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow flex flex-col items-center mt-12"
      >
        <div className="flex items-center justify-center gap-6 w-full mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-800">
                {form.name || "Your Name"}
              </span>
              <div className="flex">
                <StarRating
                  value={form.rating}
                  onChange={(rating) => setForm((f) => ({ ...f, rating }))}
                  size={24}
                  interactive
                />
              </div>
            </div>
            <div className="text-gray-500 text-lg font-normal">
              {form.email || "Your Role or Email"}
            </div>
          </div>
        </div>
          <input
              name="product"
              value={form.product}
              onChange={(e) =>
                setForm((f) => ({ ...f, product: e.target.value }))
              }
              placeholder="Product Name (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition mb-4 "
          />
        <textarea
          name="feedback"
          value={form.feedbackText}
          onChange={(e) =>
            setForm((f) => ({ ...f, feedbackText: e.target.value }))
          }
          placeholder="Share your feedback..."
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 text-lg transition resize-none mb-4"
        />
        <div className="flex w-full gap-4 mb-4">
          <input
            name="name"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
            placeholder="Name (optional)"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition"
          />
          <input
            name="email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
            placeholder="Email (optional)"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600 transition"
          />
        </div>
        <button
          type="submit"
          className="w-40 bg-black text-white font-semibold py-2 rounded-lg transition mt-2"
        >
          Submit
        </button>
        {status && (
          <div
            className={`text-center font-medium mt-4 ${
              status.startsWith("Thank") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </div>
        )}
      </form>
    </div>
  );
}