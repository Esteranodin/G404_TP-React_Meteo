import { useState } from 'react';
import { getCurrentPosition } from '../utils/geolocation';
import '../styles/SearchBar.css';

function SearchBar({ onCityChange, onCoordinatesChange }) {
  const [inputCity, setInputCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      onCityChange(inputCity);
      onCoordinatesChange(null);
    }
  };

  const handleLocationRequest = async () => {
    try {
      setIsLoading(true);
      setLocationError(null);
      const coords = await getCurrentPosition();
      onCoordinatesChange(coords);
      onCityChange(null);
    } catch (error) {
      setLocationError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input 
            type="text" 
            value={inputCity} 
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Entrez une ville"
          />
          <button type="submit" className="btn">Rechercher</button>
        </div>
      </form>
      
      <div className="geolocation-container">
        <button 
          onClick={handleLocationRequest} 
          disabled={isLoading}
          className="btn waves-effect waves-light"
        >
          {isLoading ? 'Localisation...' : 'Me localiser'}
        </button>
      </div>
      
      {locationError && (
        <div className="error-message red-text">{locationError}</div>
      )}
    </div>
  );
}

export default SearchBar;