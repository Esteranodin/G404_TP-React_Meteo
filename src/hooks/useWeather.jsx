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

        // Créer une variable pour ne garder que les données qui m'intéressent
        const formattedWeatherData = {
          alerts: {
            alert: data.alerts.alert
          },
          location: {
            name: data.location.name,
            country: data.location.country,
            localtime: data.location.localtime
          },
          current: {
            temp_c: data.current.temp_c,
            wind_kph: data.current.wind_kph,
            precip_mm: data.current.precip_mm,          
            condition: {
              text: data.current.condition.text,
              icon: data.current.condition.icon
            }
          },
          forecast: data.forecast.forecastday.map((day) => ({
            date: day.date,
            astro: {
              sunrise: day.astro.sunrise,
              sunset: day.astro.sunset, 
              moon_phase: day.astro.moon_phase
            },
            day: {
              avgtemp_c: day.day.avgtemp_c,
              daily_chance_of_rain: day.day.daily_chance_of_rain,
              maxtemp_c: day.day.maxtemp_c,
              mintemp_c: day.day.mintemp_c,
              maxwind_kph: day.day.maxwind_kph,
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon,
              }
            }
          }))
        };

        // console.log(formattedWeatherData);
                
        setWeatherData(formattedWeatherData);
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