// App.jsx
import React, { useState } from 'react';
import Main from './components/Main';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  const [searchedCity, setSearchedCity] = useState(null);

  return (
    <div>
      <Header onSearch={setSearchedCity} />
      <div className="flex">
        <Sidebar />
        <div className="w-full ml-64">
          <Main searchedCity={searchedCity} />
        </div>
      </div>
    </div>
  );
};

export default App;
