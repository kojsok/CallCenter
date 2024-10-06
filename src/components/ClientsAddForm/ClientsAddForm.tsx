// ContactForm.tsx

import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { IClients } from '@/services/IClients';
import { postClientsToServer } from '@/api/postClientsToServer';
import { TextField, Button, Typography, MenuItem, IconButton, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const ClientsAddForm: React.FC = () => {
    const { register, handleSubmit, control } = useForm<IClients>({
        defaultValues: {
            id: '2de7da2488644307b4181a578788cc6b',
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

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'notes',
    // });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'notes', // массив данных
    });

    const mutation = useMutation({
        mutationFn: (data: IClients) => postClientsToServer(data),
    });

    const onSubmit: SubmitHandler<IClients> = (data) => {
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
                    backgroundColor: 'transparent', // Прозрачный фон для видимости текста
                    input: { color: 'white' }, // Белый цвет текста внутри поля ввода
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "white" // Белый цвет бордера
                        },
                        "&:hover fieldset": {
                            borderColor: "blue" // Белый бордер при наведении
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "blue" // Белый бордер при фокусе
                        },
                        "& .MuiInputLabel-root": {
                            color: "white" // Белый цвет label
                        },

                    }

                }}
                InputLabelProps={{
                    style: { color: 'white' } // Белый цвет label через inline стили
                }}
                label="First Name"
                {...register('firstName', { required: true })}
                fullWidth
            />
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Last Name"
                {...register('lastName', { required: true })}
                fullWidth
            />
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Age"
                type="number"
                {...register('age', { required: true, valueAsNumber: true })}
                fullWidth
            />
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                select
                label="Gender"
                {...register('gender', { required: true })}
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
                {...register('image', { required: true })}
                fullWidth
            />
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Phone"
                {...register('contacts.phone', { required: true })}
                fullWidth
            />
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Email"
                {...register('contacts.email', { required: true })}
                fullWidth
            />
            <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                select
                label="Status"
                {...register('status', { required: true })}
                fullWidth
            >
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="active">active</MenuItem>
                <MenuItem value="new">new</MenuItem>
                <MenuItem value="problematic">problematic</MenuItem>
                <MenuItem value="inactive">inactive</MenuItem>
                <MenuItem value="regular">regular</MenuItem>
            </TextField>

            {/* <TextField
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                sx={{ color: 'white', mb: '20px' }}
                label="Notes"
                {...register('notes', { required: true })}
                fullWidth
            /> */}
            {fields.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mt={2}>
                    <TextField
                        key={field.id}
                        label={`Note ${index + 1}`}
                        className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-500 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
                        sx={{ color: 'white', mb: '20px' }}
                        {...register(`notes.${index}`, { required: true })}
                        fullWidth
                    />
                    <IconButton onClick={() => remove(index)} color="error" sx={{ ml: 2 }}>
                        <Remove />
                    </IconButton>
                </Box>
            ))}

            <Button onClick={() => append('')} variant="contained">
                Добавить заметку
            </Button>

            {/* <Box mt={4}>
                <Typography variant="h6">Notes</Typography>
                {fields.map((field, index) => (
                    <Box key={field.id} display="flex" alignItems="center" mt={2}>
                        <TextField
                            label={`Note ${index + 1}`}
                            {...register(`notes.${index}.note` as const, { required: true })}
                            fullWidth
                            multiline
                            rows={3}
                            sx={{ mb: '20px' }}
                        />
                        <IconButton onClick={() => remove(index)} color="error" sx={{ ml: 2 }}>
                            <Remove />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    startIcon={<Add />}
                    onClick={() => append({ note: '' })}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Add Note
                </Button>
            </Box> */}

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
                {mutation.status === 'pending' && <Typography color="info.main">Loading...</Typography>}
                {mutation.isError && (
                    <Typography color="error.main">
                        Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
                    </Typography>
                )}
                {mutation.isSuccess && <Typography color="success.main">Form submitted successfully! {String(mutation.data)}</Typography>}
            </Box>
        </Box>

    );
};

export default ClientsAddForm;
