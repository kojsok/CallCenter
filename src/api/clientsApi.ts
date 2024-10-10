import {
  AddClientFormData,
  ClientReceivingData,
  Clients,
  clientSchema,
  clientsSchema,
} from "@/utils/clientsZodSchema";

import { Api, handleError } from "./Api";
import { FilterQueryParams } from "@/utils/commonTypes";

//аргумент params добавляется к запросу фильтрации
//get запрос всех клиентов
export const getClientsAxios = async (
  params: FilterQueryParams = {}
): Promise<Clients> => {
  try {
    const response = await Api.get("/clients", { params });
    // Валидируем массив данных с помощью Zod
    return clientsSchema.parse(response.data);
  } catch (error) {
    return handleError(error as Error);
  }
};

//get запрос одного клиента
export const getClientById = async (
  id: string
): Promise<ClientReceivingData> => {
  try {
    const response = await Api.get(`/clients/${id}`);
    return clientSchema.parse(response.data);
  } catch (error) {
    return handleError(error as Error);
  }
};

//post запрос добавления клиента
export const postClientsToServer = async (
  data: AddClientFormData
): Promise<ClientReceivingData> => {
  console.log("postclient");
  try {
    const response = await Api.post<ClientReceivingData>("/clients", data);
    return response.data;
  } catch (error) {
    return handleError(error as Error);
  }
};

//patch запрос обновление клиента
export const updateClient = async (
  data: Partial<AddClientFormData>,
  id: string
): Promise<ClientReceivingData> => {
  try {
    const response = await Api.patch<ClientReceivingData>(
      `/clients/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    return handleError(error as Error);
  }
};

//delete запрос на сервер
export const deleteClient = async (id: string): Promise<void> => {
  try {
    await Api.delete<string>(`/clients/${id}`);
  } catch (error) {
    handleError(error as Error);
  }
};
