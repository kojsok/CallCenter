import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Clients from './Pages/Clients';
import Home from './Pages/Home';
import LayoutMain from './Layouts/LayoutMain';
import Analytics from './Pages/Analytics';
import Calls from './Pages/Call';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'clients',
        element: <Clients />
      },
      {
        path: 'calls',
        element: <Calls />
      }
    ]
  },

])
function App() {

  return (
    <RouterProvider router={router} />
  )
}
export default App
