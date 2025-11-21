export const dateFormat = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    minute: '2-digit',
    hour: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};
