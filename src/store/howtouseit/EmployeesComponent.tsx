import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addEmployee, updateEmployee, deleteEmployee, IEmployee } from '../employeesSlice';
import { v4 as uuidv4 } from 'uuid';

// Компонент для управления сотрудниками
const EmployeeManager: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employees);

  // Локальное состояние для добавления нового сотрудника
  const [newEmployee, setNewEmployee] = useState<Partial<IEmployee>>({
    name: '',
    age: 0,
    image: '',
    contacts: { phone: '', email: '' },
    languages: [],
    gender: '',
    position: '',
    status: 'free',
  });

  // Локальное состояние для редактирования сотрудника
  const [editEmployeeId, setEditEmployeeId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<IEmployee>>({});

  // Обработчик изменения ввода при добавлении нового сотрудника
  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик добавления нового сотрудника
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.age) {
      const employee: IEmployee = {
        id: uuidv4(),
        name: newEmployee.name,
        age: newEmployee.age,
        image: newEmployee.image || '',
        contacts: newEmployee.contacts || { phone: '', email: '' },
        languages: newEmployee.languages || [],
        gender: newEmployee.gender || '',
        position: newEmployee.position || '',
        status: newEmployee.status || 'free',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addEmployee(employee));
      setNewEmployee({
        name: '',
        age: 0,
        image: '',
        contacts: { phone: '', email: '' },
        languages: [],
        gender: '',
        position: '',
        status: 'free',
      });
    }
  };

  // Обработчик удаления сотрудника
  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  // Обработчик инициации редактирования
  const handleEdit = (employee: IEmployee) => {
    setEditEmployeeId(employee.id);
    setEditData(employee);
  };

  // Обработчик изменения ввода при редактировании сотрудника
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик сохранения отредактированного сотрудника
  const handleSave = () => {
    if (editEmployeeId && editData) {
      dispatch(updateEmployee({ id: editEmployeeId, data: editData }));
      setEditEmployeeId(null);
      setEditData({});
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Управление Сотрудниками</h1>

      {/* Форма добавления нового сотрудника */}
      <div style={{ marginBottom: '40px' }}>
        <h2>Добавить Нового Сотрудника</h2>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={newEmployee.name}
          onChange={handleAddChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Возраст"
          value={newEmployee.age}
          onChange={handleAddChange}
        />
        <input
          type="text"
          name="image"
          placeholder="URL изображения"
          value={newEmployee.image}
          onChange={handleAddChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Телефон"
          value={newEmployee.contacts?.phone}
          onChange={(e) =>
            setNewEmployee((prev) => ({
              ...prev,
              //TODO: contacts: { ...prev.contacts, email: e.target.value }, тутт надо будет поработать с типами
              contacts: { ...prev.contacts, email: prev.contacts?.email || '', phone: e.target.value },
            }))
          }
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.contacts?.email}
          onChange={(e) =>
            setNewEmployee((prev) => ({
              ...prev,
              //TODO: contacts: { ...prev.contacts, email: e.target.value }, тутт надо будет поработать с типами
              contacts: { ...prev.contacts, email: prev.contacts?.email || '', phone: e.target.value },
            }))
          }
        />
        <input
          type="text"
          name="gender"
          placeholder="Пол"
          value={newEmployee.gender}
          onChange={handleAddChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Должность"
          value={newEmployee.position}
          onChange={handleAddChange}
        />
        <button onClick={handleAddEmployee}>Добавить Сотрудника</button>
      </div>

      {/* Список сотрудников */}
      <div>
        <h2>Список Сотрудников</h2>
        {employees.length === 0 ? (
          <p>Нет доступных сотрудников.</p>
        ) : (
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Изображение</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Пол</th>
                <th>Должность</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) =>
                editEmployeeId === employee.id ? (
                  <tr key={employee.id}>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="age"
                        value={editData.age || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="image"
                        value={editData.image || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phone"
                        value={editData.contacts?.phone || ''}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            //TODO: contacts: { ...prev.contacts, email: e.target.value }, тутт надо будет поработать с типами
                            contacts: { ...prev.contacts, email: prev.contacts?.email || '', phone: e.target.value },
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editData.contacts?.email || ''}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            //TODO: contacts: { ...prev.contacts, email: e.target.value }, тутт надо будет поработать с типами
                            contacts: { ...prev.contacts, email: prev.contacts?.email || '', phone: e.target.value },
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="gender"
                        value={editData.gender || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="position"
                        value={editData.position || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>{employee.status}</td>
                    <td>
                      <button onClick={handleSave}>Сохранить</button>
                      <button onClick={() => setEditEmployeeId(null)}>Отмена</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.age}</td>
                    <td>
                      <img src={employee.image} alt={employee.name} width="50" />
                    </td>
                    <td>{employee.contacts.phone}</td>
                    <td>{employee.contacts.email}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.position}</td>
                    <td>{employee.status}</td>
                    <td>
                      <button onClick={() => handleEdit(employee)}>Редактировать</button>
                      <button onClick={() => handleDelete(employee.id)}>Удалить</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeManager;