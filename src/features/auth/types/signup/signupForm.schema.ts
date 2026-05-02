import z from "zod";

export const signupFormSchema = z.object({
  email: z.string().email("Insira um email válido."),
  username: z
    .string()
    .min(1, "Preencha um valor.")
    .max(32, "Username muito grande."),
  password: z.string().min(1, "Preencha um valor."),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
