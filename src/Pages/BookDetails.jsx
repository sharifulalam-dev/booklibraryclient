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
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

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

  useEffect(() => {
    if (book) {
      setLoadingSimilar(true);
      axios
        .get(`https://booklibraryserver.vercel.app/books?cat=${book.category}`)
        .then(({ data }) => {
          const filtered = data.filter((b) => b._id !== book._id);
          setSimilarBooks(filtered);
        })
        .catch((error) => {
          console.error("Error fetching similar books:", error);
        })
        .finally(() => {
          setLoadingSimilar(false);
        });
    }
  }, [book]);

  const handleBorrow = async () => {
    if (!returnDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a return date!",
        confirmButtonColor: "#f39c12",
      });
      return;
    }

    if (book.quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Unavailable",
        text: "This book is currently out of stock!",
        confirmButtonColor: "#f39c12",
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
        title: "Success!",
        text: `Enjoy reading "${book.name}"!`,
        confirmButtonColor: "#f39c12",
      }).then(() => {
        navigate("/borrowedbooks");
      });
    } catch (error) {
      console.error("Error borrowing book:", error);
      setIsModalOpen(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to borrow book",
        confirmButtonColor: "#f39c12",
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!book)
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <span className="loading loading-spinner text-[#f39c12] w-16 h-16"></span>
      </div>
    );

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto   py-12 px-4 sm:px-6 lg:px-4">

      <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
    
          <div className="flex items-center justify-center bg-gray-50 p-8 rounded-xl">
            <img
              src={book.image}
              alt={book.name}
              className="max-h-96 w-full object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>

 
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {book.name}
              </h1>
              <p className="text-xl font-medium text-[#f39c12]">
                {book.author}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-[#f39c12]/10 text-[#f39c12] px-3 py-1 rounded-full text-sm font-medium">
                  {book.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book.quantity > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.quantity > 0
                    ? `${book.quantity} Available`
                    : "Out of Stock"}
                </span>
              </div>

              <ReactStars
                count={5}
                size={28}
                value={book.rating || 0}
                edit={false}
                isHalf={true}
                activeColor="#f39c12"
                className="mt-2"
              />
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {book.description}
            </p>

            <button
              onClick={openModal}
              disabled={book.quantity <= 0}
              className={`w-full py-4 text-lg font-semibold rounded-xl transition-all ${
                book.quantity > 0
                  ? "bg-[#f39c12] hover:bg-[#e67e22] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {book.quantity > 0 ? "Borrow Now" : "Currently Unavailable"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full  mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          More {book.category} Books
        </h2>
        {loadingSimilar ? (
          <div className="flex justify-center items-center py-8">
            <span className="loading loading-spinner text-[#f39c12] w-12 h-12"></span>
          </div>
        ) : similarBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {similarBooks.map((sBook) => (
              <div
                key={sBook._id}
                className="border rounded-lg shadow-lg p-4 flex flex-col h-[550px] justify-between bg-white"
              >
                <img
                  src={sBook.image}
                  alt={sBook.name}
                  className="h-48 w-full object-cover mb-4 rounded"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 min-h-[64px] flex items-center px-2">
                    {sBook.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold text-[#f39c12]">
                        Author:
                      </span>{" "}
                      {sBook.author}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-[#f39c12]">
                        Rating:
                      </span>{" "}
                      {sBook.rating}/5
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/book-details/${sBook._id}`)}
                  className="mt-auto w-full py-3 px-6 bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold rounded-lg shadow-xl transition-colors"
                >
                  See More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg text-center">
            No similar books available.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Confirm Borrow
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Return Date
                  </label>
                  <DatePicker
                    selected={returnDate}
                    onChange={setReturnDate}
                    minDate={new Date()}
                    dateFormat="dd MMM yyyy"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#f39c12] focus:ring-[#f39c12]"
                    placeholderText="Select return date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Borrower Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    disabled
                    className="w-full p-3 bg-gray-50 rounded-lg text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Borrower Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full p-3 bg-gray-50 rounded-lg text-gray-700"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBorrow}
                  className="px-6 py-2.5 bg-[#f39c12] hover:bg-[#e67e22] text-white font-medium rounded-lg transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
