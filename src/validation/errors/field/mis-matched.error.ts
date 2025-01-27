export class MismatchedFieldError extends Error {
  constructor(fieldName: string, matchingFieldName: string) {
    super(
      `O valor do campo "${fieldName}" não corresponde ao valor do campo "${matchingFieldName}".`,
    );
    this.name = "MismatchedFieldError";
  }
}
