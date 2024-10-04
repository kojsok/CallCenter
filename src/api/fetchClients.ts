
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
    } 
    // catch (error) {
    //     if (axios.isAxiosError(error)) {
    //         throw new Error(`Axios error: ${error.message} - ${error.response?.data} - ${error.response?.status} - ${error.response?.statusText} - ${error.response?.headers}`);
    //     } else if (error instanceof z.ZodError) {
    //         throw new Error(`Zod validation error: ${error.errors} - ${error.errors.map(e => e.message).join(', ')}`);
    //     } else {
    //         throw new Error('Unexpected error occurred (Произошла непредвиденная ошибка)');
    //     }
    // }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = `Axios error: ${error.message} - ${error.response?.data} - ${error.response?.status} - ${error.response?.statusText} - ${JSON.stringify(error.response?.headers)}`;
            console.error(errorMessage); // Вывод ошибки в консоль
            throw new Error(errorMessage);
        } else if (error instanceof z.ZodError) {
            const zodErrorMessage = `Zod validation error: ${error.errors.map(e => e.message).join(', ')}`;
            console.error(zodErrorMessage); // Вывод ошибки в консоль
            throw new Error(zodErrorMessage);
        } else {
            const unexpectedError = 'Unexpected error occurred (Произошла непредвиденная ошибка)';
            console.error(unexpectedError); // Вывод ошибки в консоль
            throw new Error(unexpectedError);
        }
    }
};