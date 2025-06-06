/* eslint-disable prettier/prettier */

import {
  TAcademicCode,
  TAcademicName,
  TAcademicSemesterMapper,
  TMonths,
} from './academicsemister.interface';

export const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicName: TAcademicName[] = ['Autumn', 'Summer', 'Fall'];
export const semisterCode: TAcademicCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const AcademicSemesterSearchableFields = ['name', 'year'];
