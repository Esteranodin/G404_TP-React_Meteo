import { useState, useEffect } from 'react';
import { getWeatherApiErrorMessage } from '../utils/errorHandler';
import { useError } from '../contexts/ErrorContext';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const cache = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes en millisecondes

export function useWeather(city, coordinates) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState(null); 
 
  const errorContext = useError();
  const errorSource = 'weather-api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effacer les erreurs locales et globales
        setLocalError(null);
        if (errorContext && errorContext.clearError) {
          errorContext.clearError(errorSource);
        }
        
        setLoading(true);
        
        // Construction paramètre de requête (ville ou coordonnées)
        let queryParam;
        let cacheKey;
        
        if (coordinates) {
          queryParam = `${coordinates.lat},${coordinates.lon}`;
          cacheKey = `coords_${queryParam}`;
        } else if (city) {
          queryParam = city;
          cacheKey = `city_${city}`;
        } else {
          throw new Error('Veuillez fournir une ville ou des coordonnées');
        }
        
        // Vérifier si des données en cache valides existent
        const currentTime = new Date().getTime();
        if (cache[cacheKey] && (currentTime - cache[cacheKey].timestamp < CACHE_DURATION)) {
          setWeatherData(cache[cacheKey].data);
          setLoading(false);
          return;
        }

        // Sinon, faire un appel API
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${queryParam}&days=5&aqi=no&alerts=yes`
        );

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données météorologiques');
        }

        const data = await response.json();
        
        // Mettre en cache les données
        cache[cacheKey] = {
          data,
          timestamp: currentTime
        };

        // Créer une variable pour ne garder que les données qui m'intéressent
        const formattedWeatherData = {
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

        console.log(formattedWeatherData);
                
        setWeatherData(formattedWeatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        const errorMessage = getWeatherApiErrorMessage(error);
        
        // Stocker l'erreur localement
        setLocalError(errorMessage);
        
        // Et aussi dans le contexte global si disponible
        if (errorContext && errorContext.setError) {
          errorContext.setError(errorSource, errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, coordinates]);

  // Retourner l'erreur locale avec les autres données
  return { weatherData, loading, error: localError };
}