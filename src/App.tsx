import { useEffect } from 'react';
import './App.css'
import { useEmploeesData } from './hooks/useEmploeesData';
import { getEmployeesAxios } from './api/fetchEmploees';
import { Box, Container } from '@mui/material';
import SideMenu from './components/SideMenu/SideMenu';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import Loader from './components/Loader/Loader';
import PageHeader from './components/PageHeader/PageHeader';
import ClientsFilter from './components/ClientsFilter/ClientsFilter';
import ClientList from './components/ClientsList/ClientList';
import Clients from './Pages/Clients';


function App() {

  // useEffect(() => {
  //   const fetchCalls = async () => {
  //     try {
  //       const employees = await getEmployeesAxios();
  //       console.log(employees); // Logs the call data
  //     } catch (error) {
  //       console.error('Failed to fetch calls:', error);
  //     }
  //   };

  //   fetchCalls();
  // }, []);


  // const { data, error, isLoading } = useEmploeesData();

  // if (isLoading) return <Loader />;
  // if (error) return <p className="flex items-center justify-center min-h-screen text-red-500"> Не возможно подключиться к серверу, проверье соединение. Error: {(error as Error).message}</p>;


  return (
    <>
      <SearchAppBar />
      <Box className="flex">
        <SideMenu />
        <Clients />
      </Box>
      {/* <SearchAppBar />
      <SideMenu /> */}
      {/* <Container maxWidth="sm" className='mt-6'>
        <div className="p-6 rounded-lg shadow-lg employees-list bg-gradient-to-r from-gray-100 via-white to-gray-100 backdrop-blur-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Employees</h2>
          {data && data.length > 0 ? (
            <ul className="space-y-4">
              {data.map((employee) => (
                <li
                  key={employee.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-md bg-white/30 backdrop-blur-lg"
                >
                  <p className="text-lg font-medium text-gray-700">
                    <strong className="text-gray-900">Name:</strong> {employee.name}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="text-gray-900">Gender:</strong> {employee.gender}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="text-gray-900">Status:</strong> {employee.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-500">No employees found.</p>
          )}
        </div>
      </Container> */}


    </>
  )
}
export default App
