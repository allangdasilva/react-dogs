import z from "zod/v3";

export const loginResponseSchema = z.object({
  token: z.string(),
  user_display_name: z.string(),
  user_email: z.string().email(),
  user_nicename: z.string(),
});

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
