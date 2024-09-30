import { Employees, employeesSchema } from "@/utils/employeesZodSchema";
import axios from "axios";

export const getEmployeesAxios = async (): Promise<Employees> => {
    const response = await axios.get('http://kojs.ru:4000/employees');
        // Валидируем массив данных с помощью Zod
    return employeesSchema.parse(response.data);
  };


//   console.log(getEmployeesAxios()); // getEmployeesAxios
// const result = callRecordSchema.safeParse(yourData);