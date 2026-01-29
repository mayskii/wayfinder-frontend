import { useState, useEffect } from 'react';
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
  const [dbUser, setDbUser] = useState(null);

  const [currentCity, setCurrentCity] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [filterType, setFilterType] = useState('');


// Firebase  -->  dbUser from bacc
  useEffect(() => {
    const registerOrGetUser = async () => {
      if (!user) return;

      try {
        const response = await api.post('/users/create-or-get', {
          email: user.email,
          name: user.displayName || "Unknown"
        });
        setDbUser(response.data);
        console.log("Backend user:", response.data);
      } catch (err) {
        console.error("Error registering user:", err);
      }
    };

    registerOrGetUser();
  }, [user]);

// useEffect for filtering
  useEffect(() => {
    if (currentCity?.name) {
      loadAttractions(currentCity.name, filterType);
    }
  }, [filterType, currentCity]);

// attractions from back
  const loadAttractions = async (cityName, filterType) => {
  setLoadingAttractions(true);
  try {
    const response = await api.get(`/attractions/from-osm?cityName=${cityName}`);
    let data = response.data;
    
    if (filterType) {
      data = data.filter(a => a.category === filterType);
    }

    setAttractions(data);
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
      userId: dbUser?.id,
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
        filterType={filterType}
        setFilterType={setFilterType} 
        onCityLoaded={(city) => {
          setCurrentCity(city);
          if (city?.name) loadAttractions(city.name, filterType);
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
