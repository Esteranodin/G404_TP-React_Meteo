import { useWeather } from '../hooks/useWeather';
import { translateWeatherCondition } from '../utils/translations';
import { getDayOfWeek, capitalizeFirstLetter } from '../utils/date';
import { useError } from '../contexts/ErrorContext';
import moon from '../assets/moon.svg';
import '../styles/Weather.css';

function Weather({ city, coordinates, dayData }) {
  const { weatherData, loading } = useWeather(city, coordinates);
  const { errors } = useError();
  const error = errors['weather-api'];

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
        maxtemp: Math.round(dayData.day.maxtemp_c),
        mintemp: Math.round(dayData.day.mintemp_c),
        wind: Math.round(dayData.day.maxwind_kph),
        rain: dayData.day.daily_chance_of_rain,
        sunrise: dayData.astro.sunrise,
        sunset: dayData.astro.sunset,
        moon: dayData.astro.moon_phase,
      }
    : {
        day: "Aujourd'hui",
        alert: weatherData.alerts.alert,
        condition: weatherData.current.condition.text,
        icon: weatherData.current.condition.icon,
        temperature: weatherData.current.temp_c,
        wind: weatherData.current.wind_kph,
        precipitation: weatherData.current.precip_mm,
      };

  return (
    <div className='weather card blue-grey darken-1'>
      <div className='card-content'>
        <div>
          <p>{capitalizeFirstLetter(displayData.day)}</p>
          <p>Le soleil se lève à {displayData.sunrise} et se couche à {displayData.sunset}</p>
          <p><img className="icon" src={moon} alt="icone de lune"/>{translateWeatherCondition(displayData.moon)}</p>
          <p className="card-title">{weatherData.location.name}</p>
          <p>{translateWeatherCondition(displayData.condition)}</p>
          <p><img src={`https:${displayData.icon}`} alt="Weather icon" /></p>
          <p className="temperature">{displayData.temperature}°C</p>
          <p>Vent maximum à {displayData.wind}km/h</p>
          <p>Probabilité de pluie : {displayData.rain}%</p>
          <p>Il pleuvra environ {displayData.precipitation} mm</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;