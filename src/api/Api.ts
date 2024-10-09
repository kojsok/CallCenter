import axios from "axios";

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
// обертка для статической функции axios isAxiosError для удобства использования
export const isAxiosError = (error: unknown) => axios.isAxiosError(error);
