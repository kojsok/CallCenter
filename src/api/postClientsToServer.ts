import {
  AddClientFormData,
  ClientReceivingData,
} from "@/utils/clientsZodSchema";
import { Api } from "./Api";

//post запрос добавления клиента
export const postClientsToServer = async (
  data: AddClientFormData
): Promise<ClientReceivingData | null> => {
  console.log("postclient");
  try {
    const response = await Api.post<ClientReceivingData>("/clients", data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    return null; // Возвращаем null в случае ошибки
  }
};

//patch запрос обновление клиента
export const updateClient = async (
  data: Partial<AddClientFormData>,
  id: string
): Promise<ClientReceivingData | null> => {
  try {
    const response = await Api.patch<ClientReceivingData>(
      `/clients/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    return null;
  }
};
