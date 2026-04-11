import z from "zod/v3";

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

export const photosSchema = z.array(photoSchema);
export type PhotosSchema = z.infer<typeof photosSchema>;
