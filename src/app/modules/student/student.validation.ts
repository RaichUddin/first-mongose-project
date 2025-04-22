/* eslint-disable prettier/prettier */

import { z } from 'zod';

// Schema for userName
const userNameSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

// Schema for localGuardian
const localGuardianSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  Occupation: z.string().optional(),
  contactNumber: z.string(),

  address: z.string().min(1, { message: 'Address is required' }),
});

// Schema for guardian
const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z.string().optional(),

  fatherContactNumber: z
    .string()

    .min(1, { message: 'Father contact number is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOccupation: z.string().optional(),

  motherContactNumber: z.string(),
});

// Schema for student
export const studentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      id: z.string(),
      name: userNameSchema,
      email: z.string().email({ message: 'Invalid email address' }),
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender must be male, female, or other' }),
      }),
      dateOfBirth: z.string().optional(),
      contactNumber: z.string(),

      emergencyContactNumber: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,

      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});
const updateUserNameSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last name is required' }),
  })
  .partial(); // Makes all fields optional

// Schema for localGuardian (All fields optional)
const updateLocalGuardianSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    occupation: z.string().min(1, { message: 'Occupation is required' }),
    contactNumber: z.string().min(1, { message: 'Contact number is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
  })
  .partial(); // Makes all fields optional

// Schema for guardian (All fields optional)
const updateGuardianSchema = z
  .object({
    fatherName: z.string().min(1, { message: 'Father name is required' }),
    fatherOccupation: z
      .string()
      .min(1, { message: 'Father occupation is required' }),
    fatherContactNumber: z
      .string()
      .min(1, { message: 'Father contact number is required' }),
    motherName: z.string().min(1, { message: 'Mother name is required' }),
    motherOccupation: z
      .string()
      .min(1, { message: 'Mother occupation is required' }),
    motherContactNumber: z
      .string()
      .min(1, { message: 'Mother contact number is required' }),
  })
  .partial(); // Makes all fields optional

// Schema for updating student information (All fields optional)
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        id: z.string().min(1, { message: 'Student ID is required' }),
        name: updateUserNameSchema,
        email: z
          .string()
          .email({ message: 'Invalid email address' })
          .optional(),
        gender: z
          .enum(['male', 'female', 'other'], {
            errorMap: () => ({
              message: 'Gender must be male, female, or other',
            }),
          })
          .optional(),
        dateOfBirth: z.string().optional(),
        contactNumber: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateGuardianSchema,
        localGuardian: updateLocalGuardianSchema,
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .partial(), // Makes all fields optional
  }),
});

export const Validations = {
  studentValidationSchema,
  updateStudentValidationSchema,
};
