/* eslint-disable prettier/prettier */
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorReesponse } from '../interface/errors';

const handleZodError = (err: ZodError): TGenericErrorReesponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default handleZodError;
