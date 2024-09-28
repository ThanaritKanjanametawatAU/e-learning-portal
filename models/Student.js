import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrolledCourses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 },
    enrollmentDate: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);