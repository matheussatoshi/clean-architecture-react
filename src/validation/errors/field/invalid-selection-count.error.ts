export class InvalidSelectionCountError extends Error {
  constructor(fieldName: string, min: number, max: number) {
    super(
      `O campo "${fieldName}" deve ter entre ${min} e ${max} opções selecionadas.`,
    );
    this.name = "InvalidSelectionCountError";
  }
}
