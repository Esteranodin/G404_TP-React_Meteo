import { useState, useEffect } from 'react';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const cache = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes en millisecondes

export function useWeather(city) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Vérifier si des données en cache valides existent
        const currentTime = new Date().getTime();
        if (cache[city] && (currentTime - cache[city].timestamp < CACHE_DURATION)) {
          setWeatherData(cache[city].data);
          setLoading(false);
          return;
        }

        // Sinon, faire un appel API
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=yes`
        );

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données météorologiques');
        }

        const data = await response.json();
        
        // Mettre en cache les données
        cache[city] = {
          data,
          timestamp: currentTime
        };
        
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

  return { weatherData, loading, error };
}