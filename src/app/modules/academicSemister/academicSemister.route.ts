/* eslint-disable prettier/prettier */

import express from 'express';
import { academicSemisterController } from './academicSemister.controller';
import validateRequest from '../../middlewares/validateRequested';
import { academicSemisterValidations } from './academicValidation';

const router = express.Router();

router.post(
  '/create-academic-semister',
  validateRequest(academicSemisterValidations.academicSemisterValidationSchema),
  academicSemisterController.createAcademicSemister,
);
router.get(
  '/all-academic-semester',
  academicSemisterController.getAllAcademicSemester,
);

// router.get('/get-students', studentController.getStudents);
// router.get('/get-student/:id', studentController.getSingleStudents);

export const academicSemisterRouter = router;
