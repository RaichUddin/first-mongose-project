import { Types } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TStudent = {
  password: string;
  id: string;
  user: Types.ObjectId;
  name: UserName;

  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage: string;
  isDeleted: boolean;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
};
