export class NoScopeError extends Error {
  constructor(hookName: string, providerName: string) {
    super(`${hookName} must be used within a ${providerName}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
