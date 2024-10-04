import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './employeesSlice';
import clientsReducer from './clientsSlice';



export const store = configureStore({
    reducer: {
      employees: employeesReducer,
      clients: clientsReducer,
    },
  });
  
  // Типы для Redux
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;