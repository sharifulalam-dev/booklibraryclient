import React, { useContext, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authentication } from "../AuthProvider/AuthProvider";
const Navbar = () => {
  const { user, logOut } = useContext(Authentication);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="" className="h-20" />
        </h1>

        <div className="hidden lg:flex items-center space-x-10">
          <Link
            to="/"
            className={`${
              isActive("/") ? "text-[#e96450]" : "text-black"
            }  relative inline-block text-lg font-medium transition-colors duration-300
  hover:text-[#e96450] before:absolute before:bottom-0 before:left-0 
  before:h-[2px] before:w-0 before:bg-[#e96450] before:transition-all 
  before:duration-500 hover:before:w-full`}
          >
            Home
          </Link>
          <Link
            to="/all-books"
            className={`${
              isActive("/all-books") ? "text-[#e96450]" : "text-black"
            } relative inline-block text-lg font-medium transition-colors duration-300
  hover:text-[#e96450] before:absolute before:bottom-0 before:left-0 
  before:h-[2px] before:w-0 before:bg-[#e96450] before:transition-all 
  before:duration-500 hover:before:w-full`}
          >
            ALL BOOKS
          </Link>
          <Link
            to="/addbook"
            className={`${
              isActive("/addbook") ? "text-[#e96450]" : "text-black"
            } relative inline-block text-lg font-medium transition-colors duration-300
  hover:text-[#e96450] before:absolute before:bottom-0 before:left-0 
  before:h-[2px] before:w-0 before:bg-[#e96450] before:transition-all 
  before:duration-500 hover:before:w-full`}
          >
            ADD BOOK
          </Link>
          <Link
            to="/borrowedbooks"
            className={`${
              isActive("/borrowedbooks") ? "text-[#e96450]" : "text-black"
            } relative inline-block text-lg font-medium transition-colors duration-300
  hover:text-[#e96450] before:absolute before:bottom-0 before:left-0 
  before:h-[2px] before:w-0 before:bg-[#e96450] before:transition-all 
  before:duration-500 hover:before:w-full`}
          >
            BORROWED BOOKS
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="hidden lg:flex space-x-4">
              <Link
                to="/login"
                className={` px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-[#e96450] to-[#ff9a8d] hover:from-[#ff9a8d] hover:to-[#e96450] transition-all duration-300`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-[#00acb1] to-[#48d6d7] hover:from-[#48d6d7] hover:to-[#00acb1] transition-all duration-300`}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="group relative flex items-center ">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
              />
              <div
                className={`z-10 absolute top-8 right-0 mt-2 hidden group-hover:block w-48  bg-gray-700 text-white rounded shadow-lg`}
              >
                <div className="p-4 border-b border-gray-300">
                  <p className="text-sm font-medium">{user.displayName}</p>
                </div>
                <button
                  onClick={logOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-gray-100 text-gray-800 py-4">
          <div className="space-y-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`block w-full px-4 py-2 ${
                isActive("/") ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/all-books"
              onClick={() => setMenuOpen(false)}
              className={`block w-full px-4 py-2 ${
                isActive("/all-books")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              ALL BOOKS
            </Link>
            <Link
              to="/addbook"
              onClick={() => setMenuOpen(false)}
              className={`block w-full px-4 py-2 ${
                isActive("/addbook")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              ADD BOOK
            </Link>

            <Link
              to="/borowedbooks"
              onClick={() => setMenuOpen(false)}
              className={`block w-full px-4 py-2 ${
                isActive("/borowedbooks")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              BORROWED BOOKS
            </Link>
          </div>
          {!user ? (
            <div className="mt-4 space-y-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <button
                onClick={logOut}
                className="block w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
