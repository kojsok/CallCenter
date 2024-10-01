import { Employees, employeesSchema } from "@/utils/employeesZodSchema";
import axios from "axios";
import { z } from "zod";


const API_TOKEN = "your_secure_access_token_here";

const options = {
    headers: {
    //   'x-access-token': API_TOKEN, // Замените на ваш ключ API { Authorization: `Bearer ${token}` }
    Authorization: `Bearer ${API_TOKEN}`
    },
  };

  export const getEmployeesAxios = async (): Promise<Employees> => {
    try {
        const response = await axios.get('http://kojs.ru:4000/employees', options);
        // Валидируем массив данных с помощью Zod
        return employeesSchema.parse(response.data);;
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