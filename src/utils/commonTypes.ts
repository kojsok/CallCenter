import { UseFormReset } from "react-hook-form";
import { AddClientFormData, ClientStatus } from "./schemasTypes";

//интерфейс квери параметров для фильтрации клиентов
export interface FilterQueryParams {
  q?: string;
  status?: ClientStatus;
}

//тип хука мутации формы отправки/редактирования
export type UseClientMutation<T> = (
  setResponseMessage: React.Dispatch<React.SetStateAction<string>>,
  reset: UseFormReset<AddClientFormData>
) => T;
