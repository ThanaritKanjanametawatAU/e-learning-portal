'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lessons, setLessons] = useState<string[]>([]);

  useEffect(() => {
    // Here you would typically fetch the course data based on the ID
    // For now, we'll just set some dummy data
    setTitle('Course Title');
    setDescription('Course Description');
    setLessons(['Lesson 1', 'Lesson 2', 'Lesson 3']);
  }, [params.id]);

  const handleAddLesson = () => {
    setLessons([...lessons, `Lesson ${lessons.length + 1}`]);
  };

  const handleSaveCourse = () => {
    // Here you would typically send an API request to save the course
    console.log('Course saved');
    router.push('/dashboard');
  };

  const handlePublishCourse = () => {
    // Here you would typically send an API request to publish the course
    console.log('Course published');
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Course Editor</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Course Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Course Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        ></textarea>
      </div>
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      <ul className="mb-4">
        {lessons.map((lesson, index) => (
          <li key={index} className="mb-2">
            {lesson}
            <button className="ml-2 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddLesson}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Lesson
      </button>
      <div className="space-x-4">
        <button
          onClick={handleSaveCourse}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Save Course
        </button>
        <button
          onClick={handlePublishCourse}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Publish Course
        </button>
      </div>
    </div>
  );
}