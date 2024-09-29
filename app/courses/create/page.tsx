'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCourse } from '@/services/courseService';

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [teacherName, setteacherName] = useState('');

  const handleCreateCourse = async () => {
    await createCourse({ title, description, course_content: courseContent, teacherName: teacherName });
    router.push('/browse-all-courses');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Create New Course</h1>
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

      <div className="mb-4">
        <label htmlFor="teacherName" className="block mb-2">Teacher Name:</label>
        <input
          type="text"
          id="teacherName"
          value={teacherName}
          onChange={(e) => setteacherName(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <button
        onClick={handleCreateCourse}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Create Course
      </button>
    </div>
  );
}