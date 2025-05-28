import { TWeatherConditionType } from "../../../public/icons/WeatherIcons";

export const getBackgroundGradient = (
  condition: TWeatherConditionType["main"]["condition"]
) => {
  switch (condition) {
    case "clear":
      return "from-blue-400 via-blue-500 to-blue-600";
    case "clouds":
      return "from-gray-400 via-gray-500 to-gray-600";
    case "rain":
      return "from-slate-500 via-slate-600 to-slate-700";
    case "snow":
      return "from-blue-300 via-blue-400 to-blue-500";
    default:
      return "from-blue-400 via-blue-500 to-blue-600";
  }
};
