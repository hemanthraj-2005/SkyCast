# SkyCast Interview Quick Reference

## Project Overview

SkyCast is a responsive weather web app built with React and Vite. It lets users search for weather by city name or detect weather using their real-time location. The app displays current weather, important comfort metrics, a three-day forecast, recent searches, and Celsius/Fahrenheit switching.

Live app: https://sky-cast-rho-one.vercel.app

## One-Minute Explanation

SkyCast is a frontend weather dashboard. I built it using React with a clean component-based structure. The app uses WeatherAPI to fetch live forecast data. Users can search by city or use the browser Geolocation API to get weather for their current location. I also added unit switching, recent searches using localStorage, loading and error states, and a responsive dark UI.

## Main Features

- City-based weather search
- Real-time location weather using browser geolocation
- Current temperature and weather condition
- Feels-like temperature, humidity, wind speed, UV index, pressure, and visibility
- Three-day forecast
- Celsius and Fahrenheit toggle
- Recent searches stored in localStorage
- Loading and error states
- Responsive layout for desktop and mobile
- Dark gray/black theme with colorful weather icons
- Deployed on Vercel

## Weather Metrics Explained

- UV index: shows the strength of ultraviolet radiation from the sun. A value of `5` is moderate, so users should be careful during longer outdoor exposure.
- Pressure: shows atmospheric pressure in millibars. A value around `1010 mb` is close to normal pressure and can help indicate possible weather changes.
- Visibility: shows how far users can clearly see. A value like `10 km` means visibility is good, while lower visibility may indicate fog, rain, dust, or pollution.
- Humidity: shows the amount of moisture in the air. Higher humidity can make the temperature feel warmer.
- Wind speed: shows how fast air is moving. It helps users understand outdoor comfort and travel conditions.
- Feels-like temperature: combines temperature, humidity, and wind to show how the weather actually feels to the body.

## Tech Stack

- React: UI and state management
- Vite: development server and build tool
- JavaScript: app logic
- CSS: custom responsive styling
- WeatherAPI: live weather and forecast data
- Browser Geolocation API: user location detection
- localStorage: recent search persistence
- Vercel: deployment

## Project Structure

```text
app/
  public/
    favicon.svg
  src/
    components/
      BrandLogo.jsx
      HeroPanel.jsx
      WeatherPanel.jsx
    config/
      weather.js
    data/
      demoWeather.js
    services/
      weatherApi.js
    styles/
      App.css
      index.css
    utils/
      recentSearches.js
      weatherFormatters.js
    App.jsx
    main.jsx

config/
  eslint.config.js
  vite.config.js

README.md
package.json
```

## Code Explanation

### `App.jsx`

This is the main container component. It manages the app state and connects the UI with the weather API.

Important state values:

- `query`: current city input value
- `weather`: weather data currently displayed
- `loading`: true while city weather is being fetched
- `locationLoading`: true while detecting current location
- `error`: stores error messages
- `unit`: stores selected temperature unit, either `c` or `f`
- `recentSearches`: stores previous city searches

Main functions:

- `fetchWeather(location)`: calls WeatherAPI and updates the dashboard
- `handleSearch(eventOrLocation)`: handles form search and recent-search clicks
- `handleCurrentLocation()`: asks browser for location and fetches weather using latitude/longitude
- `persistRecentSearch(cityName)`: saves searched cities in localStorage

### `HeroPanel.jsx`

This component renders the left side of the dashboard.

It contains:

- SkyCast branding
- App headline
- City search input
- Search button
- Current location button
- Celsius/Fahrenheit toggle
- Recent search buttons
- Error message display

It receives data and functions as props from `App.jsx`, which keeps the component reusable and focused on UI.

### `WeatherPanel.jsx`

This component renders the weather result section.

It displays:

- Location name
- Last updated local time
- Weather icon
- Current temperature
- Weather condition text
- Six weather metrics
- Three-day forecast cards

It uses helper functions from `weatherFormatters.js` to keep formatting logic outside the UI.

### `weatherApi.js`

This file contains the API call logic.

`getForecast(apiKey, location)` creates a WeatherAPI request using `URLSearchParams`, fetches forecast data, checks for errors, and returns the response data.

