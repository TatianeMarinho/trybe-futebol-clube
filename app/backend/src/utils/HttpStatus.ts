import { MessageErrorType, MessageSucessType } from '../types/ServiceResponseType';

export type HttpError = MessageErrorType | MessageSucessType;

const HTTP = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
};

const HttpStatus = (type: HttpError): number => HTTP[type];

export default HttpStatus;
