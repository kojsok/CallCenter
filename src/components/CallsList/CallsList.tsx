import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallsData, addCall, updateCall, removeCall, clearError } from '@/store/callSlice';
import { RootState, AppDispatch } from '@/store/store';
import { CallRecord } from '@/utils/callsZodSchema';
import {
  Typography,
  Button,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Edit, CallMade, CallReceived } from '@mui/icons-material';
import dayjs from 'dayjs';
import Loader from '../Loader/Loader';
import PageHeader from '../PageHeader/PageHeader';

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

  // Редактирование звонка - открытие модального окна
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
    console.log(event);
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: 'var(--appBg)', minHeight: '100vh' }}>
      {/* <Typography variant="h4" gutterBottom sx={{ color: 'var(--light)' }}>
        Call List
      </Typography> */}
      <PageHeader title="Calls" descr="List of all calls" />

      {/* Форма фильтрации и поиска */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <TextField
          label="Search by Employee ID or Client ID"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{
            minWidth: '250px',
            backgroundColor: 'var(--appBg)',
            '& .MuiOutlinedInput-root': {
              color: 'var(--light)',
              '& fieldset': {
                borderColor: 'var(--primary-light)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--primary-main)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary-main)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--light)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--light)',
            },
          }}
          InputLabelProps={{
            style: { color: 'var(--light)' },
          }}
        />

        <FormControl
          variant="outlined"
          sx={{
            minWidth: 200,
            backgroundColor: 'var(--appBg)',
            '& .MuiInputBase-root': {
              color: 'var(--light)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--light)',
            },
            '& .MuiSelect-outlined': {
              color: 'var(--light)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-light)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-main)',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-main)',
            },
          }}
          InputLabelProps={{
            style: { color: 'var(--light)' },
          }}
        >
          <InputLabel id="filter-type-label">Call type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={handleFilterTypeChange}
            label="Call type"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="outgoing">Outgoing</MenuItem>
            <MenuItem value="incoming">Incoming</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          sx={{
            minWidth: 200,
            backgroundColor: 'var(--appBg)',
            '& .MuiInputBase-root': {
              color: 'var(--light)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--light)',
            },
            '& .MuiSelect-outlined': {
              color: 'var(--light)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-light)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-main)',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-main)',
            },
          }}
          InputLabelProps={{
            style: { color: 'var(--light)' },
          }}
        >
          <InputLabel id="filter-state-label">State</InputLabel>
          <Select
            labelId="filter-state-label"
            value={filterState}
            onChange={handleFilterStateChange}
            label="State"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="missed">Missed</MenuItem>
            <MenuItem value="in-progress">In progress</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          sx={{
            minWidth: 200,
            backgroundColor: 'var(--appBg)',
            '& .MuiInputBase-root': {
              color: 'var(--light)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--light)',
            },
            '& .MuiSelect-outlined': {
              color: 'var(--light)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-light)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-main)',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-main)',
            },
          }}
          InputLabelProps={{
            style: { color: 'var(--light)' },
          }}
        >
          <InputLabel id="filter-mood-label">Mood</InputLabel>
          <Select
            labelId="filter-mood-label"
            value={filterMood}
            onChange={handleFilterMoodChange}
            label="Mood"
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            <MenuItem value="positive">Positive</MenuItem>
            <MenuItem value="neutral">Neutral</MenuItem>
            <MenuItem value="negative">Negative</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Кнопка для добавления нового звонка */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'var(--primary-main)',
            color: 'var(--light)',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: 'var(--primary-dark)',
            },
          }}
          onClick={handleAddCall}
          startIcon={<CallMade sx={{ color: 'var(--light)' }} />}
        >
          Add Call
        </Button>
      </Box>

      {/* Состояния загрузки, ошибки и успешного отображения */}
      {status === 'loading' && (
        <Typography variant="h6" sx={{ color: 'var(--light)' }}>
          <Loader />
        </Typography>
      )}
      {status === 'failed' && (
        <>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%', backgroundColor: 'var(--appBg)', color: 'var(--light)' }}>
              Error text now: {error}
            </Alert>
          </Snackbar>
        </>
      )}
      {status === 'succeeded' && (
        <>
          {/* Таблица звонков */}
          <TableContainer component={Paper} sx={{ backgroundColor: 'var(--appBg)', borderRadius: '12px', border: '1px solid var(--primary-light)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Type Call</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>ID Call</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Employee</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Client</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Start</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>End</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Duration</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Mood</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Feedback rating</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Is feedback required?</TableCell>
                  <TableCell sx={{ color: 'var(--light)', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCalls.map((call) => (
                  <TableRow key={call.id} hover>
                    <TableCell sx={{ color: 'var(--light)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: call.type === 'outgoing' ? 'var(--primary-main)' : 'var(--secondaryBg)',
                            marginRight: '8px',
                            width: 24,
                            height: 24,
                          }}
                        >
                          {call.type === 'outgoing' ? <CallMade sx={{ color: 'var(--light)' }} /> : <CallReceived sx={{ color: 'var(--light)' }} />}
                        </Avatar>
                        {call.type === 'outgoing' ? 'Outgoing' : 'Incoming'}
                      </Box>
                    </TableCell>
                    {/* <TableCell sx={{ color: 'var(--light-grey)' }}>{call.id}</TableCell> */}
                    <TableCell sx={{color: 'var(--light-grey)', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellipsis',}}>
                      <Tooltip title={call.id} arrow>
                        <span>{call.id}</span>
                      </Tooltip>
                    </TableCell>
                    {/* <TableCell sx={{ color: 'var(--light-grey)' }}>{call.employeeId}</TableCell> */}
                    <TableCell sx={{color: 'var(--light-grey)', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellipsis',}}>
                      <Tooltip title={call.employeeId} arrow>
                        <span>{call.employeeId}</span>
                      </Tooltip>
                    </TableCell>
                    {/* <TableCell sx={{ color: 'var(--light-grey)' }}>{call.clientId}</TableCell> */}
                    <TableCell sx={{color: 'var(--light-grey)', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellipsis',}}>
                      <Tooltip title={call.clientId} arrow>
                        <span>{call.clientId}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ color: 'var(--light-grey)' }}>{formatDateTime(call.start)}</TableCell>
                    <TableCell sx={{ color: 'var(--light-grey)' }}>{formatDateTime(call.end)}</TableCell>
                    <TableCell sx={{ color: 'var(--light-grey)' }}>{(call.duration/60).toFixed(2)} minets</TableCell>
                    <TableCell sx={{ color: 'var(--light-grey)' }}>{call.callMood}</TableCell>
                    <TableCell sx={{ color: 'var(--light-grey)' }}>{call.feedbackScore}</TableCell>
                    <TableCell sx={{ color: 'var(--light-grey)' }}>{call.followUpRequired ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: '8px' }}>
                        <Tooltip title="Edit call">
                          <IconButton
                            onClick={() => handleEditCall(call)}
                            sx={{
                              color: 'var(--primary-main)',
                              '&:hover': {
                                color: 'var(--primary-dark)',
                              },
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete call">
                          <IconButton
                            onClick={() => handleRemoveCall(call.id)}
                            sx={{
                              color: 'var(--error)',
                              '&:hover': {
                                color: '#ff7961', // Легкий оттенок красного при наведении
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedCalls.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={11} sx={{ textAlign: 'center', color: 'var(--light-grey)' }}>
                      No call data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'var(--light-grey)',
                    '&.Mui-selected': {
                      backgroundColor: 'var(--primary-main)',
                      color: 'var(--light)',
                      '&:hover': {
                        backgroundColor: 'var(--primary-dark)',
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
      {/* Модальное окно для редактирования звонка */}
      <Dialog open={!!editCall} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: 'var(--appBg)', color: 'var(--light)' }}>Edit Call</DialogTitle>
        {editCall && (
          <DialogContent sx={{ backgroundColor: 'var(--appBg)', color: 'var(--light)' }}>
            <TextField
              margin="dense"
              label="Employee ID"
              fullWidth
              variant="outlined"
              value={editCall.employeeId}
              onChange={(e) => setEditCall({ ...editCall, employeeId: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'var(--light)',
                  '& fieldset': {
                    borderColor: 'var(--primary-light)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-main)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-main)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--light)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'var(--light)',
                },
              }}
              InputLabelProps={{
                style: { color: 'var(--light)' },
              }}
            />
            <TextField
              margin="dense"
              label="Client ID"
              fullWidth
              variant="outlined"
              value={editCall.clientId}
              onChange={(e) => setEditCall({ ...editCall, clientId: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'var(--light)',
                  '& fieldset': {
                    borderColor: 'var(--primary-light)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-main)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-main)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--light)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'var(--light)',
                },
              }}
              InputLabelProps={{
                style: { color: 'var(--light)' },
              }}
            />
            {/* Добавьте другие поля по необходимости */}
            <FormControl
              fullWidth
              margin="dense"
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  color: 'var(--light)',
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--light)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary-light)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary-main)',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary-main)',
                },
              }}
              InputLabelProps={{
                style: { color: 'var(--light)' },
              }}
            >
              <InputLabel id="edit-type-label">Type Call</InputLabel>
              <Select
                labelId="edit-type-label"
                value={editCall.type}
                onChange={(e) => setEditCall({ ...editCall, type: e.target.value as "outgoing" | "incoming" })}
                label="Type Call"
              >
                <MenuItem value="outgoing">Outgoing</MenuItem>
                <MenuItem value="incoming">Incoming</MenuItem>
              </Select>
            </FormControl>
            {/* Добавьте дополнительные поля здесь */}
          </DialogContent>
        )}
        <DialogActions sx={{ backgroundColor: 'var(--appBg)' }}>
          <Button
            onClick={handleCloseEdit}
            sx={{
              color: 'var(--light-grey)',
              '&:hover': {
                backgroundColor: 'rgba(235, 237, 241, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCall}
            variant="contained"
            sx={{
              backgroundColor: 'var(--primary-main)',
              color: 'var(--light)',
              '&:hover': {
                backgroundColor: 'var(--primary-dark)',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallsList;