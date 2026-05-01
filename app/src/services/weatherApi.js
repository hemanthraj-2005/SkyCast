const FORECAST_URL = "https://api.weatherapi.com/v1/forecast.json";

export async function getForecast(apiKey, location) {
  const params = new URLSearchParams({
    key: apiKey,
    q: location,
    days: "3",
    aqi: "no",
    alerts: "no",
  });

  const response = await fetch(`${FORECAST_URL}?${params}`);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Could not find that location.");
  }

  return data;
}
