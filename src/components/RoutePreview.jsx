import PropTypes from 'prop-types';
import './RoutePreview.css';

const RoutePreview = ({ selectedAttractions }) => {

    
    return (
        <div className="route-preview">
            <h4>Route Preview</h4>
            {selectedAttractions.length === 0 ? (
                <p>No attractions selected</p>
            ) : (
                <div className="route-path">
                    {selectedAttractions.map((attraction, index) => (
                        <div key={attraction.osm_id || attraction.id || index} className="route-node">
                            <div className="route-number">{index + 1}</div>
                            <div className="route-name">{attraction.name}</div>
                            {index < selectedAttractions.length - 1 && (
                                <div className="route-arrow">→</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

RoutePreview.propTypes = {
    selectedAttractions: PropTypes.array.isRequired,
};

export default RoutePreview;
