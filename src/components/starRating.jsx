import React from 'react'

export default function StarRating({ value, onChange }) {
  return (
    <div className="flex">
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          className={star <= value ? "text-yellow-400 cursor-pointer" : "text-gray-400 cursor-pointer"}
          onClick={() => onChange(star)}
        >★</span>
      ))}
    </div>
  );
}