import { getEmployeesAxios } from "@/api/fetchEmploees";
import { Employees } from "@/utils/employeesZodSchema";
import { QUERY_KEY_EMPLOEES_DATA, queryClient } from "@/utils/queryDatas";
import { useQuery } from "@tanstack/react-query";

export const useEmploeesData = () => {
    // console.log("Функция запроса на сервер вызвалась")
    return useQuery<Employees>({
        queryKey: QUERY_KEY_EMPLOEES_DATA,
        queryFn: getEmployeesAxios,
        staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
        // Опции запроса можно добавлять по необходимости:
        // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
        // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    }, queryClient);
};