import { api } from "../../../../api/axios";
import {
  userResponseSchema,
  type UserResponseSchema,
} from "../../types/userResponse.schema";

export const fetchCurrentUser = async (): Promise<UserResponseSchema> => {
  const response = await api.get<UserResponseSchema>("/api/user");

  return userResponseSchema.parse(response.data);
};
