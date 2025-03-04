const LoadingPage = () => {
  return (
    <div className="w-[90%] mx-auto flex justify-center items-center h-screen">
      {/* Loading Spinner */}
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-primary"></div>
    </div>
  );
};

export default LoadingPage;
