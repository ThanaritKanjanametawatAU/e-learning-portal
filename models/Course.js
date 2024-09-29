import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacherName: { type: String, required: true },
  course_content: { type: String, required: true } // New field for course content
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);