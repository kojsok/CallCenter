//интерфейс квери параметров для фильтрации клиентов

export interface FilterQueryParams {
  q?: string;
  status?: "new" | "VIP" | "active" | "inactive" | "problematic";
}
