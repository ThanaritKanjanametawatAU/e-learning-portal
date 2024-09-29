import axios from 'axios';

interface Course {
  _id: string;
  title: string;
  description: string;
  course_content: string; 
  teacherId: string;
}

export async function fetchCourses(): Promise<Course[]> {
  const response = await axios.get('/api/courses');
  return response.data;
}

export async function fetchCourse(courseId: string): Promise<Course> {
  const response = await axios.get(`/api/courses/${courseId}`);
  return response.data;
}

export async function createCourse(course: Partial<Course>): Promise<void> {
  await axios.post('/api/courses', course);
}

export async function editCourse(courseId: string, updatedCourse: Partial<Course>): Promise<void> {
  await axios.put(`/api/courses/${courseId}`, updatedCourse);
}

export async function getCourseDetails(courseId: string) {
  const response = await axios.get(`/api/courses/${courseId}`);
  return response.data;
}

export async function deleteCourse(courseId: string) {
  await axios.delete(`/api/courses/${courseId}`);
}