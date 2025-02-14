import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getStudentsFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentsFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentService = {
  createStudentIntoDb,
  getStudentsFromDb,
  getSingleStudentsFromDb,
};
