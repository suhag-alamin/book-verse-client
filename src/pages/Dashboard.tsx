/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import decodeAccessToken from "../utils/decodeToken";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken = decodeAccessToken(accessToken as string);
      const tokenExpiration = decodedToken?.exp! * 1000; // Convert to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Access token has expired, refresh it
      }

      dispatch(
        setCredentials({
          _id: decodedToken?._id,
          email: decodedToken?.email,
          accessToken,
        })
      );
    }
  }, [dispatch]);
  return (
    <div>
      <DashboardLayout />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
