import { IClients } from "@/services/IClients";
import axios from "axios";
import { API_TOKEN } from "./apitoken";

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`, // Подставляем токен авторизации
  },
};

export const postClientsToServer = async (data: IClients): Promise<IClients | null> => {
  try {
    const response = await axios.post<IClients>('http://kojs.ru:4000/clients', data, options);
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    return null; // Возвращаем null в случае ошибки
  }
};