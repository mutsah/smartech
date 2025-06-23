const LoadingSpinner = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
