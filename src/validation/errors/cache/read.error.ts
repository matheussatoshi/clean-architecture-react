export class CacheReadError extends Error {
  constructor(key: string, message: string = "Erro ao ler do cache") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.message = `${message}: ${key}`;
    this.name = "CacheReadError";
  }
}
