# WeatherApp

A modern weather forecast app built with [Next.js](https://nextjs.org/), React, and the [OpenWeatherMap API](https://openweathermap.org/api).  
Get current weather and 5-day forecasts for any city worldwide.

---

## Features

- 🌤️ Current weather with icon, temperature, humidity, wind, and more
- 📅 5-day forecast grouped by day
- 🔍 Search for any city
- ⚡ Fast, responsive UI with React and Tailwind CSS
- 🗺️ Supports international cities

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/weatherapp.git
cd weatherapp
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your [OpenWeatherMap API key](https://home.openweathermap.org/api_keys):

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

- `/src/components` – UI components (weather cards, header, forecast, etc.)
- `/src/context` – React context for global state (search, weather data)
- `/src/lib` – API logic and data utilities
- `/public/icons` – Weather icon components
- `/src/app` – Next.js app directory and routing

---

## Configuration

To display weather icons from OpenWeatherMap, your `next.config.js` should include:

```js
images: {
  domains: ["openweathermap.org"],
}
```

---

## Credits

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Lucide Icons](https://lucide.dev/) for UI icons
- [Next.js](https://nextjs.org/) and [React](https://react.dev/)

---

## License

MIT
