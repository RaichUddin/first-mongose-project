/* eslint-disable prettier/prettier */

import express from 'express';

import validateRequest from '../../middlewares/validateRequested';
import { academicFacultyValidation } from './academicFaculty.validat';
import { academicFacultyController } from './academicFaculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(academicFacultyValidation.createFacultyValidatinSchema),
  academicFacultyController.createAcademicFaculty,
);

router.get('/', academicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidation.updateFacultyValidatinSchema),
  academicFacultyController.updatedAcademicFaculty,
);

export const academicFacultyRouter = router;
