import React from "react";
import LeaderBoard from "../../components/LeaderBoard";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  const CurrentUser = user.user;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Navigation Bar */}
      <nav className="mb-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4">
          <div className="text-lg font-bold text-gray-800">Get active now</div>
          <div className="space-x-4">
            <Link
              to="/matchPlayer"
              className="text-gray-600 hover:text-blue-600 border p-2 rounded-md border-blue-500"
            >
              Match Players
            </Link>

            {/* Add more links as needed */}
          </div>
        </div>
      </nav>
      <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

      {/* User Information */}
      {user && (
        <div className="mb-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome, {CurrentUser.fullName}!
          </h3>
          <p className="text-gray-600">
            Role:{" "}
            <span className="font-medium text-gray-800">
              {CurrentUser.role}
            </span>
          </p>
          <p className="text-gray-600">
            Email:{" "}
            <span className="font-medium text-gray-800">
              {CurrentUser.email}
            </span>
          </p>
          <p className="text-gray-600">
            Description:{" "}
            <span className="font-medium text-gray-800">
              {CurrentUser.description}
            </span>
          </p>
          <p className="text-gray-600">
            Sports:{" "}
            <span className="font-medium text-gray-800">
              {CurrentUser.sportsPreferences}
            </span>
          </p>
          <p className="text-gray-600">
            Location:{" "}
            <span className="font-medium text-gray-800">
              {CurrentUser.location}
            </span>
          </p>
        </div>
      )}

      {/* User Score/Points */}
      <div className="mb-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Your Score/Points
        </h3>
        <p className="text-3xl font-bold text-green-600">
          {CurrentUser.points} Points
        </p>
      </div>

      <LeaderBoard />
    </div>
  );
};

export default Dashboard;
