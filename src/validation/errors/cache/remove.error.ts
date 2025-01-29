export class CacheRemoveError extends Error {
  constructor(key: string, message: string = "Erro ao remover do cache") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.message = `${message}: ${key}`;
    this.name = "CacheRemoveError";
  }
}
