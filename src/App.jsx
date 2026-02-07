import { useState, useEffect } from 'react';
import api from './api';

import Header from './components/Header';
import CitySearch from './components/CitySearch';
import RouteVisualization from './components/RouteVisualization';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import RoutePreview from './components/RoutePreview';
import { useAuth } from './auth/useAuth';
import SignInModal from './components/SingInModal';
import { attractionKey } from './utils';
import MyRoutesPage from './components/MyRoutesPage.jsx';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const [attractionPage, setAttractionPage] = useState(1);

  // show toast message
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  };

  // generate route name
  const generateRouteName = (city) => {
    const templates = [
      `Perfect day in ${city}`,
      `Walk through ${city}`,
      `${city} highlights`,
      `Hidden gems of ${city}`,
      `My ${city} adventure`,
      `${city} in a day`,
      `Exploring ${city}`,
      `Best spots in ${city}`,
      `Weekend in ${city}`,
      `${city} bucket list`,
      `Must-see places in ${city}`,
      `Discovering ${city}`,
      `${city} city tour`,
      `A taste of ${city}`,
      `${city} essentials`,
      `Iconic ${city}`,
      `${city} route`,
      `Walking through ${city}`,
      `${city} travel guide`,
      `Top in ${city}`,
      `Local favorites in ${city}`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  // init user and load saved routes
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

        const routesResp = await api.get(`/routes/by-user/${dbUserData.id}`);
        setSavedRoutes(routesResp.data);
      } catch (err) {
        console.error('Error initializing user:', err);
      }
    };
    initUser();
  }, [user]);

  // load attractions when city/filter changes
  useEffect(() => {
    if (currentCity) {
      const cityName = typeof currentCity === 'string' ? currentCity : currentCity.name;
      loadAttractions(cityName, filterType);
      setAttractionPage(1);
    }
  }, [filterType, currentCity]);

  const loadAttractions = async (city, filterType) => {
    if (!city) return;
    const cityName = typeof city === 'string' ? city : city.name;
    setLoadingAttractions(true);

    try {
      const response = await api.get(`/attractions/from-osm?cityName=${encodeURIComponent(cityName)}`);
      let data = response.data;
      if (filterType) data = data.filter(a => a.category === filterType);
      setAttractions(data);
    } catch (error) {
      console.error('Error loading attractions:', error);
      setAttractions([]);
    } finally {
      setLoadingAttractions(false);
    }
  };

  const handleRemoveAttraction = (key) => {
    setSelectedAttractions(prev => prev.filter(a => attractionKey(a) !== key));
  };

  const openSaveRouteModal = () => {
    if (!dbUser) {
      setShowSignIn(true);
      return;
    }
    const suggested = generateRouteName(currentCity?.name || 'City');
    setRouteNameDraft(suggested);
    setShowSaveModal(true);
  };

  const saveRoute = async (routeName, isTemp = false) => {
    if (!dbUser) return null;

    try {
      const response = await api.post('/routes', {
        user: { id: dbUser.id },
        name: routeName,
        city: currentCity
          ? {
              name: currentCity.name,
              country: currentCity.country,
              lat: currentCity.lat,
              lng: currentCity.lng,
            }
          : null,
      });

      const newRoute = response.data;

      for (let attraction of selectedAttractions) {
        await api.post('/route-attractions', {
          route: { id: newRoute.id },
          attraction: { id: attraction.id },
        });
      }

      if (!isTemp) {
        setSavedRoutes(prev => [...prev, newRoute]);
        setSelectedAttractions([]);
        showMessage('✨ Route saved');
      }

      return newRoute;
    } catch (err) {
      console.error('Error saving route:', err);
      return null;
    }
  };

  const syncRouteAttractions = async (routeId, attractions) => {
    await api.delete(`/route-attractions/by-route/${routeId}`);
    for (let attraction of attractions) {
      await api.post('/route-attractions', {
        route: { id: routeId },
        attraction: { id: attraction.id },
      });
    }
  };

  const optimizeRoute = async () => {
    if (!user) {
      setShowSignIn(true);
      return;
    }
    if (!dbUser) return;

    try {
      let routeId = currentRouteId;

      if (!routeId) {
        const saved = await saveRoute(generateRouteName(currentCity?.name || 'City'), true);
        if (!saved?.id) return;
        routeId = saved.id;
        setCurrentRouteId(routeId);
      }

      await syncRouteAttractions(routeId, selectedAttractions);

      const response = await api.post(`/route-attractions/optimize/${routeId}`);
      const optimizedAttractions = response.data
        .sort((a, b) => a.position - b.position)
        .map(ra => ra.attraction);

      setSelectedAttractions(optimizedAttractions);
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
    if (city?.name) loadAttractions(city.name, filterType);
  };

  const loadRoute = async (route) => {
    try {
      const response = await api.get(`/route-attractions/by-route/${route.id}`);
      const routeAttractions = response.data;
      const attractions = routeAttractions.map(ra => ra.attraction);
      setSelectedAttractions(attractions);

      if (attractions.length > 0) {
        const cityData = attractions[0].city;
        if (cityData) {
          setCurrentCity({
            name: cityData.name,
            country: cityData.country,
            lat: cityData.lat,
            lng: cityData.lng,
          });
        }
      }
    } catch (err) {
      console.error('Error loading route:', err);
    }
  };

  const deleteRoute = async (routeId) => {
    try {
      await api.delete(`/routes/${routeId}`);
      setSavedRoutes(prev => prev.filter(r => r.id !== routeId));
    } catch (err) {
      console.error('Error deleting route:', err);
    }
  };

  // function to update notes in MyRoutesPage
  const updateRoute = async (updatedRoute) => {
    try {
      await api.put(`/routes/${updatedRoute.id}`, updatedRoute);
    } catch (err) {
      console.error('Error updating route:', err);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
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
                    <button onClick={() => setShowSaveModal(false)}>Cancel</button>
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

            <CitySearch filterType={filterType} setFilterType={setFilterType} onCityLoaded={handleCityLoaded} />

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
                routes={savedRoutes}
                setRoutes={setSavedRoutes}
                loadRoute={loadRoute}
                deleteRoute={deleteRoute}
                currentPage={attractionPage}
                setCurrentPage={setAttractionPage}
                navigate={navigate}
              />

              <RoutePreview selectedAttractions={selectedAttractions} />
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/my-routes"
        element={
          <MyRoutesPage
            routes={savedRoutes}
            setRoutes={setSavedRoutes}
            isAuthenticated={!!user}
            updateRoute={updateRoute}
          />
        }
      />
    </Routes>
  );
}

export default App;
