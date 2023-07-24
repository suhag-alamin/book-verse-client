import Layout from "./layouts/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
