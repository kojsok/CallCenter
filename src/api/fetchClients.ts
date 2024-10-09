import { Clients, clientsSchema } from "@/utils/clientsZodSchema";
import { z } from "zod";

import { Api, isAxiosError } from "./Api";

export const getClientsAxios = async (): Promise<Clients> => {
  try {
    const response = await Api.get("/clients");
    // Валидируем массив данных с помощью Zod
    return clientsSchema.parse(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = `Axios error: ${error.message} - ${
        error.response?.data
      } - ${error.response?.status} - ${
        error.response?.statusText
      } - ${JSON.stringify(error.response?.headers)}`;
      console.error(errorMessage); // Вывод ошибки в консоль
      throw new Error(errorMessage);
    } else if (error instanceof z.ZodError) {
      const zodErrorMessage = `Zod validation error: ${error.errors
        .map((e) => e.message)
        .join(", ")}`;
      console.error(zodErrorMessage); // Вывод ошибки в консоль
      throw new Error(zodErrorMessage);
    } else {
      const unexpectedError =
        "Unexpected error occurred (Произошла непредвиденная ошибка)";
      console.error(unexpectedError); // Вывод ошибки в консоль
      throw new Error(unexpectedError);
    }
  }
};
