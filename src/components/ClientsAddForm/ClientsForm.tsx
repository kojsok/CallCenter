import { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  MenuItem,
  Box,
} from '@mui/material';
import { postClientsToServer } from '@/api/postClientsToServer';
import { useMutation } from '@tanstack/react-query';

// Импортируем необходимые хуки и функции из react-hook-form
import { useForm } from 'react-hook-form';
import { AddClientFormData } from '@/utils/clientsZodSchema';
import ControlledField from './ControlledField';

//validation rules
import { clientFormRules } from './clientFormValidationRules';

//
const defaultValues: AddClientFormData = {
  firstName: '',
  lastName: '',
  age: 0,
  gender: 'male',
  image: '',
  contacts: {
    phone: '',
    email: '',
  },
  notes: ['dkdkkkdd'],
  interactionsCount: 0,
  lastInteractionDate: new Date().toISOString(),
  status: 'new',
}

const ClientsAddForm = () => {
  const [responseMessage, setResponseMessage] = useState('');

  // Инициализируем useForm с типизацией и дефолтными значениями
  const {
    control, // Контроллер для интеграции с MUI
    handleSubmit, // Функция для обработки отправки формы
    reset, // Функция для сброса формы
    formState: { errors } // Объект с ошибками валидации
  } = useForm<AddClientFormData>({
    defaultValues
  });

  // Мутация для отправки данных с использованием поста на сервер
  const mutation = useMutation({
    mutationFn: (data: AddClientFormData) => postClientsToServer(data), //функция отправки на сервер /api/postClientsToServer
    onMutate: () => {
      console.log('mutation started')
    },
    onSuccess: () => {
      setResponseMessage(`Данные успешно отправлены!`);
      // Сброс формы после успешной отправки но нужно сделать у перечисляющих полей значение, чтобы не было ошибки undefined
      reset(defaultValues);
    },
    onError: (error) => {
      console.log(error)
      setResponseMessage(`Произошла ошибка при отправке данных.`);
    },
  });

  // Обработчик отправки формы через react-hook-form
  const onSubmit = (data: AddClientFormData) => {
    setResponseMessage(''); //делаем state пустым
    const formattedData = {
      ...data,
      age: Number(data.age),
      lastInteractionDate: new Date(data.lastInteractionDate).toISOString()
    }
    mutation.mutate(formattedData);
    console.log('данные отправлены на сервер:', formattedData);
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
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Используем обертку ControlledField*/}
        <ControlledField
          controllerProps={{
            control,
            name: 'firstName',
            rules: clientFormRules.firstName //правило из объекта 
          }}
          fieldProps={{
            label: 'Имя',
            required: true,
            error: !!errors.firstName,// Показываем ошибку, если есть
            helperText: errors.firstName?.message // Текст ошибки
          }}
        />
        <ControlledField
          controllerProps={{
            control,
            name: "lastName",
            rules: clientFormRules.lastName
          }}
          fieldProps={{
            label: "Фамилия",
            error: !!errors.lastName,
            helperText: errors.lastName?.message,
          }}
        />

        <ControlledField
          controllerProps={{
            control,
            name: "age",
            rules: clientFormRules.age
          }}
          fieldProps={{
            label: "Возраст",
            error: !!errors.age,
            type: 'number',
            helperText: errors.age?.message,
          }}
        />
        <ControlledField
          controllerProps={{
            control,
            name: "gender",
            rules: clientFormRules.gender
          }}
          fieldProps={{
            label: "Gender",
            error: !!errors.gender,
            select: true,
            helperText: errors.gender?.message,
            children: [<MenuItem key="female" value="female">Female</MenuItem>,
            <MenuItem key="male" value="male">Male</MenuItem>]

          }}
        />
        <ControlledField
          controllerProps={{
            control,
            name: "image",
            rules: clientFormRules.image
          }}
          fieldProps={{
            label: "Avatar Url",
            error: !!errors.image,
            type: 'url',
            helperText: errors.image?.message,
          }}
        />
        <ControlledField
          controllerProps={{
            control,
            name: "contacts.phone",
            rules: clientFormRules['contacts.phone']
          }}
          fieldProps={{
            label: "Phone",
            error: !!errors.contacts?.phone,
            type: 'tel',
            helperText: errors.contacts?.phone?.message,
          }}
        />
        <ControlledField
          controllerProps={{
            control,
            name: "contacts.email",
            rules: clientFormRules["contacts.email"]
          }}
          fieldProps={{
            label: "Email",
            error: !!errors.contacts?.email,
            type: 'email',
            helperText: errors.contacts?.email?.message,
          }}
        />
        <ControlledField
          controllerProps={{
            control,
            name: "lastInteractionDate",
            rules: clientFormRules.lastInteractionDate
          }}
          fieldProps={{
            label: "Last interaction",
            type: 'date',
          }}
        />
        <ControlledField
          controllerProps={{
            control,
            name: "status",
            rules: clientFormRules.status
          }}
          fieldProps={{
            label: "Status",
            error: !!errors.status,
            helperText: errors.status?.message,
            select: true,
            children: [
              <MenuItem key="VIP" value="VIP">VIP</MenuItem>,
              <MenuItem key="active" value="active">Active</MenuItem>,
              <MenuItem key="new" value="new">New</MenuItem>,
              <MenuItem key="problematic" value="problematic">Particular</MenuItem>,
              <MenuItem key="inactive" value="inactive">Inactive</MenuItem>,
            ]
          }}
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