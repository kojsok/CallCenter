import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallsData, addCall, updateCall, removeCall, clearError } from '@/store/callSlice';
import { RootState, AppDispatch } from '@/store/store';
import { CallRecord } from '@/utils/callsZodSchema';

const CallsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Выбор состояния из Redux Store
  const calls = useSelector((state: RootState) => state.calls.data);
  const status = useSelector((state: RootState) => state.calls.status);
  const error = useSelector((state: RootState) => state.calls.error);

  // Получение данных при монтировании компонента
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCallsData());
    }
  }, [status, dispatch]);

  // Обработчики для синхронных действий
  const handleAddCall = () => {
    const newCall: CallRecord = {
      id: 'new-id', // Генерация уникального ID должна быть более надежной
      status: 'completed_success',
      type: 'incoming',
      state: 'accepted',
      employeeId: 'employee-1',
      agentComment: 'Комментарий',
      feedbackScore: 5,
      callMood: 'positive',
     //доделать


 
    };
    dispatch(addCall(newCall));
  };

  const handleUpdateCall = (updatedCall: CallRecord) => {
    dispatch(updateCall(updatedCall));
  };

  const handleRemoveCall = (id: string) => {
    dispatch(removeCall(id));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div>
      <h1>Список Звонков</h1>

      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'failed' && (
        <div>
          <p>Ошибка: {error}</p>
          <button onClick={handleClearError}>Закрыть</button>
        </div>
      )}
      {status === 'succeeded' && (
        <ul>
          {calls.map((call) => (
            <li key={call.id}>
              <p>Звонок от: {call.employeeId}</p>
              <p>Время: {new Date(call.duration).toLocaleString()}</p>
              <p>Длительность: {call.feedbackScore} секунд</p>
              <button onClick={() => handleRemoveCall(call.id)}>Удалить</button>
              {/* Добавьте кнопку или форму для обновления звонка */}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleAddCall}>Добавить Звонок</button>
    </div>
  );
};

export default CallsList;