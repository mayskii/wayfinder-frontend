import PropTypes from 'prop-types';

const AttractionList = ({ attractions, selectedAttractions, setSelectedAttractions }) => {

const toggleAttraction = ((attraction) => {

    const isSelected = selectedAttractions.some((item) => item.osm_id === attraction.osm_id);

    if(isSelected) {
        setSelectedAttractions(selectedAttractions.filter((item) => item.osm_id !== attraction.osm_id))
    } else {
        setSelectedAttractions([...selectedAttractions, attraction]);
    }

})

    return (
    <div className='attraction-list'>
        <h2>Attractions List (Selection Block)</h2>
        <ul>
            {attractions.map((attraction) => {
                const isChecked = selectedAttractions.some((item) => item.osm_id === attraction.osm_id);

                return (
                    <li key={attraction.osm_id}>
                        <label>
                            <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleAttraction(attraction)}
                            />
                            {attraction.name} ({attraction.category})
                        </label>
                    </li>
                );
            })}
        </ul>
        <button onClick={() => setSelectedAttractions(attractions)}>
            Select All
        </button>
        
        <button onClick={() => setSelectedAttractions([])}>
            Deselect All
        </button>
    </div>
    );
};

AttractionList.propTypes = {
    attractions: PropTypes.array.isRequired,
    selectedAttractions: PropTypes.array.isRequired,
    setSelectedAttractions: PropTypes.func.isRequired,
};

export default AttractionList;


