import React from "react";
import { RingLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/50 backdrop-blur-sm">
      <RingLoader color="#3B82F6" size={80} speedMultiplier={1} />
    </div>
  );
};

export default LoadingSpinner;
