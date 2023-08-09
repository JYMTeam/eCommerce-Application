export interface IErrorResponse {
  statusCode: string;
  message: string;
  errors: Array<IError>;
}

export interface IError {
  code: string;
  message: string;
}
