export interface IFetchWeatherProps {
  city?: string;
  state?: string;
  country?: string;
  cnt?: number;
  APIkey: string | undefined;
}

export interface IWeatherApiWeather {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: string | number;
  wind: Record<string, number>;
  name: string;
  [key: string]: unknown;
}

export interface IWeatherApiForecast {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    pop?: number;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

export interface IWeatherSummary extends IWeatherApiWeather {
  base: string;
  description: string;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  visibility: string | number;
}

export interface IFetchWeatherIconProps {
  iconId:
    | "01d"
    | "02d"
    | "03d"
    | "04d"
    | "09d"
    | "10d"
    | "11d"
    | "13d"
    | "50d"
    | "01n"
    | "02n"
    | "03n"
    | "04n"
    | "09n"
    | "10n"
    | "11n"
    | "13n"
    | "50n"
    | string;
}
