export const clientFormRules = {
  firstName: {
    required: "Имя обязательно", // Обязательное поле
    pattern: {
      value: /^[A-Za-zА-Яа-яЁё]+$/i, // Только буквы латиницы и кириллицы
      message: "Имя должно содержать только буквы",
    },
  },
  lastName: {
    required: "Фамилия обязательно", // Обязательное поле
    pattern: {
      value: /^[A-Za-zА-Яа-яЁё]+$/i, // Только буквы латиницы и кириллицы
      message: "Фамилия должна содержать только буквы",
    },
  },
  age: {
    required: "Возраст обязателен",
    min: { value: 0, message: "Возраст не может быть отрицательным" },
    max: { value: 120, message: "Возраст слишком большой" },
  },
  gender: {
    required: "Пол обязателен",
  },
  image: {
    required: "URL изображения обязателен",
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: "Введите корректный URL",
    },
  },
  "contacts.phone": {
    required: "Телефон обязателен",
  },
  "contacts.email": {
    required: "Email обязателен",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Введите корректный email",
    },
  },
  lastInteractionDate: {},
  status: { required: "Статус обязателен" },
  notes: { required: "Поле заметки не может быть пустым" },
};
