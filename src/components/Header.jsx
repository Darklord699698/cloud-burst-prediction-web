import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { User } from "lucide-react";
import Lottie from "lottie-react";
import searching_ani from "../assets/searching_ani.json";

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [saved, setSaved] = useState(false); // ✅ show animation

  const cities = ["Los Angeles", "Chicago", "New York"];
  const { user } = useUser();

  const handleSearch = async (e) => {
    e.preventDefault();
    const city = searchInput.trim();
    if (!city) return alert("Please enter a city name.");

    if (user) {
      try {
        const res = await fetch("http://localhost:5000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city, userId: user.id }),
        });
        const data = await res.json();
        if (data.message === "Search saved successfully") {
          setSaved(true); // ✅ show animation
          setTimeout(() => setSaved(false), 2000); // hide after 2 seconds
        }
      } catch (err) {
        console.error("Error saving search:", err);
      }
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

      {/* Search box */}
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

        {/* ✅ Animated Saved! message - only show when `saved` is true */}
        {saved && (
          <div className="absolute w-20 h-20 mt-1 transform -translate-x-1/2 left-1/2">
            <Lottie animationData={searching_ani} loop={false} />
          </div>
        )}
      </form>

      {/* Right-side icons */}
      <div className="flex items-center justify-end flex-1 space-x-4">
        <img
          src={assets.notificationbell}
          alt="Notifications"
          className="w-6 h-6 cursor-pointer"
        />

        <SignedOut>
          <SignInButton mode="modal">
            <button className="p-2 rounded-full hover:bg-gray-300">
              <User className="w-6 h-6 text-black" />
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
