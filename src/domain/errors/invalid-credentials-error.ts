export class InvalidCredentialsError extends Error {
  constructor() {
    super("Credênciais Inválidas");
    this.name = "InvalidCredentialsError";
  }
}
