import { getCallsAxios } from "@/api/callsApi";
import { CallRecord, CallRecords } from "@/utils/callsZodSchema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// Определяем структуру состояния слайса
interface CallsState {
    data: CallRecords;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Начальное состояние, соответствующее интерфейсу CallsState
const initialState: CallsState = {
    data: [],
    status: 'idle',
    error: null,
};

// Асинхронный thunk для получения данных о клиентах

// Первый параметр (_) — это аргумент, который вы передаёте при вызове dispatch(fetchCallsData()). 
// В данном случае он не используется, поэтому обозначен как _.
// Второй параметр ({ rejectWithValue }) — это объект thunkAPI, предоставляемый Redux Toolkit, 
// который содержит полезные методы, такие как dispatch, getState, rejectWithValue и другие.
export const fetchCallsData = createAsyncThunk('calls/fetchCallsData', // Id отображается в dev tools и должен быть уникальный у каждого thunk
    async (_, { rejectWithValue }) => {
        try {
            const data = await getCallsAxios();
            return data;
        } catch (error) {
            // Предполагается, что getClientsAxios выбрасывает ошибки с информацией
            // return rejectWithValue(error.message || 'Не удалось получить данные о звонках');
            if (error instanceof Error) {
                return rejectWithValue(error.message || 'Не удалось получить данные о звонках');
            } else {
                return rejectWithValue('Не удалось получить данные о звонках');
            }
        }
    }
);

const callsSlice = createSlice({
    name: 'calls',
    initialState,
    reducers: {
        // Добавьте синхронные редьюсеры, если необходимо
        // 1. Добавление нового звонка
        addCall: (state, action: PayloadAction<CallRecord>) => {
            state.data.push(action.payload);
        },
        // 2. Обновление существующего звонка
        updateCall: (state, action: PayloadAction<CallRecord>) => {
            const index = state.data.findIndex(call => call.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        // 3. Удаление звонка
        removeCall: (state, action: PayloadAction<string>) => { // предполагается, что ID звонка строковый
            state.data = state.data.filter(call => call.id !== action.payload);
        },
        // 4. Сброс состояния к начальному
        resetCallsState: () => initialState,
        // 5. Очистка ошибки
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCallsData.pending, (state) => {
            state.status = 'loading';
            state.error = null; // Сбрасываем ошибку при новом запросе
        })
            .addCase(fetchCallsData.fulfilled, (state, action: PayloadAction<CallRecords>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                // state.data.push(action.payload)
            })
            .addCase(fetchCallsData.rejected, (state, action) => {
                state.status = 'failed';
                // action.payload содержит пользовательское сообщение об ошибке из rejectWithValue
                state.error = (action.payload as string) || action.error.message || 'Неизвестная ошибка';
            });
    },
});


// Экспортируем синхронные действия
export const { addCall, updateCall, removeCall, resetCallsState, clearError } = callsSlice.actions;

// Экспортируем редьюсер слайса
export default callsSlice.reducer;

//addCall:
// Описание: Добавляет новый звонок в список data.
// Использование: dispatch(addCall(newCall));
// Параметр: newCall — объект типа CallRecord.

// updateCall:
// Описание: Обновляет существующий звонок в списке data на основе его id.
// Использование: dispatch(updateCall(updatedCall));
// Параметр: updatedCall — объект типа CallRecord, содержащий обновленные данные и существующий id.

// removeCall:
// Описание: Удаляет звонок из списка data по id.
// Использование: dispatch(removeCall(callId));
// Параметр: callId — строка, представляющая id звонка, который нужно удалить.

// resetCallsState:
// Описание: Сбрасывает состояние слайса к начальному состоянию.
// Использование: dispatch(resetCallsState());

// clearError:
// Описание: Очищает поле error в состоянии.
// Использование: dispatch(clearError());


// Использование useDispatch для отправки асинхронных и синхронных действий.
// Использование useSelector для выбора данных из состояния.
// Отображение состояния загрузки, данных и ошибок в компоненте.