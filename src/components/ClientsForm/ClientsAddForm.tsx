import { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Box,
} from '@mui/material';
// import { IClients } from '@/services/IClients'; // Импортируем тип данных
import { postClientsToServer } from '@/api/postClientsToServer';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
// Импортируем необходимые хуки и функции из react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { ClientFormData } from '@/utils/clientsZodSchema';

const ClientsAddForm = () => {
  // Удаляем useState для formData, так как будем использовать react-hook-form для управления формой
  // const [formData, setFormData] = useState<IClients>({...});

  const [responseMessage, setResponseMessage] = useState('');

  // Инициализируем useForm с типизацией и дефолтными значениями
  const {
    control, // Контроллер для интеграции с MUI
    handleSubmit, // Функция для обработки отправки формы
    reset, // Функция для сброса формы
    formState: { errors } // Объект с ошибками валидации
  } = useForm<ClientFormData>({
    defaultValues: {
      id: uuidv4(),
      firstName: 'Vasia',
      lastName: 'Sidorov',
      age: 30,
      gender: 'male',
      image: 'https://avatars.githubusercontent.com/u/27212968',
      contacts: {
        phone: '+39-152-1234567',
        email: 'singegroovy@icloud.com',
      },
      notes: ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',],
      interactionsCount: 7,
      lastInteractionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'VIP',
      updatedAt: new Date().toISOString(),
    },
  });

  // Мутация для отправки данных с использованием поста на сервер
  const mutation = useMutation({
    mutationFn: async (newData: ClientFormData) =>
      await postClientsToServer(newData), //функция отправки на сервер /api/postClientsToServer
    onSuccess: () => {
      setResponseMessage(`Данные успешно отправлены!`);
      // Сброс формы после успешной отправки но нужно сделать у перечисляющих полей значение, чтобы не было ошибки undefined
      reset({
        id: uuidv4(),
        firstName: '',
        lastName: '',
        age: 0,
        gender: 'male',
        image: '',
        contacts: {
          phone: '',
          email: '',
        },
        notes: [],
        interactionsCount: 0,
        lastInteractionDate: '',
        createdAt: new Date().toISOString(),
        status: 'active',
        updatedAt: '',
      });
    },
    onError: () => {
      setResponseMessage(`Произошла ошибка при отправке данных.`);
    },
  });

  // Обработчик отправки формы через react-hook-form
  const onSubmit = (data: ClientFormData) => {
    setResponseMessage(''); //делаем state пустым
    // Обновление временных полей перед отправкой
    const dataToSubmit = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mutation.mutate(dataToSubmit);
    console.log('данные отправлены на сервер:', dataToSubmit);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        backgroundColor: 'white',
        p: 4,
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add clients
      </Typography>
      {/* Используем handleSubmit из react-hook-form для обработки отправки формы */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Используем Controller для интеграции с MUI TextField */}
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: 'Имя обязательно', // Обязательное поле
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё]+$/i, // Только буквы латиницы и кириллицы
              message: 'Имя должно содержать только буквы',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Имя"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              error={!!errors.firstName} // Показываем ошибку, если есть
              helperText={errors.firstName?.message} // Текст ошибки
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{
            required: 'Фамилия обязательно', // Обязательное поле
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё]+$/i, // Только буквы латиницы и кириллицы
              message: 'Фамилия должна содержать только буквы',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Фамилия"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          rules={{
            required: 'Возраст обязателен',
            min: { value: 0, message: 'Возраст не может быть отрицательным' },
            max: { value: 120, message: 'Возраст слишком большой' },
          }} // Добавили правила валидации
          render={({ field }) => (
            <TextField
              {...field}
              label="Возраст"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              error={!!errors.age}
              helperText={errors.age?.message}
              onChange={(e) => field.onChange(Number(e.target.value))} // Преобразуем в число
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          rules={{ required: 'Пол обязателен' }} // Добавили правило валидации
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Пол"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              <MenuItem value="female">Женский</MenuItem>
              <MenuItem value="male">Мужской</MenuItem>
              <MenuItem value="other">Другой</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="image"
          control={control}
          rules={{
            required: 'URL изображения обязателен',
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'Введите корректный URL',
            },
          }} // Добавили правила валидации
          render={({ field }) => (
            <TextField
              {...field}
              label="URL изображения"
              type="url"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.image}
              helperText={errors.image?.message}
            />
          )}
        />
        <Controller
          name="contacts.phone"
          control={control}
          rules={{
            required: 'Телефон обязателен',
            pattern: {
              value: /^\+\d{1,3}-\d{3}-\d{7}$/,
              message: 'Введите корректный телефон вида +123-123-1234567',
            },
          }} // Добавили правила валидации
          render={({ field }) => (
            <TextField
              {...field}
              label="Телефон"
              type="tel"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.contacts?.phone}
              helperText={errors.contacts?.phone?.message}
            />
          )}
        />
        <Controller
          name="contacts.email"
          control={control}
          rules={{
            required: 'Email обязателен',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Введите корректный email',
            },
          }} // Добавили правила валидации
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.contacts?.email}
              helperText={errors.contacts?.email?.message}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Статус обязателен' }} // Добавили правило валидации
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Статус"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="active">Активный</MenuItem>
              <MenuItem value="new">Новый</MenuItem>
              <MenuItem value="problematic">Проблемный</MenuItem>
              <MenuItem value="inactive">Неактивный</MenuItem>
              <MenuItem value="regular">Регулярный</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Заметки"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              fullWidth
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={mutation.isPending} // Обновлено свойство для отслеживания состояния мутации
        >
          {mutation.isPending ? 'Отправка...' : 'Отправить'}
        </Button>
      </form>
      {responseMessage && (
        <Typography
          variant="body1"
          color={
            responseMessage.includes('успешно')
              ? 'success.main'
              : 'error.main'
          }
          sx={{ mt: 2 }}
        >
          {responseMessage}
        </Typography>
      )}
      <Box mt={2}>
        {/* проверить пендинг или idle */}
        {mutation.status === 'pending' && <Typography color="info.main">Loading...</Typography>}
        {mutation.isError && (
          <Typography color="error.main">
            Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
          </Typography>
        )}
        {mutation.isSuccess && <Typography color="success.main">Form submitted successfully!</Typography>}
      </Box>
    </Container>
  );
};

export default ClientsAddForm;