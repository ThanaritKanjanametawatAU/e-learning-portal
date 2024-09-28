import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">E-Learning Portal Home</h1>
      <p className="mb-6">Welcome to our E-Learning platform. Explore courses and start your learning journey today!</p>
      <div className="space-x-4">
        <Link href="/courses" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          View Course Catalog
        </Link>
      </div>
    </div>
  );
}