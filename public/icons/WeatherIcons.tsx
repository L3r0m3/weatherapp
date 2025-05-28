"use client";

import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { FetchWeather } from "../../src/lib/data";
import Image from "next/image";
import { FetchWeatherIcon } from "../../src/lib/data";
import { IFetchWeatherIconProps } from "../../src/types/types";
import { useSearch } from "@/context/SearchContext";

export type TWeatherConditionType = {
  main: {
    condition:
      | "thunderstorm"
      | "drizzle"
      | "rain"
      | "snow"
      | "mist"
      | "clear"
      | "clouds"
      | string
      | null;
  };
  icon: IFetchWeatherIconProps;
};

export const WeatherIcon = () => {
  const iconClass = `w-24 h-24 text-white drop-shadow-lg`;

  const { weatherState, setWeatherState, city } = useSearch();

  useEffect(() => {
    const fetchCondition = async () => {
      setWeatherState((prev) => ({ ...prev, loading: true }));
      const getWeather = await FetchWeather({
        city: city,
        APIkey: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      });

      const weatherItem = getWeather.weather?.weather?.[0];
      if (!weatherItem) {
        setWeatherState({
          condition: null,
          iconId: null,
          iconUrl: null,
          loading: false,
        });
        return;
      }

      const url = await FetchWeatherIcon({ iconId: weatherItem.icon });
      setWeatherState({
        condition: weatherItem.main.toLowerCase(),
        iconId: weatherItem.icon,
        iconUrl: url,
        loading: false,
      });
    };
    fetchCondition();
  }, []);

  if (weatherState.loading) {
    return <Loader2 className="animate-spin w-12 h-12 text-white" />;
  }

  if (!weatherState.condition || !weatherState.iconUrl) {
    return null;
  }

  return (
    <Image
      src={weatherState.iconUrl}
      alt={weatherState.condition}
      width={82}
      height={82}
      className={iconClass}
    />
  );
};
