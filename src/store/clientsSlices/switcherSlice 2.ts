import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { changeActiveClientId, clearActiveClient } from "./clientsSlice";

export type ActiveComponent =
  | "client-card"
  | "empty-card"
  | "edit-form"
  | "add-form";

interface SwitcherState {
  activeComponent: ActiveComponent;
}
const initialState: SwitcherState = {
  activeComponent: "empty-card",
};

const switcherSlice = createSlice({
  name: "switcher",
  initialState,
  reducers: {
    setActiveComponent: (state, action: PayloadAction<ActiveComponent>) => {
      state.activeComponent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // При обнулении данных об активном клиенте в clientsSlice будет отрисовываться пустая карточка
    builder.addCase(clearActiveClient, (state) => {
      state.activeComponent = "empty-card";
    });
    // При смене id активного клиента в clientsSlice, будет отрисовываться карточка с данными клиента
    builder.addCase(changeActiveClientId, (state) => {
      state.activeComponent = "client-card";
    });
  },
});

export const { setActiveComponent } = switcherSlice.actions;
export default switcherSlice.reducer;

export const selectActiveComponent = (state: RootState) =>
  state.switcher.activeComponent;
