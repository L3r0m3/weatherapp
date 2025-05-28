"use client";

import { CurrentWeatherCard } from "@/components/Cards/CurrentWeatherCard";
import { Header } from "@/components/Header/Header";
import { useSearch } from "@/context/SearchContext";
import { getBackgroundGradient } from "../background/BackGroundGradient";
import { FiveDaysForcast } from "@/components/Forcast/FiveDaysForcast";
import { Footer } from "@/components/Footer/Footer";

export default function CityPage() {
  const { weatherState } = useSearch();
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(
        weatherState.condition
      )} p-4`}
    >
      <Header />
      <CurrentWeatherCard />
      <FiveDaysForcast />
      <Footer />
    </div>
  );
}
