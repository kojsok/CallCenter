import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClient, updateClient, deleteClient, Client } from '../../store/clientsSlice';
import { v4 as uuidv4 } from 'uuid'; // Для генерации уникальных ID
import { RootState, AppDispatch } from '../store'; // Импорт типов
import { Box } from '@mui/material';
import { useClientsData } from '@/hooks/useClientsData';


const ClientsComponent: React.FC = () => {
  // Использование useSelector(получение состояния по умолчанию) с типом RootState  из clientsSlice  из initialState
  const clients = useSelector((state: RootState) => state.clients.clients);

  // Использование useDispatch с типом AppDispatch из clientsSlice - для обновления сотояния стейта (диспатч)
  const dispatch = useDispatch<AppDispatch>();

  // Использование useClientsData для запроса данных с сервера
  const { data: clientsData, error } = useClientsData();
  console.log(clientsData, error);


  const handleAddClient = () => {
    const newClient: Client = {
      id: uuidv4(),
      firstName: 'Новое',
      lastName: 'Имя',
      age: 25,
      gender: 'male',
      image: 'https://example.com/image.jpg',
      contacts: {
        phone: '+1234567890',
        email: 'newclient@example.com',
      },
      notes: [],
      interactionsCount: 0,
      lastInteractionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'New',
      updatedAt: new Date().toISOString(),
    };
    dispatch(addClient(newClient));
  };

  const handleUpdateClient = (id: string) => {
    const updatedData: Partial<Client> = {
      firstName: 'Обновленное',
      age: 35,
    };
    dispatch(updateClient({ id, data: updatedData }));
  };

  const handleDeleteClient = (id: string) => {
    dispatch(deleteClient(id));
  };

  return (
    <Box className="flex flex-col border-2 rounded-2xl border-primary-light grow">
      <h1 className="text-red-600">Тут пример работы данных со стейтом локально из стейта</h1>
      <button className='m-4 text-app bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110' onClick={handleAddClient}>Добавить клиента</button>
      <ul>
        {clients.map((client) => (
          <li className="flex-col text-app" key={client.id}>
            {client.firstName} {client.lastName} - {client.age} лет
            <button className='m-4 text-app bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110' onClick={() => handleUpdateClient(client.id)}>Обновить</button>
            <button className='m-4 text-app bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110' onClick={() => handleDeleteClient(client.id)}>Удалить</button>
          </li>
        ))}
      </ul>

        <h1 className="text-red-600">Тут пример получения данных с сервера</h1>
        <ul>
        {clientsData &&clientsData.map((serverClient, index) => (
          <li className="flex-col text-app" key={index}>
            {serverClient.firstName} {serverClient.lastName} - {serverClient.age} лет
          </li>
        ))}
      </ul>

    </Box>
  );
};

export default ClientsComponent;