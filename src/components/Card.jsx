import { useState } from 'react';
import Days from './Days';
import Weather from './Weather';
import SearchBar from './SearchBar';

function Card() {
  const [city, setCity] = useState('Dunbar');
  const [selectedDay, setSelectedDay] = useState(null);

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className='row'>
      <div className='col s12 m6 push-m3'>
        <SearchBar onCityChange={handleCityChange} />
        <Weather city={city} dayData={selectedDay} />
        <Days city={city} onDaySelect={handleDaySelect} />
      </div>
    </div>
  )
};

export default Card;