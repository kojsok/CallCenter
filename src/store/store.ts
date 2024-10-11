import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import clientsReducer from "./clientsSlices/clientsSlice";
import switcherReducer from "./clientsSlices/switcherSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    clients: clientsReducer,
    switcher: switcherReducer,
  },
});

// Типы для Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
