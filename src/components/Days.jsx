import React from 'react';
import { useWeather } from '../hooks/useWeather';
import '../styles/Days.css';
import { getDayOfWeek } from '../utils/date';

function Days({ city, onDaySelect }) {
  const { weatherData, loading, error } = useWeather(city);

  if (loading || !weatherData || error) {
    return (
      <div className="days-container">
        <div className="day-card">Chargement...</div>
      </div>
    );
  }

  const forecastDays = weatherData.forecast.forecastday.slice(0, 5);

  return (
    <div className="days-container">
      {forecastDays.map((day) => {
        const isToday = new Date(day.date).toDateString() === new Date().toDateString();

        return (
          <div
            key={day.date}
            className={`day-card ${isToday ? 'today' : ''}`}
            onClick={() => onDaySelect && onDaySelect(day)}
            style={{ cursor: 'pointer' }}
          >
            <div className="day-name">{getDayOfWeek(day.date)}</div>

            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="day-icon"
            />

            <div className="day-temps">
              <span className="temp-max">{Math.round(day.day.maxtemp_c)}°C</span>
              <span className="temp-min">{Math.round(day.day.mintemp_c)}°C</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Days;