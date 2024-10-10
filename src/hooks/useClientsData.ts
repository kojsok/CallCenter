import { getClientsAxios } from "@/api/clientsApi";
import { QUERY_KEY_CLIENTS_DATA, queryClient } from "@/api/queryDatas";
import { Clients } from "@/utils/schemasTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useClientsData = () => {
  // console.log("Функция запроса на сервер вызвалась")
  return useQuery<Clients>(
    {
      queryKey: QUERY_KEY_CLIENTS_DATA,
      queryFn: getClientsAxios,
      staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
      // Опции запроса можно добавлять по необходимости:
      // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
      // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
      // retry: 3,
      // onError: (error: Error) => {
      //     // Здесь вы можете добавить дополнительную логику обработки ошибок, если необходимо
      //     console.error('Error fetching clients:', error.message);
      //   },
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error)) {
          // Если это ошибка сети (например, нет интернета), можно повторить запрос
          if (!error.response) {
            console.error("Network error. Retrying...", failureCount);
            return failureCount < 3; // Разрешить до 3 повторных попыток
          }
          // Если сервер вернул 500-ю ошибку, можно тоже попробовать повторить
          if (error.response.status >= 500) {
            console.error(
              `Server error ${error.response.status}. Retrying...`,
              failureCount
            );
            return failureCount < 3; // Разрешить до 3 повторных попыток
          }
        }

        // Для всех остальных ошибок остановить попытки
        //console.error('Error fetching clients:', error.message);
        console.error(
          `Error fetching clients (attempt ${failureCount}):`,
          error.message
        );
        return false; // Остановить попытки для других типов ошибок
      },
    },
    queryClient
  );
};
