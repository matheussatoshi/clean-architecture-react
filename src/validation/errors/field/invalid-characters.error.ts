export class InvalidCharactersError extends Error {
  constructor(fieldName: string, invalidChars: string[]) {
    super(
      `O campo "${fieldName}" contém caracteres inválidos: ${invalidChars.join(
        ", ",
      )}.`,
    );
    this.name = "InvalidCharactersError";
  }
}
