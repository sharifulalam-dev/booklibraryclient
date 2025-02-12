import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Authentication } from "./../AuthProvider/AuthProvider";

const BookDetails = () => {
  const { user } = useContext(Authentication);
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://booklibraryserver.vercel.app/book-details/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load book details.",
        });
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrow = async () => {
    if (!returnDate) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a return date!",
      });
      return;
    }

    if (book.quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Book is out of stock!",
      });
      return;
    }

    try {
      await axios.post(`https://booklibraryserver.vercel.app/borrow-book`, {
        bookId: book._id,
        userEmail: user.email,
        returnDate: returnDate,
      });

      setBook((prev) => ({ ...prev, quantity: prev.quantity - 1 }));

      setIsModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Borrowed",
        text: `You have borrowed "${book.name}"!`,
      }).then(() => {
        navigate("/borrowedbooks");
      });
    } catch (error) {
      console.error("Error borrowing book:", error);

      setIsModalOpen(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message
          ? error.response.data.message
          : "Failed To Borrow",
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!book) return <span className="loading loading-ring loading-lg"></span>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-80 object-contain rounded-md mb-4"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-800">{book.name}</h1>
          <p className="text-gray-600 mt-2">Author: {book.author}</p>
          <p className="text-gray-600">Category: {book.category}</p>
          <p className="text-gray-600">Quantity: {book.quantity}</p>
          <p className="text-gray-600 mb-4">Description: {book.description}</p>

          <div className="mb-4">
            <ReactStars
              count={5}
              size={24}
              value={book.rating || 0}
              edit={false}
              isHalf={true}
              activeColor="#ffd700"
            />
          </div>

          <button
            onClick={openModal}
            disabled={book.quantity <= 0}
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md ${
              book.quantity > 0
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-gray-800 cursor-not-allowed"
            }`}
          >
            {book.quantity > 0 ? "Borrow" : "Out of Stock"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Borrow Book
            </h2>
            <div className="flex items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 mr-4 w-1/3">
                Return Date
              </label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="dd-MM-yyyy"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select a return date"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={user.displayName}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-400 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleBorrow}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Borrow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
