// import { useState } from 'react';
// import {
//     TextField,
//     Button,
//     Container,
//     Typography,
//     MenuItem,
// } from '@mui/material';
// import { IClients } from '@/services/IClients'; // Импортируем тип данных
// import { postClientsToServer } from '@/api/postClientsToServer';
// import { useMutation } from '@tanstack/react-query';
// import { v4 as uuidv4 } from 'uuid';
// // Импортируем необходимые хуки из react-hook-form
// import { useForm } from 'react-hook-form';

// const SimpleForm = () => {
//     // Инициализируем useForm для управления формой и валидацией
//     const { 
//         register, // Функция для регистрации полей
//         handleSubmit, // Функция для обработки отправки формы
//         reset, // Функция для сброса формы
//         formState: { errors } // Объект с ошибками валидации
//     } = useForm<IClients>({
//         defaultValues: {
//             id: uuidv4(),
//             firstName: 'Artem',
//             lastName: 'Sidorov',
//             age: 30,
//             gender: 'male',
//             image: 'https://avatars.githubusercontent.com/u/27212968',
//             contacts: {
//                 phone: '+39-1526-12154525',
//                 email: 'singegroovy@icloud.com',
//             },
//             notes: [
//                 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
//                 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
//             ],
//             interactionsCount: 7,
//             lastInteractionDate: new Date().toISOString(),
//             createdAt: new Date().toISOString(),
//             status: 'VIP',
//             updatedAt: new Date().toISOString(),
//         },
//     });

//     const [responseMessage, setResponseMessage] = useState('');

//     // Мутация для отправки данных с использованием поста на сервер
//     const mutation = useMutation({
//         mutationFn: async (newData: IClients) =>
//             await postClientsToServer(newData),
//         onSuccess: () => {
//             setResponseMessage(`Данные успешно отправлены!`);
//             // Сброс формы после успешной отправки
//             reset({
//                 id: uuidv4(),
//                 firstName: '',
//                 lastName: '',
//                 age: 0,
//                 gender: 'female',
//                 image: '',
//                 contacts: {
//                     phone: '',
//                     email: '',
//                 },
//                 notes: [],
//                 interactionsCount: 0,
//                 lastInteractionDate: '',
//                 createdAt: new Date().toISOString(),
//                 status: 'VIP',
//                 updatedAt: new Date().toISOString(),
//             });
//         },
//         onError: () => {
//             setResponseMessage(`Произошла ошибка при отправке данных.`);
//         },
//     });

//     // Обработчик отправки формы через react-hook-form
//     const onSubmit = (data: IClients) => {
//         setResponseMessage('');
//         // Обновление временных полей перед отправкой
//         const dataToSubmit = {
//             ...data,
//             updatedAt: new Date().toISOString(),
//         };
//         mutation.mutate(dataToSubmit);
//         console.log('Данные отправлены на сервер:', dataToSubmit);
//     };


