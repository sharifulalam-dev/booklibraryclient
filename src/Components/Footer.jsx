import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-10 text-gray-800 bg-[#f7f7f7]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Book Library</h1>
          <p className="mt-2 text-sm">
            A book library is a gateway to endless worlds,
            <br /> where knowledge and imagination converge to
            <br /> empower minds and inspire dreams.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
          <ul className="mt-2 space-y-1">
            <li>
              Email:{" "}
              <a href="mailto:amaramik@gmail.com" className="hover:underline">
                support@booklibrary.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:underline">
                +880172217298
              </a>
            </li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Follow Us</h2>
          <div className="flex mt-3 space-x-4">
            <a
              href="https://facebook.com/dreamersky"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-blue-700 hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-lg" />
            </a>
            <a
              href="https://x.com/mdsharifultex"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/dreamersky/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-blue-900 hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-lg" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Links</h2>
          <ul className="mt-2 space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/all-books" className="hover:underline">
                All Books
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center border-t border-gray-300 text-gray-600 pt-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Book Library. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
