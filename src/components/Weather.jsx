import React from 'react';
import '../styles/Weather.css';
import { useWeather } from '../hooks/useWeather';
import { translateWeatherCondition } from '../utils/weatherTranslations';
import { getDayOfWeek } from '../utils/dateUtils';

function Weather({ city, dayData }) {
  const { weatherData, loading, error } = useWeather(city);

  if (loading) return <div className='error-message'>Chargement des données météo...</div>;
  if (error) return <div className='error-message'>{error}</div>;

  return (
    <div className='weather card blue-grey darken-1'>
      <div className='card-content'>
        {weatherData && (
          <div>
            <p className="card-title">{weatherData.location.name}</p>
            
            {dayData ? (
              // jour sélectionné
              <>
                <p>{translateWeatherCondition(dayData.day.condition.text)}</p>
                <p><img src={`https:${dayData.day.condition.icon}`} alt="Weather icon"></img></p>
                <p className="temperature">{Math.round(dayData.day.avgtemp_c)}°C</p>
                <p className="wind">Vent à {Math.round(dayData.day.maxwind_kph)}km/h</p>
                <p>Humidité : {dayData.day.avghumidity}%</p>
              </>
            ) : (
              // données météo actuelles
              <>
                <p>{translateWeatherCondition(weatherData.current.condition.text)}</p>
                <p><img src={`https:${weatherData.current.condition.icon}`} alt="Weather icon"></img></p>
                <p className="temperature">{weatherData.current.temp_c}°C</p>
                <p className="wind">Vent à {weatherData.current.wind_kph}km/h</p>
                <p>Humidité : {weatherData.current.humidity}%</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;