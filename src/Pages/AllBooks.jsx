import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Authentication } from "./../AuthProvider/AuthProvider";
axios.defaults.withCredentials = true;

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(Authentication);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://booklibraryserver.vercel.app/available-books")
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <ClipLoader size={50} color="#0056b3" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded-lg shadow-lg p-4 flex flex-col h-[550px] justify-between"
          >
            <img
              src={book.image}
              alt={book.name}
              className="h-48 w-full object-cover mb-4 rounded"
            />
            <div className="flex-1">
              <h2
                className="text-2xl font-extrabold text-gray-900 mb-2 
                  min-h-[64px] max-h-[64px] flex items-left px-2"
              >
                {book.name}
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex space-x-1">
                  <span className="font-medium text-[#0056b3]">Author:</span>
                  <span className="text-gray-700">{book.author}</span>
                </div>
                <div className="flex space-x-1">
                  <span className="font-medium text-[#0056b3]">Category:</span>
                  <span className="text-gray-700">{book.category}</span>
                </div>
                <div className="flex space-x-1">
                  <span className="font-medium text-[#0056b3]">Rating:</span>
                  <span className="text-gray-700">{book.rating}/5</span>
                </div>
                <div className="flex space-x-1">
                  <span className="font-medium text-[#0056b3]">Quantity:</span>
                  <span className="text-gray-700">{book.quantity}</span>
                </div>
              </div>
            </div>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => navigate(`/update-book/${book._id}`)}
                className="w-full py-3 px-6 bg-[#0056b3] text-white font-bold rounded-lg shadow-xl hover:bg-[#004494] transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => navigate(`/book-details/${book._id}`)}
                className="w-full py-3 px-6 bg-[#f39c12] text-white font-bold rounded-lg shadow-xl hover:bg-[#f39d12a1] transition-colors"
              >
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
