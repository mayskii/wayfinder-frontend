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
  const [savedRoutes] = useState(savedRoutesMock);
  const [selectedAttractions, setSelectedAttractions] = useState([]);

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
        />
      </div>

      <SavedRoutes routes={savedRoutes}/>

      <Footer />

    </div>
  )
}

export default App
