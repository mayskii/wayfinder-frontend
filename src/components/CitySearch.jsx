import { useState } from 'react';
import api from '../api';

const CitySearch = ({ onCityLoaded }) => {

    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState('');

    const handleSearch = async () => {
    if (!query) return;
    try {
        const response = await api.get('/cities/lookup', {
        params: { name: query }
        });
        let city = response.data;

        if (filterType && city.attractions) {
                city.attractions = city.attractions.filter(a => a.type === filterType);
            }

        onCityLoaded(city);
    } catch (error) {
        console.error('City search error:', error);
        alert('City not found or server error');
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
                <option value='park'>Park</option>
                <option value='restaurant'>Restaurant</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default CitySearch;