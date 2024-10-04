import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { deleteClient, updateClient, Client } from '../../store/clientsSlice';

const ClientList: React.FC = () => {
  const clients = useSelector((state: RootState) => state.clients.clients);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id));
  };

  const handleUpdateStatus = (id: string, status: Client['status']) => {
    dispatch(updateClient({ id, data: { status, updatedAt: new Date().toISOString() } }));
  };

  return (
    <div style={listContainerStyle}>
      <h2>Список клиентов</h2>
      {clients.length === 0 ? (
        <p>Клиентов нет.</p>
      ) : (
        <ul style={listStyle}>
          {clients.map((client) => (
            <li key={client.id} style={listItemStyle}>
              <img
                src={client.image}
                alt={`${client.firstName} ${client.lastName}`}
                style={imageStyle}
              />
              <div style={clientInfoStyle}>
                <strong>{client.firstName} {client.lastName}</strong> (Возраст: {client.age}, Пол: {client.gender})
                <p>Email: {client.contacts.email}</p>
                <p>Телефон: {client.contacts.phone}</p>
                <p>Статус: {client.status}</p>
                <p>Заметки:</p>
                <ul>
                  {client.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
                <p>Последнее взаимодействие: {new Date(client.lastInteractionDate).toLocaleString()}</p>
                <p>Создано: {new Date(client.createdAt).toLocaleString()}</p>
                <p>Обновлено: {new Date(client.updatedAt).toLocaleString()}</p>
              </div>
              <div style={buttonContainerStyle}>
                <button onClick={() => handleDelete(client.id)} style={deleteButtonStyle}>Удалить</button>
                {/* Пример обновления статуса */}
                {client.status !== 'VIP' && (
                  <button onClick={() => handleUpdateStatus(client.id, 'VIP')} style={updateButtonStyle}>Сделать VIP</button>
                )}
                {client.status !== 'Regular' && (
                  <button onClick={() => handleUpdateStatus(client.id, 'Regular')} style={updateButtonStyle}>Сделать Обычным</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Простые стили для списка
const listContainerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
};

const listStyle: React.CSSProperties = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  borderBottom: '1px solid #ddd',
  padding: '10px 0',
};

const imageStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '50%',
  marginRight: '20px',
};

const clientInfoStyle: React.CSSProperties = {
  flex: 1,
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '5px 10px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '5px',
};

const updateButtonStyle: React.CSSProperties = {
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '5px',
};

export default ClientList;