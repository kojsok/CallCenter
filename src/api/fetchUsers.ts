import { Users, usersSchema } from "@/utils/usersZodSchema";
import axios from "axios";

export const getUsersAxios = async (): Promise<Users> => {
    const response = await axios.get('http://kojs.ru:4000/users');
        // Валидируем массив данных с помощью Zod
    return usersSchema.parse(response.data);
  };