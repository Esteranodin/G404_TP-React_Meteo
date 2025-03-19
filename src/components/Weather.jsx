import React, { useEffect, useState } from 'react'
import '../styles/Weather.css'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=yes`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  if (loading) return <div>Chargement des données météo...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className='weather card blue-grey darken-1'>
      <div className='card-content'>
        {weatherData && (
          <div>
            <p className="card-title">{weatherData.location.name}</p>
            <p className="temperature">{weatherData.current.temp_c}°C</p>
            <p className="wind">Vent {weatherData.current.wind_kph}km/h</p>
            <p>{weatherData.current.condition.text}</p>
            <p><img src={`http:${weatherData.current.condition.icon}`} alt="Weather icon"></img></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;