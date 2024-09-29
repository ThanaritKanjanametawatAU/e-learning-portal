import React, { useState } from 'react';

export default function RegistrationForm({ onRegister }: { onRegister: (username: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, roles }),
      });
      if (response.ok) {
        const data = await response.json();
        onRegister(data.name);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded text-gray-800 text-lg"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded text-gray-800 text-lg"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded text-gray-800 text-lg"
        required
      />
      <div className="text-gray-800 text-lg">
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            value="student"
            checked={roles.includes('student')}
            onChange={(e) => {
              if (e.target.checked) {
                setRoles([...roles, 'student']);
              } else {
                setRoles(roles.filter(role => role !== 'student'));
              }
            }}
            className="form-checkbox"
          />
          <span className="ml-2">Student</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            value="teacher"
            checked={roles.includes('teacher')}
            onChange={(e) => {
              if (e.target.checked) {
                setRoles([...roles, 'teacher']);
              } else {
                setRoles(roles.filter(role => role !== 'teacher'));
              }
            }}
            className="form-checkbox"
          />
          <span className="ml-2">Teacher</span>
        </label>
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-lg">
        Register
      </button>
    </form>
  );
}