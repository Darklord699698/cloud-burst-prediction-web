import React, { useState } from "react";
import { Sun, Moon, Thermometer, Bell, RefreshCw } from "lucide-react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [celsius, setCelsius] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Theme */}
        <div className="flex items-center justify-between p-4 bg-white shadow rounded-xl">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="text-gray-700" /> : <Sun className="text-yellow-500" />}
            <p className="font-medium">Dark Mode</p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="toggle toggle-primary"
          />
        </div>

        {/* Units */}
        <div className="flex items-center justify-between p-4 bg-white shadow rounded-xl">
          <div className="flex items-center gap-3">
            <Thermometer className="text-red-500" />
            <p className="font-medium">Temperature Unit</p>
          </div>
          <select
            value={celsius ? "C" : "F"}
            onChange={(e) => setCelsius(e.target.value === "C")}
            className="px-2 py-1 border rounded"
          >
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-white shadow rounded-xl">
          <div className="flex items-center gap-3">
            <Bell className="text-blue-500" />
            <p className="font-medium">Weather Alerts</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="toggle toggle-primary"
          />
        </div>

        {/* Reset Data */}
        <div className="flex items-center justify-between p-4 bg-white shadow rounded-xl">
          <div className="flex items-center gap-3">
            <RefreshCw className="text-gray-700" />
            <p className="font-medium">Reset App Data</p>
          </div>
          <button
            onClick={() => alert("Data cleared!")}
            className="px-4 py-2 text-white transition bg-red-500 rounded-xl hover:bg-red-600"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          App version: 1.0.0 <br />
          Data from OpenWeather. Images from Unsplash.
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
