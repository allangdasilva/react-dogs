import z from "zod";

export const userResponseSchema = z.object({
  email: z.string().email(),
  id: z.number(),
  nome: z.string(),
  username: z.string(),
});

export type UserResponseSchema = z.infer<typeof userResponseSchema>;
