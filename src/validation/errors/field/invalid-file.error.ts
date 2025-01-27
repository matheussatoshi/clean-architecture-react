export class InvalidFileError extends Error {
  constructor(fieldName: string, allowedExtensions: string[]) {
    super(
      `O campo "${fieldName}" aceita apenas arquivos com as extensões: ${allowedExtensions.join(
        ", ",
      )}.`,
    );
    this.name = "InvalidFileError";
  }
}
