import { LoginResponse, LoginSchema, Profile } from "@/utils/schemasTypes";
import { Api, handleError } from "./Api";
import { loginResponseSchema, profileSchema } from "@/utils/authZodSchemas";

//получение профиля
export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await Api.get("/auth/profile");
    return profileSchema.parse(response.data);
  } catch (error) {
    return handleError(error as Error);
  }
};

//логин
export const login = async (authData: LoginSchema): Promise<LoginResponse> => {
  try {
    const response = await Api.post("/auth/login", authData);
    console.log("response authApi", response);
    return loginResponseSchema.parse(response);
  } catch (error) {
    return handleError(error as Error);
  }
};

//logout
export const logout = async (): Promise<void> => {
  try {
    await Api.post("/auth/logout");
  } catch (error) {
    handleError(error as Error);
  }
};
