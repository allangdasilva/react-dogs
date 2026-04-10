import { api } from "../../../../api/axios";
import { userSchema, type UserSchema } from "../../types/user.schema";

export const fetchCurrentUser = async (): Promise<UserSchema> => {
  const response = await api.get<UserSchema>("/api/user");

  return userSchema.parse(response.data);
};
