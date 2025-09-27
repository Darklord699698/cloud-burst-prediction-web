import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { User, Mail } from "lucide-react";
import Lottie from "lottie-react";
import searching_ani from "../assets/searching_ani.json";
import emailjs from "emailjs-com";
// ... imports remain same
import EmailAni from "../assets/Email.json"; // ✅ import your Email.json

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSendingAnimation, setShowSendingAnimation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { user } = useUser();
  const cities = ["Los Angeles", "Chicago", "New York"];

  const handleSearch = async (e) => {
    e.preventDefault();
    const city = searchInput.trim();
    if (!city) return;

    if (user) {
      try {
        const res = await fetch("http://localhost:5000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city, userId: user.id }),
        });
        const data = await res.json();
        if (data.message === "Search saved successfully") {
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
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

  const sendFeedback = (e) => {
    e.preventDefault();
    setShowSendingAnimation(true); // show animation

    emailjs
      .send(
        "service_zvmr552",    // replace
        "template_a0e8jr6",   // replace
        formData,
        "ioSkVppjYlMHPdJKn"  // replace
      )
      .then(() => {
        // remove alert, just keep animation
        setFormData({ name: "", email: "", message: "" });
        setShowFeedback(false);
        // hide animation after 4-5 seconds
        setTimeout(() => setShowSendingAnimation(false), 4500);
      })
      .catch((err) => {
        setShowSendingAnimation(false);
        console.error("Email send error:", err.text);
      });
  };

  return (
    <header
  className={`relative z-10 flex items-center justify-between p-4 transition-colors duration-300 rounded-b-2xl ${
    document.documentElement.classList.contains("dark")
      ? "bg-gray-800 text-gray-100"
      : "bg-slate-200 text-gray-900"
  }`}
>
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
        className={`w-full px-4 py-2 rounded-l-md focus:outline-none ${
          document.documentElement.classList.contains("dark")
            ? "bg-gray-700 text-gray-100 placeholder-gray-300"
            : "bg-gray-300 text-black placeholder-gray-600"
        }`}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded-r-md transition-all ${
          document.documentElement.classList.contains("dark")
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Search
      </button>
    </div>

    {showDropdown && (
      <ul
        className={`absolute left-0 z-20 w-full mt-1 border rounded-md shadow-md ${
          document.documentElement.classList.contains("dark")
            ? "bg-gray-700 border-gray-600 text-gray-100"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {cities
          .filter((city) =>
            city.toLowerCase().includes(searchInput.trim().toLowerCase())
          )
          .map((city) => (
            <li
              key={city}
              onClick={() => handleSelectCity(city)}
              className={`px-4 py-2 cursor-pointer hover:${
                document.documentElement.classList.contains("dark")
                  ? "bg-gray-600"
                  : "bg-gray-100"
              }`}
            >
              {city}
            </li>
          ))}
      </ul>
    )}

    {/* Saved animation */}
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

    {/* Feedback button */}
    <button
      onClick={() => setShowFeedback(true)}
      className={`p-2 rounded-full hover:${
        document.documentElement.classList.contains("dark")
          ? "bg-gray-700"
          : "bg-gray-300"
      }`}
      title="Send Feedback"
    >
      <Mail
        className={`w-6 h-6 ${
          document.documentElement.classList.contains("dark")
            ? "text-gray-100"
            : "text-black"
        }`}
      />
    </button>

    <SignedOut>
      <SignInButton mode="modal">
        <button
          className={`p-2 rounded-full hover:${
            document.documentElement.classList.contains("dark")
              ? "bg-gray-700"
              : "bg-gray-300"
          }`}
        >
          <User
            className={`w-6 h-6 ${
              document.documentElement.classList.contains("dark")
                ? "text-gray-100"
                : "text-black"
            }`}
          />
        </button>
      </SignInButton>
    </SignedOut>

    <SignedIn>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
  </div>

  {/* Feedback popup */}
  {showFeedback && !showSendingAnimation && (
    <div
      className={`absolute z-30 p-4 rounded shadow-lg top-20 right-4 w-72 transition-colors duration-300 ${
        document.documentElement.classList.contains("dark")
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-black"
      }`}
    >
      <h3 className="mb-2 text-lg font-semibold">Send Feedback</h3>
      <form onSubmit={sendFeedback}>
        <input
          className={`w-full p-2 mb-2 rounded border focus:outline-none ${
            document.documentElement.classList.contains("dark")
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
              : "bg-white border-gray-300 text-black placeholder-gray-600"
          }`}
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <input
          className={`w-full p-2 mb-2 rounded border focus:outline-none ${
            document.documentElement.classList.contains("dark")
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
              : "bg-white border-gray-300 text-black placeholder-gray-600"
          }`}
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
        <textarea
          className={`w-full p-2 mb-2 rounded border focus:outline-none ${
            document.documentElement.classList.contains("dark")
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300"
              : "bg-white border-gray-300 text-black placeholder-gray-600"
          }`}
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowFeedback(false)}
            className={`px-3 py-1 text-sm rounded hover:${
              document.documentElement.classList.contains("dark")
                ? "bg-gray-700"
                : "bg-gray-400"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )}

  {/* Sending feedback animation overlay */}
  {showSendingAnimation && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-40 h-40">
        <Lottie animationData={EmailAni} loop={true} />
      </div>
    </div>
  )}
</header>

  );
};

export default Header;
