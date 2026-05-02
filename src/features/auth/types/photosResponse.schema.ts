import z from "zod";
import { commentsResponseSchema } from "./comment/commentResponse.schema";

export const photoResponseSchema = z.object({
  id: z.number(),
  author: z.string(),
  title: z.string(),
  date: z.string(),
  src: z.string(),
  peso: z.string(),
  idade: z.string(),
  acessos: z.number(),
});
export type PhotoResponseSchema = z.infer<typeof photoResponseSchema>;

export const photoAndCommentsResponseSchema = z.object({
  photo: photoResponseSchema,
  comments: commentsResponseSchema,
});
export type PhotoAndCommentsResponseSchema = z.infer<
  typeof photoAndCommentsResponseSchema
>;

export const photosResponseSchema = z.array(photoResponseSchema);
export type PhotosResponseSchema = z.infer<typeof photosResponseSchema>;
