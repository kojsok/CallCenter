import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().min(4, { message: "ID должен состоять минимум из 4 символов" }), // Идентификатор в формате UUID
  username: z.string().min(1, { message: "Имя пользователя не может быть пустым" }), // Имя пользователя
  password: z.string().min(1, { message: "Пароль пользователя не может быть пустым" }), // Пароль (лучше хранить в зашифрованном виде)
  email: z.string().email({ message: "Неверный формат email" }), // Валидная электронная почта
  role: z.enum(['agent', 'manager', 'admin', 'user']), // Возможные роли пользователя
  employeeId: z.string().min(4, { message: "ID должен состоять минимум из 4 символов" }),  //z.string().uuid(), Идентификатор сотрудника в формате UUID
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "createdAt должен быть валидной датой в формате ISO",
  }), //z.string().datetime(),  Дата и время создания
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "updatedAt должен быть валидной датой в формате ISO",
  }),  // z.string().datetime(), // Дата и время последнего обновления
});

export const usersSchema = z.array(userSchema);

export type Users = z.infer<typeof usersSchema>;