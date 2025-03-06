/* eslint-disable prettier/prettier */

import { TErrorSource, TGenericErrorReesponse } from '../interface/errors';

const handleDulicateError = (err: any): TGenericErrorReesponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: '',
      message: extractedMessage
        ? `${extractedMessage} already exists`
        : 'Duplicate entry found',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleDulicateError;
