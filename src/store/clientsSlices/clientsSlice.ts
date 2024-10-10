import { FilterQueryParams } from "@/utils/commonTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ClientsState {
  filters: FilterQueryParams;
  activeClientId: string | null;
}

const initialState: ClientsState = {
  filters: {},
  activeClientId: null,
};

//в слайсе храним параметры фильтрации по клиентам и id активного клиента
const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    //обновление параметров фильтрации
    setFilters: (state, action: PayloadAction<FilterQueryParams>) => {
      state.filters = action.payload;
    },
    // обновление активного клиента
    changeActiveClientId: (
      state,
      action: PayloadAction<{ id: string | null }>
    ) => {
      state.activeClientId = action.payload.id;
    },
  },
});

export const { setFilters, changeActiveClientId } = clientsSlice.actions;

export default clientsSlice.reducer;

//экспортируем селекторы (инкапсуляция логики выборки данных из состояния)
export const selectFilters = (state: RootState) => state.clients.filters;

export const selectActiveClientId = (state: RootState) =>
  state.clients.activeClientId;
