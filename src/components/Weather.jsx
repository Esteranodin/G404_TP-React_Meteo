import React from 'react';
import '../styles/Weather.css';
import { useWeather } from '../hooks/useWeather';
import { translateWeatherCondition } from '../utils/weatherTranslations';
import { getDayOfWeek, capitalizeFirstLetter } from '../utils/date';

function Weather({ city, dayData }) {
  const { weatherData, loading, error } = useWeather(city);

  if (loading) return <div className='error-message'>Chargement des données météo...</div>;
  if (error) return <div className='error-message'>{error}</div>;
  if (!weatherData) return <div className='error-message'>Aucune donnée disponible</div>;

  // Données à afficher = jour sélectionné ou aujourd'hui
  const displayData = dayData 
    ? {
        day: getDayOfWeek(dayData.date),
        condition: dayData.day.condition.text,
        icon: dayData.day.condition.icon,
        temperature: Math.round(dayData.day.avgtemp_c),
        wind: Math.round(dayData.day.maxwind_kph),
        humidity: dayData.day.avghumidity
      }
    : {
        day: "Aujourd'hui",
        condition: weatherData.current.condition.text,
        icon: weatherData.current.condition.icon,
        temperature: weatherData.current.temp_c,
        wind: weatherData.current.wind_kph,
        humidity: weatherData.current.humidity
      };

  return (
    <div className='weather card blue-grey darken-1'>
      <div className='card-content'>
        <div>
          <p>{capitalizeFirstLetter(displayData.day)}</p>
          <p className="card-title">{weatherData.location.name}</p>
          <p>{translateWeatherCondition(displayData.condition)}</p>
          <p><img src={`https:${displayData.icon}`} alt="Weather icon" /></p>
          <p className="temperature">{displayData.temperature}°C</p>
          <p className="wind">Vent à {displayData.wind}km/h</p>
          <p>Humidité : {displayData.humidity}%</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;