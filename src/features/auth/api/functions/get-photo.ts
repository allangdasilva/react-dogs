import { api } from "../../../../api/axios";
import {
  commentsResponseSchema,
  type CommentResponseSchema,
} from "../../types/commentResponse";
import type { PhotoSchema } from "../../types/photos.schema";

export const fetchPhoto = async (id: number) => {
  const response = await api.get<{
    photo: PhotoSchema;
    comments: CommentResponseSchema[];
  }>(`/api/photo/${id}`);

  const comments = commentsResponseSchema.parse(response.data.comments);

  return comments;
};
