import { getClientsAxios } from "@/api/fetchClients";
import { Clients } from "@/utils/clientsZodSchema";
import { QUERY_KEY_CLIENTS_DATA, queryClient } from "@/utils/queryDatas";
import { useQuery } from "@tanstack/react-query";

export const useClientsData = () => {
    // console.log("Функция запроса на сервер вызвалась")
    return useQuery<Clients>({
        queryKey: QUERY_KEY_CLIENTS_DATA,
        queryFn: getClientsAxios,
        staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
        // Опции запроса можно добавлять по необходимости:
        // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
        // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    }, queryClient);
};