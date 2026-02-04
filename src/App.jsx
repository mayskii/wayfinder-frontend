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

  const [showSignIn, setShowSignIn] = useState(false);
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [filterType, setFilterType] = useState('');

  const [currentRouteId, setCurrentRouteId] = useState(null);
  const [isRouteOptimized, setIsRouteOptimized] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const [message, setMessage] = useState(null);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [routeNameDraft, setRouteNameDraft] = useState('');


// message for save and optimize route
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  };

// generator names
  const generateRouteName = (city) => {
    const templates = [
    `Perfect day in ${city}`,
    `Romantic walk through ${city}`,
    `${city} highlights`,
    `Hidden gems of ${city}`,
    `My ${city} adventure`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
};

// useEffect for sign in / sign out and loading user routes
  useEffect(() => {
    const initUser = async () => {
      if (!user) {
        setDbUser(null);
        setSavedRoutes([]);
        setSelectedAttractions([]);
        return;
      }

      try {
        const response = await api.post('/users/create-or-get', {
          email: user.email,
          name: user.displayName || 'Unknown',
        });
        const dbUserData = response.data;
        setDbUser(dbUserData);

        // user's saved routes
        const routesResp = await api.get(`/routes/by-user/${dbUserData.id}`);
        setSavedRoutes(routesResp.data);

        console.log('Backend user and routes loaded:', dbUserData, routesResp.data);
      } catch (err) {
        console.error('Error initializing user:', err);
      }
    };

    initUser();
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

// delete attraction(local)
  const handleRemoveAttraction = (key) => {
  setSelectedAttractions((prev) =>
    prev.filter(a => attractionKey(a) !== key)
  );
};

// save route

const openSaveRouteModal = () => {
    if (!dbUser) {
      setShowSignIn(true);
      return;
    }

    const suggested = generateRouteName(currentCity?.name || 'City');
    setRouteNameDraft(suggested);
    setShowSaveModal(true);
  };

  const saveRoute = async (routeName) => {
    if (!dbUser) return null;

    try {
      const response = await api.post('/routes', {
        user: { id: dbUser.id },
        name: routeName
      });

      const newRoute = response.data;

      for (let attraction of selectedAttractions) {
        await api.post('/route-attractions', {
          route: { id: newRoute.id },
          attraction: { id: attraction.id }
        });
      }

      setSavedRoutes(prev => [...prev, newRoute]);
      setSelectedAttractions([]);

      return newRoute;
    } catch (err) {
      console.error('Error saving route:', err);
      return null;
    }
  };

// optimization with save
  const optimizeRoute = async () => {

  if (!user) {
    setShowSignIn(true);
    return;
  }

  if (!dbUser) return;

  try {
    let routeId = currentRouteId;

    if (!routeId) {
      const saved = await saveRoute(
          generateRouteName(currentCity?.name || 'City')
        );
      if (!saved?.id) return;

      routeId = saved.id;
      setCurrentRouteId(routeId);
    }

    const response = await api.post(
      `/route-attractions/optimize/${routeId}`
    );

    const optimizedAttractions = response.data
      .sort((a, b) => a.position - b.position)
      .map(ra => ra.attraction);

    setSelectedAttractions([...optimizedAttractions]);

    setCurrentRouteId(null);
    setIsRouteOptimized(true);

    showMessage('💫 Route optimized');

  } catch (err) {
    console.error('Optimize error:', err);
  }
};

const handleCityLoaded = (city) => {

  if (isRouteOptimized) {
    setSelectedAttractions([]);
    setIsRouteOptimized(false);
    setCurrentRouteId(null);
  }

  setCurrentCity(city);

  if (city?.name) {
    loadAttractions(city.name, filterType);
  }
};

  // load route
  const loadRoute = async (route) => {
    try {
    const response = await api.get(
      `/route-attractions/by-route/${route.id}`
    );

    const attractions = response.data.map(ra => ra.attraction);
    setSelectedAttractions(attractions);
  } catch (err) {
    console.error('Error loading route:', err);
  };
  };

  // delete route
  const deleteRoute = async (routeId) => {
  try {
    await api.delete(`/routes/${routeId}`);
    setSavedRoutes(prev => prev.filter(r => r.id !== routeId));
  } catch (err) {
    console.error('Error deleting route:', err);
  }
};

  return (
    <div className="app-container">
      <Header />

      {message && <div className="toast">{message}</div>}

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}

      {showSaveModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Save route</h3>

            <input
              type="text"
              value={routeNameDraft}
              onChange={(e) => setRouteNameDraft(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowSaveModal(false)}>
                Cancel
              </button>

              <button
                onClick={async () => {
                  await saveRoute(routeNameDraft);
                  setShowSaveModal(false);
                  showMessage('✨ Route saved');
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <CitySearch
        filterType={filterType}
        setFilterType={setFilterType}
        onCityLoaded={handleCityLoaded}
      />

      <div className="main-content">
        <RouteVisualization
          city={currentCity}
          selectedAttractions={selectedAttractions}
          onRemoveAttraction={handleRemoveAttraction}
          defaultCenter={[20, 0]}
          isMapExpanded={isMapExpanded}
          toggleMapExpand={() => setIsMapExpanded(prev => !prev)}
        />

        <Sidebar
          attractions={attractions}
          selectedAttractions={selectedAttractions}
          setSelectedAttractions={setSelectedAttractions}
          optimizeRoute={optimizeRoute}
          saveRoute={openSaveRouteModal}
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
  );

}

export default App
