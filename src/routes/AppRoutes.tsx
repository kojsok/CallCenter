import LayoutMain from "@/Layouts/LayoutMain";
import Analytics from "@/Pages/Analytics";
import Calls from "@/Pages/Call";
import Clients from "@/Pages/Clients";
import Home from "@/Pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
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

