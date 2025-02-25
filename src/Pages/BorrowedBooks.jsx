import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import {
  FaArrowAltCircleRight,
  FaCalendarAlt,
  FaTable,
  FaThLarge,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { Authentication } from "./../AuthProvider/AuthProvider";
axios.defaults.withCredentials = true;

const BorrowedBooks = () => {
  const { user } = useContext(Authentication);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isCardView, setIsCardView] = useState(true);
  const [loading, setLoading] = useState(true);

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
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <ClipLoader size={50} color="#0056b3" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-10 px-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Borrowed Books</h1>
        <button
          onClick={() => setIsCardView(!isCardView)}
          className="flex items-center gap-2 bg-[#f39c12] hover:bg-[#e67e22] text-white py-2.5 px-5 rounded-xl shadow-md transition-all"
        >
          {isCardView ? (
            <>
              <FaTable className="text-lg" /> Table View
            </>
          ) : (
            <>
              <FaThLarge className="text-lg" /> Card View
            </>
          )}
        </button>
      </div>

      {isCardView ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {borrowedBooks.map((book) => (
            <div
              key={book.bookId}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col transform hover:scale-105"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover transform transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-[#f39c12]/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {book.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {book.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-[#f39c12]" />
                    <span className="text-sm">
                      Borrowed:{" "}
                      {format(new Date(book.borrowedAt), "dd MMM yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-[#f39c12]" />
                    <span className="text-sm">
                      Return by:{" "}
                      {format(new Date(book.returnDate), "dd MMM yyyy")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleReturn(book.bookId)}
                  className="mt-auto w-full py-3 bg-[#f39c12] hover:bg-[#e67e22] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FaArrowAltCircleRight className="text-white" />
                  Return Book
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-[#f39c12] text-white">
              <tr>
                <th className="py-2 px-4 text-center">Book Image</th>
                <th className="py-2 px-4 text-center">Book Name</th>
                <th className="py-2 px-4 text-center">Category</th>
                <th className="py-2 px-4 text-center">Borrowed On</th>
                <th className="py-2 px-4 text-center">Return By</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.bookId} className="border-b">
                  <td className="py-2 px-4 text-center">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-20 h-20 object-cover rounded-lg mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 text-center">{book.name}</td>
                  <td className="py-2 px-4 text-center">{book.category}</td>
                  <td className="py-2 px-4 text-center">
                    {format(new Date(book.borrowedAt), "dd MMM yyyy")}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {format(new Date(book.returnDate), "dd MMM yyyy")}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleReturn(book.bookId)}
                      className="py-2 px-4 bg-[#f39c12] text-white rounded-md"
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
