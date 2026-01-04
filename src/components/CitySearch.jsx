const CitySearch = () => {
    return(
        <div className='city-search'>
            <input type='text' placeholder='Enter city' />
            <button>Search</button>
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