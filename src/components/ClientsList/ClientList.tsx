import { Avatar, Box, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StyledScrollBar from "../common/StyledScrollbar/StyledScrollbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_CLIENTS_DATA } from "@/api/queryDatas";
import { useDispatch, useSelector } from "react-redux";
//импорт из clientsSlice
import { selectFilters, setFilters, changeActiveClientId } from "@/store/clientsSlices/clientsSlice";
import { useEffect, useRef } from "react";
import { getClientsAxios, deleteClient } from "@/api/clientsApi";
import { ClientReceivingData } from "@/utils/schemasTypes";

const ClientList = () => {
  //хуки стора
  const filters = useSelector(selectFilters)
  const dispatch = useDispatch()


  //в queryKey добавляем filters, теперь при их изменении реакт квери будет инициировать новый запрос, и не нужно инвалидировать запросы вручную используя queryClient.invalidateQueries
  const { data: clients } = useQuery({
    queryKey: [...QUERY_KEY_CLIENTS_DATA, filters],
    queryFn: () => getClientsAxios(filters)
  })

  //мутация удаления клиента
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEY_CLIENTS_DATA, filters] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  //назначаем первого клиента в списке активным. так как его карточка будет автоматически открыта при перерисовке списка клиентов
  useEffect(() => {
    const payload: { id: null | string } = {
      id: null
    }
    if (clients?.length) {
      payload.id = clients[0].id
    }
    dispatch(changeActiveClientId(payload))
  }, [clients, dispatch])

  //используем реф для задержки фильтрации
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const handleFiltrations = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValue = value.length > 0
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      //обновляем фильтры в сторе
      dispatch(setFilters(isValue ? { q: value } : {}))
    }, 200)
  }

  //обработчик удаления клиента
  const handleDeleteClient = (id: string) => {
    mutation.mutate(id)
  }
  // обработчик клика по элементу списка (использовано каррирование)
  const handleItemClick = (client: ClientReceivingData) => () => {
    dispatch(changeActiveClientId({ id: client.id }))
  }

  return (
    <Box className="flex h-full flex-col gap-5 rounded-2xl xs:border-2 xs:border-primary-light xs:p-4 lg:border-transparent lg:p-0">
      <TextField
        id="clientSearch"
        name="clientSearch"
        autoComplete="off"
        onChange={handleFiltrations}
        placeholder="Search Clients"
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <PersonSearchIcon fontSize="small" sx={{ color: 'var(--light)' }} />
              </InputAdornment>
            ),
            sx: {
              color: 'var(--textApp)',
              fontSize: '0.8rem',
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--light)",
              },
              "&.Mui-focused, &:hover:not(.Mui-focused)": {
                '.MuiOutlinedInput-notchedOutline': {
                  borderWidth: '2px',
                  borderColor: "var(--primary-main)"
                }
              },

            }
          },
          htmlInput: {
            sx: {
              py: '7px',
            }
          }
        }}
      />
      <StyledScrollBar>
        <List>
          {clients?.map((client, index) => {
            const clientFullName = `${client.firstName} ${client.lastName}`
            const isNotLastEl = index !== clients.length - 1;
            const isStarred = client.status === 'VIP'
            return (
              <ListItem
                onClick={handleItemClick(client)}
                key={client.id}
                sx={{ color: "var(--textApp)", "&.MuiListItem-divider": { borderColor: "var(--primary-light)" }, cursor: 'pointer' }}
                divider={isNotLastEl}
              >
                <ListItemAvatar>
                  <Avatar alt={`${clientFullName} avatar`} src={`${client.image}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">
                      {clientFullName}
                    </Typography>
                  }
                  secondary={client.status}
                  sx={{
                    "& .MuiListItemText-secondary": {
                      color: 'var(--text-second)',
                      textTransform: client.status !== 'VIP' ? 'capitalize' : 'uppercase',
                      fontSize: '0.7rem'
                    }
                  }}
                />
                <StarTwoToneIcon {...isStarred && { color: 'primary' }} sx={{ '&.MuiSvgIcon-colorPrimary': { color: 'yellow' } }} fontSize="small" />
                <IconButton edge="end" aria-label="delete" sx={{
                  color: 'var(--light)',
                  transition: 'color 0.3s linear',
                  "&:hover": {
                    color: 'var(--primary-main)'
                  }
                }}
                  onClick={() => handleDeleteClient(client.id)}
                >
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      </StyledScrollBar>

    </Box>
  );
}

export default ClientList;