import z from "zod/v3";

export const loginFormSchema = z.object({
  username: z.string().min(1, "Preencha um valor."),
  password: z.string().min(1, "Preencha um valor."),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
