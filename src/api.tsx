// const url = '/cities';
export const geoAPIOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY as string,
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
