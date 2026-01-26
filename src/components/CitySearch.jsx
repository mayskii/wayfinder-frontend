import { useState } from 'react';
import api from '../api';

const CitySearch = ({ onCityLoaded }) => {

    const [query, setQuery] = useState('');

        const handleSearch = async () => {
    if (!query) return;
    try {
        const response = await api.get('/cities/lookup', {
        params: { name: query }
        });
        const city = response.data;
        console.log(response.data)
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
            <button onClick={handleSearch}>Search</button>
            <select>
                <option value=''>All Types</option>
                <option value='museum'>Museum</option>
                <option value='park'>Park</option>
                <option value='restaurant'>Restaurant</option>
            </select>
        </div>
    );
};

export default CitySearch;