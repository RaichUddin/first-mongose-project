import { studentService } from './student.service';
import catchAsync from '../../utilits/catchAsync';

const getSingleStudents = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudentsFromDb(id);

  res.status(200).json({
    SUCCESS: true,
    message: 'Students fetched successfully',
    data: result,
  });
});
const getStudents = catchAsync(async (req, res) => {
  const result = await studentService.getStudentsFromDb(req.query);

  res.status(200).json({
    SUCCESS: true,
    message: 'Students fetched successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.deleteStudentsFromDb(id);

  res.status(200).json({
    SUCCESS: true,
    message: 'Deleted student successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const students = req.body;

  const result = await studentService.updateStudentsFromDb(id, students);

  res.status(200).json({
    SUCCESS: true,
    message: 'Updated student successfully',
    data: result,
  });
});
export const studentController = {
  getStudents,
  getSingleStudents,
  deleteStudent,
  updateStudent,
};
