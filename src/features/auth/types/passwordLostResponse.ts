import z from "zod";

export const passwordLostResponseSchema = z.string();

export type PasswordLostResponseSchema = z.infer<
  typeof passwordLostResponseSchema
>;
