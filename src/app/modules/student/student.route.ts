import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequested';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/get-students', studentController.getStudents);
router.get('/get-student/:id', studentController.getSingleStudents);
router.delete('/delete-student/:id', studentController.deleteStudent);
router.patch(
  '/update-student/:id',
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent,
);

export const studentRouter = router;
