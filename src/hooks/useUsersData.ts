import { getUsersAxios } from "@/api/fetchUsers";
import { QUERY_KEY_USERS, queryClient } from "@/utils/queryDatas";
import { Users } from "@/utils/usersZodSchema";
import { useQuery } from "@tanstack/react-query";

export const useUsersData = () => {
    // console.log("Функция запроса на сервер вызвалась")
    return useQuery<Users>({
        queryKey: QUERY_KEY_USERS,
        queryFn: getUsersAxios,
        staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
        // Опции запроса можно добавлять по необходимости:
        // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
        // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    }, queryClient);
};