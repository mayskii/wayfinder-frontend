import { useState } from 'react';

import Header from './components/Header';
import CitySearch from './components/CitySearch';
import RouteVisualization from './components/RouteVisualization';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SavedRoutes from './components/SavedRoutes';

import { attractionsMock } from './mocks/attractions';
import { savedRoutesMock } from './mocks/routes';

import './App.css'

function App() {

  const [attractions] = useState(attractionsMock);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState(savedRoutesMock);

  const createRoute = () => {
    if (selectedAttractions.length === 0) return;

    const newRoute = {
      id: Date.now(),
      name: `Route ${savedRoutes.length + 1}`,
      attractions: selectedAttractions,
      created_at: new Date().toISOString(),
    };

    setSavedRoutes([...savedRoutes, newRoute]);
    alert(`Route '${newRoute.name}' created!`);
  }

  const loadRoute = (route) => {
    setSelectedAttractions(route.attractions);
  };

  const deleteRoute = (routeId) => {
    setSavedRoutes(savedRoutes.filter((r) => r.id !== routeId));
  };

  return (
    <div className='app-container'>
      <Header />
      <CitySearch />

      <div className='main-content'>
        <RouteVisualization />
        <Sidebar 
          attractions={attractions}
          selectedAttractions={selectedAttractions}
          setSelectedAttractions={setSelectedAttractions}
          createRoute={createRoute}
        />
      </div>

      <SavedRoutes 
        routes={savedRoutes}
        loadRoute={loadRoute}
        deleteRoute={deleteRoute}/>
      <Footer />

    </div>
  )
}

export default App