//     return (
//         <Container
//             maxWidth="sm"
//             sx={{
//                 mt: 4,
//                 backgroundColor: 'white',
//                 p: 4,
//                 borderRadius: '8px',
//                 boxShadow: 3,
//             }}
//         >
//             <Typography variant="h4" gutterBottom>
//                 Простая форма
//             </Typography>
//             {/* Используем handleSubmit из react-hook-form для обработки отправки формы */}
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {/* Поле "Имя" с валидацией */}
//                 <TextField
//                     label="Имя"
//                     {...register("firstName", { required: "Имя обязательно" })} // Зарегистрировано с правилом валидации
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                     error={!!errors.firstName} // Показываем ошибку, если есть
//                     helperText={errors.firstName?.message} // Текст ошибки
//                 />
//                 {/* Поле "Фамилия" с валидацией */}
//                 <TextField
//                     label="Фамилия"
//                     {...register("lastName", { required: "Фамилия обязательна" })} // Зарегистрировано с правилом валидации
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                     error={!!errors.lastName}
//                     helperText={errors.lastName?.message}
//                 />
//                 {/* Поле "Возраст" с валидацией и преобразованием в число */}
//                 <TextField
//                     label="Возраст"
//                     type="number"
//                     {...register("age", { 
//                         required: "Возраст обязателен",
//                         min: { value: 0, message: "Возраст не может быть отрицательным" },
//                         max: { value: 120, message: "Возраст слишком большой" },
//                         valueAsNumber: true, //! Добавлено для преобразования значения в число
//                     })}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                     error={!!errors.age}
//                     helperText={errors.age?.message}
//                 />
//                 {/* Поле "Пол" с валидацией */}
//                 <TextField
//                     select
//                     label="Пол"
//                     {...register("gender", { required: "Пол обязателен" })} // Зарегистрировано с правилом валидации
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     error={!!errors.gender}
//                     helperText={errors.gender?.message}
//                 >
//                     <MenuItem value=""></MenuItem>
//                     <MenuItem value="female">Женский</MenuItem>
//                     <MenuItem value="male">Мужской</MenuItem>
//                     <MenuItem value="other">Другой</MenuItem>
//                 </TextField>
//                 {/* Поле "URL изображения" с валидацией */}
//                 <TextField
//                     label="URL изображения"
//                     type="url"
//                     {...register("image", { 
//                         required: "URL изображения обязателен",
//                         pattern: {
//                             value: /^(ftp|http|https):\/\/[^ "]+$/,
//                             message: "Введите корректный URL",
//                         },
//                     })} // Зарегистрировано с правилами валидации
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     error={!!errors.image}
//                     helperText={errors.image?.message}
//                 />
//                 {/* Поле "Телефон" с валидацией */}
//                 <TextField
//                     label="Телефон"
//                     type="tel"
//                     {...register("contacts.phone", { 
//                         required: "Телефон обязателен",
//                         pattern: {
//                             value: /^\+?[1-9]\d{1,14}$/,
//                             message: "Введите корректный телефон",
//                         },
//                     })} // Зарегистрировано с правилами валидации
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     error={!!errors.contacts?.phone}
//                     helperText={errors.contacts?.phone?.message}
//                 />
//                 {/* Поле "Email" с валидацией */}
//                 <TextField
//                     label="Email"
//                     type="email"
//                     {...register("contacts.email", { 
//                         required: "Email обязателен",
//                         pattern: {
//                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                             message: "Введите корректный email",
//                         },
//                     })} // Зарегистрировано с правилами валидации
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     error={!!errors.contacts?.email}
//                     helperText={errors.contacts?.email?.message}
//                 />
//                 {/* Поле "Статус" с валидацией */}
//                 <TextField
//                     select
//                     label="Статус"
//                     {...register("status", { required: "Статус обязателен" })} // Зарегистрировано с правилом валидации
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     error={!!errors.status}
//                     helperText={errors.status?.message}
//                 >
//                     {/* <MenuItem value=""></MenuItem> */}
//                     <MenuItem value="">
//                         <em>Выберите статус</em>
//                     </MenuItem>
//                     <MenuItem value="VIP">VIP</MenuItem>
//                     <MenuItem value="active">Активный</MenuItem>
//                     <MenuItem value="new">Новый</MenuItem>
//                     <MenuItem value="problematic">Проблемный</MenuItem>
//                     <MenuItem value="inactive">Неактивный</MenuItem>
//                     <MenuItem value="regular">Регулярный</MenuItem>
//                 </TextField>
//                 {/* Поле "Заметки" без обязательной валидации */}
//                 <TextField
//                     label="Заметки"
//                     multiline
//                     rows={4}
//                     {...register("notes")} // Зарегистрировано без правил валидации
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                 />

//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ mt: 2 }}
//                     disabled={mutation.isLoading} // Обновлено свойство для отслеживания состояния мутации
//                 >
//                     {mutation.isLoading ? 'Отправка...' : 'Отправить'}
//                 </Button>
//             </form>
//             {responseMessage && (
//                 <Typography
//                     variant="body1"
//                     color={
//                         responseMessage.includes('успешно')
//                             ? 'success.main'
//                             : 'error.main'
//                     }
//                     sx={{ mt: 2 }}
//                 >
//                     {responseMessage}
//                 </Typography>
//             )}
//         </Container>
//     );
// };

// export default SimpleForm;





