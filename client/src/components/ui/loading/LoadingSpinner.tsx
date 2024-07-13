import { FaSpinner } from 'react-icons/fa';
import './LoadingSpinner.css'; // 

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
