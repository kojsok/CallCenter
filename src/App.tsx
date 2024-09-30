import { getCallsAxios } from './api/fetchCalls';
import './App.css'
import SearchAppBar from './components/SearchAppBar/SearchAppBar'


function App() {
  console.log(getCallsAxios()); // 

  return (
    <>
      <SearchAppBar />
    </>
  )
}
export default App
