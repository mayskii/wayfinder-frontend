# Wayfinder

A full-stack travel planning application that helps users discover city attractions, generate optimized routes, and keep a personal travel journal with notes about their trips.

**Live demo:** https://wayfinder-taupe.vercel.app (the backend runs on a free plan and may sleep when idle, so the first search can take up to two minutes)

Wayfinder combines a React frontend with a Java Spring Boot backend and PostgreSQL database. The system integrates external location APIs and implements backend caching to improve performance and reduce unnecessary API requests.

---

## Features

- City search with attraction discovery
- User authentication with Firebase  
- Route optimization for efficient trip planning  
- Interactive map visualization with Leaflet  
- Personal travel journal with user notes  
- Backend caching to minimize external API calls  
- Integration with LocationIQ and OpenStreetMap APIs  
- Data stored in a PostgreSQL database

---

## Architecture Overview

Wayfinder follows a client–server architecture:

- **Frontend:** React application for UI and map visualization  
- **Backend:** Spring Boot REST API handling business logic and caching  
- **Database:** PostgreSQL for storing cities and attractions  
- **External APIs:** LocationIQ and OpenStreetMap for geodata  
- **Optimization Service:** Reorders attractions for efficient routes

The backend checks the database cache first and only calls external APIs when data is missing.

---

## Tech Stack / Dependencies

### Frontend

- React
- Leaflet (interactive map)
- Axios (HTTP client)
- Firebase Authentication (user login)

### Backend

- Java Spring Boot
- Spring Data JPA (Hibernate) for database access
- PostgreSQL
- Maven

### External APIs

- LocationIQ (city geolocation & bounding box)
- OpenStreetMap / Overpass API (attraction data)

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/mayskii/wayfinder-backend.git
git clone https://github.com/mayskii/wayfinder-frontend.git
```

### 2. Backend Setup (Spring Boot)

1. Create a PostgreSQL database named `wayfinder`.
2. Set the environment variables (database URL, username, password and `LOCATIONIQ_API_KEY`). The full list is in the [backend README](https://github.com/mayskii/wayfinder-backend#configuration).
3. Start the backend server:

```bash
cd wayfinder-backend
mvn spring-boot:run
```

The backend runs on http://localhost:8080 by default.

### 3. Frontend Setup (React)

```bash
cd wayfinder-frontend
npm install
npm run dev
```

Set the backend address in a `.env` file (defaults to `http://localhost:8080`):

```
VITE_API_URL=http://localhost:8080
```

---

## ⚙ Environment Requirements

- PostgreSQL installed and running  
- Java JDK 17+  
- Node.js and npm  
- LocationIQ API key  
- Firebase configuration (if authentication is enabled)

---

## How It Works

1. User searches for a city  
2. Backend checks the database cache  
3. If data exists → return cached results  
4. Otherwise → fetch from external APIs  
5. Store data in PostgreSQL  
6. Run route optimization service  
7. Display optimized route in the frontend

---

## Screenshots

<img width="1434" height="788" alt="Screenshot 2026-02-08 at 1 01 46 PM" src="https://github.com/user-attachments/assets/2b0874a3-cc6b-47a5-b720-d1fe077c4f6a" />
<img width="1434" height="788" alt="Screenshot 2026-02-08 at 1 02 02 PM" src="https://github.com/user-attachments/assets/b1a3b8bb-b41f-4b35-91aa-9eda9c569405" />

---

## 👩‍💻 Author

Designed and built by Maya Zakharova ([GitHub](https://github.com/mayskii)): frontend, backend, database and deployment.

