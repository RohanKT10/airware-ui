## AirAware-UI: Air Quality Monitoring Web App

AirAware is a simple web application that allows users to check the **Air Quality Index (AQI)** based on their **current location (IP-based)** or by **searching for a city**.  

The frontend is built using **React.js** and **Tailwind CSS**, and is deployed on **Vercel**.

🔗 **Live App (Vercel):** https://airware-ui-gido.vercel.app

AirAware fetches real-time AQI data from a **FastAPI backend**, which exposes REST endpoints for location-based and city-based AQI queries.  
The backend source code is hosted on GitHub and deployed on **Render**.

- 🔗 **Backend GitHub Repository:** https://github.com/RohanKT10/AirAware 
- 🔗 **Backend API (on Render):** https://airaware-g729.onrender.com/aqi

The frontend communicates with the FastAPI backend via HTTP requests to retrieve AQI values, categories, and health suggestions.

---





