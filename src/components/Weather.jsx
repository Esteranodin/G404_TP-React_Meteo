import React from 'react';
import '../styles/Weather.css';
import { useWeather } from '../hooks/useWeather';

function Weather({ city }) {
  const { weatherData, loading, error } = useWeather(city);

  if (loading) return <div className='error-message'>Chargement des données météo...</div>;
  if (error) return <div className='error-message'>{error}</div>;

  return (
    <div className='weather card blue-grey darken-1'>
      <div className='card-content'>
        {weatherData && (
          <div>
            <p className="card-title">{weatherData.location.name}</p>
            <p>{weatherData.current.condition.text}</p>
            <p><img src={`https:${weatherData.current.condition.icon}`} alt="Weather icon"></img></p>
            <p className="temperature">{weatherData.current.temp_c}°C</p>
            <p className="wind">Vent {weatherData.current.wind_kph}km/h</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;