import z from "zod";

export const signupResponseSchema = z.number();

export type SignupResponseSchema = z.infer<typeof signupResponseSchema>;
