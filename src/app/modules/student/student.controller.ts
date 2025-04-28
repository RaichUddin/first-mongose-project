import { studentService } from './student.service';
import catchAsync from '../../utilits/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utilits/sendResponse';

const getSingleStudents = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudentsFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student retrivied succesfully',

    data: result,
  });
});
const getStudents = catchAsync(async (req, res) => {
  const result = await studentService.getStudentsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students retrivied succesfully',
    // meta: result.meta,
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
