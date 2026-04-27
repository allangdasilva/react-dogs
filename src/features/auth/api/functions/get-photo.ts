import { api } from "../../../../api/axios";
import {
  photoAndCommentsSchema,
  type PhotoAndCommentsSchema,
} from "../../types/photos.schema";

export const fetchPhoto = async (id: number) => {
  const response = await api.get<PhotoAndCommentsSchema>(`/api/photo/${id}`);

  const data = photoAndCommentsSchema.parse(response.data);

  return data;
};
