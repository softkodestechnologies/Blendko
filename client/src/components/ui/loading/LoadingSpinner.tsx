import { FaSpinner } from 'react-icons/fa';
import './LoadingSpinner.css'; // Import the CSS file for the animation

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
