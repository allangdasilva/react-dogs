import z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  id: z.number(),
  nome: z.string(),
  username: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
