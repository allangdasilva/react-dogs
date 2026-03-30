import z from "zod/v3";

export const signupFormSchema = z.object({
  email: z.string().email("Insira um email válido."),
  username: z.string().min(1, "Preencha um valor."),
  password: z.string().min(1, "Preencha um valor."),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
