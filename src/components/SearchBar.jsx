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
    
    // Si tout est valide, effacer les erreurs
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
    // Effacer les erreurs dès que l'utilisateur commence à taper
    if (error) setError(null);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input 
            type="text" 
            value={inputCity} 
            onChange={handleInputChange}
            placeholder="Entrez une ville"
          />
          <button type="submit" className="btn">Rechercher</button>
        </div>
      </form>
      
      <div>
        <button 
          onClick={handleLocationRequest} 
          disabled={isLoading}
          className="btn waves-effect waves-light"
        >
          {isLoading ? 'Localisation...' : 'Me localiser'}
        </button>
      </div>
      
      <ErrorMessage error={error} />
    </div>
  );
}

export default SearchBar;