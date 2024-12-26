import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 text-center">
      <motion.h1
        className="text-orange-600 text-5xl font-extrabold tracking-wider"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "easeInOut",
        }}
      >
        WHOOOS!!!
      </motion.h1>
      <div className="relative mt-6">
        <motion.div
          className="text-9xl font-extrabold text-orange-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          404
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[90%] h-1 bg-gray-800"></div>
        </div>
      </div>
      <p className="text-2xl font-medium text-gray-700 mt-4">
        THE PAGE CAN NOT BE FOUND
      </p>
      <p className="text-gray-600 mt-2 px-6 md:px-12">
        Oops! We couldn’t find the page you were looking for. Please check the
        URL or navigate back to the homepage.
      </p>
      <motion.button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold rounded-md shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        GO BACK TO HOME PAGE
      </motion.button>
    </div>
  );
};

export default ErrorPage;
