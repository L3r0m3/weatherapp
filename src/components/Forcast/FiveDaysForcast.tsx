import { useMemo } from "react";
import { useSearch } from "@/context/SearchContext";
import { IFetchWeatherIconProps } from "@/types/types";
import Image from "next/image";

type TWeatherItem = {
  main: { temp: number };
  weather: { main: string; icon: string }[];
  pop?: number;
};

interface IForecastListItem {
  dt_txt: string;
  main: { temp: number };
  weather: { main: string; icon: string }[];
  pop?: number;
}

interface Forecast {
  list: IForecastListItem[];
}

export const FiveDaysForcast = () => {
  const { forecast } = useSearch();

  const groupedDays = useMemo(() => {
    if (!forecast || !forecast.list) return [];

    const days: Record<string, TWeatherItem[]> = {};

    (forecast as Forecast).list.forEach((item: IForecastListItem) => {
      const date: string = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD"
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
    });

    // Aggregate each day's data
    // Helper to map weather condition to icon code
    const conditionToIcon: Record<string, IFetchWeatherIconProps["iconId"]> = {
      Clear: "01d",
      Clouds: "02d",
      Drizzle: "09d",
      Rain: "10d",
      Thunderstorm: "11d",
      Snow: "13d",
      Mist: "50d",
      Smoke: "50d",
      Haze: "50d",
      Dust: "50d",
      Fog: "50d",
      Sand: "50d",
      Ash: "50d",
      Squall: "50d",
      Tornado: "50d",
    };

    return Object.entries(days).map(
      ([date, items]: [date: string, items: TWeatherItem[]]) => {
        // Get min/max temps, most common weather, etc.
        const temps = items.map((i: { main: { temp: number } }) => i.main.temp);
        const high = Math.round(Math.max(...temps) - 273.15);
        const low = Math.round(Math.min(...temps) - 273.15);

        // Most frequent weather condition
        const conditionCounts: Record<string, number> = {};
        items.forEach((i) => {
          const cond = i.weather[0].main;
          conditionCounts[cond] = (conditionCounts[cond] || 0) + 1;
        });
        const condition = Object.entries(conditionCounts).sort(
          (a, b) => b[1] - a[1]
        )[0][0];

        // Pick the first icon code from the day's items, fallback to "01d"
        const iconId =
          conditionToIcon[condition] ||
          (items[0]?.weather[0]?.icon as IFetchWeatherIconProps["iconId"]) ||
          "01d";

        // Average precipitation probability
        const precipitation = Math.round(
          (items.reduce((sum, i) => sum + (i.pop || 0), 0) / items.length) * 100
        );

        return {
          date,
          high,
          low,
          condition,
          precipitation,
          iconId,
        };
      }
    );
  }, [forecast]);

  if (!forecast || !forecast.list) {
    return (
      <div className="text-white text-center py-8">
        Wettervorhersage wird geladen...
      </div>
    );
  }

  const getWeatherIcon = (condition: IFetchWeatherIconProps["iconId"]) => {
    const iconUrl = `https://openweathermap.org/img/wn/${condition.toLowerCase()}@2x.png`;
    return <Image src={iconUrl} alt={condition} width={82} height={82} />;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">
        5-Tage Vorhersage
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {groupedDays.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <div className="text-white font-medium mb-3">
              {typeof window !== "undefined"
                ? new Date(day.date).toLocaleDateString("de-DE", {
                    weekday: "short",
                  }) ===
                  new Date().toLocaleDateString("de-DE", { weekday: "short" })
                  ? "Heute"
                  : new Date(day.date).toLocaleDateString("de-DE", {
                      weekday: "short",
                    })
                : day.date}
            </div>

            <div className="flex justify-center mb-3">
              {getWeatherIcon(day.iconId)}
            </div>

            <div className="text-white text-md mb-2">
              <div className="font-semibold">{day.high}°</div>
              <div className="text-white/70">{day.low}°</div>
            </div>

            <div className="text-white/70 text-sm">
              {day.precipitation}% Regen
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
