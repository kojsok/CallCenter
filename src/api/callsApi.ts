import { CallRecords, callRecordsSchema } from "@/utils/callsZodSchema";
import { Api, handleError } from "./Api";

//get запрос всех данных о звонках
export const getCallsAxios = async (): Promise<CallRecords> => {
    try {
      const response = await Api.get("/clients");
      // Валидируем массив данных с помощью Zod
      return callRecordsSchema.parse(response.data);
    } catch (error) {
      return handleError(error as Error);
    }
  };