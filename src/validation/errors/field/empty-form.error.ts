export class EmptyFormError extends Error {
  constructor() {
    super("O formulário está vazio. Preencha ao menos um campo.");
    this.name = "EmptyFormError";
  }
}
