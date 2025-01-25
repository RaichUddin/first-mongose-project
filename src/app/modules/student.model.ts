import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  ocupasion: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOcupasion: { type: String, required: true },
  fatherContactNumber: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOcupasion: { type: String, required: true },
  motherContactNumber: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userSchema,
  email: { type: String, required: true },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  contactNumber: { type: String },
  emergencyContactNumber: { type: String },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: guardianSchema,

  localGuardian: localGuardianSchema,

  profileImage: { type: String },
  isActive: ['active', 'inactive'],
});

export const StudentModel = model<Student>('Student', studentSchema);
