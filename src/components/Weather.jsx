import { useWeather } from '../hooks/useWeather';
import { translateWeatherCondition } from '../utils/translations';
import { getDayOfWeek, capitalizeFirstLetter, convertTo24HourFormat } from '../utils/datetime';
import { useError } from '../contexts/ErrorContext';
import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';
import '../styles/Weather.css';

function Weather({ city, coordinates, dayData }) {
  const { weatherData, loading } = useWeather(city, coordinates);
  const { errors } = useError();
  const error = errors['weather-api'];

  if (loading) return <div className='error-message'>Chargement des données météo...</div>;
  if (error) return <div className='error-message'>{error}</div>;
  if (!weatherData) return <div className='error-message'>Aucune donnée disponible</div>;

  // Pour récupérer les données pour aujourd'hui dans celles des prévisions (current -> forecast)
  const todayForecast = weatherData.forecast && weatherData.forecast.length > 0
    ? weatherData.forecast.find(day =>
      new Date(day.date).toDateString() === new Date().toDateString())
    : null;

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
      condition: weatherData.current.condition.text,
      icon: weatherData.current.condition.icon,
      temperature: Math.round(weatherData.current.temp_c),
      wind: weatherData.current.wind_kph,
      sunrise: todayForecast?.astro?.sunrise,
      sunset: todayForecast?.astro?.sunset,
      moon: todayForecast?.astro?.moon_phase,
      rain: todayForecast?.day?.daily_chance_of_rain,
    };


  return (
    <div className='weather card'>
      <div className='card-content'>
        <p>{capitalizeFirstLetter(displayData.day)}</p>

        <div className="astro-info">
          {displayData.sunrise && displayData.sunset && (
            <>
              <div className="astro-item">
                <div className="astro-value">{convertTo24HourFormat(displayData.sunrise)}</div>
                <div className="astro-label">Lever</div>
              </div>
              <div><img src={sun} alt="icone lune" /></div>
              <div className="astro-item">
                <div className="astro-value">{convertTo24HourFormat(displayData.sunset)}</div>
                <div className="astro-label">Coucher</div>
              </div>
            </>
          )}
        </div>
        <h2 className="card-title">{weatherData.location.name}</h2>

        <p className="condition-text">{translateWeatherCondition(displayData.condition)}</p>
        <p><img src={`https:${displayData.icon}`} alt="Weather icon" /></p>

        <p className="temperature">{displayData.temperature}°C</p>

        <div>
          <p>Vent: {displayData.wind} km/h</p>
          {displayData.rain !== undefined && (
            <p>Probabilité de pluie: {displayData.rain}%</p>
          )}
        </div>

        {displayData.moon && (
          <><img className="icon" src={moon} alt="icone de lune" />
          <p>{translateWeatherCondition(displayData.moon)}</p></>
        )}
      </div>
    </div>
  );
}

export default Weather;