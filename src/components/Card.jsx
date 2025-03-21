import { useState, useCallback, useEffect } from 'react';
import Days from './Days';
import Weather from './Weather';
import SearchBar from './SearchBar';
import { useWeather } from '../hooks/useWeather';

function Card() {
  const [city, setCity] = useState('Dunbar');
  const [selectedDay, setSelectedDay] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const { weatherData } = useWeather(city, coordinates);

  useEffect(() => {
    if (weatherData && weatherData.forecast && !selectedDay) {
      // Sélection premier jour disponible = aujourd'hui
      setSelectedDay(weatherData.forecast[0]);
    }
  }, [weatherData, selectedDay]);

  const handleDaySelect = useCallback((day) => {
    setSelectedDay(day);
  }, []);

  return (
    <div className='row'>
      <div className='col s12 m6 push-m3'>
        <SearchBar 
          onCityChange={setCity} 
          onCoordinatesChange={setCoordinates}
        />
        <Weather 
          city={city} 
          coordinates={coordinates}
          dayData={selectedDay}
        />
        <Days 
          city={city}
          coordinates={coordinates}
          onDaySelect={handleDaySelect}
          selectedDay={selectedDay}
        />
      </div>
    </div>
  );
}

export default Card;