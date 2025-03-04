import React from "react";

const ProviderPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to Your Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">Here is what you can do:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - View Profile */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Manage Menus
          </h2>
          <p className="text-gray-500 mb-4">Create, update and delete menu</p>
        </div>

        {/* Card 2 - Manage Orders */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            View Orders
          </h2>
          <p className="text-gray-500 mb-4">
            View your orders, manage deliveries
          </p>
        </div>

        {/* Card 3 - Settings */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Respond to Orders
          </h2>
          <p className="text-gray-500 mb-4">Update your order status</p>
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
