import { api } from "../../../../api/axios";
import { photosSchema, type PhotosSchema } from "../../types/photos.schema";

export const fetchPhotos = async (
  page: number,
  total: number,
  user: number,
) => {
  const response = await api.get<PhotosSchema>(
    `/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
  );

  return photosSchema.parse(response.data);
};
