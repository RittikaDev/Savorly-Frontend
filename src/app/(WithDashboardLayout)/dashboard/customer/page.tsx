import React from "react";

const CustomerPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to Your Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">Here is what you can manage:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - View Selected Meals */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            View Selected Meals
          </h2>
          <p className="text-gray-500 mb-4">
            Check out your selected meals and see their details like
            ingredients, calories, and more.
          </p>
          <a href="/selected-meals" className="text-blue-500 font-semibold">
            View Meals
          </a>
        </div>

        {/* Card 2 - Track Orders */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Track Your Orders
          </h2>
          <p className="text-gray-500 mb-4">
            Track the status of your orders, delivery times, and recent
            purchases.
          </p>
          <a href="/orders" className="text-blue-500 font-semibold">
            Track Orders
          </a>
        </div>

        {/* Card 3 - Manage Preferences */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Manage Preferences
          </h2>
          <p className="text-gray-500 mb-4">
            Set your preferences for diet plans, cuisine types, portion sizes,
            and more.
          </p>
          <a href="/preferences" className="text-blue-500 font-semibold">
            Manage Preferences
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
