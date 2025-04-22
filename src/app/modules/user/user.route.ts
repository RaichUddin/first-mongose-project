/* eslint-disable prettier/prettier */
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

import { studentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequested';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { AdminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import { userValidation } from './user.validation';
import { upload } from '../../utilits/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);
router.get(
  '/me',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserController.getMe,
);

export const userRouter = router;
