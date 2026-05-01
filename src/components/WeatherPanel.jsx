import {
  formatDate,
  getIconUrl,
  getLocationTitle,
  getTemperature,
} from "../utils/weatherFormatters";

function WeatherPanel({ unit, weather }) {
  const forecastDays = weather?.forecast?.forecastday ?? [];
  const unitLabel = unit.toUpperCase();
  const currentTemp = weather
    ? getTemperature(unit, weather.current.temp_c, weather.current.temp_f)
    : "--";
  const feelsLike = weather
    ? getTemperature(unit, weather.current.feelslike_c, weather.current.feelslike_f)
    : "--";

  return (
    <div className="weather-panel">
      <div className="current-card">
        <div>
          <p className="card-label">Now in</p>
          <h2>{getLocationTitle(weather)}</h2>
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
        <sup>°{unitLabel}</sup>
      </div>
      <p className="condition-text">
        {weather?.current.condition.text ?? "Search for a city to begin"}
      </p>

      <div className="metric-grid">
        <article>
          <span>Feels like</span>
          <strong>
            {feelsLike}°{unitLabel}
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
              {getTemperature(unit, day.day.maxtemp_c, day.day.maxtemp_f)}° /{" "}
              {getTemperature(unit, day.day.mintemp_c, day.day.mintemp_f)}°
            </strong>
            <small>{day.day.daily_chance_of_rain}% rain</small>
          </article>
        ))}
      </div>
    </div>
  );
}

export default WeatherPanel;
