import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const DEFAULT_CITY = "Bengaluru";
const RECENT_SEARCHES_KEY = "weather-webapp-recent-searches";

const demoWeather = {
  location: {
    name: "Bengaluru",
    region: "Karnataka",
    country: "India",
    localtime: "2026-05-02 16:30",
  },
  current: {
    temp_c: 29,
    temp_f: 84.2,
    feelslike_c: 31,
    feelslike_f: 87.8,
    humidity: 58,
    wind_kph: 14.8,
    wind_mph: 9.2,
    pressure_mb: 1010,
    uv: 5,
    vis_km: 10,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
    },
  },
  forecast: {
    forecastday: [
      {
        date: "2026-05-02",
        day: {
          avgtemp_c: 29,
          avgtemp_f: 84.2,
          maxtemp_c: 33,
          maxtemp_f: 91.4,
          mintemp_c: 23,
          mintemp_f: 73.4,
          daily_chance_of_rain: 34,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          },
        },
      },
      {
        date: "2026-05-03",
        day: {
          avgtemp_c: 28,
          avgtemp_f: 82.4,
          maxtemp_c: 32,
          maxtemp_f: 89.6,
          mintemp_c: 22,
          mintemp_f: 71.6,
          daily_chance_of_rain: 56,
          condition: {
            text: "Patchy rain nearby",
            icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
          },
        },
      },
      {
        date: "2026-05-04",
        day: {
          avgtemp_c: 27,
          avgtemp_f: 80.6,
          maxtemp_c: 31,
          maxtemp_f: 87.8,
          mintemp_c: 22,
          mintemp_f: 71.6,
          daily_chance_of_rain: 62,
          condition: {
            text: "Light rain shower",
            icon: "//cdn.weatherapi.com/weather/64x64/day/353.png",
          },
        },
      },
    ],
  },
};

function loadRecentSearches() {
  try {
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    return savedSearches ? JSON.parse(savedSearches) : [];
  } catch {
    return [];
  }
}

function App() {
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(demoWeather);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("c");
  const [recentSearches, setRecentSearches] = useState(loadRecentSearches);

  const forecastDays = weather?.forecast?.forecastday ?? [];
  const locationTitle = weather
    ? [weather.location.name, weather.location.region || weather.location.country]
        .filter(Boolean)
        .join(", ")
    : "Search a city";

  const currentTemp = weather
    ? Math.round(unit === "c" ? weather.current.temp_c : weather.current.temp_f)
    : "--";

  const feelsLike = weather
    ? Math.round(unit === "c" ? weather.current.feelslike_c : weather.current.feelslike_f)
    : "--";

  function getTemp(valueC, valueF) {
    return Math.round(unit === "c" ? valueC : valueF);
  }

  function getIconUrl(icon) {
    if (!icon) return "";
    return icon.startsWith("//") ? `https:${icon}` : icon;
  }

  function formatDate(dateString, style = "weekday") {
    return new Intl.DateTimeFormat("en", {
      weekday: style === "weekday" ? "short" : undefined,
      month: style === "full" ? "short" : undefined,
      day: style === "full" ? "numeric" : undefined,
    }).format(new Date(dateString));
  }

  function persistRecentSearch(cityName) {
    const updatedSearches = [
      cityName,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== cityName.toLowerCase(),
      ),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
  }

  async function fetchWeather(cityName) {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
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
      const params = new URLSearchParams({
        key: API_KEY,
        q: trimmedCity,
        days: "3",
        aqi: "no",
        alerts: "no",
      });
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?${params}`,
      );
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error?.message || "Could not find that city.");
      }

      setWeather(data);
      setQuery(data.location.name);
      persistRecentSearch(data.location.name);
    } catch (requestError) {
      setError(requestError.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
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
        <div className="hero-panel">
          <div className="brand-lockup" aria-label="SkyCast">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-sun"></span>
              <span className="brand-cloud"></span>
              <span className="brand-cloud brand-cloud-small"></span>
            </span>
            <span>SkyCast</span>
          </div>
          <div className="eyebrow">Live Weather Dashboard</div>
          <h1>Forecasts that fit your day.</h1>
          <p>
            Search any city for current conditions, comfort metrics, and a
            quick three-day outlook.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <label className="search-field">
              <span>City</span>
              <input
                type="search"
                placeholder="Try Mumbai, London, Tokyo..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Checking" : "Search"}
            </button>
          </form>

          <button
            className="location-button"
            type="button"
            onClick={handleCurrentLocation}
            disabled={loading || locationLoading}
          >
            {locationLoading ? "Detecting your location" : "Use my current location"}
          </button>

          <div className="controls-row">
            <div className="unit-toggle" aria-label="Temperature unit">
              <button
                className={unit === "c" ? "active" : ""}
                type="button"
                onClick={() => setUnit("c")}
              >
                Celsius
              </button>
              <button
                className={unit === "f" ? "active" : ""}
                type="button"
                onClick={() => setUnit("f")}
              >
                Fahrenheit
              </button>
            </div>

            {recentSearches.length > 0 && (
              <div className="recent-searches" aria-label="Recent searches">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => fetchWeather(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && <p className="message error">{error}</p>}
        </div>

        <div className="weather-panel">
          <div className="current-card">
            <div>
              <p className="card-label">Now in</p>
              <h2>{locationTitle}</h2>
              <p className="local-time">
                {weather?.location.localtime
                  ? `Updated ${weather.location.localtime}`
                  : "Live conditions appear here"}
              </p>
            </div>

            {weather && (
              <img
                className="weather-icon"
                src={getIconUrl(weather.current.condition.icon)}
                alt={weather.current.condition.text}
              />
            )}
          </div>

          <div className="temperature-display">
            <span>{currentTemp}</span>
            <sup>°{unit.toUpperCase()}</sup>
          </div>
          <p className="condition-text">
            {weather?.current.condition.text ?? "Search for a city to begin"}
          </p>

          <div className="metric-grid">
            <article>
              <span>Feels like</span>
              <strong>
                {feelsLike}°{unit.toUpperCase()}
              </strong>
            </article>
            <article>
              <span>Humidity</span>
              <strong>{weather?.current.humidity ?? "--"}%</strong>
            </article>
            <article>
              <span>Wind</span>
              <strong>
                {weather
                  ? unit === "c"
                    ? `${weather.current.wind_kph} kph`
                    : `${weather.current.wind_mph} mph`
                  : "--"}
              </strong>
            </article>
            <article>
              <span>UV index</span>
              <strong>{weather?.current.uv ?? "--"}</strong>
            </article>
            <article>
              <span>Pressure</span>
              <strong>{weather?.current.pressure_mb ?? "--"} mb</strong>
            </article>
            <article>
              <span>Visibility</span>
              <strong>{weather?.current.vis_km ?? "--"} km</strong>
            </article>
          </div>

          <div className="forecast-strip">
            {forecastDays.map((day) => (
              <article key={day.date}>
                <span>{formatDate(day.date)}</span>
                <img
                  src={getIconUrl(day.day.condition.icon)}
                  alt={day.day.condition.text}
                />
                <strong>
                  {getTemp(day.day.maxtemp_c, day.day.maxtemp_f)}° /{" "}
                  {getTemp(day.day.mintemp_c, day.day.mintemp_f)}°
                </strong>
                <small>{day.day.daily_chance_of_rain}% rain</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
