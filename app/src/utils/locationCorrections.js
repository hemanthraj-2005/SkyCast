const TELANGANA_LOCALITIES = new Set([
  "ameerpet",
  "banjara hills",
  "gachibowli",
  "hitech city",
  "hyderabad",
  "jubilee hills",
  "kondapur",
  "kukatpalli",
  "kukatpally",
  "madhapur",
  "miyapur",
  "ramaram",
  "secunderabad",
]);

function isHyderabadArea(location) {
  const lat = Number(location.lat);
  const lon = Number(location.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return false;
  }

  return lat >= 17.2 && lat <= 17.7 && lon >= 78.2 && lon <= 78.8;
}

export function getCorrectedRegion(location) {
  if (!location?.region) return location?.country;

  const locationName = location.name?.toLowerCase() ?? "";
  const isIncorrectAndhraRegion =
    location.country === "India" && location.region === "Andhra Pradesh";
  const isKnownTelanganaPlace =
    TELANGANA_LOCALITIES.has(locationName) || isHyderabadArea(location);

  if (isIncorrectAndhraRegion && isKnownTelanganaPlace) {
    return "Telangana";
  }

  return location.region;
}
