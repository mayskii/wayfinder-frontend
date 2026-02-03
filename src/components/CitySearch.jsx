import './CitySearch.css';
import { useState } from 'react';
import api from '../api';

const CitySearch = ({ filterType, setFilterType, onCityLoaded }) => {

    const [query, setQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async () => {
        
        setErrorMessage(''); 
        
        if (!query.trim()) {
            setErrorMessage('Please enter a city name');
            return;
        }

        try {
            const response = await api.get('/cities/lookup', {
            params: { name: query }
            });
            let city = response.data;

            if (!city || !city.name) {
                setErrorMessage('City not found. Please try another name.');
                return;
            }


            if (filterType && city.attractions) {
            city.attractions = city.attractions.filter(a => a.category === filterType);
            }

            onCityLoaded(city);
        } catch (error) {
            console.error('City search error:', error);
            
            if (error.response?.status === 404) {
                setErrorMessage('City not found. Please try another name.');
            } else {
                setErrorMessage('Server error. Please try again later.');
            }
        }
        };

    return(
        <div className='city-search'>
            <input 
            type="text" 
            placeholder="Enter city" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            />
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value=''>All Types</option>
                <option value='museum'>Museum</option>
                <option value='artwork'>Artwork</option>
                <option value='gallery'>Gallery</option>
            </select>
            <button onClick={handleSearch}>Search</button>

            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
        </div>
    );
};

export default CitySearch;