import z from "zod";

const commentResponseSchema = z.object({
  comment_ID: z.string(),
  comment_author: z.string(),
  comment_content: z.string(),
});

export const commentsResponseSchema = z.array(commentResponseSchema);

export type CommentResponseSchema = z.infer<typeof commentResponseSchema>;
