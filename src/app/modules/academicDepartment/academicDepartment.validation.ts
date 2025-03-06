/* eslint-disable prettier/prettier */

import { z } from 'zod';

const createDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Name must be reqired',
    }),
    academicfaculty: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Faculty  must be reqired',
    }),
  }),
});
const updateDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be a string',
        required_error: 'Name must be reqired',
      })
      .optional(),
    academicfaculty: z
      .string({
        invalid_type_error: 'Academic Department must be a string',
        required_error: 'Faculty  must be reqired',
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createDepartmentValidationSchema,
  updateDepartmentValidation,
};
