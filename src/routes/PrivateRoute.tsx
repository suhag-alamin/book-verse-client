import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const { pathname } = useLocation();

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
