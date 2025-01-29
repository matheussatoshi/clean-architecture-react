export class CacheClearError extends Error {
  constructor(message: string = "Erro ao limpar o cache") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.name = "CacheClearError";
  }
}
