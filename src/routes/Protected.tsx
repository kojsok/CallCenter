import { selectAuth } from "@/store/authSlices/authSlice";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

interface ProtectedProps {
  redirectPath: string,
  roles?: string[],
  children?: ReactNode
}

// Этот компонент обертка вокруг приватных страниц. Он проверяет если пользователь авторизован и имеет доступ к определенной странице если нет перенаправляет на страницу авторизации. для несколькоих страниц с одинаковым уровнем доступа можно использовать Protected как Layout Route с вложенными роутами

const Protected: FC<ProtectedProps> = ({ redirectPath, roles = [], children }) => {
  const location = useLocation();
  const { isAuthorized, role } = useSelector(selectAuth)

  if (!isAuthorized || (roles.length && !roles.includes(role))) {
    return <Navigate to={redirectPath} state={{ from: location.pathname }} />
  }
  return children ? children : <Outlet />
}

export default Protected;