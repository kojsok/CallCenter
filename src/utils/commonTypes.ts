import { ClientStatus } from "./schemasTypes";

//интерфейс квери параметров для фильтрации клиентов
export interface FilterQueryParams {
  q?: string;
  status?: ClientStatus;
}
