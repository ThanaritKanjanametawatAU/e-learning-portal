'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCourse, editCourse } from '@/services/courseService';

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseContent, setCourseContent] = useState('');

  useEffect(() => {
    async function loadCourse() {
      const course = await fetchCourse(params.id);
      setTitle(course.title);
      setDescription(course.description);
      setCourseContent(course.course_content);
    }
    loadCourse();
  }, [params.id]);

  const handleEditCourse = async () => {
    await editCourse(params.id, { title, description, course_content: courseContent });
    router.push('/browse-all-courses');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Edit Course</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Course Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Course Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded text-black"
          rows={4}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="courseContent" className="block mb-2">Course Content:</label>
        <textarea
          id="courseContent"
          value={courseContent}
          onChange={(e) => setCourseContent(e.target.value)}
          className="w-full p-2 border rounded text-black"
          rows={6}
        ></textarea>
      </div>
      <button
        onClick={handleEditCourse}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}