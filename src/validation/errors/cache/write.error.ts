export class CacheWriteError extends Error {
  constructor(key: string, message: string = "Erro ao escrever no cache") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.message = `${message}: ${key}`;
    this.name = "CacheWriteError";
  }
}
