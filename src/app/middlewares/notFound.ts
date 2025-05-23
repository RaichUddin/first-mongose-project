/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const getNotFound = (
  req: Request,
  res: Response,

  next: NextFunction,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    error: '',
  });
};

export default getNotFound;
