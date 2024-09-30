import { useEffect } from 'react';
import './App.css'
import SearchAppBar from './components/SearchAppBar/SearchAppBar'
import { useEmploeesData } from './hooks/useEmploeesData';
import { getEmployeesAxios } from './api/fetchEmploees';
import { Container } from '@mui/material';


function App() {

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const employees = await getEmployeesAxios();
        console.log(employees); // Logs the call data
      } catch (error) {
        console.error('Failed to fetch calls:', error);
      }
    };

    fetchCalls();
  }, []);


  const { data, error, isLoading } = useEmploeesData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;


  return (
    <>
      <SearchAppBar />
      <Container maxWidth="sm" className='mt-6'>
      <div className="employees-list p-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employees</h2>
        {data && data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((employee) => (
              <li
                key={employee.id}
                className="p-4 bg-white/30 backdrop-blur-lg rounded-lg shadow-md border border-gray-200"
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
      </Container>


    </>
  )
}
export default App
