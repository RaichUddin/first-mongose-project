/* eslint-disable prettier/prettier */

import { z } from 'zod';

const createFacultyValidatinSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic Faculty must be a string' }),
  }),
});
const updateFacultyValidatinSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: ' Update Academic Faculty must be a string',
    }),
  }),
});

export const academicFacultyValidation = {
  createFacultyValidatinSchema,
  updateFacultyValidatinSchema,
};
