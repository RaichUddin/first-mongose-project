import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequested';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/get-students',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  studentController.getStudents,
);
router.get(
  '/get-student/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  studentController.getSingleStudents,
);
router.delete(
  '/delete-student/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  studentController.deleteStudent,
);
router.patch(
  '/update-student/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent,
);

export const studentRouter = router;
