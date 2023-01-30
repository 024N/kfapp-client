import {Constant} from './Constant';

export class CustomError extends Error {
  public statusCode: number | undefined;
  public responseMessage: string | undefined;
  public methodName: string | undefined;
  constructor(message: string) {
    super(message);
  }
}

export class InvalidArgumentException extends CustomError {
  constructor(message: string, methodName: string) {
    super(message);
    this.methodName = methodName;
    this.statusCode = Constant.STATUS_BAD_REQUEST;
    this.responseMessage = 'invalidArgumentException';
  }
}

export class NotExistException extends CustomError {
  constructor(message: string, methodName: string) {
    super(message);
    this.methodName = methodName;
    this.statusCode = Constant.STATUS_NOT_FOUND;
    this.responseMessage = 'NotExistException';
  }
}

export class UnauthorizedException extends CustomError {
  public readonly statusCode: number = Constant.STATUS_FORBIDDEN;
  public readonly responseMessage: string = 'notAuthrorizedException';
  constructor(message: string, methodName: string) {
    super(message);
    this.methodName = methodName;
  }
}

export class WrongFormatException extends CustomError {
  public readonly statusCode: number = Constant.STATUS_BAD_REQUEST;
  public readonly responseMessage: string = 'WrongFormat';
  constructor(message: string, methodName: string) {
    super(message);
    this.methodName = methodName;
  }
}

export class LimitExceededException extends CustomError {
  public readonly statusCode: number = Constant.STATUS_LIMIT_EXCEDED;
  public readonly responseMessage: string = 'LIMITEXCEEDED';
  constructor(message: string, methodName: string) {
    super(message);
    this.methodName = methodName;
  }
}

export class InternalServerException extends CustomError {
  public readonly statusCode: number = Constant.STATUS_INTERNAL_SERVER_ERROR;
  public readonly responseMessage: string = 'InternalServerError';
  constructor(message: string, methodName: string) {
    super(message);
    this.methodName = methodName;
  }
}
