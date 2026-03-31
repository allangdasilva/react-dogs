import z from "zod/v3";

export const signupResponseSchema = z.number();

export type SignupResponseSchema = z.infer<typeof signupResponseSchema>;
