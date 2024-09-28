import React from 'react';
import dbConnect from '../../lib/db';
import { User } from '../../models';

async function getUserProfile(userId: string) {
  await dbConnect();
  const user = await User.findById(userId).lean();
  return user;
}

export default async function Profile() {
  // In a real app, you'd get the user ID from the session
  const userId = 'dummy-user-id';
  const user = await getUserProfile(userId);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">User Profile</h1>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more profile information here */}
      </div>
    </div>
  );
}