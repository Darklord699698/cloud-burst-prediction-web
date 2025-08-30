// App.jsx
import React, { useState } from 'react';
import Main from './components/Main';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Location from './components/Location';
import Forecast from './components/Forecast'; // ✅ Import Forecast

const App = () => {
  const [searchedCity, setSearchedCity] = useState(null);
  const [activePage, setActivePage] = useState('home');

  return (
    <div>
      <Header onSearch={setSearchedCity} />
      <div className="flex">
        <Sidebar onNavigate={setActivePage} />
        <div className="w-full ml-64">
          {activePage === 'home' && <Main searchedCity={searchedCity} />}
          {activePage === 'location' && <Location />}
          {activePage === 'forecast' && <Forecast searchedCity={searchedCity} />} {/* ✅ Added Forecast */}
          {/* Later you can add other pages like analytics etc. */}
        </div>
      </div>
    </div>
  );
};

export default App;
