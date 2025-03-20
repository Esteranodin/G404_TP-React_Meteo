/**
 * Récupère les coordonnées géographiques de l'utilisateur
 * @returns {Promise} Promesse résolver avec {latitude, longitude} ou rejette + message d'erreur
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("La géolocalisation n'est pas prise en charge par votre navigateur");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        let errorMessage;
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Vous avez refusé l'accès à votre position";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Les données de position ne sont pas disponibles";
            break;
          case error.TIMEOUT:
            errorMessage = "Le délai d'attente pour obtenir la position a expiré";
            break;
          default:
            errorMessage = "Une erreur inconnue s'est produite";
            break;
        }
        reject(errorMessage);
      }
    );
  });
};