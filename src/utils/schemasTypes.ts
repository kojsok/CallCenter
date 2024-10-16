import { z } from "zod";
import {
  clientsSchema,
  clientSchema,
  addClientSchema,
} from "./clientsZodSchema";
import {
  authDataSchema,
  empolyeeDataSchema,
  profileSchema,
} from "./authZodSchemas";

//выведенные типы из схем по клиентам
export type Clients = z.infer<typeof clientsSchema>; // массив обьектов

export type ClientReceivingData = z.infer<typeof clientSchema>; //для форм читсый обьект

export type AddClientFormData = z.infer<typeof addClientSchema>; //тип объекта для отправки клиента на сервер (сервер сам добавляет поля id, createdeAt, updatedAt)
export type EditClientFormData = Partial<AddClientFormData>;

export type ClientStatus = z.infer<typeof clientSchema.shape.status>;

// выведенные типы из схем по профилю пользователя
export type Profile = z.infer<typeof profileSchema>;
export type AuthData = z.infer<typeof authDataSchema>;
export type EmployeeData = z.infer<typeof empolyeeDataSchema>;
