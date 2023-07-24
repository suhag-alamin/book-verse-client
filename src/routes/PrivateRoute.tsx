import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Shared/Loading";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.email) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user?.email]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user?.email && !isLoading) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
