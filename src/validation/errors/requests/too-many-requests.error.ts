export class TooManyRequestsError extends Error {
  constructor(message: string = "Número excessivo de requisições") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
