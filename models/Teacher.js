import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);