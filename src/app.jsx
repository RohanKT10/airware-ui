import { useState } from "react";

// API URL
const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [city, setCity] = useState("");
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // AQI by IP
  const fetchByIP = async () => {
    try {
      setLoading(true);
      setError("");
      setAqiData(null);

      const res = await fetch(`${API_BASE}/aqi`);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setAqiData(data);
    } catch {
      setError("Unable to fetch AQI for your location.");
    } finally {
      setLoading(false);
    }
  };

  // AQI by City
  const fetchByCity = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");
      setAqiData(null);

      const res = await fetch(
        `${API_BASE}/aqi/by-city?name=${encodeURIComponent(city)}`
      );
      if (!res.ok) throw new Error();

      const data = await res.json();
      setAqiData(data);
    } catch {
      setError("City not found or AQI unavailable.");
    } finally {
      setLoading(false);
    }
  };

 // AQI message 
const getMessage = (aqi) => {
  if (aqi <= 50) {
    return (
      <span className="text-green-600 font-medium">
        Air quality is good. Ideal for outdoor activities.
      </span>
    );
  }

  if (aqi <= 100) {
    return (
      <span className="text-yellow-600 font-medium">
        Air quality is acceptable.
      </span>
    );
  }

  if (aqi <= 200) {
    return (
      <span className="text-red-600 font-bold">
        Air quality is unhealthy. Take precautions!
      </span>
    );
  }

  return (
    <span className="text-red-700 font-bold">
      Air quality is very unhealthy. Stay indoors if possible.
    </span>
  );
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/airaware.png" alt="AirAware logo" className="w-44 h-28 mb-0"/>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Displays live Air Quality Index based on your IP location or selected city. Frontend made using React.js
        </p>

        {/* IP AQI */}
        <button
          onClick={fetchByIP}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          Check AQI Near Me
        </button>

        <div className="my-4 text-gray-400  text-center">OR</div>

        {/* City AQI */}
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={fetchByCity}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Search by City
        </button>

        {/* Loading message */}
        {loading && (
          <p className="mt-4 text-blue-500 font-medium">
            Fetching AQI data… This may take a few seconds
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-500 font-medium">{error}</p>
        )}

        {/* Result */}
        {aqiData && aqiData.aqi && (
          <div className="mt-6 p-4 border rounded-lg  text-center">
            <h2 className="text-xl font-semibold">
             Location: {aqiData.location.city}, {aqiData.location.country}
            </h2>

            <p className="mt-2 text-xl font-bold text-slate-800">
              AQI: {aqiData.aqi.value}
            </p>

            <p className="mt-2 text-base font-semibold text-slate-600 tracking-wide">
            Category:
            <span className="ml-2 font-bold text-slate-900">
              {aqiData.aqi.category}
            </span>
          </p>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {getMessage(aqiData.aqi.value)}
          </p>

          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-400">
            Source: {aqiData.source} • Updated at{" "}
            {new Date(aqiData.timestamp).toLocaleTimeString()}
          </p>
          </div>
        )}
      </div>
    </div>
  );
}