This separation keeps API logic away from components and makes the code cleaner.

### `weatherFormatters.js`

This file contains small helper functions:

- `formatDate(dateString)`: formats forecast dates into short weekday names
- `getIconUrl(icon)`: converts WeatherAPI icon URLs into valid HTTPS URLs
- `getLocationTitle(weather)`: combines city and region/country
- `getTemperature(unit, valueC, valueF)`: returns temperature based on selected unit

### `recentSearches.js`

This file handles localStorage operations.

- `loadRecentSearches()`: reads saved searches from localStorage
- `saveRecentSearches(searches)`: saves updated searches

Using a separate utility file prevents storage logic from cluttering the main component.

### `demoWeather.js`

This file contains sample weather data for Bengaluru. It gives the UI a complete initial state before the user searches.

This is useful because the page does not look empty on first load.

### `weather.js`

This file stores configuration values:

- `API_KEY`
- `DEFAULT_CITY`
- `RECENT_SEARCHES_KEY`

It makes configuration easier to manage from one place.

## Weather Data Flow

```text
User enters city
  -> HeroPanel sends search event to App
  -> App calls fetchWeather()
  -> fetchWeather() calls getForecast()
  -> WeatherAPI returns forecast data
  -> App updates weather state
  -> WeatherPanel re-renders with new data
```

## Current Location Flow

```text
User clicks "Use my current location"
  -> App checks navigator.geolocation
  -> Browser asks for location permission
  -> Latitude and longitude are received
  -> App calls fetchWeather("lat,long")
  -> WeatherAPI returns weather for that location
  -> Dashboard updates
```

## Recent Searches Flow

```text
Successful city search
  -> City name is added to recentSearches state
  -> Updated list is saved to localStorage
  -> Recent search buttons appear in the UI
  -> Clicking a recent search fetches that city again
```

## Error Handling

The app handles these cases:

- Empty city input
- Missing WeatherAPI key
- Invalid city name
- Network/API failure
- Browser does not support geolocation
- User denies location permission
- Location detection timeout/failure

Errors are shown directly in the UI so the user knows what went wrong.

## Deployment Explanation

SkyCast is deployed on Vercel as a frontend-only app. Vercel builds the React/Vite project and serves the static files.

The WeatherAPI key is configured as a Vercel environment variable:

```text
VITE_WEATHER_API_KEY
```

The `VITE_` prefix is required because Vite only exposes environment variables with this prefix to frontend code.

## Important Interview Points

- The app is frontend-only, so there is no backend server.
- Weather data comes from WeatherAPI.
- Geolocation comes from the browser, not from WeatherAPI.
- localStorage is used for recent searches.
- Components are separated by responsibility.
- API logic is separated into a service file.
- Formatting logic is separated into utility files.
- Vite environment variables require the `VITE_` prefix.
- Current location works on HTTPS because browsers require secure origins for geolocation.

## Possible Interview Questions

### Why did you use React?

React makes it easy to build the dashboard as reusable components and update the UI automatically when state changes.

### Why did you separate the code into components and services?

To keep the code organized. Components handle UI, services handle API calls, and utilities handle reusable helper logic.

### How does the current location feature work?

It uses `navigator.geolocation.getCurrentPosition()` to get latitude and longitude from the browser. Those coordinates are passed to WeatherAPI as the location query.

### How are recent searches stored?

Recent searches are stored in browser localStorage. This keeps them available even after refreshing the page.

### Is there a backend?

No. It is a frontend-only app. For production, a backend proxy could be added later to hide the API key and add rate limiting.

### What happens if the API key is missing?

The app shows an error message instead of making a failed request.

### What did you do for responsiveness?

The layout uses CSS grid, flexible sizing, and media queries. On smaller screens, the two-panel dashboard becomes a single-column layout.

### What would you improve next?

- Add hourly forecast
- Add weather alerts
- Add air quality index
- Add theme switching
- Add backend API proxy to protect the API key
- Add tests for API and formatting logic

## Short Resume Description

Built SkyCast, a responsive React weather dashboard using WeatherAPI and browser geolocation. Implemented city search, real-time location weather, unit switching, recent searches with localStorage, three-day forecast, error handling, and Vercel deployment.
