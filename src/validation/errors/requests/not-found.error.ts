export class NotFoundError extends Error {
  constructor(message: string = "Recurso não encontrado") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
