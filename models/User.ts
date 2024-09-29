import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  teacherId?: mongoose.Types.ObjectId;
  studentId?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);