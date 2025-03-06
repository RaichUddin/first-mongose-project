/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { academicName, months, semisterCode } from './academic.constant';

const academicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicName] as [string, ...string[]]),
    code: z.enum([...semisterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endtMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});

export const academicSemisterValidations = {
  academicSemisterValidationSchema,
};
