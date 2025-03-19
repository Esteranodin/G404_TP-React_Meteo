import React from 'react';
import { useWeather } from '../hooks/useWeather';
import '../styles/Days.css';

function Days({ city }) {
  const { weatherData, loading, error } = useWeather(city);
  
  // date en jour de la semaine et si aujourd'hui
  const getDayOfWeek = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    }

    return date.toLocaleDateString('fr-FR', { weekday: 'long' });
  };

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