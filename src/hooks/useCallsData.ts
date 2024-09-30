import { getCallsAxios } from "@/api/fetchCalls";
import { CallRecords } from "@/utils/callsZodSchema";
import { QUERY_KEY_CALLS_DATA, queryClient } from "@/utils/queryDatas";
import { useQuery } from "@tanstack/react-query";

export const useClientsData = () => {
    // console.log("Функция запроса на сервер вызвалась")
    return useQuery<CallRecords>({
        queryKey: QUERY_KEY_CALLS_DATA,
        queryFn: getCallsAxios,
        staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
        // Опции запроса можно добавлять по необходимости:
        // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
        // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    }, queryClient);
};