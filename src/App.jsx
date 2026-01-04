import Header from './components/Header';
import CitySearch from './components/CitySearch';
import RouteVisualization from './components/RouteVisualization';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SavedRoutes from './components/SavedRoutes';

import './App.css'

function App() {

  return (
    <div className='app-container'>
      <Header />
      <CitySearch />

      <div className='main-content'>
        <RouteVisualization />
        <Sidebar />
      </div>

      <SavedRoutes />

      <Footer />

    </div>
  )
}

export default App
