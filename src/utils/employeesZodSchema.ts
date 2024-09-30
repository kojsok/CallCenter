import { z } from 'zod';

const contactsSchema = z.object({
  phone: z.string().min(1, { message: "Телефон не может быть пустым" }),
  email: z.string().email({ message: "Неверный формат email" }),
});

const employeSchema = z.object({
  id: z.string().min(4, { message: "ID должен состоять минимум из 4 символов" }),
  name: z.string().min(1, { message: "Имя не может быть пустым" }),
  age: z.number().int().nonnegative({ message: "Возраст должен быть положительным целым числом" }),
  image: z.string().url({ message: "Неверный URL изображения" }),
  contacts: contactsSchema,
  languages: z.array(z.string().min(1, { message: "Язык не может быть пустым" })),
  gender: z.enum(['male', 'female', 'diverse'], { 
    errorMap: () => ({ message: "Пол должен быть 'male', 'female' или 'other'" }) 
  }),
  position: z.string().min(1, { message: "Должность не может быть пустой" }),
  status: z.enum(['free', 'on-break'], { 
    errorMap: () => ({ message: "Статус должен быть 'free' или 'on-break'" }) 
  }),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "createdAt должен быть валидной датой в формате ISO",
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "updatedAt должен быть валидной датой в формате ISO",
  }),
});

export const employeesSchema = z.array(employeSchema);

export type Contacts = z.infer<typeof contactsSchema>;

export type Employee = z.infer<typeof employeSchema>;

export type Employees = z.infer<typeof employeesSchema>;
