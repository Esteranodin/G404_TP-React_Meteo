const weatherTranslations = {
  // Conditions ensoleillées
  "Sunny": "Ensoleillé",
  "Clear": "Dégagé",
  "Partly cloudy": "Partiellement nuageux",
  "Cloudy": "Nuageux",
  "Overcast": "Couvert",
  
  // Pluie
  "Patchy rain possible": "Risque de pluie éparse",
  "Rain": "Pluie",
  "Light rain": "Pluie légère",
  "Moderate rain": "Pluie modérée",
  "Heavy rain": "Forte pluie",
  "Drizzle": "Bruine",
  "Showers": "Averses",
  
  // Orage
  "Thunderstorm": "Orage",
  "Thunder": "Tonnerre",
  "Thundery outbreaks possible": "Risque d'orages",
  
  // Neige
  "Snow": "Neige",
  "Light snow": "Neige légère",
  "Heavy snow": "Forte neige",
  "Blizzard": "Blizzard",
  
  // Autres conditions
  "Fog": "Brouillard",
  "Mist": "Brume",
  "Freezing fog": "Brouillard givrant",
  "Ice": "Glace",
  "Frost": "Gel",
  "Hail": "Grêle",
  
  // Par défaut
  "Unknown": "Inconnu"
};

export const translateWeatherCondition = (englishCondition) => {
  return weatherTranslations[englishCondition] || englishCondition;
};