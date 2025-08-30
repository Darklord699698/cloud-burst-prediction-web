import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // basic styles
import { Plus } from "lucide-react";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({
    "2025-08-30": [{ title: "Trip to Bengaluru" }],
    "2025-08-31": [{ title: "Cloudburst Alert" }],
  });

  const handleAddEvent = () => {
    const eventTitle = prompt("Enter event title:");
    if (eventTitle) {
      const key = date.toISOString().split("T")[0];
      setEvents((prev) => ({
        ...prev,
        [key]: prev[key] ? [...prev[key], { title: eventTitle }] : [{ title: eventTitle }],
      }));
    }
  };

  const dateKey = date.toISOString().split("T")[0];

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Calendar</h1>

        <div className="p-4 bg-white shadow-md rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{date.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
            <button
              onClick={handleAddEvent}
              className="flex items-center gap-2 px-4 py-2 text-black transition shadow bg-white/90 rounded-xl hover:scale-105"
            >
              <Plus size={16} /> Add Event
            </button>
          </div>

          <Calendar
            onChange={setDate}
            value={date}
            className="overflow-hidden rounded-xl"
            tileContent={({ date: d }) => {
              const key = d.toISOString().split("T")[0];
              if (events[key]) {
                return <div className="flex justify-center mt-1 space-x-1">{events[key].map((e, i) => <span key={i} className="w-2 h-2 bg-blue-500 rounded-full"></span>)}</div>;
              }
              return null;
            }}
          />

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Events on {date.toDateString()}:</h3>
            {events[dateKey]?.length ? (
              <ul className="space-y-1">
                {events[dateKey].map((ev, idx) => (
                  <li key={idx} className="p-2 bg-gray-100 rounded">{ev.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
