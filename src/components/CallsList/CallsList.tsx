import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallsData, addCall, updateCall, removeCall, clearError } from '@/store/callSlice';
import { RootState, AppDispatch } from '@/store/store';
import { CallRecord } from '@/utils/callsZodSchema';
import Button from '@mui/material/Button';

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
      "id": "bdc69d712aeeadeab2782f946cfd6345",
      "type": "outgoing",
      "state": "missed",
      "status": "callback",
      "callMood": "negative",
      "agentComment": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua",
      "feedbackScore": 4,
      "followUpRequired": true,
      "recordUrl": "/records/record01.mp3",
      "clientId": "a209ecb5283c834810c5f65d3a22c057",
      "employeeId": "cf2b06074919b09f6213be8fb14e5a37",
      "start": "2024-05-22T05:57:04.273Z",
      "end": "2024-05-22T06:02:26.273Z",
      "duration": 322
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
      <h1 className="text-app">Список Звонков</h1>

      {status === 'loading' && <p className="text-app">Загрузка...</p>}
      {status === 'failed' && (
        <div>
          <p className="text-app">Ошибка: {error}</p>
          <button className="bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110" onClick={handleClearError}>Закрыть</button>
        </div>
      )}
      {status === 'succeeded' && (
        <ul>
          {calls.slice(0, 2).map((call) => (
            <li key={call.id}>
              <p className="text-app">Звонок от: {call.employeeId}</p>
              <p className="text-app">Время: {new Date(call.duration).toLocaleString()}</p>
              <p className="text-app">Длительность: {call.duration} секунд</p>
              <Button variant="contained"
                sx={{
                  textTransform: "capitalize", borderRadius: '10px', py: {
                    xs: "5px", lg: "10px"
                  }
                }} className="bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110" 
                onClick={() => handleRemoveCall(call.id)}>Удалить</Button>
              {/* Добавьте кнопку или форму для обновления звонка */}
            </li>
          ))}
        </ul>
      )}

      <Button variant="contained"
        sx={{
          textTransform: "capitalize", borderRadius: '10px', py: {
            xs: "5px", lg: "10px"
          }
        }} className="bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110"
         onClick={handleAddCall}>Добавить Звонок</Button>
    </div>
  );
};

export default CallsList;