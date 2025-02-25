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
    <div className=" bg-gray-100 py-10 max-w-screen-2xl mx-auto ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        {category} Books
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6  mx-auto">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col min-h-[600px]"
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2 min-h-[64px] flex items-center justify-center">
              {book.name}
            </h3>
            <div className="space-y-2 mb-4 flex-1">
              <p className="text-gray-600 min-h-[40px]">
                <span className="font-semibold text-gray-800">Author:</span>{" "}
                {book.author}
              </p>
              <p className="text-gray-600 min-h-[40px]">
                <span className="font-semibold text-gray-800">Category:</span>{" "}
                {book.category}
              </p>
              <p className="text-gray-600 min-h-[40px]">
                <span className="font-semibold text-gray-800">Quantity:</span>{" "}
                {book.quantity}
              </p>
            </div>
            <div className="mb-4 flex justify-center">
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
              className="mt-auto w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
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
