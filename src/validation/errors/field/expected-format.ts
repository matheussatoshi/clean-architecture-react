export class ExpectedFormatFieldError extends Error {
  constructor(expectedFormat: string) {
    super(`Valor esperado: ${expectedFormat}`);
    this.name = "ExpectedFormatFieldError";
  }
}
