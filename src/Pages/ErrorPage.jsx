import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import errorAnimation from "../assets/error.json"; // path to your Lottie file

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className=" pb-4 flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="w-full h-[90vh] flex justify-center">
        <Lottie animationData={errorAnimation} loop={true} autoplay={true} />
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-max px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold rounded-md shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
