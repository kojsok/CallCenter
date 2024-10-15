import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallsData, addCall, updateCall, removeCall, clearError } from '@/store/callSlice';
import { RootState, AppDispatch } from '@/store/store';
import { CallRecord } from '@/utils/callsZodSchema';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Delete, Edit, CallMade, CallReceived } from '@mui/icons-material';
import dayjs from 'dayjs';

const CallsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Выбор состояния из Redux Store
  const calls = useSelector((state: RootState) => state.calls.data);
  const status = useSelector((state: RootState) => state.calls.status);
  const error = useSelector((state: RootState) => state.calls.error);

  // Локальное состояние для Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Локальное состояние для фильтров
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterState, setFilterState] = useState<string>('');
  const [filterMood, setFilterMood] = useState<string>('');

  // Локальное состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Получение данных при монтировании компонента
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCallsData());
    }
  }, [status, dispatch]);

  // Открытие Snackbar при ошибке
  useEffect(() => {
    if (status === 'failed') {
      setOpenSnackbar(true);
    }
  }, [status]);



  //редактирование звонка нужно открыть модальное окно доработать
  const [editCall, setEditCall] = useState<CallRecord | null>(null);

  const handleEditCall = (call: CallRecord) => {
    setEditCall(call);
  };

  // Функция для сохранения обновленного звонка
  const handleSaveCall = () => {
    if (editCall) {
      dispatch(updateCall(editCall));
      setEditCall(null);
    }
  };

  // Функция для закрытия модального окна без сохранения
  const handleCloseEdit = () => {
    setEditCall(null);
  };






  // Обработчики для синхронных действий
  const handleAddCall = () => {
    const newCall: CallRecord = {
      id: `id-${Date.now()}`, // Генерация уникального ID
      type: 'outgoing',
      state: 'accepted',
      status: 'transfer',
      callMood: 'neutral',
      agentComment: 'Новый звонок от агента.',
      feedbackScore: 5,
      followUpRequired: false,
      recordUrl: '/records/record-new.mp3',
      clientId: 'client123',
      employeeId: 'employee456',
      start: new Date().toISOString(),
      end: new Date(new Date().getTime() + 300000).toISOString(), // Добавляем 5 минут
      duration: 300, // в секундах
    };
    dispatch(addCall(newCall));
  };

  const handleUpdateCall = (updatedCall: CallRecord) => {
    dispatch(updateCall(updatedCall));
  };

  const handleRemoveCall = (id: string) => {
    dispatch(removeCall(id));
  };

  const handleClearError = () => {
    dispatch(clearError());
    setOpenSnackbar(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Функция для форматирования времени
  const formatDateTime = (dateTime: string) => dayjs(dateTime).format('DD.MM.YYYY HH:mm:ss');

  // Обработчики фильтров
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Сбросить страницу при изменении фильтра
  };

  const handleFilterTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterType(event.target.value as string);
    setCurrentPage(1);
  };

  const handleFilterStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterState(event.target.value as string);
    setCurrentPage(1);
  };

  const handleFilterMoodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterMood(event.target.value as string);
    setCurrentPage(1);
  };

  // Применение фильтров к списку звонков
  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      const matchesSearch =
        call.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.clientId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType ? call.type === filterType : true;
      const matchesState = filterState ? call.state === filterState : true;
      const matchesMood = filterMood ? call.callMood === filterMood : true;

      return matchesSearch && matchesType && matchesState && matchesMood;
    });
  }, [calls, searchTerm, filterType, filterState, filterMood]);

  // Расчёт данных для текущей страницы
  const paginatedCalls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCalls.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCalls, currentPage]);

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);

  // Обработчик изменения страницы
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom className="text-app">
        Список Звонков
      </Typography>

      {/* Форма фильтрации и поиска */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <TextField
          label="Поиск по Employee ID или Client ID"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ minWidth: '250px', background: 'white' }}
        />

        <FormControl variant="outlined" sx={{ minWidth: 400, background: 'white' }}>
          <InputLabel id="filter-type-label">Тип звонка</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={handleFilterTypeChange}
            label="Тип звонка"
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            <MenuItem value="outgoing">Исходящий</MenuItem>
            <MenuItem value="incoming">Входящий</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 400, background: 'white' }}>
          <InputLabel id="filter-state-label">Состояние</InputLabel>
          <Select
            labelId="filter-state-label"
            value={filterState}
            onChange={handleFilterStateChange}
            label="Состояние"
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            <MenuItem value="completed">Завершённый</MenuItem>
            <MenuItem value="missed">Пропущенный</MenuItem>
            <MenuItem value="in-progress">В процессе</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 400, background: 'white' }}>
          <InputLabel id="filter-mood-label">Настроение</InputLabel>
          <Select
            labelId="filter-mood-label"
            value={filterMood}
            onChange={handleFilterMoodChange}
            label="Настроение"
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            <MenuItem value="positive">Позитивное</MenuItem>
            <MenuItem value="neutral">Нейтральное</MenuItem>
            <MenuItem value="negative">Негативное</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Кнопка для добавления нового звонка */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCall}
          startIcon={<CallMade />}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
          }}
        >
          Добавить Звонок
        </Button>
      </Box>

      {/* Состояния загрузки, ошибки и успешного отображения */}
      {status === 'loading' && (
        <Typography variant="h6" className="text-app">
          Загрузка...
        </Typography>
      )}
      {status === 'failed' && (
        <>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              Ошибка: {error}
            </Alert>
          </Snackbar>
        </>
      )}
      {status === 'succeeded' && (
        <>
          <Grid container spacing={3}>
            {paginatedCalls.map((call) => (
              <Grid item xs={12} md={6} lg={4} key={call.id}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Avatar
                        sx={{
                          bgcolor: call.type === 'outgoing' ? 'primary.main' : 'secondary.main',
                          marginRight: '10px',
                        }}
                      >
                        {call.type === 'outgoing' ? <CallMade /> : <CallReceived />}
                      </Avatar>
                      <Typography variant="h6" component="div">
                        {call.type === 'outgoing' ? 'Исходящий' : 'Входящий'} Звонок
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      <strong>ID Звонка:</strong> {call.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Сотрудник:</strong> {call.employeeId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Клиент:</strong> {call.clientId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Начало:</strong> {formatDateTime(call.start)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Конец:</strong> {formatDateTime(call.end)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Длительность:</strong> {call.duration} секунд
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Настроение:</strong> {call.callMood}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Рейтинг обратной связи:</strong> {call.feedbackScore}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Требуется ли обратная связь:</strong> {call.followUpRequired ? 'Да' : 'Нет'}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '15px',
                      }}
                    >
                      <Tooltip title="Удалить Звонок">
                        <IconButton color="error" onClick={() => handleRemoveCall(call.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      {/* Здесь можно добавить кнопку для редактирования звонка и вызова модального кона */}
                      <Tooltip title="Редактировать Звонок">
                        <IconButton color="primary" onClick={() => handleEditCall(call)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
      {/* модальное окно для редактирования звонка */}
      <Dialog open={!!editCall} onClose={handleCloseEdit}>
        <DialogTitle>Редактировать Звонок</DialogTitle>
        {editCall && (
          <DialogContent>
            <TextField
              margin="dense"
              label="Сотрудник ID"
              fullWidth
              variant="outlined"
              value={editCall.employeeId}
              onChange={(e) => setEditCall({ ...editCall, employeeId: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Клиент ID"
              fullWidth
              variant="outlined"
              value={editCall.clientId}
              onChange={(e) => setEditCall({ ...editCall, clientId: e.target.value })}
            />
            {/* Добавьте другие поля по необходимости */}
            <FormControl fullWidth margin="dense">
              <InputLabel id="edit-type-label">Тип звонка</InputLabel>
              <Select
                labelId="edit-type-label"
                value={editCall.type}
                onChange={(e) => setEditCall({ ...editCall, type: e.target.value as string })}
                label="Тип звонка"
              >
                <MenuItem value="outgoing">Исходящий</MenuItem>
                <MenuItem value="incoming">Входящий</MenuItem>
              </Select>
            </FormControl>
            {/* Продолжайте добавлять поля для всех необходимых данных */}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSaveCall} color="primary" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallsList;
