import { getCallsAxios } from './api/fetchCalls';
import './App.css'
import SearchAppBar from './components/SearchAppBar/SearchAppBar'


function App() {
  // console.log(getCallsAxios()); // 

  const fetchCalls = async () => {
    const calls = await getCallsAxios(); // Ждём выполнения промиса
    console.log(calls); // Теперь это уже данные
};

fetchCalls();

  return (
    <>
      <SearchAppBar />
    </>
  )
}
export default App
