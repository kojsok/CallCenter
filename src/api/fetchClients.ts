
import { Clients, clientsSchema } from "@/utils/clientsZodSchema";
import axios from "axios";
import { z } from "zod";
import { API_TOKEN } from "./apitoken";

const options = {
    headers: {
    //   'x-access-token': API_TOKEN, // Замените на ваш ключ API { Authorization: `Bearer ${token}` }
    Authorization: `Bearer ${API_TOKEN}`
    },
  };

export const getClientsAxios = async (): Promise<Clients> => {
    try {
        const response = await axios.get('http://kojs.ru:4000/clients', options);
        // Валидируем массив данных с помощью Zod
        return clientsSchema.parse(response.data);;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.response?.data}`);
        } else if (error instanceof z.ZodError) {
            throw new Error(`Zod validation error: ${error.errors}`);
        } else {
            throw new Error('Unexpected error occurred (Произошла непредвиденная ошибка)');
        }
    }
};