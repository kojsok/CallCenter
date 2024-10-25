import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contacts {
    phone: string;
    email: string;
  }
  
  export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    image: string;
    contacts: Contacts;
    notes: string[];
    interactionsCount: number;
    lastInteractionDate: string; // ISO строка
    createdAt: string; // ISO строка
    status: 'VIP' | 'New' | 'Regular'; // Добавьте необходимые статусы
    updatedAt: string; // ISO строка
  }
  
  export interface ClientsState {
    clients: Client[];
  }

  const initialState: ClientsState = {
    clients: [
      {
        id: '2de7da2488644307b4181a578788cc5b',
        firstName: 'Sherika',
        lastName: 'Imada',
        age: 33,
        gender: 'female',
        image: 'https://avatars.githubusercontent.com/u/27212968',
        contacts: {
          phone: '+39-1526-12154525',
          email: 'singegroovy@icloud.com',
        },
        notes: [
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat',
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat',
          'At vero eos et accusam et justo duo dolores et ea rebum',
        ],
        interactionsCount: 7,
        lastInteractionDate: '2024-08-20T00:34:34.825Z',
        createdAt: '2024-06-06T05:09:31.706Z',
        status: 'VIP',
        updatedAt: '2024-08-05T10:39:02.074Z',
      },
    ],
  };

  const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
      // Добавление клиента
      addClient: (state, action: PayloadAction<Client>) => {
        state.clients.push(action.payload);
      },
      // Обновление клиента
      updateClient: (
        state,
        action: PayloadAction<{ id: string; data: Partial<Client> }>
      ) => {
        const { id, data } = action.payload;
        const existingClient = state.clients.find((client) => client.id === id);
        if (existingClient) {
          Object.assign(existingClient, data, { updatedAt: new Date().toISOString() });
        }
      },
      // Удаление клиента
      deleteClient: (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.clients = state.clients.filter((client) => client.id !== id);
      },
    },
  });
  
  // Экспорт действий
  export const { addClient, updateClient, deleteClient } = clientsSlice.actions;
  
  // Экспорт редюсера
  export default clientsSlice.reducer;

