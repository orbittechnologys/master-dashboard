const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
<<<<<<< HEAD

function formatDate(isoString) {
  const date = new Date(isoString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export { BASE_URL, formatDate };
=======
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export { BASE_URL, GOOGLE_MAPS_API_KEY };
>>>>>>> 060942770a542ba8835efeb10eb34f4f0aadab0b
