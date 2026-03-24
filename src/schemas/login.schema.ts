import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Preencha um valor.")
    .email("Formato de email inválido."),
  password: z.string().min(1, "Preencha um valor."),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
