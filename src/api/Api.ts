import { StoreType } from "@/store/store";
import axios from "axios";
import { z } from "zod";
//делаем инъекцию стора чтобы получать токен авторизации прямо из стора подробнее https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
let store: StoreType;

export const injectStore = (_store: StoreType) => {
  store = _store;
};

// export const API_TOKEN = "2078289c-73e5-4137-8ceb-96445633512c";

//инициализация инстанса axios с общими для всех запросов настройками.
export const Api = axios.create({
  baseURL: "http://localhost:4000",
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
    // Authorization: `Bearer ${API_TOKEN}`,
  },
});

// добавляем интерсептор для динамического установелния токена авторизации при запросе. сам токен будем получать из стора благодаря инъекции хранилища

Api.interceptors.request.use(
  (request) => {
    if (!request.url) {
      return Promise.reject(new Error("Request URL is undefined"));
    }
    if (request.url !== "/auth/login") {
      //получаем токен из стора
      const token = store.getState().auth.token;
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      } else {
        return Promise.reject(
          new Error("Unauthorized. Please login or singnup")
        );
      }
    }
    return request;
  },
  (error) => Promise.reject(error)
);

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
  // const unexpectedError = `Unexpected error occurred (Произошла непредвиденная ошибка): ${error}`;
  // console.error(unexpectedError); // Вывод ошибки в консоль
  console.log(error);
  throw error;
};
