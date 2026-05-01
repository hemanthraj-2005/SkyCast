import { useState } from "react";
import HeroPanel from "./components/HeroPanel";
import WeatherPanel from "./components/WeatherPanel";
import { API_KEY, DEFAULT_CITY } from "./config/weather";
import { demoWeather } from "./data/demoWeather";
import { getForecast } from "./services/weatherApi";
import { loadRecentSearches, saveRecentSearches } from "./utils/recentSearches";
import "./styles/App.css";

function App() {
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(demoWeather);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("c");
  const [recentSearches, setRecentSearches] = useState(loadRecentSearches);

  function persistRecentSearch(cityName) {
    const updatedSearches = [
      cityName,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== cityName.toLowerCase(),
      ),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    saveRecentSearches(updatedSearches);
  }

  async function fetchWeather(location) {
    const trimmedLocation = location.trim();

    if (!trimmedLocation) {
      setError("Enter a city name to check the weather.");
      return;
    }

    if (!API_KEY) {
      setError("Add VITE_WEATHER_API_KEY in your .env file to fetch live data.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getForecast(API_KEY, trimmedLocation);

      setWeather(data);
      setQuery(data.location.name);
      persistRecentSearch(data.location.name);
    } catch (requestError) {
      setError(requestError.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(eventOrLocation) {
    if (typeof eventOrLocation === "string") {
      fetchWeather(eventOrLocation);
      return;
    }

    eventOrLocation.preventDefault();
    fetchWeather(query);
  }

  function handleCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Location access is not supported in this browser.");
      return;
    }

    if (!API_KEY) {
      setError("Add VITE_WEATHER_API_KEY in your .env file to fetch live data.");
      return;
    }

    setError("");
    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeather(`${latitude},${longitude}`);
        setLocationLoading(false);
      },
      (locationError) => {
        const message =
          locationError.code === locationError.PERMISSION_DENIED
            ? "Allow location access to see weather near you."
            : "Could not detect your location. Please try again.";

        setError(message);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 300000,
        timeout: 10000,
      },
    );
  }

  return (
    <main className="app-shell">
      <section className="dashboard" aria-label="Weather dashboard">
        <HeroPanel
          error={error}
          loading={loading}
          locationLoading={locationLoading}
          onCurrentLocation={handleCurrentLocation}
          onSearch={handleSearch}
          query={query}
          recentSearches={recentSearches}
          setQuery={setQuery}
          setUnit={setUnit}
          unit={unit}
        />
        <WeatherPanel unit={unit} weather={weather} />
      </section>
    </main>
  );
}

export default App;
