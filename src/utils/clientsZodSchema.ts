import { z } from "zod";

const contactsSchema = z.object({
  phone: z.string().min(1, { message: "Телефон не может быть пустым" }),
  email: z.string().email({ message: "Неверный формат email" }),
});

export const clientSchema = z.object({
  id: z
    .string()
    .min(4, { message: "ID должен состоять минимум из 4 символов" }),
  firstName: z.string().min(1, { message: "Имя не может быть пустым" }),
  lastName: z.string().min(1, { message: "Фамилия не может быть пустым" }),
  age: z
    .number()
    .int()
    .nonnegative({ message: "Возраст должен быть положительным целым числом" }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message: "Пол должен быть 'male', 'female' или 'other'",
    }),
  }),
  image: z.string().url({ message: "Неверный URL изображения" }),
  contacts: contactsSchema,
  notes: z
    .array(z.string())
    .min(1, { message: "Должен быть хотя бы один комментарий." }),
  interactionsCount: z.number().int().nonnegative({
    message: "Количество взаимедействий должно быть положительным целым числом",
  }),
  lastInteractionDate: z.string().datetime(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "createdAt должен быть валидной датой в формате ISO",
  }),
  status: z.enum([
    "VIP",
    "active",
    "new",
    "problematic",
    "inactive",
    "regular",
  ]),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "updatedAt должен быть валидной датой в формате ISO",
  }),
});

export const clientsSchema = z.array(clientSchema);

//схема объекта клиента для отправки на сервер
export const addClientSchema = clientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Clients = z.infer<typeof clientsSchema>; // массив обьектов

export type ClientReceivingData = z.infer<typeof clientSchema>; //для форм читсый обьект

export type AddClientFormData = z.infer<typeof addClientSchema>; //тип объекта для отправки клиента на сервер (сервер сам добавляет поля id, createdeAt, updatedAt)
export type EditClientFormData = Partial<AddClientFormData>;
