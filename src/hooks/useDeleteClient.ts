import { deleteClient } from "@/api/clientsApi";
import { QUERY_KEY_CLIENTS_DATA } from "@/api/queryDatas";
import {
  clearActiveClient,
  selectFilters,
} from "@/store/clientsSlices/clientsSlice";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

export const useDeleteClient = () => {
  // забираем фильтры из стора (для инвалидации списка клиентов)
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  //мутация удаления клиента
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: (_, clientId) => {
      queryClient.removeQueries({
        queryKey: [...QUERY_KEY_CLIENTS_DATA, clientId],
      });
      dispatch(clearActiveClient());
      // при успешно удалении ревалидируем список клиентов по активным фильтрам
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY_CLIENTS_DATA, filters],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const launchClientDeleting = (id: string) => {
    mutation.mutate(id);
  };
  return {
    launchClientDeleting,
    isPendingDel: mutation.isPending,
    isSuccessDel: mutation.isSuccess,
    filters,
    queryClient,
  };
};
