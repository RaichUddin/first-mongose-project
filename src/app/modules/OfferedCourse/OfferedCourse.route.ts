/* eslint-disable prettier/prettier */
import express from 'express';
import validateRequest from '../../middlewares/validateRequested';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);
router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  OfferedCourseController.getMyOfferedCourses,
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
  ),
  OfferedCourseController.getSingleOfferedCourses,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  OfferedCourseController.getAllOfferedCourses,
);

export const OfferedCourseRoute = router;
