export class DuplicateValueError extends Error {
  constructor(fieldName: string) {
    super(`O valor do campo "${fieldName}" já foi utilizado.`);
    this.name = "DuplicateValueError";
  }
}
