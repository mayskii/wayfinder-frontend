import PropTypes from 'prop-types';
import { useState } from 'react';
import './AttractionList.css';

const AttractionList = ({ attractions, selectedAttractions, setSelectedAttractions, pageSize = 5, loading }) => {

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
        <h2>Attractions List</h2>

        {loading ? (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
        ) : validAttractions.length > 0 ? (
        <>
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

        <div className="buttons">
            <button onClick={() => setSelectedAttractions(validAttractions)}>
                Select All
            </button>

            <button onClick={() => setSelectedAttractions([])}>
                Deselect All
            </button>
        </div>
        </>
        ) : (
        <div className="placeholder">
            Please select a city to see attractions
        </div>
        )}
    </div>
    );
};


AttractionList.propTypes = {
    attractions: PropTypes.array.isRequired,
    selectedAttractions: PropTypes.array.isRequired,
    setSelectedAttractions: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    loading: PropTypes.bool,
};

export default AttractionList;


