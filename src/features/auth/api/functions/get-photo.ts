import { api } from "../../../../api/axios";
import {
  photoAndCommentsResponseSchema,
  type PhotoAndCommentsResponseSchema,
} from "../../types/photosResponse.schema";

export const fetchPhoto = async (id: number) => {
  const response = await api.get<PhotoAndCommentsResponseSchema>(
    `/api/photo/${id}`,
  );

  const data = photoAndCommentsResponseSchema.parse(response.data);

  return data;
};
