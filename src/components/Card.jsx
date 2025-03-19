import React, { useState } from 'react';
import Days from './Days';
import Weather from './Weather';
import SearchBar from './SearchBar';

function Card() {
  const [city, setCity] = useState('Dunbar');

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className='row'>
      <div className='col s12 m6 push-m3'>
        <SearchBar onCityChange={handleCityChange} />
        <Weather city={city} />
        <Days city={city} />
      </div>
    </div>
  )
};

export default Card;