import { useState } from 'react';

import Header from './components/Header';
import CitySearch from './components/CitySearch';
import RouteVisualization from './components/RouteVisualization';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SavedRoutes from './components/SavedRoutes';
import { useAuth } from './auth/useAuth';
import SignInModal from './components/SingInModal';

import { attractionsMock } from './mocks/attractions';
import { savedRoutesMock } from './mocks/routes';

import './App.css'

function App() {
  const { user } = useAuth();

  const [currentCity, setCurrentCity] = useState(null);
  const [attractions] = useState(attractionsMock);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState(savedRoutesMock);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

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


  const saveRoute = () => {
    if (!currentRoute) return;
    if (!user) {
      setShowSignIn(true);
      return;
    }
    setSavedRoutes([...savedRoutes, { ...currentRoute, id: Date.now(), name: `Route ${savedRoutes.length + 1}` }]);
    alert(`Route saved!`);
  };


  const loadRoute = (route) => {
    setSelectedAttractions(route.attractions);
  };


  const deleteRoute = (routeId) => {
    setSavedRoutes(savedRoutes.filter((r) => r.id !== routeId));
  };



  return (
    <div className='app-container'>
      <Header />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      <CitySearch onCityLoaded={setCurrentCity} />

      <div className='main-content'>
        <RouteVisualization
          city={currentCity}
          selectedAttractions={selectedAttractions}/>
        <Sidebar 
          attractions={attractions}
          selectedAttractions={selectedAttractions}
          setSelectedAttractions={setSelectedAttractions}
          createRoute={createRoute}
          saveRoute={saveRoute}
          user={user}
          showSignInModal={() => setShowSignIn(true)}
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
