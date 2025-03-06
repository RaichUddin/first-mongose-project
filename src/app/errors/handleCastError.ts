/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorReesponse } from '../interface/errors';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorReesponse => {
  const errorSources: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default handleCastError;
