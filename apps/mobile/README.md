# 📱 Tourism Mobile App

A modern **React Native (Expo)** mobile application to explore tourist places across India 🇮🇳.
Users can browse states, districts, places, view details, nearby locations, and save favorites.

---

## 🚀 Features

* 🌍 Explore all Indian states
* 🏙️ Browse districts dynamically
* 📍 View tourist places using Google Places API
* 🔍 Search places in real-time
* ❤️ Save & manage favorites
* 📸 Image gallery with swipe + zoom
* 🧭 Open directions in Google Maps
* 📍 Nearby places using GPS
* 🎥 Hero video (optional UI enhancement)

---

## 🏗️ Tech Stack

* **Frontend (Mobile)**: React Native + Expo
* **Navigation**: React Navigation (Stack + Bottom Tabs)
* **Backend**: Spring Boot (Java)
* **API**: Google Maps Places API
* **State Management**: Context API
* **Styling**: React Native StyleSheet

---

## 📁 Project Structure

```
src/
 ├── components/        # Reusable UI components
 │    ├── ImageCarousel.tsx
 │    ├── PlaceCard.tsx
 │    └── HeroVideo.tsx
 │
 ├── screens/           # App screens
 │    ├── HomeScreen.tsx
 │    ├── DistrictScreen.tsx
 │    ├── PlacesScreen.tsx
 │    ├── PlaceDetailsScreen.tsx
 │    ├── NearbyScreen.tsx
 │    └── FavoritesScreen.tsx
 │
 ├── navigation/        # Navigation setup
 │    └── AppNavigator.tsx
 │
 ├── services/          # API calls
 │    └── api.ts
 │
 ├── context/           # Global state (favorites)
 │    └── FavoritesContext.tsx
 │
 ├── styles/            # Theme & constants
 │    └── theme.ts
 │
 └── data/              # Static fallback data
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Start the app

```bash
npx expo start
```

Scan the QR code using **Expo Go** (Android/iOS).

---

## 🌐 Backend Setup

Make sure your Spring Boot backend is running:

```
http://localhost:8080
```

---

## 🔗 Update API Base URL

Edit:

```
src/services/api.ts
```

```ts
const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8080"
    : "http://YOUR_IP:8080"; // replace with your local IP
```

👉 Example:

```ts
"http://192.168.29.236:8080"
```

---

## 🔑 Google Maps API

Enable these APIs in Google Cloud:

* Places API
* Places Details API
* Nearby Search API
* Photos API

Add your API key in backend (NOT in frontend).

---

## 📦 Build APK / App

### Android

```bash
npx expo run:android
```

OR

```bash
npx expo build:android
```

---

## 🧠 Best Practices

* ⚠️ Do NOT expose Google API keys in frontend
* ✅ Use backend proxy (already implemented)
* 🚀 Add caching to reduce API cost
* 🔒 Restrict API key usage in Google Cloud

---

## 💰 Cost Optimization

* Google gives **$200/month free credit**
* Avoid unnecessary API calls
* Cache responses in backend
* Limit results (5–10 places only)

---

## 🛠️ Future Improvements

* 🗺️ Map integration inside app
* ⭐ User reviews & ratings
* 📅 Trip planner
* 🏨 Real hotel booking API
* 🌐 Offline support
* 🔔 Notifications

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first.

---

## 📄 License

This project is for learning and development purposes.

---

## 👨‍💻 Author

**Ganesh Pinnam**
Tourism Platform Project 🚀

---
