import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddBook from "../pages/AddBook";
import BookDetails from "../pages/BookDetails";
import Books from "../pages/Books";
import Dashboard from "../pages/Dashboard";
import EditBook from "../pages/EditBook";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import BookList from "../components/Book/BookList";
import Wishlist from "../pages/Wishlist";
import ReadingList from "../pages/ReadingList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <BookList />,
      },
      {
        path: "/dashboard/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reading-list",
        element: (
          <PrivateRoute>
            <ReadingList />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
