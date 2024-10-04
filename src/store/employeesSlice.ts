import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IEmployee {
    id: string
    name: string
    age: number
    image: string
    contacts: Contacts
    languages: string[]
    gender: string
    position: string
    status: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Contacts {
    phone: string
    email: string
  }

  // Определяем интерфейс для обновления сотрудника
interface UpdateEmployeePayload {
    id: string;
    data: Partial<IEmployee>; // Часть данных сотрудника, которые нужно обновить
}

const initialState: IEmployee[] = [
    {
        "id": "f9d9cea1263da0faaf040d61991a3c16",
        "name": "Jonny Dixon",
        "age": 22,
        "image": "https://avatars.githubusercontent.com/u/66655051",
        "contacts": {
          "phone": "+28-1624-10484833",
          "email": "merrilee.hagey@hotmail.com"
        },
        "languages": [
          "Inuktitut",
          "Italian"
        ],
        "gender": "female",
        "position": "Department Manager",
        "status": "free",
        "createdAt": "2024-04-09T01:14:20.364Z",
        "updatedAt": "2024-09-07T16:00:53.339Z"
      }
]


const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<IEmployee>) => {
        state.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<UpdateEmployeePayload>) => {
        const { id, data } = action.payload;
        const employeeIndex = state.findIndex((employee) => employee.id === id);
        if (employeeIndex !== -1) {
            state[employeeIndex] = {
                ...state[employeeIndex], // Сохраняем существующие данные
                ...data, // Обновляем данные из action.payload
                updatedAt: new Date().toISOString(), // Обновляем поле времени обновления
            };
        }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
        return state.filter((employee) => employee.id !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;

// export const selectAllTasks = (state: RootState) => state.employees;

//Использование:
//Добавление сотрудника, пример:
//dispatch(addEmployee(newEmployee));
// const newEmployee = {
//     id: 'abc123',
//     name: 'Alice Johnson',
//     age: 30,
//     image: 'https://example.com/avatar.jpg',
//     contacts: {
//       phone: '+1-555-555-5555',
//       email: 'alice.johnson@example.com',
//     },
//     languages: ['English', 'Spanish'],
//     gender: 'female',
//     position: 'Software Engineer',
//     status: 'active',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };

//Обновление данных сотрудника, пример:
//dispatch(updateEmployee({ id: 'f9d9cea1263da0faaf040d61991a3c16', data: { name: 'John Doe', position: 'CEO' } }));

// Удаление сотрудника по его id, например:
// dispatch(deleteEmployee('f9d9cea1263da0faaf040d61991a3c16'));