
import { CallRecords, callRecordsSchema } from "@/utils/callsZodSchema";
import axios from "axios";

export const getCallsAxios = async (): Promise<CallRecords> => {
    const response = await axios.get('http://kojs.ru:4000/calls');
        // Валидируем массив данных с помощью Zod
    return callRecordsSchema.parse(response.data);
  };