# SkyCast

SkyCast is a React + Vite weather dashboard that shows live weather, a three-day forecast, unit switching, recent searches, and weather from the user's current location.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```bash
cp .env.example .env
```

Add your WeatherAPI key:

```env
VITE_WEATHER_API_KEY=your_weatherapi_key_here
```

Run the app:

```bash
npm run dev
```

## Deploy On Vercel

Add this environment variable in the Vercel project settings:

```env
VITE_WEATHER_API_KEY=your_weatherapi_key_here
```

Use these build settings:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

After adding or changing the environment variable, redeploy the project. Vercel must rebuild the app before the key is available in production.

## Notes

The current-location feature uses the browser Geolocation API, so it works on secure origins such as `https://` Vercel deployments and `localhost`.
