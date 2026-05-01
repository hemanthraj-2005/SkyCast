export const demoWeather = {
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