import {useState} from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    MenuItem,
} from '@mui/material';
import { IClients } from '@/services/IClients'; // Импортируем тип данных
import { postClientsToServer } from '@/api/postClientsToServer';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
// Импортируем необходимые хуки и функции из react-hook-form
import { useForm, Controller } from 'react-hook-form';

const SimpleForm = () => {
    // Удаляем useState для formData, так как будем использовать react-hook-form для управления формой
    // const [formData, setFormData] = useState<IClients>({...});

    const [responseMessage, setResponseMessage] = useState('');

    // Инициализируем useForm с типизацией и дефолтными значениями
    const { 
        control, // Контроллер для интеграции с MUI
        handleSubmit, // Функция для обработки отправки формы
        reset, // Функция для сброса формы
        formState: { errors } // Объект с ошибками валидации
    } = useForm<IClients>({
        defaultValues: {
            id: uuidv4(),
            firstName: 'Artem',
            lastName: 'Sidorov',
            age: 30,
            gender: 'male',
            image: 'https://avatars.githubusercontent.com/u/27212968',
            contacts: {
                phone: '+39-1526-12154525',
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
        mutationFn: async (newData: IClients) =>
            await postClientsToServer(newData),
        onSuccess: () => {
            setResponseMessage(`Данные успешно отправлены!`);
            // Сброс формы после успешной отправки
            reset({
                id: uuidv4(),
                firstName: '',
                lastName: '',
                age: 0,
                gender: '',
                image: '',
                contacts: {
                    phone: '',
                    email: '',
                },
                notes: [],
                interactionsCount: 0,
                lastInteractionDate: '',
                createdAt: new Date().toISOString(),
                status: '',
                updatedAt: '',
            });
        },
        onError: () => {
            setResponseMessage(`Произошла ошибка при отправке данных.`);
        },
    });

    // Обработчик отправки формы через react-hook-form
    const onSubmit = (data: IClients) => {
        setResponseMessage('');
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
                Простая форма
            </Typography>
            {/* Используем handleSubmit из react-hook-form для обработки отправки формы */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Используем Controller для интеграции с MUI TextField */}
                <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: 'Имя обязательно' }} // Добавили правило валидации
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
                    rules={{ required: 'Фамилия обязательна' }} // Добавили правило валидации
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
                            value: /^\+?[1-9]\d{1,14}$/,
                            message: 'Введите корректный телефон',
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
        </Container>
    );
};

export default SimpleForm;






// import { FormEvent, useState, ChangeEvent, useCallback } from 'react';
// import {
//     TextField,
//     Button,
//     Container,
//     Typography,
//     MenuItem,
// } from '@mui/material';
// import { IClients } from '@/services/IClients'; // Импортируем тип данных
// import { postClientsToServer } from '@/api/postClientsToServer';
// import { useMutation } from '@tanstack/react-query';
// import { v4 as uuidv4 } from 'uuid';

// const SimpleForm = () => {
//     const [formData, setFormData] = useState<IClients>({
//         id: uuidv4(),
//         firstName: 'Artem',
//         lastName: 'Sidorov',
//         age: 30,
//         gender: 'male',
//         image: 'https://avatars.githubusercontent.com/u/27212968',
//         contacts: {
//             phone: '+39-1526-12154525',
//             email: 'singegroovy@icloud.com',
//         },
//         notes: ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
//                 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',],
//         interactionsCount: 7,
//         lastInteractionDate: new Date().toISOString(),
//         createdAt: new Date().toISOString(),
//         status: 'VIP',
//         updatedAt: new Date().toISOString(),
//     });

//     const [responseMessage, setResponseMessage] = useState('');

//     // Мутация для отправки данных с использованием поста на сервер
//     const mutation = useMutation({
//         mutationFn: async (newData: IClients) =>
//             await postClientsToServer(newData),
//         onSuccess: () => {
//             setResponseMessage(`Данные успешно отправлены! ${JSON.stringify(formData)} `);
//             // Сброс формы после успешной отправки
//             setFormData({
//                 id: uuidv4(),
//                 firstName: '',
//                 lastName: '',
//                 age: 0,
//                 gender: '',
//                 image: '',
//                 contacts: {
//                     phone: '',
//                     email: '',
//                 },
//                 notes: [],
//                 interactionsCount: 0,
//                 lastInteractionDate: '',
//                 createdAt: new Date().toISOString(),
//                 status: '',
//                 updatedAt: '',
//             });
//         },
//         onError: () => {
//             setResponseMessage(
//                 `Произошла ошибка при отправке данных. ${JSON.stringify(formData)}` 
//             );
//         },
//     });

