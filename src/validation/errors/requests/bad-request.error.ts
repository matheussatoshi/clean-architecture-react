export class BadRequestError extends Error {
  constructor(message: string = "Ocorreu um erro ao buscar pelos dados") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
