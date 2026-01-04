import PropTypes from 'prop-types';

const AttractionList = ({ attractions }) => {
    return (
    <div className='attraction-list'>
        <h2>Attractions List (Selection Block)</h2>
        <ul>
            {attractions.map((attraction) => (
                <li key={attraction.osm_id}><input type="checkbox" />{attraction.name} </li>
            ))}
        </ul>
        <button>Select All</button>
        <button>Deselect All</button>
    </div>
    );
};

AttractionList.propTypes = {
    ttractions: PropTypes.array.isRequired,
};

export default AttractionList;


