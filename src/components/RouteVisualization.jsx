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

const FitRoute = ({ positions, fallbackCenter }) => {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 1) {
        map.fitBounds(positions, { padding: [40, 40] });
        } else {
        map.setView(fallbackCenter, 12);
        }
    }, [positions, fallbackCenter, map]);

    return null;
};

const RouteVisualization = ({ selectedAttractions, city, onRemoveAttraction }) => {
    if (!city || city.lat == null || city.lng == null) {
        return <p>Please select a city to visualize the route</p>;
    }

    const center = [city.lat, city.lng];

    const routePositions = selectedAttractions
    .filter(a => a.lat !== null && a.lng !== null)
    .map(a => [a.lat, a.lng]);

    return (
    <div className="route-visualization">
        <h3>Route Visualization</h3>
        <p>
        City: {city.name}, {city.country}
        </p>

    < MapContainer className="route-map" center={center} zoom={12}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FitRoute positions={routePositions} fallbackCenter={center} />

        <Marker position={center} icon={cityIcon}>
            <Popup>
                {city.name}, {city.country}
            </Popup>
        </Marker>

        {routePositions.length > 1 && (
        <Polyline
            positions={routePositions}
            pathOptions={{
                color: '#414f85',
                weight: 2,
                opacity: 0.9,
                dashArray: '10, 6',
                lineCap: 'round',
                lineJoin: 'round'
            }}
        />
        )}

        {selectedAttractions.map((a, index) =>
        a.lat !== null && a.lng !== null ? (
            <Marker
                key={attractionKey(a)}
                position={[a.lat, a.lng]}
                icon={attractionIcon(index)}
            >
            <Popup>
                <strong>{a.name}</strong>
                <br />
                Category: {a.category}
                <br />
                Fee: {a.fee || 'Free'}
                <br />

                <button
                className="remove-attraction-btn"
                onClick={() => onRemoveAttraction(attractionKey(a))}
                >
                Remove from route
                </button>
            </Popup>
            </Marker>
        ) : null
        )}
    </MapContainer>

    <ol className="route-list">
    {selectedAttractions.map((a) => (
        <li key={attractionKey(a)}>{a.name}</li>
    ))}
    </ol>
    </div>
    );
};

export default RouteVisualization;