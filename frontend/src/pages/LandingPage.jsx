import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

// Images
import sport1 from "../assets/sport1.png";
import sport2 from "../assets/sport2.png";
import sport3 from "../assets/sport3.png";
import sport4 from "../assets/sport4.png";
import sport5 from "../assets/sport5.png";
import sport6 from "../assets/sport6.png";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle navbar for mobile view
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 min-h-screen">
      {/* Navbar */}
      <nav className="bg-transparent backdrop-blur-lg shadow-md fixed top-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img
                  className="h-10 w-10 hover:scale-110 transition-transform duration-300 ease-in-out"
                  src="/logo.png" // Replace with your logo URL
                  alt="Logo"
                />
              </Link>

              {/* Navbar links */}
              <div className="hidden md:flex md:items-center md:ml-6">
                <Link
                  to="/about"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                >
                  About
                </Link>
                <Link
                  to="/features"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                >
                  Features
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Login and Register buttons */}
            <div className="hidden md:flex items-center">
              <Link to="/login">
                <button className="text-white hover:bg-blue-600 bg-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105 duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="ml-4">
                <button className="text-blue-500 bg-white hover:bg-blue-100 px-4 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105 duration-300">
                  Register
                </button>
              </Link>
            </div>

            {/* Hamburger menu for mobile */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-blue-200 focus:outline-none"
              >
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/about"
                className="block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/features"
                className="block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Features
              </Link>
              <Link
                to="/contact"
                className="block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Carousel */}
      <div className="pt-24 text-center py-20 px-5 md:px-10 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          Get Active now
        </h1>
        <p className="text-lg md:text-2xl font-light mb-10">
          Match with players, book grounds, and level up your fitness game.
        </p>

        {/* Carousel */}
        <div className="carousel-container max-w-4xl mx-auto mb-12">
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            className="rounded-lg shadow-lg"
          >
            <div>
              <img src={sport1} alt="Football" className="rounded-lg" />
              <p className="legend">Football</p>
            </div>
            <div>
              <img src={sport2} alt="Basketball" className="rounded-lg" />
              <p className="legend">Basketball</p>
            </div>
            <div>
              <img src={sport3} alt="Tennis" className="rounded-lg" />
              <p className="legend">Tennis</p>
            </div>
          </Carousel>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <Link to="/login">
            <button className="backdrop-blur-sm bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:scale-105 px-6 py-3 text-lg font-semibold rounded-lg">
              I'm a Player
            </button>
          </Link>
          <Link to="/signup">
            <button className="backdrop-blur-sm bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:scale-105 px-6 py-3 text-lg font-semibold rounded-lg">
              I'm a Landowner
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-5 md:px-10 w-full bg-white text-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="backdrop-blur-sm bg-white bg-opacity-30 p-6 text-center rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={sport4}
                alt="Sports Matching"
                className="h-40 w-full object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-semibold mb-2">Player Matching</h3>
              <p className="text-gray-700">
                Match with players near you based on your sports preferences and
                skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="backdrop-blur-sm bg-white bg-opacity-30 p-6 text-center rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={sport5}
                alt="Ground Booking"
                className="h-40 w-full object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-semibold mb-2">Ground Booking</h3>
              <p className="text-gray-700">
                Book the best sports grounds in your area with ease and
                convenience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="backdrop-blur-sm bg-white bg-opacity-30 p-6 text-center rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={sport6}
                alt="Fitness Tracking"
                className="h-40 w-full object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-semibold mb-2">Fitness Tracking</h3>
              <p className="text-gray-700">
                Keep track of your fitness progress and improve your skills over
                time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
