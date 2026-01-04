import Header from './components/Header';
import CitySearch from './components/CitySearch';
import RouteVisualization from './components/RouteVisualization';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import './App.css'

function App() {

  return (
    <div>
      <Header />
      <CitySearch />

      <div>
        <RouteVisualization />
        <Sidebar />
      </div>

      <Footer />

    </div>
  )
}

export default App
