import z from "zod";

export const passwordLostFormSchema = z.object({
  login: z
    .string()
    .min(1, "Preencha um valor.")
    .max(32, "Username muito grande."),
});

export type PasswordLostFormSchema = z.infer<typeof passwordLostFormSchema>;
