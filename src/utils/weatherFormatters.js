export function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateString));
}

export function getIconUrl(icon) {
  if (!icon) return "";
  return icon.startsWith("//") ? `https:${icon}` : icon;
}

export function getLocationTitle(weather) {
  if (!weather) return "Search a city";

  return [weather.location.name, weather.location.region || weather.location.country]
    .filter(Boolean)
    .join(", ");
}

export function getTemperature(unit, valueC, valueF) {
  return Math.round(unit === "c" ? valueC : valueF);
}
