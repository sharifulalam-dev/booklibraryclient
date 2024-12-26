import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authentication } from "./../AuthProvider/AuthProvider";
axios.defaults.withCredentials = true;
const AllBooks = () => {
  const { user } = useContext(Authentication);

  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const userEmail = user.email;
      try {
        const endpoint =
          filter === "available"
            ? "http://localhost:5000/available-books"
            : "http://localhost:5000/all-books";
        const { data } = await axios.get(endpoint, {
          params: { email: userEmail },
        });
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [filter]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Books</h1>
      <div className="flex justify-between mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg shadow-md"
        >
          <option value="all">Show All Books</option>
          <option value="available">Show Available Books</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="border rounded-lg shadow-lg p-4">
            <img
              src={book.image}
              alt={book.name}
              className="h-48 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-bold text-gray-800">{book.name}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">Category: {book.category}</p>
            <p className="text-sm text-gray-600">Rating: {book.rating}/5</p>
            <p className="text-sm text-gray-600">Quantity: {book.quantity}</p>
            <button
              onClick={() => navigate(`/update-book/${book._id}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
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
