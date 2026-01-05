import PropTypes from 'prop-types';


const RoutePreview = ({ selectedAttractions }) => {

    return (
    <div className="route-preview">
        <h4>Route Preview</h4>
        {selectedAttractions.length === 0 ? ( <p>No attractions selected</p>
        ) : (
        <ol>
            {selectedAttractions.map((attraction) => (
                <li key={attraction.osm_id}>
                {attraction.name}
                {attraction.distance_km && ` (${attraction.distance_km} km)`}
            </li>
        ))}
        </ol>
    )}
    </div>
    );
}

RoutePreview.propTypes = {
    selectedAttractions: PropTypes.array.isRequired,
};

export default RoutePreview