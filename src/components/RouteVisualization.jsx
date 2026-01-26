const RouteVisualization = ({ selectedAttractions, city }) => {
    return (
    <div className='route-visualization'>
        <h3>Route Visualization</h3>
        {city && <p>City: {city.name}, {city.country}</p>}
        <p>
            This section is reserved for route visualization. At the current stage,
            the final format is not yet determined (list-based with info or map-based visualization).
        </p>
        <ol>
                {selectedAttractions.map((a) => (
                    <li key={a.osm_id}>{a.name}</li>
                ))}
        </ol>
    </div>
    );
};

export default RouteVisualization