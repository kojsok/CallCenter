import { z } from "zod";

export const authDataSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(["agent", "manager", "admin", "user"]),
  employeeId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const empolyeeDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  image: z.string(),
  contacts: z.object({
    phone: z.string().min(1, { message: "Телефон не может быть пустым" }),
    email: z.string().email({ message: "Неверный формат email" }),
  }),
  languages: z.string().optional().array(),
  gender: z.enum(["male", "female"]),
  position: z.string(),
  status: z.enum(["free", "on-break", "busy"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const profileSchema = z.object({
  auth_data: authDataSchema,
  employee_data: empolyeeDataSchema,
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(5),
});

export const loginResponseSchema = z.object({
  accesToken: z.string().length(36),
});
