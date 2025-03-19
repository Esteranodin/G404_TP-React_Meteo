import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onCityChange }) {
  const [inputCity, setInputCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      onCityChange(inputCity);
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
            placeholder="Entrez une ville..."
            className="white-text"
          />
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          Rechercher
        </button>
      </form>
    </div>
  );
}

export default SearchBar;