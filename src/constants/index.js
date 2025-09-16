function formatDate(isoString) {
  const date = new Date(isoString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export { BASE_URL, GOOGLE_MAPS_API_KEY, formatDate };
