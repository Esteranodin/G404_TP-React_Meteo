export const getDayOfWeek = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);

  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  }
  return date.toLocaleDateString('fr-FR', { weekday: 'long' });
};