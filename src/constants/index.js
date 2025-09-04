const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function formatDate(isoString) {
  const date = new Date(isoString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export { BASE_URL, formatDate };
