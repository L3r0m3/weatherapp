"use client";
import { IWeatherSummary, IWeatherApiForecast } from "../types/types";

import {
  useEffect,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { FetchWeather } from "../lib/data";
import { TWeatherConditionType } from "../../public/icons/WeatherIcons";

interface SearchContextType {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  weatherData: IWeatherSummary | null;
  weatherState: {
    condition: TWeatherConditionType["main"]["condition"] | null;
    iconId: string | null;
    iconUrl: string | null;
    loading: boolean;
  };
  setWeatherState: Dispatch<
    SetStateAction<{
      condition: TWeatherConditionType["main"]["condition"] | null;
      iconId: string | null;
      iconUrl: string | null;
      loading: boolean;
    }>
  >;
  forecast?: IWeatherApiForecast | null;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider.");
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState<string>("Moosburg an der Isar");
  const [weatherData, setWeatherData] = useState<IWeatherSummary | null>(null);
  const [forecast, setForecast] = useState<IWeatherApiForecast | null>(null);
  const [weatherState, setWeatherState] = useState<{
    condition: TWeatherConditionType["main"]["condition"] | null;
    iconId: string | null;
    iconUrl: string | null;
    loading: boolean;
  }>({
    condition: null,
    iconId: null,
    iconUrl: null,
    loading: true,
  });

  useEffect(() => {
    const getWeatherData = async () => {
      const fetchWeatherData = await FetchWeather({
        city,
        APIkey: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      });
      if (fetchWeatherData) {
        setWeatherData(fetchWeatherData.obj);
        setForecast(fetchWeatherData.forecast);
      }
    };
    getWeatherData();
  }, [city]);

  return (
    <SearchContext.Provider
      value={{
        forecast,
        searchInput,
        setSearchInput,
        city,
        setCity,
        weatherData,
        weatherState,
        setWeatherState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
