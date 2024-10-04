import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClient, updateClient, deleteClient, Client } from './clientsSlice';
import { v4 as uuidv4 } from 'uuid'; // Для генерации уникальных ID
import { RootState, AppDispatch } from './store'; // Импорт типов

const ClientsComponent: React.FC = () => {
  // Использование useSelector с типом RootState
  const clients = useSelector((state: RootState) => state.clients.clients);

  // Использование useDispatch с типом AppDispatch
  const dispatch = useDispatch<AppDispatch>();

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
    <div>
      <h1>Клиенты</h1>
      <button onClick={handleAddClient}>Добавить клиента</button>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.firstName} {client.lastName} - {client.age} лет
            <button onClick={() => handleUpdateClient(client.id)}>Обновить</button>
            <button onClick={() => handleDeleteClient(client.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsComponent;