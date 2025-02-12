import { createBrowserRouter } from "react-router-dom";
import ForgetPassword from "../Components/ForgetPassword";
import PrivateRoute from "../Components/PrivateRoute";
import MainLayout from "../MainLayout/MainLayout";
import About from "../Pages/About";
import AddBook from "../Pages/addbookPage";
import AllBooks from "../Pages/AllBooks";
import BookDetails from "../Pages/BookDetails";
import BorrowedBooks from "../Pages/BorrowedBooks";
import CategoryBooksPage from "../Pages/CategoryPage";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UpdateBook from "../Pages/UpdateBook";
import HomePage from "./../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/addbook",
        element: (
          <>
            <PrivateRoute>
              <AddBook />
            </PrivateRoute>
          </>
        ),
      },

      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const response = await fetch(
            `https://booklibraryserver.vercel.app/book-details/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Book details");
          }
          return response.json();
        },
      },

      {
        path: "/borrowedbooks",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:category",
        element: <CategoryBooksPage />,
      },
      {
        path: "/book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/borrowedbooks",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://booklibraryserver.vercel.app/all-books").then((res) =>
            res.json()
          ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
]);

export default router;
