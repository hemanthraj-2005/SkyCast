import BrandLogo from "./BrandLogo";

function HeroPanel({
  error,
  loading,
  locationLoading,
  onCurrentLocation,
  onSearch,
  query,
  recentSearches,
  setQuery,
  setUnit,
  unit,
}) {
  return (
    <div className="hero-panel">
      <BrandLogo />

      <div className="eyebrow">Live Weather Dashboard</div>
      <h1>Forecasts that fit your day.</h1>
      <p>
        Search any city for current conditions, comfort metrics, and a quick
        three-day outlook.
      </p>

      <form className="search-form" onSubmit={onSearch}>
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
        onClick={onCurrentLocation}
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
              <button key={item} type="button" onClick={() => onSearch(item)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="message error">{error}</p>}
    </div>
  );
}

export default HeroPanel;
