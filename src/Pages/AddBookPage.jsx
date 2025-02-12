import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Authentication } from "./../AuthProvider/AuthProvider";
axios.defaults.withCredentials = true;
const AddBook = () => {
  const { user } = useContext(Authentication);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    quantity: "",
    author: "",
    category: "Novel",
    description: "",
    rating: "",
    content: "You can provide additional details about the book here.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      Swal.fire({
        icon: "error",
        title: "Invalid Rating",
        text: "Rating must be a number between 1 and 5, inclusive.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const userEmail = user.email;

    try {
      await axios.post(
        `https://booklibraryserver.vercel.app/addbook`,
        formData,
        {
          params: { email: userEmail },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Book Added successfully!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/all-books");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error?.response?.data?.message || "Failed to Add book!"}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add a New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium">
            Book Cover Image (URL)
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Book Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter book name"
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Author Name</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2"
          >
            <option value="Novel">Novel</option>
            <option value="Thriller">Thriller</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a short description of the book"
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            step="0.1"
            min="1"
            max="5"
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Book Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-2 block w-full text-gray-800 border rounded-lg p-2 h-32"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
