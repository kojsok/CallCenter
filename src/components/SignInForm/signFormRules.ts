export const signFormRules = {
  username: {
    required: "Username is required", // Обязательное поле
    min: {
      value: 3,
      message: "Minimum 3 symbols",
    },
  },
  password: {
    required: "Password is required", // Обязательное поле
    min: {
      value: 6,
      message: "Minimum 6 symbols",
    },
  },
};
