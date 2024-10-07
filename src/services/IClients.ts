
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