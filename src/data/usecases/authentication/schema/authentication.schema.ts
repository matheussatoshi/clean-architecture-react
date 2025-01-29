import { z } from "zod";

export namespace AuthenticationValidation {
  type InferSchema = z.infer<typeof schema>;

  export const schema = z.object({
    email: z
      .string()
      .email("Não é uma email válido!")
      .min(1, "Este campo é obrigatório!"),
    password: z.string().min(6, "A mensagem precisa ter mais de 6 digitos!"),
  });

  export const values: InferSchema = {
    email: "",
    password: "",
  };
}
