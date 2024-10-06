// export interface IClients {
//     id: string;
//     firstName: string;
//     lastName: string;
//     age: number;
//     gender: 'female' | 'male' | 'other'; //тут должен enum
//     image: string;
//     contacts: {
//       phone: string;
//       email: string;
//     };
//     notes: { note: string }[];
//     interactionsCount: number;
//     lastInteractionDate: string;
//     createdAt: string;
//     status: 'VIP' |  'active' | 'new' | 'problematic' | 'inactive'| 'regular'; //тут должен enum
//     updatedAt: string;
//   }

// Определение перечисления Gender
// export enum Gender {
//     Female = 'female',
//     Male = 'male',
//     Other = 'other',
// }

// Определение перечисления Status
// export enum Status {
//     VIP = 'VIP',
//     Active = 'active',
//     New = 'new',
//     Problematic = 'problematic',
//     Inactive = 'inactive',
//     Regular = 'regular',
// }

// Обновленный интерфейс IClients с использованием перечислений
export interface IClients {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string; // Обновлено до использования Gender enum
    image: string;
    contacts: {
        phone: string;
        email: string;
    };
    // notes: { note: string }[];
    notes: string[];
    interactionsCount: number;
    lastInteractionDate: string;
    createdAt: string;
    status: string; // Обновлено до использования Status enum
    updatedAt: string;
}