import z from "zod";

export const signupFormSchema = z.object({
  user: z.string().min(1, "Preencha um valor."),
  email: z
    .string()
    .min(1, "Preencha um valor.")
    .email("Formato de email inválido."),
  password: z.string().min(1, "Preencha um valor."),
});

export type SignupFormData = z.infer<typeof signupFormSchema>;
