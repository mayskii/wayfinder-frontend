import './RouteVisualization.css';
import { useEffect } from 'react';
import { attractionKey } from '../utils';

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

const cityIcon = L.divIcon({
    className: 'city-marker',
    html: '<div class="city-dot"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
});

const attractionIcon = (index) =>
    L.divIcon({
    className: 'attraction-marker',
    html: `<div class="attraction-dot">${index + 1}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    });

const FitRoute = ({ positions, city, defaultCenter }) => {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 0) {
            
            map.fitBounds(positions, { padding: [40, 40] });
        } else if (city?.lat != null && city?.lng != null) {

            map.setView([city.lat, city.lng], 10);
        } else {
            
            map.setView(defaultCenter, 2);
        }
    }, [positions, city, defaultCenter, map]);

    return null;
};

const RouteVisualization = ({ selectedAttractions, city, onRemoveAttraction, defaultCenter, isMapExpanded, toggleMapExpand }) => {
    const routePositions = selectedAttractions
        .filter(a => a.lat != null && a.lng != null)
        .map(a => [a.lat, a.lng]);

    return (
        <div className={`route-visualization ${isMapExpanded ? 'expanded' : ''}`}>
            {isMapExpanded && <div className="map-overlay" onClick={toggleMapExpand}></div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <button onClick={toggleMapExpand}>
                    {isMapExpanded ? 'Collapse Map' : 'Expand Map'}
                </button>
            </div>
            <p>
                {city ? `City: ${city.name || 'Unknown'}, ${city.country || ''}` : 'Please select a city to visualize the route'}
            </p>

        <MapContainer 
            className="route-map" 
            center={defaultCenter} 
            zoom={2}
            key={selectedAttractions.length + (isMapExpanded ? 'expanded' : 'collapsed')}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            <FitRoute positions={routePositions} city={city} defaultCenter={defaultCenter} />

            {city && (
                <Marker position={[city.lat, city.lng]} icon={cityIcon}>
                    <Popup>{city.name}, {city.country}</Popup>
                </Marker>
            )}

            {routePositions.length > 1 && (
                <Polyline positions={routePositions} pathOptions={{
                    color: '#2f59c3ff',
                    weight: 3,
                    opacity: 0.9,
                    dashArray: '10,6',
                    lineCap: 'round',
                    lineJoin: 'round'
                }} />
            )}

            {selectedAttractions.map((a, index) =>
                a.lat != null && a.lng != null ? (
                    <Marker key={attractionKey(a)} position={[a.lat, a.lng]} icon={attractionIcon(index)}>
                        <Popup>
  <div className="popup-content">
    <div className="popup-text">
      <div className="popup-title">{a.name}</div>
      <div className="popup-category">Category: {a.category}</div>
      <div className="popup-fee">Fee: {a.fee || 'Free'}</div>
    </div>

    <button
      className="remove-attraction-btn"
      onClick={() => onRemoveAttraction(attractionKey(a))}
    >
      Remove from route
    </button>
  </div>
</Popup>
                    </Marker>

                ) : null
            )}
        </MapContainer>

        {/* <ol className="route-list">
            {selectedAttractions.map(a => <li key={attractionKey(a)}>{a.name}</li>)}
        </ol> */}
        </div>
    );
};

export default RouteVisualization;