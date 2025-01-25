import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

router.post('/create-student', studentController.createStudent);
router.get('/get-students', studentController.getStudents);
router.get('/get-student/:id', studentController.getSingleStudents);

export const studentRouter = router;
