
import { Clients, clientsSchema } from "@/utils/clientsZodSchema";
import axios from "axios";

export const getClientsAxios = async (): Promise<Clients> => {
    const response = await axios.get('http://kojs.ru:4000/clients');
        // Валидируем массив данных с помощью Zod
    return clientsSchema.parse(response.data);
  };