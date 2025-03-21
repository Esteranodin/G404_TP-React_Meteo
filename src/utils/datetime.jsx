export const getDayOfWeek = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);

  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  }
  return date.toLocaleDateString('fr-FR', { weekday: 'long' });
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Conversion du format 12h (AM/PM) en format 24h
export const convertTo24HourFormat = (timeStr) => {
  if (!timeStr) return '';
  
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  
  hours = parseInt(hours);
  
  if (hours === 12) {
    hours = modifier === 'PM' ? 12 : 0;
  } else if (modifier === 'PM') {
    hours += 12;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};