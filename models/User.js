import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);