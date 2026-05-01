import z from "zod";

export const passwordResetFormSchema = z.object({
  password: z.string().min(1, "Preencha um valor."),
});

export type PasswordResetFormSchema = z.infer<typeof passwordResetFormSchema>;
