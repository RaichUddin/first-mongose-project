/* eslint-disable prettier/prettier */
export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorReesponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
