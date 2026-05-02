import { api } from "../../../../api/axios";
import {
  photosResponseSchema,
  type PhotosResponseSchema,
} from "../../types/photosResponse.schema";

export const fetchPhotos = async (
  page: number,
  total: number,
  user: number | string,
) => {
  const response = await api.get<PhotosResponseSchema>(
    `/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
  );

  return photosResponseSchema.parse(response.data);
};
