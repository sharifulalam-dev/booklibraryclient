import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { FaTable, FaThLarge } from "react-icons/fa";
import Swal from "sweetalert2";
import { Authentication } from "./../AuthProvider/AuthProvider";
axios.defaults.withCredentials = true;
const BorrowedBooks = () => {
  const { user } = useContext(Authentication);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isCardView, setIsCardView] = useState(true);

  useEffect(() => {
    const userEmail = user.email;
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(
          `https://booklibraryserver.vercel.app/borrowedbooks`,
          {
            params: { email: userEmail },
          }
        );
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };

    fetchBorrowedBooks();
  }, [user.email]);

  const handleReturn = async (bookId) => {
    try {
      await axios.post(`https://booklibraryserver.vercel.app/return-book`, {
        bookId,
        userEmail: user.email,
      });

      Swal.fire({
        icon: "success",
        title: "Returned",
        text: "Book returned successfully!",
      });

      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book.bookId !== bookId)
      );
    } catch (error) {
      console.error("Error returning book:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to return the book!",
      });
    }
  };

  if (borrowedBooks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-2xl font-semibold text-gray-700">
          No borrowed books found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6 px-4">
        <h1 className="text-4xl font-bold text-gray-800">Borrowed Books</h1>
        <button
          onClick={() => setIsCardView(!isCardView)}
          className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          {isCardView ? (
            <>
              <FaTable /> See Table View
            </>
          ) : (
            <>
              <FaThLarge /> See Card View
            </>
          )}
        </button>
      </div>

      {isCardView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {borrowedBooks.map((book) => (
            <div
              key={book.bookId}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{book.name}</h3>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">
                Borrowed On: {format(new Date(book.borrowedAt), "dd-MM-yyyy")}
              </p>
              <p className="text-gray-600">
                Return By: {format(new Date(book.returnDate), "dd-MM-yyyy")}
              </p>
              <button
                onClick={() => handleReturn(book.bookId)}
                className="mt-auto w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto px-4">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Book Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Borrowed On</th>
                <th className="border px-4 py-2">Return By</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.bookId}>
                  <td className="border px-4 py-2">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{book.name}</td>
                  <td className="border px-4 py-2">{book.category}</td>
                  <td className="border px-4 py-2">
                    {format(new Date(book.borrowedAt), "dd-MM-yyyy")}
                  </td>
                  <td className="border px-4 py-2">
                    {format(new Date(book.returnDate), "dd-MM-yyyy")}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleReturn(book.bookId)}
                      className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
