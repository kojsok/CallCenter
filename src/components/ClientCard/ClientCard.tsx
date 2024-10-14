import { getClientById } from "@/api/clientsApi";
import { clearActiveClient, saveActiveClient, selectActiveClientId } from "@/store/clientsSlices/clientsSlice";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setActiveComponent } from "@/store/clientsSlices/switcherSlice";
import { useDeleteClient } from "@/hooks/useDeleteClient";
import { QUERY_KEY_CLIENTS_DATA } from "@/api/queryDatas";

const ClientCard = () => {
  const activeClientId = useSelector(selectActiveClientId)
  const dispatch = useDispatch()

  //запрашиваем обработчик удаления из кастомного хука
  const { launchClientDeleting, isPendingDel, isSuccessDel, queryClient } = useDeleteClient()

  //запрашиваем объект активного клиента
  const { data: clientData } = useQuery({
    queryKey: [...QUERY_KEY_CLIENTS_DATA, activeClientId],
    queryFn: () => getClientById(activeClientId),
    enabled: activeClientId.length > 0
  })
  // кэшируем его в сторе
  useEffect(() => {
    if (clientData) {
      dispatch(saveActiveClient(clientData))
    }
  }, [dispatch, clientData])

  //при успешно удалении удаляем кэш данного запроса, очищаем активного клиента в сторе. Очищение данных об активном клиенте назначит 3-ему блоку состояние empty-card(см. switcherSlice)
  useEffect(() => {
    if (isSuccessDel) {
      queryClient.removeQueries({ queryKey: [...QUERY_KEY_CLIENTS_DATA, activeClientId] })
      dispatch(clearActiveClient())
    }
  }, [queryClient, activeClientId, dispatch, isSuccessDel])

  //вызов формы редактирования при клике на кнопку редактирования. 3-му блоку назначается состояние "edit-form"
  const handleEdit = () => {
    dispatch(setActiveComponent('edit-form'))
  }
  //обработчик удаления
  const handleDelete = (id: string) => () => launchClientDeleting(id)

  return (
    <Box className="h-full rounded-2xl xs:border-2 xs:border-primary-light xs:p-4 lg:border-transparent lg:p-0">

      {clientData && Object.entries(clientData).map((([key, value], i) => {
        return <div className="text-white" key={i}>{key}: {value.toString()}</div>
      }))}

      <Button onClick={handleEdit} variant="contained" endIcon={<EditOutlinedIcon fontSize="small" />}>
        Edit
      </Button>
      <Button onClick={handleDelete(activeClientId)} variant="contained" endIcon={<DeleteOutlineIcon fontSize="small" />}>{isPendingDel ? 'Deleting...' : 'Delete'}</Button>
    </Box>
  );
}

export default ClientCard;
