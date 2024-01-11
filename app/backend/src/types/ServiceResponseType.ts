export type ServiceMessage = {
  message: string,
};

export type MessageErrorType = 'badRequest' | 'notFound' | 'internalServerError'
| 'unauthorized';

export type MessageSucessType = 'created' | 'ok' | 'noContent';

export type ServiceErrorResponse = {
  status: MessageErrorType,
  data: ServiceMessage,
};

export type ServiceSucessResponse<T> = {
  status: MessageSucessType,
  data: T
};

export type ServiceLoginSucess = {
  status: MessageSucessType,
  data: { token: string },
};

export type ServiceResponse<T> = ServiceErrorResponse
| ServiceSucessResponse<T> | ServiceLoginSucess;
