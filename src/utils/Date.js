export default function dateFormat(date){
  const dateObj = new Date(date);
  const formattedDate = `${dateObj.getUTCDate().toString().padStart(2, '0')}/${(dateObj.getUTCMonth() + 1).toString().padStart(2, '0')}/${dateObj.getUTCFullYear()}`;

  const formattedHour = `${dateObj.getUTCHours().toString().padStart(2, '0')}:${dateObj.getUTCMinutes().toString().padStart(2, '0')}:${dateObj.getUTCSeconds().toString().padStart(2, '0')}`;

  return [
    formattedDate,
    formattedHour
  ]
}

