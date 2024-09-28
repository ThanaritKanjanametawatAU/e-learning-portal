import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);