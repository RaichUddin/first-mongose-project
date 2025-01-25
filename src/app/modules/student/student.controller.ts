import { Request, Response } from 'express';
import { studentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = await studentService.createStudentIntoDb(student);

    res.status(200).json({
      SUCCESS: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getStudentsFromDb();

    res.status(200).json({
      SUCCESS: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await studentService.getSingleStudentsFromDb(studentId);

    res.status(200).json({
      SUCCESS: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const studentController = {
  createStudent,
  getStudents,
  getSingleStudents,
};
