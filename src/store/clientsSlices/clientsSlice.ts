import { FilterQueryParams } from "@/utils/commonTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AddClientFormData, ClientReceivingData } from "@/utils/schemasTypes";
// import { ClientReceivingData } from "@/utils/schemasTypes";

interface ClientsState {
  filters: FilterQueryParams;
  activeClientId: string;
  activeClient: AddClientFormData | null;
}

const initialState: ClientsState = {
  filters: {},
  activeClientId: "",
  activeClient: null,
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
    changeActiveClientId: (state, action: PayloadAction<string>) => {
      state.activeClientId = action.payload;
    },
    //кэшируем объект активного клиента
    saveActiveClient: (state, action: PayloadAction<ClientReceivingData>) => {
      //убираем из объекта клиента ненужные поля, т.к. этот объект будет использоваться в качестве дефолтного для формы редактирования
      const {
        firstName,
        lastName,
        age,
        gender,
        image,
        contacts,
        notes,
        interactionsCount,
        lastInteractionDate,
        status,
      } = action.payload;

      state.activeClient = {
        firstName,
        lastName,
        age,
        gender,
        image,
        contacts,
        notes,
        interactionsCount,
        status,
        lastInteractionDate: new Date(lastInteractionDate).toLocaleDateString(
          "en-CA"
        ),
      };
    },
    //очищаем данные о активном клиенте id и его объект
    clearActiveClient: (state) => {
      state.activeClientId = "";
      state.activeClient = null;
    },
  },
});

export const {
  setFilters,
  changeActiveClientId,
  saveActiveClient,
  clearActiveClient,
} = clientsSlice.actions;

export default clientsSlice.reducer;

//экспортируем селекторы (инкапсуляция логики выборки данных из состояния)
export const selectFilters = (state: RootState) => state.clients.filters;

export const selectActiveClientId = (state: RootState) =>
  state.clients.activeClientId;

export const selectActiveClient = (state: RootState) =>
  state.clients.activeClient;
