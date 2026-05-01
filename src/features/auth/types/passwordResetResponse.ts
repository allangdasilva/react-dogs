import z from "zod";

export const passwordResetResponseSchema = z.string();

export type PasswordResetResponseSchema = z.infer<
  typeof passwordResetResponseSchema
>;