//     const handleChange = useCallback(
//         (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//             const { name, value } = e.target;

//             // Проверка на вложенные поля
//             if (name.startsWith('contacts.')) {
//                 const contactField = name.split('.')[1];
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     contacts: {
//                         ...prevData.contacts,
//                         [contactField]: value,
//                     },
//                 }));
//             } else if (name === 'notes') {
//                 // Разделение заметок по строкам
//                 const notesArray = value.split('\n').filter((note) => note.trim() !== '');
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     notes: notesArray,
//                 }));
//             } else {
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     [name]: value,
//                     [name]: name === 'age' ? Number(value) : value, //преобразуем age в набер
//                 }));
//             }
//         },
//         []
//     );

//     const handleSubmit = useCallback(
//         (e: FormEvent) => {
//             e.preventDefault();
//             setResponseMessage('');
//             // Обновление временных полей перед отправкой
//             const dataToSubmit = {
//                 ...formData,
//                 updatedAt: new Date().toISOString(),
//             };
//             mutation.mutate(dataToSubmit);
//             console.log('данные отправлены на сервер:', formData);
//         },
//         [formData, mutation]
//     );

//     return (
//         <Container
//             maxWidth="sm"
//             sx={{
//                 mt: 4,
//                 backgroundColor: 'white',
//                 p: 4,
//                 borderRadius: '8px',
//                 boxShadow: 3,
//             }}
//         >
//             <Typography variant="h4" gutterBottom>
//                 Простая форма
//             </Typography>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Имя"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     label="Фамилия"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     label="Возраст"
//                     name="age"
//                     type="number"
//                     value={formData.age}
//                     onChange={handleChange}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     select
//                     label="Пол"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                 >
//                     <MenuItem value="female">Женский</MenuItem>
//                     <MenuItem value="male">Мужской</MenuItem>
//                     <MenuItem value="other">Другой</MenuItem>
//                 </TextField>
//                 <TextField
//                     label="URL изображения"
//                     name="image"
//                     type="url"
//                     value={formData.image}
//                     onChange={handleChange}
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                 />
//                 <TextField
//                     label="Телефон"
//                     name="contacts.phone"
//                     value={formData.contacts.phone}
//                     type="tel"
//                     onChange={handleChange}
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                 />
//                 <TextField
//                     label="Email"
//                     name="contacts.email"
//                     type="email"
//                     value={formData.contacts.email}
//                     onChange={handleChange}
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                 />
//                 <TextField
//                     select
//                     label="Статус"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                 >
//                     <MenuItem value="VIP">VIP</MenuItem>
//                     <MenuItem value="active">Активный</MenuItem>
//                     <MenuItem value="new">Новый</MenuItem>
//                     <MenuItem value="problematic">Проблемный</MenuItem>
//                     <MenuItem value="inactive">Неактивный</MenuItem>
//                     <MenuItem value="regular">Регулярный</MenuItem>
//                 </TextField>
//                 <TextField
//                     label="Заметки"
//                     name="notes"
//                     multiline
//                     rows={4}
//                     value={formData.notes.join('\n')}
//                     onChange={handleChange}
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                 />

//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ mt: 2 }}
//                     disabled={mutation.isPending} // Блокировка кнопки при отправке
//                 >
//                     {mutation.isPending ? 'Отправка...' : 'Отправить'}
//                 </Button>
//             </form>
//             {responseMessage && (
//                 <Typography
//                     variant="body1"
//                     color={
//                         responseMessage.includes('успешно')
//                             ? 'success.main'
//                             : 'error.main'
//                     }
//                     sx={{ mt: 2 }}
//                 >
//                     {responseMessage}
//                 </Typography>
//             )}
//         </Container>
//     );
// };

// export default SimpleForm;
