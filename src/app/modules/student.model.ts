import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from './student/student.interface';

const userSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNumber: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNumber: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>({
  password: { type: String },
  id: { type: String, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  name: userSchema,
  email: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: { type: String },
  contactNumber: { type: String },
  emergencyContactNumber: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: guardianSchema,

  localGuardian: localGuardianSchema,

  profileImage: { type: String },
  isDeleted: { type: Boolean, default: false },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
});

export const StudentModel = model<TStudent>('Student', studentSchema);
