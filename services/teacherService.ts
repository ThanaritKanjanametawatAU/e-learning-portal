import axios from 'axios';

interface Teacher {
  _id: string;
  name: string;
  // ... other fields ...
}

export async function fetchTeachers(): Promise<Teacher[]> {
  const response = await axios.get('/api/teachers');
  return response.data;
}