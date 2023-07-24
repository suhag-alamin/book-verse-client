/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/Layout";
import { logout, setCredentials } from "./redux/features/auth/authSlice";
import { useAppDispatch } from "./redux/hook";
import decodeAccessToken from "./utils/decodeToken";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken = decodeAccessToken(accessToken as string);
      const tokenExpiration = decodedToken?.exp! * 1000; // Convert to milliseconds

      // console.log(new Date(tokenExpiration));

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Access token has expired, refresh it
        // refreshAccessToken();
        console.log("test");
        dispatch(logout());
      }

      dispatch(setCredentials({ email: decodedToken?.email, accessToken }));
    }
  }, [dispatch]);

  // const { token } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   // Decode the access token and check if it's expired
  //   const decodedToken = decodeAccessToken(token as string);
  //   console.log(decodedToken?.email);
  //   const tokenExpiration = decodedToken?.exp! * 1000; // Convert to milliseconds

  //   console.log(new Date(tokenExpiration));

  //   if (tokenExpiration && tokenExpiration < Date.now()) {
  //     // Access token has expired, refresh it
  //     // refreshAccessToken();
  //     console.log("test");
  //   }

  //   dispatch(setCredentials({ email: decodedToken?.email }));
  // }, [token, dispatch]);

  return (
    <div>
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
