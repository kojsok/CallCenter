import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient, Client } from '../../clientsSlice';
import { v4 as uuidv4 } from 'uuid';

const AddClientForm: React.FC = () => {
  const dispatch = useDispatch();

  // Состояния для полей формы
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('other');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState<string>('');
  const [status, setStatus] = useState<'VIP' | 'New' | 'Regular'>('New');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Создание объекта нового клиента
    const newClient: Client = {
      id: uuidv4(),
      firstName,
      lastName,
      age,
      gender,
      image: image || 'https://via.placeholder.com/150', // Запасной URL изображения
      contacts: {
        phone,
        email,
      },
      notes: notes.split('\n').filter(note => note.trim() !== ''), // Разделение заметок по строкам
      interactionsCount: 0,
      lastInteractionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status,
      updatedAt: new Date().toISOString(),
    };

    // Диспатч действия добавления клиента
    dispatch(addClient(newClient));

    // Очистка формы
    setFirstName('');
    setLastName('');
    setAge(0);
    setGender('other');
    setImage('');
    setPhone('');
    setEmail('');
    setNotes('');
    setStatus('New');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Добавить нового клиента</h2>

      <div style={fieldStyle}>
        <label>Имя:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div style={fieldStyle}>
        <label>Фамилия:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div style={fieldStyle}>
        <label>Возраст:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
          min={0}
        />
      </div>

      <div style={fieldStyle}>
        <label>Пол:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value as any)}>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label>URL изображения:</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div style={fieldStyle}>
        <label>Телефон:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern="^\+?\d{10,15}$"
          placeholder="+1234567890"
        />
      </div>

      <div style={fieldStyle}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@domain.com"
        />
      </div>

      <div style={fieldStyle}>
        <label>Заметки (каждая заметка с новой строки):</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Введите заметки..."
        ></textarea>
      </div>

      <div style={fieldStyle}>
        <label>Статус:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option value="VIP">VIP</option>
          <option value="New">Новый</option>
          <option value="Regular">Обычный</option>
        </select>
      </div>

      <button type="submit" style={buttonStyle}>Добавить клиента</button>
    </form>
  );
};

// Простые стили для формы
const formStyle: React.CSSProperties = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AddClientForm;