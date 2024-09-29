"use client";

import { useEffect, useState } from 'react';
import { getCourseDetails } from '@/services/courseService';

interface Course {
  title: string;
  description: string;
  course_content: string;
}

export default function LearningPage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourseDetails() {
      const courseData = await getCourseDetails(params.courseId);
      setCourse(courseData);
    }
    fetchCourseDetails();
  }, [params.courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-lg mb-4">{course.description}</p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Content</h2>
        <p>{course.course_content}</p>
      </div>
    </div>
  );
}