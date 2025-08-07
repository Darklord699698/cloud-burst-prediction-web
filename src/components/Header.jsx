import React, { useState } from 'react';
import { assets } from "../assets/assets.js";

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const cities = ["Los Angeles", "Chicago", "New York"];

  const handleSearch = (e) => {
    e.preventDefault();
    const city = searchInput.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    onSearch(city);
    setShowDropdown(false);
  };

  const handleSelectCity = (city) => {
    setSearchInput(city);
    setShowDropdown(false);
    onSearch(city);
  };

  return (
    <header className="relative z-10 flex items-center justify-between p-4 text-white bg-slate-200">
      <div className="flex-1" />
      <form onSubmit={handleSearch} className="relative flex-1 max-w-md mx-auto">
        <div className="flex">
          <input
            type="text"
            placeholder="Search any city (e.g., Tokyo, Mumbai, Paris...)"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-4 py-2 text-black bg-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white transition-all bg-blue-600 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {showDropdown && (
          <ul className="absolute left-0 z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
            {cities
              .filter((city) =>
                city.toLowerCase().includes(searchInput.trim().toLowerCase())
              )
              .map((city) => (
                <li
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                >
                  {city}
                </li>
              ))}
          </ul>
        )}
      </form>

      <div className="flex items-center justify-end flex-1 space-x-4">
        <img
          src={assets.notificationbell}
          alt="Notifications"
          className="w-6 h-6 cursor-pointer"
        />
        <img
          src={assets.user}
          alt="Profile"
          className="w-6 h-6 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
