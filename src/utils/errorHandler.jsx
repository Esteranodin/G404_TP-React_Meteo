/**
 * Utilitaire central de gestion des messages d'erreur
 */

// Messages d'erreur standardisés
export const ERROR_MESSAGES = {

  // Erreurs de saisie utilisateur
  EMPTY_CITY: "Veuillez entrer un nom de ville",
  INVALID_CITY_NAME: "Le nom de ville contient des caractères non valides",
  CITY_TOO_SHORT: "Le nom de ville est trop court (minimum 2 caractères)",

  // Erreurs de géolocalisation
  GEOLOCATION_UNSUPPORTED: "La géolocalisation n'est pas prise en charge par votre navigateur",
  GEOLOCATION_PERMISSION_DENIED: "Vous avez refusé l'accès à votre position",
  GEOLOCATION_UNAVAILABLE: "Les données de position ne sont pas disponibles",
  GEOLOCATION_TIMEOUT: "Le délai d'attente pour obtenir la position a expiré",
  GEOLOCATION_UNKNOWN: "Une erreur inconnue de géolocalisation s'est produite",
  
  // Erreurs d'API météo
  API_CONNECTION_ERROR: "Impossible de se connecter à l'API météo",
  API_CITY_NOT_FOUND: "Ville introuvable. Vérifiez l'orthographe.",
  API_RATE_LIMIT: "Limite de requêtes API dépassée. Réessayez plus tard.",
  API_INVALID_COORDINATES: "Coordonnées géographiques invalides",
  API_SERVICE_DOWN: "Le service météo est temporairement indisponible",
  API_UNEXPECTED_RESPONSE: "Format de données météo inattendu",
  API_FORECAST_UNAVAILABLE: "Prévisions météo indisponibles pour cette période",
  API_UNKNOWN_ERROR: "Une erreur est survenue lors de la récupération des données météo",
  
  // Erreurs réseau
  NETWORK_ERROR: "Problème de connexion réseau. Vérifiez votre connexion internet.",
  
  // Erreurs génériques
  UNKNOWN_ERROR: "Une erreur inattendue s'est produite"
};

/**
 * Valide le nom de la ville
 * @param {string} city -
 * @returns {string|null}
 */
export const validateCity = (city) => {
  if (!city || !city.trim()) {
    return ERROR_MESSAGES.EMPTY_CITY;
  }
  
  if (city.trim().length < 2) {
    return ERROR_MESSAGES.CITY_TOO_SHORT;
  }
  
  // Regex pour valider le nom de ville (lettres, espaces, tirets, apostrophes)
  const validCityRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  if (!validCityRegex.test(city)) {
    return ERROR_MESSAGES.INVALID_CITY_NAME;
  }
  
  return null;
};

/**
 * Récupère le message d'erreur approprié pour les erreurs de géolocalisation
 * @param {Error|GeolocationPositionError} error 
 * @returns {string} 
 */
export const getGeolocationErrorMessage = (error) => {
  if (!error) return ERROR_MESSAGES.UNKNOWN_ERROR;
  
  // Si c'est une erreur de l'API Geolocation
  if (error.code !== undefined) {
    switch(error.code) {
      case 1: 
        return ERROR_MESSAGES.GEOLOCATION_PERMISSION_DENIED;
      case 2: 
        return ERROR_MESSAGES.GEOLOCATION_UNAVAILABLE;
      case 3:
        return ERROR_MESSAGES.GEOLOCATION_TIMEOUT;
      default:
        return ERROR_MESSAGES.GEOLOCATION_UNKNOWN;
    }
  }
  
  // Si c'est une erreur générique (string ou Error)
  return error.message || error.toString();
};

/**
 * Récupère le message d'erreur approprié pour les erreurs d'API météo
 * @param {Error|Object} error 
 * @returns {string} 
 */
export const getWeatherApiErrorMessage = (error) => {
  if (!error) return ERROR_MESSAGES.UNKNOWN_ERROR;
  
  // Gestion des erreurs HTTP standard
  if (error.response) {
    const status = error.response.status;
    
    switch (status) {
      case 404:
        return ERROR_MESSAGES.API_CITY_NOT_FOUND;
      case 400:
        return ERROR_MESSAGES.API_INVALID_COORDINATES;
      case 429:
        return ERROR_MESSAGES.API_RATE_LIMIT;
      case 500:
      case 502:
      case 503:
      case 504:
        return ERROR_MESSAGES.API_SERVICE_DOWN;
      default:
        break;
    }
  }
  
  // Erreurs réseau
  if (error.message) {
    if (error.message.includes('network') || error.message.includes('Network')) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    if (error.message.includes('timeout')) {
      return ERROR_MESSAGES.API_CONNECTION_ERROR;
    }
  }
  
  // Erreurs de parsing/format
  if (error.name === 'SyntaxError') {
    return ERROR_MESSAGES.API_UNEXPECTED_RESPONSE;
  }
  
  return error.message || ERROR_MESSAGES.API_UNKNOWN_ERROR;
};