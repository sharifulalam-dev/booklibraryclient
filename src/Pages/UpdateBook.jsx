import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    author: "",
    category: "",
    rating: "",
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://booklibraryserver.vercel.app/book-details/${id}`
        );
        setFormData({
          image: data.image,
          name: data.name,
          author: data.author,
          category: data.category,
          rating: data.rating,
        });
      } catch (error) {
        console.error("Error fetching book details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch book details!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      Swal.fire({
        icon: "error",
        title: "Invalid Rating",
        text: "Rating must be a number between 1 and 5.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    try {
      await axios.patch(
        `https://booklibraryserver.vercel.app/all-books/${id}`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Book updated successfully!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/all-books");
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update book!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Update Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Cooking">Cooking</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="1"
              max="5"
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
