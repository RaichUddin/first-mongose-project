/* eslint-disable prettier/prettier */
import express from 'express';
import validateRequest from '../../middlewares/validateRequested';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
router.get('/', OfferedCourseController.getAllOfferedCourses);

export const OfferedCourseRoute = router;
