import React from 'react';

export default function ToggleIcon({ isTeacher, onClick }: { isTeacher: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 focus:outline-none"
      aria-label="Toggle Teacher/Student View"
    >
      {/* ... (keep the existing SVG content) */}
    </button>
  );
}