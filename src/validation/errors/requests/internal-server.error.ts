export class InternalServerError extends Error {
  constructor(message: string = "Ocorreu um erro no servidor") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
