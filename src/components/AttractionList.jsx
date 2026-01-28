import PropTypes from 'prop-types';
import { useState } from 'react';

const AttractionList = ({ attractions, selectedAttractions, setSelectedAttractions, pageSize = 5 }) => {

    const validAttractions = attractions.filter(a => a.name && a.name !== "Unknown");

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(validAttractions.length / pageSize)

    const toggleAttraction = (attraction) => {
        const isSelected = selectedAttractions.some(item => item.id === attraction.id);
            if (isSelected) {
                setSelectedAttractions(selectedAttractions.filter(item => item.id !== attraction.id));
            } else {
                setSelectedAttractions([...selectedAttractions, attraction]);
        }
    };

    const paginatedAttractions = validAttractions.slice(
        (currentPage - 1) * pageSize, currentPage * pageSize
    );

    return (
    <div className='attraction-list'>
        <h2>Attractions List (Selection Block)</h2>
        <ul>
            {paginatedAttractions.map((attraction) => {
                const isChecked = selectedAttractions.some((item) => item.id === attraction.id);

                return (
                    <li key={attraction.id}>
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

        <div className="pagination">
        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            Prev
        </button>

        <span>Page {currentPage} / {totalPages}</span>

        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Next
        </button>
        </div>


        <button onClick={() => setSelectedAttractions(validAttractions)}>
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


