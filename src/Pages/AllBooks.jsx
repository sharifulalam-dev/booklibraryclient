import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Authentication } from "./../AuthProvider/AuthProvider";

axios.defaults.withCredentials = true;

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(Authentication);

  // Fetch books from the given endpoint
  const fetchBooks = async (endpoint) => {
    setLoading(true);
    try {
      const { data } = await axios.get(endpoint);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch: load all books on mount
  useEffect(() => {
    fetchBooks("https://booklibraryserver.vercel.app/all-books");
  }, []);

  // Handle filter change after initial render
  const handleFilterChange = async (e) => {
    const value = e.target.value;
    setFilter(value);
    const endpoint =
      value === "available"
        ? "https://booklibraryserver.vercel.app/available-books"
        : "https://booklibraryserver.vercel.app/all-books";
    fetchBooks(endpoint);
  };

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
      <div className="flex justify-between mb-4">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg shadow-md"
        >
          <option value="all">Show All Books</option>
          <option value="available">Show Available Books</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded-lg shadow-lg p-4 flex flex-col h-[550px]"
          >
            <img
              src={book.image}
              alt={book.name}
              className="h-48 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
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
            <button
              onClick={() => navigate(`/update-book/${book._id}`)}
              className="mt-auto w-full py-3 px-6 bg-[#0056b3] text-white font-bold rounded-lg shadow-xl hover:bg-[#004494] transition-colors"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
