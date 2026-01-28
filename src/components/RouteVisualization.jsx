import './RouteVisualization.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const ChangeMapView = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
};

const RouteVisualization = ({ selectedAttractions, city }) => {
    if (!city || city.lat == null || city.lng == null) {
        return <p>Please select a city to visualize the route</p>;
    }

    const center = [city.lat, city.lng];

    return (
    <div className='route-visualization'>
        <h3>Route Visualization</h3>
        <p>City: {city.name}, {city.country}</p>

        <MapContainer
            className="route-map"
            center={center}
            zoom={12}
        >

        <ChangeMapView center={center} zoom={12} />

        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Marker position={center}>
            <Popup>
                {city.name}, {city.country}
            </Popup>
        </Marker>

        {selectedAttractions.map(a =>
            a.lat != null && a.lng != null ? (
            <Marker key={a.id} position={[a.lat, a.lng]}>
                <Popup>
                    <strong>{a.name}</strong><br />
                    Category: {a.category}<br />
                    Fee: {a.fee || 'Free'}
                </Popup>
            </Marker>
            ) : null
        )}

        </MapContainer>

        <ol className="route-list">
            {selectedAttractions.map(a => (
            <li key={a.id}>{a.name}</li>
            ))}
        </ol>
    </div>
    );
};

export default RouteVisualization