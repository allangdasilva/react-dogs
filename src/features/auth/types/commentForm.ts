import z from "zod";

export const commentFormSchema = z.object({
  comment: z.string().min(1),
});

export type CommentFormSchema = z.infer<typeof commentFormSchema>;
