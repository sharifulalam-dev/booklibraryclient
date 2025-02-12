import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";

const CategoryBooksPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://booklibraryserver.vercel.app/books?cat=${category}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        {category} Books
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {books.map((book) => (
          <div key={book._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">{book.name}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Category: {book.category}</p>
            <p className="text-gray-600">Quantity: {book.quantity}</p>
            <div className="my-2">
              <ReactStars
                count={5}
                value={book.rating}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
                edit={false}
              />
            </div>
            <button
              onClick={() => navigate(`/book-details/${book._id}`)}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBooksPage;
