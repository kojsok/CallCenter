import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { postClientsToServer } from '@/api/postClientsToServer';
import { TextField, Button, Typography, MenuItem, IconButton, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { ClientFormData, clientSchema } from '@/utils/clientsZodSchema';


const ClientsAddForm2: React.FC = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema), // Использование Zod-схемы для валидации
        defaultValues: {
            id: '2de7da2488644307b4181a578788cc7b',
            firstName: 'Sherika',
            lastName: 'Imada',
            age: 33,
            gender: 'female',
            image: 'https://avatars.githubusercontent.com/u/27212968',
            contacts: {
                phone: '+39-1526-12154525',
                email: 'singegroovy@icloud.com',
            },
            notes: [
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
            ],
            interactionsCount: 7,
            lastInteractionDate: '2024-08-20T00:34:34.825Z',
            createdAt: '2024-06-06T05:09:31.706Z',
            status: 'VIP',
            updatedAt: '2024-08-05T10:39:02.074Z',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'notes', // массив данных
    });

    //отправка формы на сервер
    const mutation = useMutation({
        mutationFn: (data: ClientFormData) => postClientsToServer(data),
    });

    const onSubmit: SubmitHandler<ClientFormData> = (data) => {
        mutation.mutate(data);
    };

    return (
        <Box
            className="w-full max-w-2xl p-8 bg-gray-200 border border-gray-200 rounded-lg shadow-md"
            sx={{ color: 'white' }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{
                    mb: '20px',
                    backgroundColor: 'transparent',
                    input: { color: 'white' },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "white"
                        },
                        "&:hover fieldset": {
                            borderColor: "blue"
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "blue"
                        },
                        "& .MuiInputLabel-root": {
                            color: "white"
                        },
                    }
                }}
                InputLabelProps={{
                    style: { color: 'white' }
                }}
                label="First Name"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
            />
            
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Last Name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
            />
            
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Age"
                type="number"
                {...register('age', { valueAsNumber: true })}
                error={!!errors.age}
                helperText={errors.age?.message}
                fullWidth
            />
            
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                select
                label="Gender"
                {...register('gender')}
                error={!!errors.gender}
                helperText={errors.gender?.message}
                fullWidth
            >
                <MenuItem value="female">female</MenuItem>
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="other">other</MenuItem>
            </TextField>
            
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Image URL"
                {...register('image')}
                error={!!errors.image}
                helperText={errors.image?.message}
                fullWidth
            />
            
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Phone"
                {...register('contacts.phone')}
                error={!!errors.contacts?.phone}
                helperText={errors.contacts?.phone?.message}
                fullWidth
            />
            
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Email"
                {...register('contacts.email')}
                error={!!errors.contacts?.email}
                helperText={errors.contacts?.email?.message}
                fullWidth
            />
            
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                select
                label="Status"
                {...register('status')}
                error={!!errors.status}
                helperText={errors.status?.message}
                fullWidth
            >
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="active">active</MenuItem>
                <MenuItem value="new">new</MenuItem>
                <MenuItem value="problematic">problematic</MenuItem>
                <MenuItem value="inactive">inactive</MenuItem>
                <MenuItem value="regular">regular</MenuItem>
            </TextField>

            {/* Поля для заметок */}
            {fields.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mt={2}>
                    <TextField
                        label={`Note ${index + 1}`}
                        className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                        sx={{ color: 'white', mb: '20px', flex: 1 }}
                        {...register(`notes.${index}`)}
                        error={!!errors.notes?.[index]}
                        helperText={errors.notes?.[index]?.message}
                        fullWidth
                    />
                    <IconButton onClick={() => remove(index)} color="error" sx={{ ml: 2 }}>
                        <Remove />
                    </IconButton>
                </Box>
            ))}

            <Button 
                onClick={() => append('')} 
                variant="contained" 
                startIcon={<Add />} 
                sx={{ mt: 2 }}
            >
                Добавить заметку
            </Button>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 4 }}
            >
                Submit
            </Button>

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
        </Box>
    );
};

export default ClientsAddForm2;
