'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchCourseById } from '@/services/courseService';

interface Course {
  _id: string;
  title: string;
  description: string;
  course_content: string;
  // ... other fields ...
}

export default function ViewCoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function loadCourse() {
      if (id) {
        const fetchedCourse = await fetchCourseById(id as string);
        setCourse(fetchedCourse);
      }
    }
    loadCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <div className="prose">
        {course.course_content}
      </div>
    </div>
  );
}