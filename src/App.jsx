import { useState } from 'react';
import api from './api';

import Header from './components/Header';
import CitySearch from './components/CitySearch';
import RouteVisualization from './components/RouteVisualization';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SavedRoutes from './components/SavedRoutes';
import { useAuth } from './auth/useAuth';
import SignInModal from './components/SingInModal';
import { attractionKey } from './utils';

import './App.css'


function App() {
  const { user } = useAuth();

  const [currentCity, setCurrentCity] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loadingAttractions, setLoadingAttractions] = useState(false);

// attractions from back
  const loadAttractions = async (cityName) => {
  setSelectedAttractions([]);
  setAttractions([]);
  setLoadingAttractions(true);

    try {
      const response = await api.get(`/attractions/from-osm?cityName=${cityName}`);
      setAttractions(response.data);
    } catch (error) {
      console.error('Error loading attractions:', error);
      setAttractions([]);
    } finally {
    setLoadingAttractions(false);
    }
  };

// delete attraction
const handleRemoveAttraction = (key) => {
  setSelectedAttractions((prev) =>
    prev.filter(a => attractionKey(a) !== key)
  );
};

// creation route
  const createRoute = () => {
    if (selectedAttractions.length === 0) return;

  const newRoute = {
      id: Date.now(),
      name: `Route ${savedRoutes.length + 1}`,
      attractions: selectedAttractions,
      created_at: new Date().toISOString(),
    };
    setCurrentRoute(newRoute);
    alert(`Route created!`);
  }

// save route
  const saveRoute = () => {
    if (!currentRoute) return;
    if (!user) {
      setShowSignIn(true);
      return;
    }
    setSavedRoutes([...savedRoutes, { ...currentRoute, id: Date.now(), name: `Route ${savedRoutes.length + 1}` }]);
    alert(`Route saved!`);
  };

// load route
  const loadRoute = (route) => {
    setSelectedAttractions(route.attractions);
  };

// delete route
  const deleteRoute = (routeId) => {
    setSavedRoutes(savedRoutes.filter((r) => r.id !== routeId));
  };

  return (
    <div className='app-container'>
      <Header />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}

      <CitySearch 
        onCityLoaded={(city) => {
          setCurrentCity(city);
          if (city?.name) loadAttractions(city.name);
        }} 
      />

      <div className='main-content'>
        <RouteVisualization
          city={currentCity}
          selectedAttractions={selectedAttractions}
          onRemoveAttraction={handleRemoveAttraction}
          />

        <Sidebar 
          attractions={attractions}
          selectedAttractions={selectedAttractions}
          setSelectedAttractions={setSelectedAttractions}
          createRoute={createRoute}
          saveRoute={saveRoute}
          user={user}
          showSignInModal={() => setShowSignIn(true)}
          loading={loadingAttractions}
        />
      </div>

        <SavedRoutes
          user={user}
          routes={savedRoutes}
          loadRoute={loadRoute}
          deleteRoute={deleteRoute}
          />
        <Footer />
    </div>
  )
}

export default App
