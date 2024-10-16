import LayoutMain from "@/Layouts/LayoutMain";
import AdminPanel from "@/Pages/AdminPanel";
import Analytics from "@/Pages/Analytics";
import Calls from "@/Pages/Call";
import Clients from "@/Pages/Clients";
import Home from "@/Pages/Home";
import Profile from "@/Pages/Profile";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    // path: "/dashboard/",
    element: <LayoutMain />,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'adminpanel',
        element: <AdminPanel />,
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

