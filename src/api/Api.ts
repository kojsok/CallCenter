import axios from "axios";
import { z } from "zod";

export const API_TOKEN = "2078289c-73e5-4137-8ceb-96445633512c";

//инициализация инстанса axios с общими для всех запросов настройками.
export const Api = axios.create({
  baseURL: "http://localhost:4000",
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

// универсальный обработчик ошибок можно использовать во всех запросах
export const handleError = (error: Error) => {
  if (axios.isAxiosError(error)) {
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
  }
  const unexpectedError =
    "Unexpected error occurred (Произошла непредвиденная ошибка)";
  console.error(unexpectedError); // Вывод ошибки в консоль
  throw new Error(unexpectedError);
};
