import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/Layout";
import { useEffect } from "react";
import { setCredentials } from "./redux/features/auth/authSlice";
import { useAppDispatch } from "./redux/hook";

function App() {
  // check local storage for token if token exists set it to redux store
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // set token to redux store
      dispatch(setCredentials({ accessToken }));
    }
  }, [dispatch]);

  return (
    <div>
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
