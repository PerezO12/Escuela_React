import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <FaSpinner className="text-blue-600 text-6xl animate-spin" />
  </div>
);

export default LoadingSpinner;
