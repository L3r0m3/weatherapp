import { api } from "./api";
import {
  IFetchWeatherIconProps,
  IFetchWeatherProps,
  IWeatherApiForecast,
  IWeatherApiWeather,
  IWeatherSummary,
} from "@/types/types";

/**
 * Fetches current weather data and a 5-day forecast for a specified location.
 *
 * @param {IFetchWeatherProps} params - The parameters for fetching weather data.
 * @param {string} params.city - The city name.
 * @param {string} [params.state] - The state name (optional).
 * @param {string} [params.country] - The country code (optional).
 * @param {string} params.APIkey - The API key for OpenWeatherMap.
 * @returns {Promise<{ forecast: WeatherApiForecast; weather: WeatherApiWeather; obj: WeatherSummary }>} - An object containing the forecast, current weather, and a summary object.
 */

export const FetchWeather = async ({
  city,
  state,
  country,
  APIkey,
}: IFetchWeatherProps): Promise<{
  forecast: IWeatherApiForecast;
  weather: IWeatherApiWeather;
  obj: IWeatherSummary;
}> => {
  const locationQuery = [city, state, country].filter(Boolean).join(",");

  const response = await api.get(`weather?q=${locationQuery}&appid=${APIkey}`);

  if (response.status !== 200) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }
  if (!response.data || Object.keys(response.data).length === 0) {
    throw new Error("No weather data found for the specified location.");
  }

  const forecastResponse: IWeatherApiForecast = await FetchFiveDaysForecast({
    city,
    cnt: 40,
    APIkey,
  });

  const weather: IWeatherApiWeather = response.data;

  const obj: IWeatherSummary = {
    ...weather,
    base: weather.name,
    description: weather.weather[0].description,
    feelsLike: Math.round(weather.main.feels_like - 273.15),
    windSpeed: Math.round(weather.wind.speed * 3.6),
    humidity: weather.main.humidity,
    pressure: weather.main.pressure,
    visibility:
      typeof weather.visibility === "number"
        ? (weather.visibility / 1000).toFixed(1)
        : weather.visibility,
  };

  return { forecast: forecastResponse, weather, obj };
};

export const FetchFiveDaysForecast = async ({
  city,
  cnt,
  APIkey,
}: IFetchWeatherProps): Promise<IWeatherApiForecast> => {
  const response = await api.get<IWeatherApiForecast>(
    `forecast?q=${city}&cnt=${cnt}&appid=${APIkey}`
  );

  if (response.status !== 200) {
    throw new Error(`Error fetching forecast data: ${response.statusText}`);
  }

  return response.data;
};

export const FetchWeatherIcon = async ({
  iconId,
}: IFetchWeatherIconProps): Promise<string> => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};
