/* eslint-disable prettier/prettier */

import express from 'express';

import validateRequest from '../../middlewares/validateRequested';
import { academicDepartmentValidations } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidations.createDepartmentValidationSchema,
  // ),
  academicDepartmentController.createAcademicDepartment,
);

router.get('/', academicDepartmentController.getAllAcademicDepartment);
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(academicDepartmentValidations.updateDepartmentValidation),
  academicDepartmentController.updatedAcademicDepartment,
);

export const academicDepartentRouter = router;
