/* eslint-disable prettier/prettier */

import catchAsync from '../../utilits/catchAsync';

import { FacultyServices } from './faculty.services';

const createFaculty = catchAsync(async (req, res) => {
  const facultyData = req.body;
  const result = await FacultyServices.createFacultyInDB(facultyData);

  res.status(201).json({
    SUCCESS: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  res.status(200).json({
    SUCCESS: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);
  res.status(200).json({
    SUCCESS: true,
    message: 'Faculty are retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  res.status(200).json({
    SUCCESS: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  res.status(200).json({
    SUCCESS: true,
    message: 'Faculty is Deleted succesfully',
    data: result,
  });
});

export const FacultyControllers = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
