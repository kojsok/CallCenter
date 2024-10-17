import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRoutes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { checkAuth } from './store/authSlices/authSlice';
import { AppDispatch } from './store/store';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth())
  })
  return (
    <RouterProvider router={router} />
  )
}
export default App
