import React from 'react';

export default function LearningPage({ params }: { params: { courseId: string } }) {
  return (
    <div>
      <h1>Course Title</h1>
      <p>Progress: 50%</p>
      <h2>Current Lesson: Lesson Title</h2>
      {/* Lesson content would go here */}
      <button>Previous Lesson</button>
      <button>Next Lesson</button>
    </div>
  );
}