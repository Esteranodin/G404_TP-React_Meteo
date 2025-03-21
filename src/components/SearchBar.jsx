import { useState } from 'react';
import { getCurrentPosition } from '../utils/geolocation';
import { validateCity, getGeolocationErrorMessage } from '../utils/errorHandler';
import ErrorMessage from './ErrorMessage';
import '../styles/SearchBar.css';

function SearchBar({ onCityChange, onCoordinatesChange }) {
  const [inputCity, setInputCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation du nom de la ville
    const validationError = validateCity(inputCity);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    onCityChange(inputCity.trim());
    // Réinitialiser les coordonnées si on cherche par ville
    onCoordinatesChange(null);
  };

  const handleLocationRequest = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const coords = await getCurrentPosition();
      onCoordinatesChange(coords);
      // Réinitialiser la ville si on utilise les coordonnées
      onCityChange(null);
    } catch (error) {
      setError(getGeolocationErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);

    if (error) setError(null);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Entrez une ville..."
        value={inputCity}
        onChange={handleInputChange}
      />
      <div>
        <button className="search-button" onClick={handleSubmit}>
          Rechercher
        </button>
        <button className="locate-button" onClick={handleLocationRequest} disabled={isLoading}>
          {isLoading ? 'Localisation...' : 'Me localiser'}
        </button>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
}

export default SearchBar;