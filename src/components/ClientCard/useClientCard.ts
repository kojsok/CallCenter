import { getClientById } from "@/api/clientsApi";
import { QUERY_KEY_CLIENTS_DATA } from "@/api/queryDatas";
import { useDeleteClient } from "@/hooks/useDeleteClient";
import {
  selectActiveClientId,
  saveActiveClient,
  clearActiveClient,
} from "@/store/clientsSlices/clientsSlice";
import { setActiveComponent } from "@/store/clientsSlices/switcherSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useClientCard = () => {
  const activeClientId = useSelector(selectActiveClientId);
  const dispatch = useDispatch();

  //запрашиваем обработчик удаления из кастомного хука
  const { launchClientDeleting, isSuccessDel, queryClient } = useDeleteClient();

  //запрашиваем объект активного клиента
  const { data: clientData } = useQuery({
    queryKey: [...QUERY_KEY_CLIENTS_DATA, activeClientId],
    queryFn: () => getClientById(activeClientId),
    enabled: activeClientId.length > 0,
  });
  // кэшируем его в сторе
  useEffect(() => {
    if (clientData) {
      dispatch(saveActiveClient(clientData));
    }
  }, [dispatch, clientData]);

  //при успешно удалении удаляем кэш данного запроса, очищаем активного клиента в сторе. Очищение данных об активном клиенте назначит 3-ему блоку состояние empty-card(см. switcherSlice)
  useEffect(() => {
    if (isSuccessDel) {
      queryClient.removeQueries({
        queryKey: [...QUERY_KEY_CLIENTS_DATA, activeClientId],
      });
      dispatch(clearActiveClient());
    }
  }, [queryClient, activeClientId, dispatch, isSuccessDel]);

  //вызов формы редактирования при клике на кнопку редактирования. 3-му блоку назначается состояние "edit-form"
  const handleEdit = () => {
    dispatch(setActiveComponent("edit-form"));
  };
  //обработчик удаления
  const handleDelete = () => launchClientDeleting(activeClientId);

  return {
    handleDelete,
    handleEdit,
    clientData,
  };
};
