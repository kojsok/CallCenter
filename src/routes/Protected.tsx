import Loader from "@/components/Loader/Loader";
import { selectAuthState } from "@/store/authSlices/authSlice";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

interface ProtectedProps {
  roles?: string[],
  children?: ReactNode
}

// Этот компонент обертка вокруг приватных страниц. Он проверяет если пользователь авторизован и имеет доступ к определенной странице, если нет перенаправляет на страницу авторизации.для одной страницы: {element: <Protected><LayoutMain /></Protected>}. для несколькоих страниц с одинаковым уровнем доступа можно использовать Protected как Layout Route с вложенными роутами:  
// {
//   element: <Protected roles={['manager', 'admin']} />, children: [
//     {
//       path: 'adminpanel',
//       element: <AdminPanel />,
//     },
//     {
//       path: 'analytics',
//       element: <Analytics />
//     },
//   ]
// },

const Protected: FC<ProtectedProps> = ({ roles = [], children }) => {
  const location = useLocation();
  const { isAuthorized, profile, loading } = useSelector(selectAuthState)
  const role = profile?.auth_data.role || ''

  if (loading) {
    return <Loader />
  }
  //если не авторизован или роль не содержится в списке допустимых то редирект
  if (!isAuthorized || (roles.length && !roles.includes(role))) {
    return <Navigate to='/' state={{ from: location.pathname }} />
  }
  //если вложен компонент, то возвращаем его, если это роуты то <Outlet>
  return children ? children : <Outlet />
}

export default Protected;