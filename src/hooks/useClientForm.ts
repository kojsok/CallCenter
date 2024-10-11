import { postClientsToServer, updateClient } from "@/api/clientsApi";
import { QUERY_KEY_CLIENTS_DATA } from "@/api/queryDatas";
import {
  selectActiveClient,
  selectActiveClientId,
} from "@/store/clientsSlices/clientsSlice";
import { setActiveComponent } from "@/store/clientsSlices/switcherSlice";
import { AddClientFormData } from "@/utils/schemasTypes";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface UpdateClientVariables {
  data: Partial<AddClientFormData>;
  id: string;
}

//начальные данные для формы добавления клиента. все поля пустые. также при
const emptyForm: AddClientFormData = {
  firstName: "",
  lastName: "",
  age: 0,
  gender: "male",
  image: "",
  contacts: {
    phone: "",
    email: "",
  },
  notes: [],
  interactionsCount: 0,
  lastInteractionDate: new Date().toLocaleDateString("en-CA"),
  status: "new",
};

export const useClientForm = (formType: "edit-form" | "add-form") => {
  const activeClient: AddClientFormData | null =
    useSelector(selectActiveClient);
  const activeClientId = useSelector(selectActiveClientId);
  const dispatch = useDispatch();

  const isEditForm = formType === "edit-form";
  // устанавливаем дефолтное значение из стора либо emptyForm
  const defaultValues = isEditForm && activeClient ? activeClient : emptyForm;

  const [responseMessage, setResponseMessage] = useState("");

  // Инициализируем useForm с типизацией и дефолтными значениями
  const {
    control, // Контроллер для интеграции с MUI
    handleSubmit, // Функция для обработки отправки формы
    reset, // Функция для сброса формы
    formState: { errors, isSubmitting }, // Объект с ошибками валидации и состоянием отправки
  } = useForm<AddClientFormData>({
    defaultValues,
  });
  //инициализируем useFieldArray для динамических полей
  const fieldsArrayReg = useFieldArray({
    control,
    name: "notes", // массив данных
  });

  //квери клиент для инвалидации списка клиентов
  const queryClient = useQueryClient();

  // Мутация для отправки данных с использованием поста на сервер
  const addClientMutation = useMutation({
    mutationFn: (data: AddClientFormData) => postClientsToServer(data), //функция отправки на сервер /api/postClientsToServer
    onSuccess: () => {
      setResponseMessage(`Данные успешно отправлены!`);
      // Сброс формы после успешной отправки но нужно сделать у перечисляющих полей значение, чтобы не было ошибки undefined
      reset(emptyForm);
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_CLIENTS_DATA });
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage(`Произошла ошибка при отправке данных.`);
    },
  });

  //Мутация для редактирования клиента
  const editClientMutation = useMutation({
    mutationFn: ({ data, id }: UpdateClientVariables) => updateClient(data, id), //функция отправки на сервер /api/postClientsToServer
    onSuccess: () => {
      dispatch(setActiveComponent("client-card"));
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY_CLIENTS_DATA, activeClientId],
      });
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage(`Произошла ошибка при обновлении данных.`);
    },
  });

  // Обработчик отправки формы через react-hook-form
  const onSubmit = (data: AddClientFormData) => {
    setResponseMessage(""); //делаем state пустым
    const formattedData = {
      ...data,
      age: Number(data.age),
      lastInteractionDate: new Date(data.lastInteractionDate).toISOString(),
    };
    if (isEditForm) {
      editClientMutation.mutate({ data: formattedData, id: activeClientId });
    } else {
      addClientMutation.mutate(formattedData);
    }
    console.log("данные отправлены на сервер:", formattedData);
  };

  return {
    fieldsArrayReg,
    handleSubmit,
    control,
    formErrors: errors,
    isSubmitting,
    responseMessage,
    onSubmit,
    isEditForm,
  };
};
