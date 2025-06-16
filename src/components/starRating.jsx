import React from "react";

export default function StarRating({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onClick={() => onChange(star)}
          aria-label={`Set rating to ${star}`}
        >
          <span className={star <= value ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}