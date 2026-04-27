import z from "zod/v3";
import { commentsResponseSchema } from "./commentResponse";

export const photoSchema = z.object({
  id: z.number(),
  author: z.string(),
  title: z.string(),
  date: z.string(),
  src: z.string(),
  peso: z.string(),
  idade: z.string(),
  acessos: z.number(),
});
export type PhotoSchema = z.infer<typeof photoSchema>;

export const photoAndCommentsSchema = z.object({
  photo: photoSchema,
  comments: commentsResponseSchema,
});
export type PhotoAndCommentsSchema = z.infer<typeof photoAndCommentsSchema>;

export const photosSchema = z.array(photoSchema);
export type PhotosSchema = z.infer<typeof photosSchema>;
