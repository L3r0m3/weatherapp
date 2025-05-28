import { Droplets, Eye, Gauge, MapPin, Wind } from "lucide-react";
import { WeatherIcon } from "../../../public/icons/WeatherIcons";
import { useSearch } from "@/context/SearchContext";

export const CurrentWeatherCard = () => {
  const { weatherData } = useSearch();

  if (!weatherData) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
        <div className="text-center text-white">Lade Wetterdaten...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="w-6 h-6 text-white mr-2" />
          <h2 className="text-2xl font-semibold text-white">
            {weatherData.base}
          </h2>
        </div>

        <div className="flex items-center justify-center mb-4">
          <WeatherIcon />
        </div>

        <div className="text-6xl font-bold text-white mb-2">
          {weatherData.feelsLike}°C
        </div>

        <div className="text-xl text-white/80 mb-4">
          {weatherData.description}
        </div>

        <div className="text-lg text-white/70">
          Gefühlt wie {weatherData.feelsLike}°C
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <Wind className="w-8 h-8 text-white mx-auto mb-2" />
          <div className="text-white/70 text-sm">Wind</div>
          <div className="text-white font-semibold">
            {weatherData.windSpeed} km/h
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <Droplets className="w-8 h-8 text-white mx-auto mb-2" />
          <div className="text-white/70 text-sm">Luftfeuchtigkeit</div>
          <div className="text-white font-semibold">
            {weatherData.humidity}%
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <Gauge className="w-8 h-8 text-white mx-auto mb-2" />
          <div className="text-white/70 text-sm">Luftdruck</div>
          <div className="text-white font-semibold">
            {weatherData.pressure} hPa
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <Eye className="w-8 h-8 text-white mx-auto mb-2" />
          <div className="text-white/70 text-sm">Sichtweite</div>
          <div className="text-white font-semibold">
            {weatherData.visibility} km
          </div>
        </div>
      </div>
    </div>
  );
};
