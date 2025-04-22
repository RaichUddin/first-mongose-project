/* eslint-disable prettier/prettier */

import express from 'express';
import { academicSemisterController } from './academicSemister.controller';
import validateRequest from '../../middlewares/validateRequested';
import { academicSemisterValidations } from './academicValidation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semister',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(academicSemisterValidations.academicSemisterValidationSchema),
  academicSemisterController.createAcademicSemister,
);
router.get(
  '/all-academic-semester',
  academicSemisterController.getAllAcademicSemester,
);

router.get(
  '/:courseId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicSemisterController.getSingleAcademicSemester,
);

router.patch(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemisterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemisterController.updateAcademicSemester,
);

export const academicSemisterRouter = router;
