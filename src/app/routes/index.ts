/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';
import { studentRouter } from '../modules/student/student.route';
import { academicSemisterRouter } from '../modules/academicSemister/academicSemister.route';
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { CourseRoutes } from '../modules/course/course.route';
import { semesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoute } from '../modules/OfferedCourse/OfferedCourse.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route';

const router = Router();

const mduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/academics',
    route: academicSemisterRouter,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: academicDepartentRouter,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoute,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRoute,
  },
  {
    path: '/enrolled-course',
    route: EnrolledCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

mduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
