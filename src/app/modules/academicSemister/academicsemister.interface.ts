/* eslint-disable prettier/prettier */

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicName = 'Autumn' | 'Spring' | 'Summer';
export type TAcademicCode = '01' | '02' | '03';

export type TAcademicSemister = {
  name: TAcademicName;
  code: TAcademicCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSemesterMapper = {
  [key: string]: string;
};
